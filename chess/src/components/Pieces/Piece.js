

const Piece = ({rank, file, piece}) => {
    
    
    return ( <div 
        className={`piece ${piece} p-${file}${rank}`}
        draggable={true}>
        
    </div>)
}

export default Piece