const App = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#1a1a1a', // Fundo cinza escuro
      color: '#00ff00',           // Texto verde limão
      fontFamily: 'monospace',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '2rem' }}>⚠️ MINHA ESCALA ⚠️</h1>
      <p style={{ color: '#fff', marginTop: '10px' }}>
        Sistema em manutenção programada para atualização de infraestrutura.
      </p>
      <div style={{ marginTop: '20px', fontSize: '12px', color: '#888' }}>
        Versão: 2.0.0
      </div>
    </div>
  );
};

export default App;

export default App;
