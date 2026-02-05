
# Tela de Manutenção - Servidor Sobrecarregado

## Objetivo
Substituir toda a interface atual por uma tela de manutenção estática, segura e profissional.

---

## O que será feito

### 1. Modificar `src/main.tsx`
O ponto de entrada será simplificado para renderizar apenas a tela de manutenção diretamente, sem importar nenhum componente externo (App, rotas, etc.).

### 2. Design da Tela

```text
┌─────────────────────────────────────────┐
│                                         │
│                                         │
│              ⚠️ (ícone)                 │
│                                         │
│      Servidor Sobrecarregado            │
│           (branco, negrito)             │
│                                         │
│   Estamos trabalhando para expandir     │
│   nossa capacidade devido ao alto       │
│   volume de acessos. O acesso será      │
│   restaurado em breve com a nova        │
│   versão estável.                       │
│            (cinza #8E8E93)              │
│                                         │
│                                         │
│                                         │
│ Status: Migração de Infraestrutura      │
│         em curso (#0A84FF)              │
└─────────────────────────────────────────┘
```

### 3. Especificações Técnicas

| Propriedade | Valor |
|-------------|-------|
| Fundo | Pure Black `#000000` |
| Título | Branco `#FFFFFF`, negrito |
| Texto explicativo | Cinza `#8E8E93` |
| Status | Azul `#0A84FF` |
| Fonte | Inter (já carregada no CSS) |
| Dimensões | `100vw` x `100vh` fixos |
| Scroll | Desabilitado (`overflow: hidden`) |
| Pointer events | `none` no fundo |

### 4. Segurança
- **Nenhum código antigo será importado** - o `main.tsx` renderizará JSX inline
- **App.tsx não será carregado** - evita inspeção do código da escala
- **Sem rotas** - não haverá React Router

---

## Detalhes Técnicos

### Arquivo: `src/main.tsx`

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div style={{ 
      backgroundColor: '#000000',
      color: '#FFFFFF',
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      textAlign: 'center',
      padding: '24px',
      boxSizing: 'border-box',
      overflow: 'hidden',
      userSelect: 'none',
    }}>
      {/* Ícone de Alerta */}
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" 
           stroke="#FFFFFF" strokeWidth="1.5">
        <path d="M12 9v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
      </svg>
      
      {/* Título */}
      <h1 style={{ 
        fontSize: '1.75rem', 
        fontWeight: 700, 
        marginTop: '24px',
        marginBottom: '16px',
        letterSpacing: '-0.02em'
      }}>
        Servidor Sobrecarregado
      </h1>
      
      {/* Texto explicativo */}
      <p style={{ 
        color: '#8E8E93', 
        fontSize: '1rem',
        lineHeight: 1.6,
        maxWidth: '320px',
        margin: 0
      }}>
        Estamos trabalhando para expandir nossa capacidade 
        devido ao alto volume de acessos. O acesso será 
        restaurado em breve com a nova versão estável.
      </p>
      
      {/* Status na base */}
      <p style={{ 
        position: 'absolute',
        bottom: '32px',
        color: '#0A84FF',
        fontSize: '0.875rem',
        fontWeight: 500
      }}>
        Status: Migração de Infraestrutura em curso
      </p>
    </div>
  </React.StrictMode>
)
```

---

## Resultado
- Tela 100% estática e "inquebrável"
- Nenhum componente antigo carregado
- Visual premium estilo Apple/iOS
- Código da escala inacessível via inspeção
