const App = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#1a1a1a', // Fundo cinza escuro (estilo iPhone que você curte)
      color: '#00ff00',           // Texto verde limão para destacar o teste
      fontFamily: 'monospace',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '2rem' }}>⚠️ TESTE DE DEPLOY ⚠️</h1>
      <p style={{ color: '#fff', marginTop: '10px' }}>
        Se você está vendo esta mensagem em verde, o GitHub sincronizou com o Lovable com sucesso.
      </p>
      <div style={{ marginTop: '20px', fontSize: '12px', color: '#888' }}>
        ID do Commit: {Math.random().toString(36).substring(7)}
      </div>
    </div>
  );
};

export default App;
