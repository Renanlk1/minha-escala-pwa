import { createRoot } from 'react-dom/client';
import './maintenance.css';

// Maintenance Screen - No other code is loaded
const MaintenanceScreen = () => (
  <div className="maintenance-container">
    <div className="maintenance-content">
      <div className="maintenance-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </div>
      <h1 className="maintenance-title">Servidor Sobrecarregado</h1>
      <p className="maintenance-text">
        Estamos trabalhando para expandir nossa capacidade devido ao alto volume de acessos. 
        O acesso será restaurado em breve com a nova versão estável.
      </p>
    </div>
    <div className="maintenance-status">
      Status: Migração de Infraestrutura em curso
    </div>
  </div>
);

createRoot(document.getElementById('root')!).render(<MaintenanceScreen />);
