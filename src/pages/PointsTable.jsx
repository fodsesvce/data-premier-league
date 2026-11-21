
const teams = [
  {
    name: "Melbourne Tech Stars",
    logo: "/team-logos/team-01-melbourne-tech-stars.png",
    played: 0,
    won: 0,
    loss: 0,
    points: 0,
    last3: ["-", "-", "-"],
  },
  {
    name: "Newcastle Network Blazers",
    logo: "/team-logos/team-10-newcastle-network-blazers.png",
    played: 0,
    won: 0,
    loss: 0,
    points: 0,
    last3: ["-", "-", "-"],
  },
  {
    name: "Canberra Code Comets",
    logo: "/team-logos/team-02-canberra-code-comets.png",
    played: 0,
    won: 0,
    loss: 0,
    points: 0,
    last3: ["-", "-", "-"],
  },
  {
    name: "Perth Pixel Scorchers",
    logo: "/team-logos/team-09-perth-pixel-scorchers.png",
    played: 0,
    won: 0,
    loss: 0,
    points: 0,
    last3: ["-", "-", "-"],
  },
  {
    name: "Townsville Tech Titans",
    logo: "/team-logos/team-03-townsville-tech-titans.png",
    played: 0,
    won: 0,
    loss: 0,
    points: 0,
    last3: ["-", "-", "-"],
  },
  {
    name: "Brisbane byte heat",
    logo: "/team-logos/team-08-brisbane-byte-heat.png",
    played: 0,
    won: 0,
    loss: 0,
    points: 0,
    last3: ["-", "-", "-"],
  },
  {
    name: "Sydney Cloud Thunder",
    logo: "/team-logos/team-04-sydney-cloud-thunder.png",
    played: 0,
    won: 0,
    loss: 0,
    points: 0,
    last3: ["-", "-", "-"],
  },
  {
    name: "Geelong GenAI Chargers",
    logo: "/team-logos/team-07-geelong-genai-chargers.png",
    played: 0,
    won: 0,
    loss: 0,
    points: 0,
    last3: ["-", "-", "-"],
  },
  {
    name: "Darwin Data Cyclones",
    logo: "/team-logos/team-05-darwin-data-cyclones.png",
    played: 0,
    won: 0,
    loss: 0,
    points: 0,
    last3: ["-", "-", "-"],
  },
  {
    name: "Sydney Silicon Sixers",
    logo: "/team-logos/team-06-sydney-silicon-sixers.png",
    played: 0,
    won: 0,
    loss: 0,
    points: 0,
    last3: ["-", "-", "-"],
  },
]

export default function PointsTable() {
  return (
    <main className="points-page">
      <div className="points-container">

        <div className="points-heading">
          <div>
            <span className="points-eyebrow">DPL 2026</span>
            <h1>POINTS TABLE</h1>
            <p>League Stage · Tournament Standings</p>
          </div>

          <div className="points-season">2026</div>
        </div>

        <div className="points-table-wrapper">
          <table className="points-table">

            <thead>
              <tr>
                <th className="position-column">#</th>
                <th className="team-column">Team</th>
                <th>Played</th>
                <th>Won</th>
                <th>Loss</th>
                <th className="pts-column">Pts</th>
                <th>Last 3</th>
              </tr>
            </thead>

            <tbody>
              {teams.map((team, index) => (
                <tr key={team.name}>

                  <td className="position-column">
                    {index + 1}
                  </td>

                  <td className="team-column">
                    <div className="points-team">
                      <img
                        src={team.logo}
                        alt={`${team.name} logo`}
                        className="points-team-logo"
                      />
                      <span>{team.name}</span>
                    </div>
                  </td>

                  <td>{team.played}</td>
                  <td>{team.won}</td>
                  <td>{team.loss}</td>

                  <td className="pts-column">
                    <strong>{team.points}</strong>
                  </td>

                  <td>
                    <div className="last-three">
                      {team.last3.map((result, i) => (
                        <span
                          key={i}
                          className={`result-indicator ${
                            result === "W"
                              ? "result-win"
                              : result === "L"
                              ? "result-loss"
                              : "result-pending"
                          }`}
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

        <div className="points-legend">
          <span><b>P</b> Played</span>
          <span><b>W</b> Won</span>
          <span><b>L</b> Loss</span>
          <span><b>Pts</b> Points</span>
          <span><b>Last 3</b> Recent match results</span>
        </div>

        <div className="points-result-legend">
          <span><i className="legend-dot win-dot"></i> Won</span>
          <span><i className="legend-dot loss-dot"></i> Lost</span>
          <span><i className="legend-dot pending-dot"></i> Yet to play</span>
        </div>

      </div>
    </main>
  )
}
