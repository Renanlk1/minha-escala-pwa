

# Força Limpeza de Cache PWA

## Objetivo
Adicionar um script no `index.html` que força a limpeza de service workers antigos e garante que a nova tela de manutenção seja exibida imediatamente.

---

## O que será feito

### Modificar `index.html`
Adicionar um script dentro da tag `<head>` que:

1. **Remove todos os Service Workers registrados** - Isso força o navegador a esquecer versões cacheadas do app
2. **Valida o conteúdo carregado** - Se a tela de manutenção não aparecer, força um reload

---

## Código a ser adicionado

```html
<script>
  // Força a limpeza de caches antigos do PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }
  
  // Se o site carregar e não for a tela de manutenção, força um reload
  window.onload = function() {
    if (!document.body.innerText.includes("Servidor Sobrecarregado")) {
      location.reload(true);
    }
  };
</script>
```

---

## Localização no arquivo

O script será inserido dentro da tag `<head>`, logo após as meta tags existentes e antes do fechamento do `</head>`.

---

## Resultado esperado

| Comportamento | Descrição |
|---------------|-----------|
| Primeiro acesso | Remove qualquer service worker antigo registrado |
| Cache persistente | Usuários com versão antiga terão o cache limpo |
| Validação | Se por algum motivo a tela antiga aparecer, força reload |
| Navegadores sem SW | Script ignora graciosamente |

---

## Observação importante

Depois que a manutenção terminar e você quiser restaurar o app original, será necessário **remover este script** do `index.html`, pois ele está desabilitando permanentemente o Service Worker (que é necessário para o PWA funcionar offline e ser instalável).

