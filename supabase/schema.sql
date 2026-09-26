-- ============================================================
-- DPL // DATA PREMIER LEAGUE
-- PARTICIPANT REGISTRATION DATABASE
-- ============================================================


-- ============================================================
-- EXTENSIONS
-- ============================================================

create extension if not exists pgcrypto;


-- ============================================================
-- REGISTRATION ID SEQUENCE
-- ============================================================

create sequence if not exists public.dpl_registration_seq;


-- ============================================================
-- PARTICIPANTS TABLE
-- ============================================================

create table if not exists public.participants (

  id uuid primary key
    default gen_random_uuid(),

  registration_id text
    not null
    unique
    default (
      'DPL-' ||
      to_char(current_date, 'YYYY') ||
      '-' ||
      lpad(
        nextval('public.dpl_registration_seq')::text,
        4,
        '0'
      )
    ),

  submission_token uuid
    not null
    unique
    default gen_random_uuid(),

  full_name text
    not null,

  college_registration_number text
    not null
    unique,

  department text
    not null,

  year text
    not null,

  college_email text
    not null,

  phone text
    not null
    unique,

  /*
    PHOTO REMOVED FROM THE REGISTRATION FLOW.

    Kept nullable for compatibility with any existing
    database records. New registrations will not use it.
  */
  photo_path text,

  resume_path text,

  status text
    not null
    default 'uploading',

  created_at timestamptz
    not null
    default now(),

  updated_at timestamptz
    not null
    default now(),


  -- ========================================================
  -- STATUS
  -- ========================================================

  constraint participants_status_check
    check (
      status in (
        'uploading',
        'pending',
        'verified',
        'rejected'
      )
    ),


  -- ========================================================
  -- DEPARTMENT
  -- ========================================================

  constraint participants_department_check
    check (
      department in (
        'AD',
        'AE',
        'BT',
        'CE',
        'CH',
        'CS',
        'EC',
        'EE',
        'IT',
        'ME',
        'MN',
        'MR'
      )
    ),


  -- ========================================================
  -- YEAR
  -- ========================================================

  constraint participants_year_check
    check (
      year in (
        '2nd Year',
        '3rd Year',
        '4th Year'
      )
    )

);


-- ============================================================
-- CASE-INSENSITIVE EMAIL UNIQUENESS
-- ============================================================

create unique index if not exists participants_email_unique
on public.participants (
  lower(college_email)
);


-- ============================================================
-- PROGRAMMING SKILLS
--
-- NEW RULE:
--
-- Every participant has ONLY ONE most-comfortable language.
--
-- rank = 1
--
-- Allowed:
-- Python
-- C
-- C++
-- Java
-- ============================================================

create table if not exists public.participant_skills (

  id uuid primary key
    default gen_random_uuid(),

  participant_id uuid
    not null
    references public.participants(id)
    on delete cascade,

  language text
    not null,

  rank integer,

  proficiency text,

  created_at timestamptz
    not null
    default now(),


  -- ========================================================
  -- ONLY RANK 1 IS ALLOWED
  -- ========================================================

  constraint participant_skill_rank_check
    check (
      rank = 1
    ),


  -- ========================================================
  -- ALLOWED LANGUAGES
  -- ========================================================

  constraint participant_skill_language_check
    check (
      language in (
        'Python',
        'C',
        'C++',
        'Java'
      )
    ),


  -- ========================================================
  -- PROFICIENCY
  -- ========================================================

  constraint participant_skill_proficiency_check
    check (
      proficiency in (
        'Beginner',
        'Intermediate',
        'Advanced'
      )
    )

);


-- ============================================================
-- ONE SKILL PER PARTICIPANT
-- ============================================================

create unique index if not exists
participant_skill_participant_unique
on public.participant_skills (
  participant_id
);


-- ============================================================
-- ADMIN USERS
-- ============================================================

create table if not exists public.admin_users (

  user_id uuid primary key
    references auth.users(id)
    on delete cascade,

  created_at timestamptz
    not null
    default now()

);


-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
as $$
begin

  new.updated_at = now();

  return new;

end;
$$;


drop trigger if exists participants_updated_at
on public.participants;


create trigger participants_updated_at

before update
on public.participants

for each row

execute function public.set_updated_at();


-- ============================================================
-- ADMIN CHECK FUNCTION
-- ============================================================

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$

  select exists (

    select 1

    from public.admin_users

    where user_id = auth.uid()

  );

$$;


-- ============================================================
-- PARTICIPANT REGISTRATION RPC
-- ============================================================

drop function if exists public.register_participant(
  text,
  text,
  text,
  text,
  text,
  text,
  jsonb
);


create or replace function public.register_participant(

  p_full_name text,

  p_college_registration_number text,

  p_department text,

  p_year text,

  p_college_email text,

  p_phone text,

  p_skills jsonb

)

returns table (

  participant_id uuid,

  registration_id text,

  submission_token uuid

)

language plpgsql

security definer

set search_path = public

as $$

declare

  v_participant_id uuid;

  v_registration_id text;

  v_submission_token uuid;

  v_skill jsonb;

  v_skill_count integer;

  v_language text;

  v_rank integer;

  v_proficiency text;

begin


  -- ========================================================
  -- BASIC VALIDATION
  -- ========================================================

  if trim(coalesce(p_full_name, '')) = '' then

    raise exception
      'Full name is required';

  end if;


  if trim(
    coalesce(
      p_college_registration_number,
      ''
    )
  ) = '' then

    raise exception
      'College registration number is required';

  end if;


  if trim(coalesce(p_department, '')) = '' then

    raise exception
      'Department is required';

  end if;


  if trim(coalesce(p_year, '')) = '' then

    raise exception
      'Year is required';

  end if;


  if trim(coalesce(p_college_email, '')) = '' then

    raise exception
      'College email is required';

  end if;


  if trim(coalesce(p_phone, '')) = '' then

    raise exception
      'Phone number is required';

  end if;


  -- ========================================================
  -- SKILL VALIDATION
  --
  -- Exactly ONE skill is required.
  -- ========================================================

  if jsonb_typeof(
    coalesce(p_skills, '[]'::jsonb)
  ) <> 'array' then

    raise exception
      'Invalid programming skill data';

  end if;


  select count(*)
  into v_skill_count
  from jsonb_array_elements(p_skills);


  if v_skill_count <> 1 then

    raise exception
      'Exactly one most-comfortable programming language is required';

  end if;


  -- ========================================================
  -- READ THE ONE SKILL
  -- ========================================================

  select value
  into v_skill
  from jsonb_array_elements(p_skills)
  limit 1;


  v_language =
    trim(v_skill ->> 'language');


  v_rank =
    coalesce(
      (v_skill ->> 'rank')::integer,
      0
    );


  v_proficiency =
    trim(
      coalesce(
        v_skill ->> 'proficiency',
        ''
      )
    );


  -- ========================================================
  -- LANGUAGE VALIDATION
  -- ========================================================

  if v_language not in (
    'Python',
    'C',
    'C++',
    'Java'
  ) then

    raise exception
      'Invalid programming language';

  end if;


  -- ========================================================
  -- RANK VALIDATION
  -- ========================================================

  if v_rank <> 1 then

    raise exception
      'Most-comfortable language must have rank 1';

  end if;


  -- ========================================================
  -- PROFICIENCY VALIDATION
  -- ========================================================

  if v_proficiency not in (
    'Beginner',
    'Intermediate',
    'Advanced'
  ) then

    raise exception
      'Valid proficiency level is required';

  end if;


  -- ========================================================
  -- INSERT PARTICIPANT
  -- ========================================================

  insert into public.participants (

    full_name,

    college_registration_number,

    department,

    year,

    college_email,

    phone

  )

  values (

    trim(p_full_name),

    trim(p_college_registration_number),

    trim(p_department),

    trim(p_year),

    lower(trim(p_college_email)),

    trim(p_phone)

  )

  returning

    id,

    registration_id,

    submission_token

  into

    v_participant_id,

    v_registration_id,

    v_submission_token;


  -- ========================================================
  -- INSERT ONE PROGRAMMING SKILL
  -- ========================================================

  insert into public.participant_skills (

    participant_id,

    language,

    rank,

    proficiency

  )

  values (

    v_participant_id,

    v_language,

    1,

    v_proficiency

  );


  -- ========================================================
  -- RETURN REGISTRATION INFORMATION
  -- ========================================================

  return query

  select

    v_participant_id,

    v_registration_id,

    v_submission_token;


exception

  when unique_violation then

    raise exception
      'A participant with this registration number, email, or phone number already exists.';

end;

$$;


-- ============================================================
-- FINALIZE REGISTRATION
--
-- PHOTO IS NO LONGER REQUIRED.
--
-- Only resume is finalized.
-- ============================================================

drop function if exists public.finalize_registration(
  uuid,
  text,
  text
);


create or replace function public.finalize_registration(

  p_submission_token uuid,

  p_photo_path text,

  p_resume_path text

)

returns boolean

language plpgsql

security definer

set search_path = public

as $$

declare

  v_updated integer;

begin


  -- ========================================================
  -- TOKEN VALIDATION
  -- ========================================================

  if p_submission_token is null then

    raise exception
      'Invalid submission token';

  end if;


  -- ========================================================
  -- RESUME IS REQUIRED
  -- ========================================================

  if trim(
    coalesce(
      p_resume_path,
      ''
    )
  ) = '' then

    raise exception
      'Resume path is required';

  end if;


  -- ========================================================
  -- FINALIZE
  --
  -- p_photo_path is intentionally ignored.
  -- It is retained in the function signature so the current
  -- frontend remains compatible.
  -- ========================================================

  update public.participants

  set

    photo_path = null,

    resume_path =
      trim(p_resume_path),

    status =
      'pending',

    updated_at =
      now(),

    submission_token =
      gen_random_uuid()

  where

    submission_token =
      p_submission_token

    and status =
      'uploading';


  get diagnostics
    v_updated = row_count;


  if v_updated <> 1 then

    raise exception
      'Registration could not be finalized';

  end if;


  return true;

end;

$$;


-- ============================================================
-- FUNCTION PERMISSIONS
-- ============================================================

revoke all on function public.register_participant(
  text,
  text,
  text,
  text,
  text,
  text,
  jsonb
)
from public;


grant execute on function public.register_participant(
  text,
  text,
  text,
  text,
  text,
  text,
  jsonb
)
to anon, authenticated;


revoke all on function public.finalize_registration(
  uuid,
  text,
  text
)
from public;


grant execute on function public.finalize_registration(
  uuid,
  text,
  text
)
to anon, authenticated;


grant execute on function public.is_admin()
to authenticated;


-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.participants
enable row level security;


alter table public.participant_skills
enable row level security;


alter table public.admin_users
enable row level security;


-- ============================================================
-- ADMIN USERS POLICY
-- ============================================================

drop policy if exists admin_users_self_select
on public.admin_users;


create policy admin_users_self_select

on public.admin_users

for select

to authenticated

using (

  user_id = auth.uid()

);


-- ============================================================
-- PARTICIPANT ADMIN READ
-- ============================================================

drop policy if exists participants_admin_select
on public.participants;


create policy participants_admin_select

on public.participants

for select

to authenticated

using (

  public.is_admin()

);


-- ============================================================
-- PARTICIPANT ADMIN UPDATE
-- ============================================================

drop policy if exists participants_admin_update
on public.participants;


create policy participants_admin_update

on public.participants

for update

to authenticated

using (

  public.is_admin()

)

with check (

  public.is_admin()

);


-- ============================================================
-- PARTICIPANT SKILLS ADMIN READ
-- ============================================================

drop policy if exists participant_skills_admin_select
on public.participant_skills;


create policy participant_skills_admin_select

on public.participant_skills

for select

to authenticated

using (

  public.is_admin()

);


-- ============================================================
-- STORAGE BUCKETS
-- ============================================================

/*
  PHOTO BUCKET
  ------------------------------------------------------------
  Kept because it may already exist in the Supabase project.

  The new registration flow does NOT upload photos.
*/

insert into storage.buckets (

  id,

  name,

  public,

  file_size_limit,

  allowed_mime_types

)

values (

  'dpl-photos',

  'dpl-photos',

  false,

  2097152,

  array[
    'image/jpeg',
    'image/png',
    'image/webp'
  ]

)

on conflict (id)

do update set

  public =
    excluded.public,

  file_size_limit =
    excluded.file_size_limit,

  allowed_mime_types =
    excluded.allowed_mime_types;


/*
  RESUME BUCKET
*/

insert into storage.buckets (

  id,

  name,

  public,

  file_size_limit,

  allowed_mime_types

)

values (

  'dpl-resumes',

  'dpl-resumes',

  false,

  5242880,

  array[
    'application/pdf'
  ]

)

on conflict (id)

do update set

  public =
    excluded.public,

  file_size_limit =
    excluded.file_size_limit,

  allowed_mime_types =
    excluded.allowed_mime_types;


-- ============================================================
-- STORAGE UPLOAD POLICY
-- ============================================================

drop policy if exists dpl_resumes_public_insert
on storage.objects;


create policy dpl_resumes_public_insert

on storage.objects

for insert

to anon, authenticated

with check (

  bucket_id = 'dpl-resumes'

);


-- ============================================================
-- PHOTO UPLOAD POLICY
--
-- No longer required by the application.
--
-- Remove the old public photo upload policy.
-- ============================================================

drop policy if exists dpl_photos_public_insert
on storage.objects;


-- ============================================================
-- STORAGE ADMIN READ — RESUMES
-- ============================================================

drop policy if exists dpl_resumes_admin_select
on storage.objects;


create policy dpl_resumes_admin_select

on storage.objects

for select

to authenticated

using (

  bucket_id = 'dpl-resumes'

  and public.is_admin()

);


-- ============================================================
-- STORAGE ADMIN READ — PHOTOS
--
-- Kept for any old/existing photo files.
-- ============================================================

drop policy if exists dpl_photos_admin_select
on storage.objects;


create policy dpl_photos_admin_select

on storage.objects

for select

to authenticated

using (

  bucket_id = 'dpl-photos'

  and public.is_admin()

);


-- ============================================================
-- END OF DPL REGISTRATION SCHEMA
-- ============================================================