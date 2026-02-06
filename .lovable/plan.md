
# Plano: Resolver Tela de Manutenção Persistente

## Diagnóstico

Identifiquei o problema! O código no projeto ja esta correto:
- `src/main.tsx` importa o App normalmente
- `src/App.tsx` renderiza o Index corretamente
- `src/maintenance.css` foi deletado
- Nenhuma referencia a "Servidor Sobrecarregado" existe no codigo

**O problema esta na versao PUBLICADA do app, nao no codigo.**

A preview esta funcionando perfeitamente (mostrando o calendario), mas voce esta vendo a tela de manutencao porque:

1. A versao publicada (`minha-escala-pwa.lovable.app`) ainda tem o codigo antigo
2. O Service Worker do PWA esta armazenando a tela de manutencao em cache no seu celular

## Solucao

### Passo 1: Publicar a Atualizacao
- Clique no botao **"Publish"** (ou "Publicar") no Lovable para enviar as alteracoes para producao
- Isso vai substituir o codigo da tela de manutencao pelo codigo do calendario

### Passo 2: Limpar Cache no Celular
Como voce instalou o PWA, o Service Worker armazena os arquivos em cache. Para resolver:

**No iPhone:**
1. Desinstale o app (segure o icone > deletar)
2. Abra o Safari e va para `minha-escala-pwa.lovable.app`
3. Aguarde a nova versao carregar
4. Reinstale o PWA

**No Android:**
1. Desinstale o app
2. Abra o Chrome e va para `minha-escala-pwa.lovable.app`  
3. Limpe os dados do site (Configuracoes > Sites > Limpar dados)
4. Reinstale o PWA

### Por que isso aconteceu?
Quando criamos a tela de manutencao, ela foi publicada e instalada no seu celular. Mesmo depois de reverter o codigo, a versao publicada continua a mesma ate voce clicar em "Publish" novamente.

## Resumo das Acoes
| Acao | Responsavel |
|------|-------------|
| Publicar atualizacao | Usuario (clique em Publish) |
| Desinstalar PWA antigo | Usuario (no celular) |
| Reinstalar PWA | Usuario (apos republicar) |

Nao ha alteracoes de codigo necessarias - o codigo ja esta correto!
