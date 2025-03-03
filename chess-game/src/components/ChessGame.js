import React, { useState, useEffect, useCallback } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [highlightSquares, setHighlightSquares] = useState({});
  const [difficulty, setDifficulty] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);

  const makeAIMove = useCallback(() => {
    console.log("IA tentando jogar...");
    if (game.isGameOver()) {
      console.log("Jogo acabou, IA não pode jogar.");
      return;
    }
    const tempGame = new Chess(game.fen());
    const bestMove = getBestMove(tempGame, difficulty);
    console.log("Melhor movimento encontrado:", bestMove);
    if (bestMove) {
      tempGame.move(bestMove);
      setGame(new Chess(tempGame.fen()));
      highlightMove(bestMove.from, bestMove.to);
    }
  }, [game, difficulty]);

  useEffect(() => {
    console.log("Efeito disparado: gameStarted =", gameStarted, "turno:", game.turn());
    if (gameStarted && game.turn() === "b" && !game.isGameOver()) {
      setTimeout(() => makeAIMove(), 500);
    }
  }, [game, gameStarted, makeAIMove]);

  const onDrop = ({ sourceSquare, targetSquare }) => {
    console.log("Movimento tentado de", sourceSquare, "para", targetSquare);
    if (!gameStarted || game.isGameOver() || game.turn() !== "w") {
      console.log("Movimento inválido.");
      return;
    }
    const tempGame = new Chess(game.fen());
    const move = tempGame.move({ from: sourceSquare, to: targetSquare, promotion: "q" });
    console.log("Movimento realizado:", move);
    
    if (move) {
      setGame(new Chess(tempGame.fen()));
      highlightMove(sourceSquare, targetSquare);
      setTimeout(() => makeAIMove(), 500);
    }
  };

  const onMouseOverSquare = (square) => {
    if (!gameStarted || game.turn() !== "w") return;
    const moves = game.moves({ square, verbose: true });
    console.log("Movimentos possíveis para", square, ":", moves);
    if (moves.length > 0) {
      const squaresToHighlight = {};
      moves.forEach(move => { squaresToHighlight[move.to] = "#0f0"; });
      setHighlightSquares(squaresToHighlight);
    }
  };

  const onMouseOutSquare = () => {
    setHighlightSquares({});
  };

  const getBestMove = (tempGame, depth) => {
    console.log("Calculando melhor jogada para dificuldade:", depth);
    const moves = tempGame.moves({ verbose: true });
    if (moves.length === 0) return null;
    return moves[Math.floor(Math.random() * moves.length)];
  };

  const highlightMove = (from, to) => {
    setHighlightSquares({ [from]: "#ff0", [to]: "#ff0" });
  };

  const startGame = () => {
    console.log("Jogo iniciado.");
    setGame(new Chess());
    setGameStarted(true);
    setHighlightSquares({});
  };

  return (
    <div>
      <h2>Jogo de Xadrez</h2>
      {!gameStarted && (
        <div>
          <p>Escolha a dificuldade:</p>
          <select value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))}>
            <option value={1}>Fácil</option>
            <option value={2}>Médio</option>
            <option value={3}>Difícil</option>
          </select>
          <button onClick={startGame}>Iniciar Jogo</button>
        </div>
      )}
      {gameStarted && (
        <>
          <p>{game.isGameOver() ? "Fim de Jogo!" : game.turn() === "w" ? "Sua vez!" : "IA pensando..."}</p>
          <Chessboard
            position={game.fen()}
            onDrop={onDrop}
            onMouseOverSquare={onMouseOverSquare}
            onMouseOutSquare={onMouseOutSquare}
            squareStyles={highlightSquares}
            draggable={true}
            boardWidth={250}
          />
        </>
      )}
    </div>
  );
};

export default ChessGame;
