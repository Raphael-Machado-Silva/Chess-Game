# Chess Game ♟️

Este é um projeto pessoal chamado **Chess Game**, desenvolvido para me desafiar e explorar a fundo o desenvolvimento de jogos. Utilize **React** para criar o jogo de xadrez do zero, sem bibliotecas externas para facilitar o processo. Eu me concentrei em construir manualmente todos os aspectos do jogo, como:

- O tabuleiro
- As peças
- As regras (movimentos, xeque, xeque-mate, roque, en passant)
- Histórico de jogadas
- Mudança de tema

---

## Funcionalidades 🎮

- **♟️ Movimentos das Peças**: O jogo permite a movimentação de todas as peças de acordo com as regras clássicas do xadrez.
- **🛡️ Roque**: A jogada especial de roque está implementada, permitindo aos jogadores mover o rei e a torre.
- **⚔️ En Passant**: Implementação do movimento en passant, disponível em condições específicas.
- **♚ Xeque e Xeque-Mate**: O sistema detecta automaticamente quando um rei está em xeque ou xeque-mate e impede movimentos ilegais.
- **🎨 Troca de Tema**: Permite ao jogador personalizar a cor do tabuleiro e das peças, proporcionando uma experiência personalizada.
- **📝 Quadro de Jogadas**: Exibe todas as jogadas feitas durante a partida, permitindo voltar a jogadas anteriores.

---

## Tecnologias 💻

Esse projeto foi desenvolvido utilizando as seguintes tecnologias:

- **React**: Para a construção da interface de usuário e gerenciamento de estados.
- **JavaScript**: Para implementação da lógica de movimentação das peças e das regras do jogo.
- **HTML & CSS**: Para estruturar e estilizar o tabuleiro e as peças.

---

## Como Funciona 🚀

1. **Tabuleiro**: Representado como uma grade 8x8, onde cada célula pode conter uma peça ou estar vazia.
2. **Movimentação das Peças**: As peças se movem de acordo com as regras do xadrez. A aplicação valida os movimentos e bloqueia jogadas ilegais.
3. **Jogadas Especiais**: Regras como roque, en passant, xeque e xeque-mate são verificadas automaticamente pelo sistema.
4. **Histórico de Jogadas**: O quadro de jogadas exibe todas as jogadas realizadas, e você pode voltar para qualquer jogada anterior.
5. **Troca de Tema**: O jogador pode mudar o tema do jogo a qualquer momento, alternando entre diferentes esquemas de cores para o tabuleiro e peças.

---

## Como Rodar o Projeto ⚙️

### Pré-requisitos:

- **Node.js**: Certifique-se de ter o Node.js instalado em sua máquina.

### Instalação:

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/chess-game.git

