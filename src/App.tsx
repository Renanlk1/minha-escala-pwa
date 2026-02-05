const App = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#000000', 
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div style={{ fontSize: '40px', marginBottom: '20px' }}>⚙️</div>
      <h1 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '12px' }}>
        Servidor Sobrecarregado
      </h1>
      <p style={{ color: '#8e8e93', fontSize: '16px', maxWidth: '320px', lineHeight: '1.4' }}>
        Devido ao alto volume de acessos, estamos em manutenção para expandir nossa capacidade. Voltaremos em breve com novidades.
      </p>
      <div style={{ 
        marginTop: '30px', 
        padding: '8px 16px', 
        borderRadius: '20px', 
        backgroundColor: '#1c1c1e', 
        fontSize: '13px', 
        color: '#0a84ff',
        fontWeight: '500'
      }}>
        Status: Manutenção Emergencial
      </div>
    </div>
  );
};

export default App;
