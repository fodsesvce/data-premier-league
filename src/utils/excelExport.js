import * as XLSX from 'xlsx'

export function exportParticipantsToExcel(
  participants
) {

  const rows =
    participants.map(
      (participant) => {

        const skills =
          [
            ...(participant.participant_skills || []),
          ]
            .sort(
              (a, b) =>
                (a.rank ?? 999) -
                (b.rank ?? 999)
            )

        const ranked =
          skills
            .filter(
              (skill) =>
                skill.rank !== null
            )
            .map(
              (skill) =>
                `${skill.rank}. ${skill.language}`
            )
            .join(' | ')

        const proficiency =
          skills.find(
            (skill) =>
              skill.rank === 1
          )?.proficiency || ''


        const otherLanguages =
          skills
            .filter(
              (skill) =>
                skill.rank === null
            )
            .map(
              (skill) =>
                skill.language
            )
            .join(', ')


        return {
          'DPL Registration ID':
            participant.registration_id,

          'Full Name':
            participant.full_name,

          'College Registration Number':
            participant.college_registration_number,

          'Department':
            participant.department,

          'Year':
            participant.year,

          'College Email':
            participant.college_email,

          'Phone':
            participant.phone,

          'Ranked Programming Languages':
            ranked,

          'Most Comfortable Language Proficiency':
            proficiency,

          'Other Programming Languages':
            otherLanguages,

          'Status':
            participant.status,

          'Registered At':
            new Date(
              participant.created_at
            ).toLocaleString(),

          'Photo Storage Path':
            participant.photo_path || '',

          'Resume Storage Path':
            participant.resume_path || '',
        }
      }
    )


  const worksheet =
    XLSX.utils.json_to_sheet(
      rows
    )


  const workbook =
    XLSX.utils.book_new()


  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    'Participants'
  )


  const columnWidths = [
    22,
    24,
    28,
    14,
    14,
    32,
    16,
    48,
    28,
    35,
    14,
    24,
    50,
    50,
  ]


  worksheet['!cols'] =
    columnWidths.map(
      (width) => ({
        wch: width,
      })
    )


  const date =
    new Date()
      .toISOString()
      .slice(0, 10)


  XLSX.writeFile(
    workbook,
    `DPL_Participants_${date}.xlsx`
  )
}