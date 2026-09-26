// Central Event Configuration & Rich Factual Content for DPL
// DPL = Data Premier League
//
// IMPORTANT:
// - DPL is the main event.
// - Participants register individually.
// - EVERY registered participant enters the DPL auction.
// - There is NO resume/skills-based shortlisting stage.
// - Team organizers select participants through the auction.
// - 10 teams are formed with 5 participants per team.
// - Participants then compete together in the online DPL league.
// - The top 4 teams advance to the knockouts.
// - The competition concludes with a winner and runner-up.
//
// No unconfirmed dates, prize amounts, scores, match counts,
// or exact knockout bracket details are invented.


// =========================================================
// EVENT CONFIGURATION
// =========================================================

export const event = {
  name: 'DATA PREMIER LEAGUE',
  shortName: 'DPL',

  primaryTagline:
    'REGISTER. ENTER THE AUCTION. GET PICKED. PLAY TO WIN.',

  secondaryTagline:
    'WHERE DATA, SKILL, SPEED & TEAMWORK COLLIDE.',

  description:
    'Data Premier League (DPL) is a cricket-themed technical competition where participants register individually, enter the DPL auction, get picked by team organizers, form five-member teams with new teammates, and compete together through an online technical league.',

  edition: 'DATA PREMIER LEAGUE',

  // Registration is now handled by the website itself.
  registrationUrl: '/register',

  email: 'contact@dplauction.com',

  social: {
    instagram:
      'https://www.instagram.com/fodse_svce/',

    linkedin:
      'https://www.linkedin.com/in/the-forum-of-data-science-engineers-b37716291/',
  },
}


// =========================================================
// HOME PAGE INTRO
// =========================================================
// These cards introduce DPL from the PARTICIPANT'S point of view.

export const homeIntroCards = [
  {
    num: '01',
    label: 'STEP 01 // REGISTER',
    title: 'Enter DPL Individually',

    desc:
      'Your DPL journey starts with you. Register individually and secure your place in the DPL participant pool.',
  },

  {
    num: '02',
    label: 'STEP 02 // AUCTION',
    title: 'Step Into the Auction',

    desc:
      'Every registered participant enters the DPL auction, where team organizers compete to pick the players they want in their squad.',
  },

  {
    num: '03',
    label: 'STEP 03 // COMPETE',
    title: 'Get Picked. Play Together.',

    desc:
      'Once picked, you join a five-member team with participants you may have never worked with before. Collaborate, compete, and fight your way through the league.',
  },
]


// =========================================================
// ABOUT SECTION
// =========================================================
// The About section explains DPL through the participant experience.

export const aboutSections = [
  {
    num: '01',
    kicker: 'YOUR ENTRY',

    headline:
      'YOUR DPL JOURNEY STARTS WITH INDIVIDUAL REGISTRATION',

    lead:
      'You enter DPL as an individual participant.',

    details:
      'Register for the competition and become part of the DPL participant pool. There is no resume-based shortlisting stage — every registered participant moves forward into the auction process.',
  },

  {
    num: '02',
    kicker: 'YOUR AUCTION',

    headline:
      'STEP INTO THE AUCTION AND WAIT FOR YOUR TEAM TO PICK YOU',

    lead:
      'The auction is where your team journey begins.',

    details:
      'Every registered participant enters the DPL auction. Ten team organizers build their squads by selecting participants, giving you the chance to become part of a team you did not choose yourself.',
  },

  {
    num: '03',
    kicker: 'YOUR BATTLE',

    headline:
      'GET PICKED. COLLABORATE. COMPETE. FIGHT FOR THE TITLE.',

    lead:
      'The real DPL experience begins after the auction.',

    details:
      'You become part of a five-member team and collaborate with your new teammates throughout the online technical league. Teams battle through data, coding, problem-solving, and other technical challenges, with the top four advancing to the knockouts.',
  },
]


// =========================================================
// ABOUT SECTION PILLARS
// =========================================================
// These pillars describe what participants experience.

export const aboutPillars = [
  {
    icon: 'target',
    tag: 'YOUR START',

    title: 'ENTER THE COMPETITION',

    desc:
      'Register individually and become part of the DPL participant pool. Your journey starts before you know which team you will represent.',
  },

  {
    icon: 'users',
    tag: 'YOUR AUCTION',

    title: 'GET PICKED BY A TEAM',

    desc:
      'Every registered participant enters the auction, where ten team organizers select the players who will represent their teams.',
  },

  {
    icon: 'trophy',
    tag: 'YOUR TEAM',

    title: 'PLAY WITH NEW PEOPLE',

    desc:
      'Join a five-member squad and collaborate with participants who may be completely new to you. Teamwork becomes part of the challenge.',
  },

  {
    icon: 'shield',
    tag: 'YOUR CHALLENGE',

    title: 'COMPETE FAIRLY',

    desc:
      'Follow the DPL competition rules, respect your teammates and opponents, and compete with integrity throughout the league and knockouts.',
  },
]


// =========================================================
// WHY PARTICIPATE
// =========================================================
// Participant-centric reasons to enter DPL.

export const whyBenefits = [
  {
    num: '01',

    title: 'ENTER',

    subtitle:
      'START YOUR JOURNEY AS AN INDIVIDUAL',

    description:
      'Register individually and step into a competition where your next move is shaped by the auction. You enter DPL without knowing which team you will eventually represent.',

    tag: 'YOUR ENTRY',
  },

  {
    num: '02',

    title: 'GET PICKED',

    subtitle:
      'STEP INTO THE DPL AUCTION',

    description:
      'Every registered participant enters the auction. Ten team organizers select participants to build their squads, putting you directly into the heart of the team-formation experience.',

    tag: 'THE AUCTION',
  },

  {
    num: '03',

    title: 'COLLABORATE',

    subtitle:
      'BUILD CHEMISTRY WITH YOUR NEW TEAM',

    description:
      'Get placed into a five-member team and work with participants you may not have met before. Learn how to communicate, divide problems, combine strengths, and perform together.',

    tag: 'YOUR TEAM',
  },

  {
    num: '04',

    title: 'BATTLE',

    subtitle:
      'TAKE YOUR TEAM TOWARDS THE TITLE',

    description:
      'Compete together in the online technical league, fight through the competition, aim for the top four, and continue into the knockouts for a chance to finish as DPL winner or runner-up.',

    tag: 'THE LEAGUE',
  },
]


// =========================================================
// EVENT FLOW
// =========================================================
// Complete participant journey.
//
// Registration is the START.
// Winner & Runner-up are the FINISH.
//
// There is intentionally NO shortlisting stage.

export const eventFlow = [
  {
    phase: '01',
    label: 'REGISTRATION',

    title: 'Register Individually',

    desc:
      'Enter DPL as an individual participant and secure your place in the competition.',
  },

  {
    phase: '02',
    label: 'AUCTION',

    title: 'Enter the DPL Auction',

    desc:
      'Every registered participant enters the auction, where the ten team organizers select participants for their squads.',
  },

  {
    phase: '03',
    label: 'TEAM PICK',

    title: 'Get Picked by a Team',

    desc:
      'Become one of the five participants selected by a team organizer and discover the teammates you will compete with.',
  },

  {
    phase: '04',
    label: 'TEAM FORMATION',

    title: 'Build Chemistry',

    desc:
      'Work with your new teammates, combine different strengths, and prepare to compete together as a five-member DPL team.',
  },

  {
    phase: '05',
    label: 'LEAGUE',

    title: 'Enter the Main DPL',

    desc:
      'Compete online with your team through data, coding, problem-solving, and other technical activities.',
  },

  {
    phase: '06',
    label: 'TOP 4',

    title: 'Reach the Knockouts',

    desc:
      'Fight through the league and finish among the four strongest teams to earn a place in the knockout stage.',
  },

  {
    phase: '07',
    label: 'KNOCKOUTS',

    title: 'Fight for the Championship',

    desc:
      'Take your team into the knockout stage and compete for the chance to reach the top of DPL.',
  },

  {
    phase: '08',
    label: 'FINALS',

    title: 'Winner & Runner-up',

    desc:
      'The DPL journey reaches its final outcome as the competition recognizes the winner and runner-up.',
  },
]


// =========================================================
// SCHEDULE PHASES
// =========================================================
// Roadmap used by the Schedule component.
//
// Order:
// Registration → Auction → Team Formation → League
// → Top 4 → Knockouts → Winner & Runner-up
//
// No fabricated exact dates or match counts.

export const schedulePhases = [
  {
    phase: '01',

    status: 'PHASE 01',

    badge: 'REGISTRATION',

    title: 'Register Individually',

    desc:
      'Start your DPL journey by registering individually and entering the participant pool.',

    timing: 'START HERE',
  },

  {
    phase: '02',

    status: 'PHASE 02',

    badge: 'AUCTION',

    title: 'Enter the DPL Auction',

    desc:
      'Every registered participant enters the auction as team organizers compete to select their players.',

    timing: 'AUCTION STAGE',
  },

  {
    phase: '03',

    status: 'PHASE 03',

    badge: 'TEAM FORMATION',

    title: 'Get Picked. Form Your Team.',

    desc:
      'Join one of the ten teams. Each team is formed with five participants selected through the auction.',

    timing: 'TEAM FORMATION',
  },

  {
    phase: '04',

    status: 'PHASE 04',

    badge: 'LEAGUE',

    title: 'The Main DPL Begins',

    desc:
      'Compete online with your newly formed team through technical activities involving data, coding, problem-solving, and more.',

    timing: 'AROUND THE SECOND WEEK OF NOVEMBER',
  },

  {
    phase: '05',

    status: 'PHASE 05',

    badge: 'TOP 4',

    title: 'Make the Top Four',

    desc:
      'Push your team through the league and aim for a top-four finish to qualify for the knockout stage.',

    timing: 'POST-LEAGUE STAGE',
  },

  {
    phase: '06',

    status: 'PHASE 06',

    badge: 'KNOCKOUTS',

    title: 'Fight for the Championship',

    desc:
      'The top four teams continue into the knockout stage, where every technical challenge matters even more.',

    timing: 'KNOCKOUT STAGE',
  },

  {
    phase: '07',

    status: 'PHASE 07',

    badge: 'FINALS',

    title: 'Winner & Runner-up',

    desc:
      'The DPL journey reaches its final destination with the winner and runner-up being recognized.',

    timing: 'FINAL OUTCOME',
  },
]


// =========================================================
// TECHNICAL CHALLENGES
// =========================================================
// These challenge areas are represented in the supplied
// DPL rulebook. Additional challenge types should only be
// added when confirmed by the organizers.

export const technicalChallenges = [
  {
    icon: 'code',

    label: 'CODING',

    title: 'Coding Challenges',

    desc:
      'Solve technical programming challenges together with your team within the rules and time limits of the competition.',
  },

  {
    icon: 'database',

    label: 'SQL',

    title: 'SQL Challenges',

    desc:
      'Use your data and SQL skills to solve problems and contribute to your team performance.',
  },

  {
    icon: 'table',

    label: 'EXCEL',

    title: 'Excel Challenges',

    desc:
      'Apply spreadsheet, analysis, and data-handling skills to technical competition challenges.',
  },

  {
    icon: 'bug',

    label: 'DEBUGGING',

    title: 'Debugging',

    desc:
      'Identify and solve technical problems while working under competition conditions and time pressure.',
  },

  {
    icon: 'terminal',

    label: 'OUTPUT',

    title: 'Output Prediction',

    desc:
      'Analyze code and logic, predict expected outputs, and help your team secure valuable points.',
  },
]


// =========================================================
// COMPETITION STRUCTURE
// =========================================================
// Participant/team progression from formation to championship.

export const competitionStages = [
  {
    num: '01',

    title: 'AUCTION',

    desc:
      'Every registered participant enters the DPL auction, where ten team organizers select the players who will represent their teams.',
  },

  {
    num: '02',

    title: 'TEAM FORMATION',

    desc:
      'The selected participants come together to form ten five-member teams and begin working with their new teammates.',
  },

  {
    num: '03',

    title: 'LEAGUE STAGE',

    desc:
      'Teams compete online through technical challenges involving data, coding, problem-solving, and other competition activities.',
  },

  {
    num: '04',

    title: 'TOP 4',

    desc:
      'The four strongest teams from the league stage advance to the knockout stage.',
  },

  {
    num: '05',

    title: 'CHAMPIONSHIP',

    desc:
      'The knockout journey determines the DPL winner and runner-up.',
  },
]


// =========================================================
// RULES HIGHLIGHTS
// =========================================================
// High-level website-friendly rules.
// Full rules should remain available through the complete
// rulebook rather than reproducing every clause here.

export const rulesHighlights = [
  {
    icon: 'clipboard',

    title: 'Registration',

    desc:
      'Registration is mandatory for participation in DPL.',
  },

  {
    icon: 'monitor',

    title: 'Online Participation',

    desc:
      'Participants must join the designated online platform on time with the required device and a stable internet connection.',
  },

  {
    icon: 'users',

    title: 'Team Discipline',

    desc:
      'Once selected through the auction, participants compete with their registered DPL team.',
  },

  {
    icon: 'clock',

    title: 'Time Limits',

    desc:
      'Each challenge must be completed within the specified time limit. Late submissions are not accepted.',
  },

  {
    icon: 'target',

    title: 'Scoring',

    desc:
      'Points are based on factors including correctness, speed, and challenge difficulty.',
  },

  {
    icon: 'shield',

    title: 'Fair Play',

    desc:
      'Plagiarism, unauthorized resources, unauthorized communication, and external assistance are prohibited.',
  },

  {
    icon: 'cpu',

    title: 'AI Restrictions',

    desc:
      'AI assistance such as ChatGPT, Gemini, GitHub Copilot, and similar tools is prohibited unless explicitly permitted for a particular match.',
  },

  {
    icon: 'zap',

    title: 'PowerPlay',

    desc:
      'PowerPlay usage follows the rules announced by the organizers for the relevant match.',
  },
]