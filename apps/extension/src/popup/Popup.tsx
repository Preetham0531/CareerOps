/**
 * Popup — 320×480.
 * Shows today's matches summary + on-this-page status + quick actions.
 * Day 7 ships the architecture; sprint-2 wires real auth + content detection.
 */
export function Popup() {
  const onThisPage = false; // sprint-2: query content script for detected JD

  return (
    <main style={{ padding: 16 }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <strong style={{ fontSize: 18, fontFamily: 'Fraunces, serif' }}>CareerOps</strong>
        <a
          href="https://careerops.in/dashboard"
          target="_blank"
          rel="noreferrer"
          style={{ color: '#14998D', fontSize: 12 }}
        >
          Sign in
        </a>
      </header>

      <section
        style={{
          padding: 12,
          borderRadius: 8,
          background: 'rgba(20,153,141,0.12)',
          marginBottom: 12,
        }}
      >
        <p style={{ margin: 0, fontSize: 13 }}>
          <strong style={{ fontWeight: 600 }}>5 strong matches today.</strong>
          <br />2 referrers waiting on you.
        </p>
        <a
          href="https://careerops.in/dashboard"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-block',
            marginTop: 8,
            background: '#14998D',
            color: '#07201F',
            textDecoration: 'none',
            padding: '6px 12px',
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          Open dashboard
        </a>
      </section>

      <section style={{ padding: 12, border: '1px solid #25241F', borderRadius: 8 }}>
        <p style={{ margin: 0, fontSize: 12, color: '#9C9890', textTransform: 'uppercase' }}>
          On this page
        </p>
        <p style={{ margin: '4px 0 0', fontSize: 13 }}>
          {onThisPage ? 'Razorpay · Senior Backend' : 'No job detected here'}
        </p>
      </section>

      <section style={{ marginTop: 16 }}>
        <p
          style={{
            margin: 0,
            fontSize: 12,
            color: '#9C9890',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          Quick actions
        </p>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
          <li>
            <button style={btnStyle()} type="button">
              Save this listing
            </button>
          </li>
          <li>
            <button style={btnStyle()} type="button">
              Find referrers
            </button>
          </li>
          <li>
            <button style={btnStyle()} type="button">
              Tailor CV for this
            </button>
          </li>
        </ul>
      </section>

      <footer style={{ marginTop: 24, fontSize: 11, color: '#6F6B62' }}>
        v0.0.1 · open settings via extension options
      </footer>
    </main>
  );
}

function btnStyle(): React.CSSProperties {
  return {
    width: '100%',
    padding: '8px 10px',
    borderRadius: 6,
    background: 'transparent',
    color: '#F2F1ED',
    border: '1px solid #25241F',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: 13,
  };
}
