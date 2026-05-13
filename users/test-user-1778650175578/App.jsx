
function App() {
  return (
    <div style={{
      padding: '40px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1>🚀 Test Portfolio from Vercel!</h1>
      <p>This portfolio was deployed successfully!</p>
      <p>Generated at: {new Date().toLocaleString()}</p>
    </div>
  );
}