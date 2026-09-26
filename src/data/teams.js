/* ==========================================================================
   DPL 2026 — TEAMS DATA
   ========================================================================== */

/*
 * Future-ready structure:
 *
 * {
 *   id        — team number
 *   name      — display name (e.g. "TEAM 01")
 *   logo      — null for now; will be a path like "/team-logos/team01.png"
 *   owner     — null for now; will be a string
 *   captain   — null for now; will be a member name string
 *   members   — array of { name, image }
 * }
 *
 * image paths resolve from /public (Vite serves public/ at /).
 * All photos live in /public/team-members/PHOTOS/
 */

const BASE = '/team-members/PHOTOS/'

export const teams = [
  {
    id: 1, name: 'TEAM 01', logo: null, owner: null, captain: null,
    members: [
      { name: 'Priyanka',                  image: BASE + 'Priyanka.A.jpeg' },
      { name: 'Sanjay Joshua Swaminathan', image: BASE + 'Sanjay Joshua Swaminathan.jpg' },
      { name: 'S Siva Sai Ram',            image: BASE + 'S.Siva Sai Ram.jpeg' },
      { name: 'S Shubham',                 image: BASE + 'S SHUBHAM.jpg' },
      { name: 'Akshita Sriraman',          image: BASE + 'Akshita Sriraman.jpeg' },
    ],
  },
  {
    id: 2, name: 'TEAM 02', logo: null, owner: null, captain: null,
    members: [
      { name: 'Adhitya P',    image: BASE + 'Adhithya P.png' },
      { name: 'Ashwin M',     image: BASE + 'ASHWIN M.png' },
      { name: 'Mukilash V K', image: BASE + 'MUKILASH VK.webp' },
      { name: 'Balaji B',     image: BASE + 'Balaji B.png' },
      { name: 'Sivakarthik',  image: BASE + 'SIVAKARTHICK.jpeg' },
    ],
  },
  {
    id: 3, name: 'TEAM 03', logo: null, owner: null, captain: null,
    members: [
      { name: 'Prakash M',           image: BASE + 'Prakash M.png' },
      { name: 'Rohith Soundar',      image: BASE + 'ROHITH SOUNDAR.png' },
      { name: 'Lakshmi Narayanan K', image: BASE + 'LAKSHMI NARAYANAN K.jpg' },
      { name: 'Nithya Siva',         image: BASE + 'Nithya Shiva Thirumalaivarathan.jpeg' },
      { name: 'Ritvik Harigovind B', image: BASE + 'RITVIK HARIGOVIND B.jpg' },
    ],
  },
  {
    id: 4, name: 'TEAM 04', logo: null, owner: null, captain: null,
    members: [
      { name: 'Alagu Manikandan S', image: BASE + 'ALAGU MANIKANDAN S .jpeg' },
      { name: 'Dinesh G',           image: BASE + 'Dinesh G.jpeg' },
      { name: 'Rithic Hitesh B',    image: BASE + 'RITHIC HITESH B.jpg' },
      { name: 'Dharma Dharshan',    image: BASE + 'DHARMA DHARSHAN G.jpeg' },
      { name: 'Chandru',            image: BASE + 'CHANDRU A.jpeg' },
    ],
  },
  {
    id: 5, name: 'TEAM 05', logo: null, owner: null, captain: null,
    members: [
      { name: 'Ajith Kumar G',  image: BASE + 'Ajith Kumar G.jpeg' },
      { name: 'Santhosh AG',    image: BASE + 'SANTHOSH AG.jpeg' },
      { name: 'Raghavendhar R', image: BASE + 'Raghavendhar R.webp' },
      { name: 'Vishal D',       image: BASE + 'VISHAL D.jpg' },
      { name: 'Yeshwanth V',    image: BASE + 'YESHWANTH V .jpg' },
    ],
  },
  {
    id: 6, name: 'TEAM 06', logo: null, owner: null, captain: null,
    members: [
      { name: 'GokulJayandan R S', image: BASE + 'GokulJayandan R S.png' },
      { name: 'Aswin Kumar V',     image: BASE + 'ASWIN KUMAR V.jpg' },
      { name: 'Periathai S',       image: BASE + 'Periathai.jpg' },
      { name: 'Rajeshwari B C',    image: BASE + 'RAJESHWARI B C.jpeg' },
      { name: 'Nithiyanandam S',   image: BASE + 'NITHIYANANDAM S.jpeg' },
    ],
  },
  {
    id: 7, name: 'TEAM 07', logo: null, owner: null, captain: null,
    members: [
      { name: 'Kausik T',     image: BASE + 'Kausik T.jpg' },
      { name: 'Gokul M',      image: BASE + 'Gokul M.jpeg' },
      { name: 'Bharath P',    image: BASE + 'BHARATH P.jpg' },
      { name: 'Bivin Kanth V', image: BASE + 'BIVIN KANTH V.jpg' },
      { name: 'Sitharth',     image: BASE + 'SITHARTH A .jpg' },
    ],
  },
  {
    id: 8, name: 'TEAM 08', logo: null, owner: null, captain: null,
    members: [
      { name: 'Dawan Babu',     image: BASE + 'Dawan Babu K.jpg' },
      { name: 'Srivikasini V',  image: BASE + 'SRIVIKASINI.V.jpeg' },
      { name: 'Teejaas K',      image: BASE + 'TEEJAS K.jpeg' },
      { name: 'Akash',          image: BASE + 'AKASH V.jpeg' },
      { name: 'K Buvaneswaran', image: BASE + 'K BUVANESWARAN.jpg' },
    ],
  },
  {
    id: 9, name: 'TEAM 09', logo: null, owner: null, captain: null,
    members: [
      { name: 'Kiran Raj M',             image: BASE + 'kiranraj.jpeg' },
      { name: 'Balakrishnan R',           image: BASE + 'BALAKRISHNAN R.png' },
      { name: 'Aravindrajan A',           image: BASE + 'ARAVINDRAJAN A.jpeg' },
      { name: 'K Utkarsh Sai Sidhardh',  image: BASE + 'UTKARSH SAI SIDHARDH K.jpg' },
      { name: 'Allen Jones',              image: BASE + 'ALLEN JONES T .jpg' },
    ],
  },
  {
    id: 10, name: 'TEAM 10', logo: null, owner: null, captain: null,
    members: [
      { name: 'Hasini J',              image: BASE + 'Hasini J.jpg' },
      { name: 'Bhuvaneshwaran B',      image: BASE + 'BHUVANESHWARAN B.jpeg' },
      { name: 'Hari Prasath Y',        image: BASE + 'HARI PRASATH Y.jpg' },
      { name: 'Rothiram JV',           image: BASE + 'Rohit Ram JV.jpg' },
      { name: 'Jai Krishna Prasath D', image: BASE + 'Jai Krishna Prasath D.jpg' },
    ],
  },
]
