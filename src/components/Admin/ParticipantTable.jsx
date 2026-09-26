export default function ParticipantTable({
  participants,
  onSelect,
}) {

  if (!participants.length) {

    return (
      <div className="admin-empty">
        <strong>
          NO PARTICIPANTS FOUND
        </strong>

        <span>
          Try changing your search or filters.
        </span>
      </div>
    )
  }


  return (
    <div className="admin-table-wrapper">

      <table className="admin-table">

        <thead>

          <tr>

            <th>
              DPL ID
            </th>

            <th>
              PARTICIPANT
            </th>

            <th>
              DEPT
            </th>

            <th>
              YEAR
            </th>

            <th>
              EMAIL
            </th>

            <th>
              STATUS
            </th>

            <th>
              VIEW
            </th>

          </tr>

        </thead>


        <tbody>

          {participants.map(
            (participant) => (
              <tr
                key={
                  participant.id
                }
              >

                <td>
                  <strong className="admin-table-id">
                    {
                      participant.registration_id
                    }
                  </strong>
                </td>


                <td>
                  <strong>
                    {
                      participant.full_name
                    }
                  </strong>

                  <small>
                    {
                      participant
                        .college_registration_number
                    }
                  </small>
                </td>


                <td>
                  {
                    participant.department
                  }
                </td>


                <td>
                  {
                    participant.year
                  }
                </td>


                <td>
                  {
                    participant
                      .college_email
                  }
                </td>


                <td>

                  <span
                    className={`admin-status admin-status-${participant.status}`}
                  >
                    {
                      participant.status
                    }
                  </span>

                </td>


                <td>

                  <button
                    type="button"
                    className="admin-view-button"
                    onClick={() =>
                      onSelect(
                        participant
                      )
                    }
                  >
                    VIEW →
                  </button>

                </td>

              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  )
}