# 8 Meses de Nós 💫

Um site interativo em 9 capítulos, pensado como uma pequena aventura romântica.

## Como personalizar

Você só precisa editar **um arquivo**: `js/config.js`.
Nele dá pra trocar:

- o nome dela e as iniciais do casal (usadas no capítulo da constelação)
- os textos da carta de abertura
- as qualidades que aparecem nos balões (capítulo 2)
- as lembranças que aparecem na caça às estrelas (capítulo 4)
- os nomes dos cachorros (capítulo 6)
- a carta final (capítulo 9)

## Como adicionar foto e música (opcional)

1. Coloque a foto do casal em `assets/foto-casal.jpg`
2. Coloque uma música em `assets/musica.mp3`

Se você não adicionar esses arquivos, o site funciona normalmente:
o capítulo 7 mostra um aviso discreto no lugar da foto, e o botão de
música fica escondido.

## Como publicar no GitHub Pages

1. Crie um repositório novo no GitHub e envie todos esses arquivos para ele
   (mantendo a mesma estrutura de pastas).
2. No repositório, vá em **Settings → Pages**.
3. Em "Source", selecione a branch `main` e a pasta `/root`.
4. Salve. Em alguns minutos o site estará disponível em
   `https://seu-usuario.github.io/nome-do-repositorio/`.

## Estrutura do projeto

```
index.html          → estrutura de todos os capítulos
css/style.css        → cores, tipografia e layout geral
css/chapters.css      → estilo de cada mini-jogo
js/config.js          → todo o conteúdo personalizável (edite aqui)
js/effects.js         → céu estrelado e confete (compartilhados)
js/main.js            → navegação entre capítulos
js/chapter1.js..9.js  → lógica de cada capítulo
assets/               → coloque aqui a foto e a música
```

Feito com carinho. 💙
