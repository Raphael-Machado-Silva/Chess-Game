import { createPosition, copyPosition, getNewMoveNotation } from '../../helper'
import { useState, useRef } from 'react'
import Piece from './Piece'
import './Pieces.css'
import { useAppContext } from '../../contexts/Context'
import { clearCandidates, makeNewMove } from '../../reducer/actions/move'
import arbiter from '../../arbiter/arbiter'
import { openPromotion } from '../../reducer/actions/popup'
import { getCastlingDirections } from '../../arbiter/getMoves'
import { detectCheckmate, detectInsufficientMaterial, detectStalemate, updateCastling } from '../../reducer/actions/game'

const Pieces = () => {

    const ref = useRef()


    const {appState, dispatch} = useAppContext()

    const currentPosition = appState.position[appState.position.length-1]

    console.log(currentPosition.turn)

    const updateCastlingState = ({piece,file,rank}) => {
        const direction = getCastlingDirections({
            castleDirection:appState.castleDirection,
            piece,
            file,
            rank
        })
        if (direction){
            dispatch(updateCastling(direction))
        }
    }



    const calculateCoords = e => {
        const {width, left, top} = ref.current.getBoundingClientRect()//X e Y
        const size = width / 8
        const y = Math.floor((e.clientX - left) / size)
        const x = 7 - Math.floor((e.clientY - top) / size)
        console.log(x, y)
        return {x, y}
    }


    const openPromotionBox = ({rank, file, x, y}) => {
        dispatch(openPromotion({
            rank: Number(rank), 
            file: Number(file), 
            x, 
            y
        }))
    }

    const move = e =>{
        const {x, y} = calculateCoords(e)
    
        const [piece, rankStr, fileStr] = e.dataTransfer.getData('text').split(',')
        const rank = parseInt(rankStr, 10);
        const file = parseInt(fileStr, 10);

        
        if (appState.candidateMoves?.find(m => m[0] === x && m[1] === y)){

            const opponent = piece.startsWith('b') ? 'w' : 'b'
            const castleDirection = appState.castleDirection[`${piece.startsWith('b') ? 'w' : 'b'}`]

            if((piece === 'wp' && x === 7 || (piece === 'bp' && x === 0))){
                openPromotionBox({rank,file, x, y})
                return
            }
            if (piece.endsWith('r') || piece.endsWith('k')){
                updateCastlingState({piece,file,rank})
            }
            const newPosition = arbiter.performMove({
                position: currentPosition,
                piece, rank, file,
                x, y
            })
            
            const newMove = getNewMoveNotation({
                piece,
                rank,
                file,
                x,
                y,
                position:currentPosition,
            })
            dispatch(makeNewMove({newPosition,newMove}))

            
            if (arbiter.insufficientMaterial(newPosition))
                dispatch(detectInsufficientMaterial())
            else if (arbiter.isStalemate(newPosition,opponent,castleDirection)){
                dispatch(detectStalemate())
            }
            else if (arbiter.isCheckMate(newPosition,opponent,castleDirection)){
                dispatch(detectCheckmate(piece[0]))
            }
        }
        dispatch(clearCandidates())
    }

    const onDrop = e => { 
        e.preventDefault()

        move (e)
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