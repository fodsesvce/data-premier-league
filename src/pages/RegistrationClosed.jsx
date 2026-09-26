export default function RegistrationClosed() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: '#05070b',
        color: '#ffffff',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '650px',
          padding: '48px 32px',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          borderRadius: '20px',
          background:
            'linear-gradient(145deg, #0d111b, #080a0f)',
          boxShadow:
            '0 30px 100px rgba(0, 0, 0, 0.55)',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: '#38bdf8',
            marginBottom: '18px',
          }}
        >
          DATA PREMIER LEAGUE
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: 'clamp(34px, 7vw, 58px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
          }}
        >
          REGISTRATION CLOSED
        </h1>

        <p
          style={{
            marginTop: '24px',
            marginBottom: '0',
            fontSize: '17px',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.68)',
          }}
        >
          Thank you for the overwhelming response to
          the Data Premier League.
        </p>

        <p
          style={{
            marginTop: '10px',
            marginBottom: '0',
            fontSize: '15px',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.52)',
          }}
        >
          Registrations are currently closed as we have
          reached our participation capacity.
        </p>

        <div
          style={{
            marginTop: '32px',
            paddingTop: '24px',
            borderTop:
              '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.42)',
          }}
        >
          Please stay tuned for further updates.
        </div>
      </div>
    </div>
  )
}