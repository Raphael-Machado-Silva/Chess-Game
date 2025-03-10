export const getRookMoves = ({position, piece, rank, file }) => {
    const moves = []
    if (!piece || piece.length < 1) return []; // Evita erro se `piece` for undefined

    const us = piece[0]
    const enemy = us === 'w' ? 'b' : 'w'

    const direction = [
        [-1, 0], [1,0], [0,-1], [0,1],
    ]

    direction.forEach(dir => {
        for (let i = 1; i < 8; i++) { // Começa de 1 para evitar verificar a própria posição
            const x = rank + (i * dir[0])
            const y = file + (i * dir[1])

            if (position?.[x]?.[y] === undefined) {
                break
            }

            if (typeof position[x][y] === "string") {
                if (position[x][y].startsWith(enemy)) {
                    moves.push([x, y]);
                    break;
                }
                if (position[x][y].startsWith(us)) {
                    break;
                }
            }

            moves.push([x, y]);
        }
    })

    return moves
}