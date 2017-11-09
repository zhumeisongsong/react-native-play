import React, { Component } from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  View
} from 'react-native'

class Square extends Component {
  render() {
    return (
      <Text style={styles.square} onPress={() => { this.props.onPress() }}>{this.props.value}</Text>
    )
  }
}

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    }
  }

  handlePress(i) {
    const squares = this.state.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    })
  }

  renderSquare(i) {
    return (
      <Square
      style={styles.squareText}
        value={this.state.squares[i]}
        onPress={() => { this.handlePress(i) }} />
    )
  }

  render() {
    const winner = calculateWinner(this.state.squares)
    let status
    if (winner) {
      status = 'Winner' + winner;
    } else {
      status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O')
    }
    return (
      <View>
        <View style={styles.boardRow}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </View>
        <View style={styles.boardRow}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </View>
        <View style={styles.boardRow}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </View>
        <Text>{status}</Text>
      </View>
    )
  }
}

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Board style={styles.board} />
        <View style={styles.info}>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    marginTop: 20,
  },
  board: {
     flex:4,
  },
  info: {
    flex: 1,
  },
  boardRow: {
    flexDirection:'row',
  },
  square: {
    width:120,
    height:120,
    backgroundColor: '#333',
    fontSize: 50,
    color:'#fff',
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: -2,
    marginBottom: -2,
  },
});

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i in lines) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a]
    }
  }
  return null
}