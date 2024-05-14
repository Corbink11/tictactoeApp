import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (index: number) => {
    const boardCopy = [...board];
    if (winner || boardCopy[index]) return;
    boardCopy[index] = xIsNext ? 'X' : 'O';
    setBoard(boardCopy);
    setXIsNext(!xIsNext);
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const renderSquare = (index: number) => (
    <TouchableOpacity
      style={styles.square}
      onPress={() => handleClick(index)}
    >
      <Text style={styles.squareText}>{board[index]}</Text>
    </TouchableOpacity>
  );

  const renderStatus = () => {
    return winner ?
      `Winner: ${winner}` :
      `Next player: ${xIsNext ? 'X' : 'O'}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{renderStatus()}</Text>
      <View style={styles.board}>
        <View style={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>
      <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
        <Text style={styles.restartButtonText}>Restart Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const calculateWinner = (squares: Array<string | null>) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  board: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: '#61dafb',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#FFFFFF',
  },
  squareText: {
    fontSize: 30,
    color: '#282c34',
    fontWeight: 'bold',
  },
  status: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
  },
  restartButton: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  restartButtonText: {
    color: '#282c34',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;