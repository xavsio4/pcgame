// will validate if the added tile
// is within the rules
export const rulesengine = {
  // Parameters: color, position and board to check
  rules: function (color, position, board) {
    const specials = ['white', 'black']
    // primary possibilities
    const possibilities = {
      red: ['orange', 'yellow', 'purple', 'red'],
      blue: ['purple', 'green', 'yellow', 'blue'],
      yellow: ['red', 'blue', 'orange', 'yellow'],
      orange: ['red', 'yellow', 'orange'],
      purple: ['blue', 'red', 'purple'],
      green: ['blue', 'yellow', 'green'],
    }
    const moveok = true

    // possibilities[color]

    // Check left
    const leftPos = Number(position) - 1
    if (leftPos > 10) {
      var leftColor = board[Math.trunc(leftPos / 10)][leftPos % 10]
      if (leftColor !== '' && possibilities[color].indexOf(leftColor) === -1)
        return false
    }
    // Check right
    const rightPos = Number(position) + 1
    if (rightPos % 10 < 9) {
      var rightColor = board[Math.trunc(rightPos / 10)][rightPos % 10]
      if (rightColor !== '' && possibilities[color].indexOf(rightColor) === -1)
        return false
    }
    // check above
    const above = Number(position) - 10
    if (above > 10) {
      var aboveColor = board[Math.trunc(above / 10)][above % 10]
      if (aboveColor !== '' && possibilities[color].indexOf(aboveColor) === -1)
        return false
    }
    // check below
    const below = Number(position) + 10
    if (below < 89) {
      var belowColor = board[Math.trunc(below / 10)][below % 10]
      if (belowColor !== '' && possibilities[color].indexOf(belowColor) === -1)
        return false
    }
    return true
    console.log(position)
    console.log(color)
    console.log(leftPos)
    console.log(board[Math.trunc(leftPos / 10)][leftPos % 10])
    console.log(leftColor)
    console.log(board)
    console.log(possibilities[color].indexOf(leftColor))
  },
}
