import { createPosition, copyPosition } from '../../helper'
import { useState, useRef } from 'react'
import Piece from './Piece'
import './Pieces.css'

const Pieces = () => {

    const ref = useRef()

    const [state, setState] = useState(createPosition())

    const calculateCoords = e => {
        const {width, left, top} = ref.current.getBoundingClientRect()//X e Y
        const size = width / 8
        const y = Math.floor((e.clientX - left) / size)
        const x = 7 - Math.floor((e.clientY - top) / size)
        console.log(x, y)
        return {x, y}
    }

    const onDrop = e => {
        const newPosition = copyPosition (state)
        const {x, y} = calculateCoords(e)

        const [p, rank, file] = e.dataTransfer.getData('text').split(',')
        console.log(p, rank, file)

         // Certifique-se de que rank e file sejam números
        const rankIndex = parseInt(rank, 10); // Converte rank para número
        const fileIndex = parseInt(file, 10); // Converte file para número

        newPosition[rankIndex][fileIndex] = ''
        newPosition[x][y] = p // P é a peça, o nome dela

        setState(newPosition)
    }

    const onDragOver = e => e.preventDefault()


    return <div className='pieces'
                ref = {ref}
                onDrop = {onDrop}
                onDragOver = {onDragOver}>

                {state.map((r,rank)=>
                    r.map((f, file) => 
                        state[rank][file] ? 
                            <Piece
                            key={rank+'-'+file}
                            rank={rank}
                            file={file}
                            piece={state[rank][file]}/>
                        : null
                ))}
            </div>
}

export default Pieces