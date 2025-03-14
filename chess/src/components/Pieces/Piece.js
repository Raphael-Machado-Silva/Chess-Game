import arbiter from '../../arbiter/arbiter';
import {useAppContext} from '../../contexts/Context'
import { generateCandidateMoves } from '../../reducer/actions/move';

const Piece = ({rank, file, piece}) => {
    

    const {appState, dispatch} = useAppContext()
    const {turn, position} = appState;
    const currentPosition = position[position.length - 1]

    const getMoves = () => {
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

            if (currentPosition?.[x]?.[y] === undefined) {
                break
            }

            if (typeof currentPosition[x][y] === "string") {
                if (currentPosition[x][y].startsWith(enemy)) {
                    moves.push([x, y]);
                    break;
                }
                if (currentPosition[x][y].startsWith(us)) {
                    break;
                }
            }

            moves.push([x, y]);
        }
    })

    return moves
}


const onDragStart = e => {
    e.dataTransfer.effectAllowed = 'move';

    e.dataTransfer.setData('text/plain', `${piece}, ${rank}, ${file}`);

    setTimeout(() => {
        e.target.style.display = 'none';
    }, 0);

    if (turn === piece[0]) {
        const candidateMoves = arbiter.getValidMoves({
            position: currentPosition, // 🔥 Correção aqui
            prevPosition: position.length > 1 ? position[position.length - 2] : null, // 🔥 PrevPosition corrigido
            piece,
            rank,
            file
        });

        dispatch(generateCandidateMoves({ candidateMoves }));
    }
};



    const onDragEnd = e => e.target.style.display = 'block'

    
    return ( <div 
        className={`piece ${piece} p-${file}${rank}`}
        draggable={true}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        >
        
    </div>)
}

export default Piece