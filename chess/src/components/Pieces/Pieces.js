import { createPosition, copyPosition } from '../../helper'
import { useState, useRef } from 'react'
import Piece from './Piece'
import './Pieces.css'
import { useAppContext } from '../../contexts/Context'
import { makeNewMove } from '../../reducer/actions/move'

const Pieces = () => {

    const ref = useRef()


    const {appState, dispatch} = useAppContext()

    const currentPosition = appState.position[appState.position.length-1]

    console.log(currentPosition.turn)



    const calculateCoords = e => {
        const {width, left, top} = ref.current.getBoundingClientRect()//X e Y
        const size = width / 8
        const y = Math.floor((e.clientX - left) / size)
        const x = 7 - Math.floor((e.clientY - top) / size)
        console.log(x, y)
        return {x, y}
    }

    const onDrop = e => {
        const newPosition = copyPosition (currentPosition)
        const {x, y} = calculateCoords(e)

        const [p, rank, file] = e.dataTransfer.getData('text').split(',')
        console.log(p, rank, file)

         // Certifique-se de que rank e file sejam números
        const rankIndex = parseInt(rank, 10); // Converte rank para número
        const fileIndex = parseInt(file, 10); // Converte file para número

        newPosition[rankIndex][fileIndex] = ''
        newPosition[x][y] = p // P é a peça, o nome dela

        dispatch(makeNewMove({newPosition}))
    }

    const onDragOver = e => e.preventDefault()


    return <div className='pieces'
                ref = {ref}
                onDrop = {onDrop}
                onDragOver = {onDragOver}>

                {currentPosition.map((r,rank)=>
                    r.map((f, file) => 
                        currentPosition[rank][file] ? 
                            <Piece
                            key={rank+'-'+file}
                            rank={rank}
                            file={file}
                            piece={currentPosition[rank][file]}/>
                        : null
                ))}
            </div>
}

export default Pieces