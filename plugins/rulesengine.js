// will validate if the added tile
// is within the rules
export const rulesengine = {
  // Parameters: color, position and board to check
  rules: function (color, position, board) {
    const specials = ['white', 'black']
    // primary possibilities
    const possibilities = {
      red: ['orange', 'purple', 'red', 'white', 'black'],
      blue: ['purple', 'green', 'blue', 'white', 'black'],
      yellow: ['green', 'orange', 'yellow', 'white', 'black'],
      orange: ['red', 'yellow', 'orange', 'purple', 'white', 'green', 'black'],
      purple: ['blue', 'red', 'purple', 'orange', 'white', 'green', 'black'],
      green: ['blue', 'yellow', 'green', 'purple', 'white', 'orange', 'black'],
      white: [
        'red',
        'blue',
        'yellow',
        'green',
        'purple',
        'orange',
        'white',
        'black',
      ],
      black: [
        'red',
        'blue',
        'yellow',
        'green',
        'purple',
        'orange',
        'white',
        'black',
      ],
    }
    const moveok = true
    const pos = Number(position)
    var actualpos = board[Math.trunc(pos / 10)][pos % 10]

    // possibilities[color]

    // Check left
    const leftPos = Number(position) - 1
    if (leftPos > 10 && leftPos % 10 > 0) {
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
    // make sure there is an adjacent color

    if (
      (belowColor === '' || typeof belowColor === 'undefined') &&
      (aboveColor === '' || typeof aboveColor === 'undefined') &&
      (rightColor === '' || typeof rightColor === 'undefined') &&
      (leftColor === '' || typeof leftColor === 'undefined') &&
      actualpos !== 'black'
    )
      return false

    if (position === 'black') return false

    // console.log(position)
    // console.log(color)
    // console.log(leftPos)
    // console.log(board[Math.trunc(leftPos / 10)][leftPos % 10])
    // console.log(leftColor)
    // console.log(board)
    // console.log(possibilities[color].indexOf(leftColor))

    return true
  },
  whites: function (color, position, board) {
    var whiteCount = 0

    //check horizontal
    const horizontal = Math.trunc(position / 10)
    const hArr = [board[horizontal]]
    //check for blacks or nothing
    if (
      !Object.values(board[horizontal]).includes('') &&
      !Object.values(board[horizontal]).includes('black')
    )
      whiteCount++

    //check vertical
    var found = false
    const vertical = position % 10
    for (var i = 1; i < 9; i++) {
      if (board[i][vertical] === '' || board[i][vertical] === 'black') {
        found = true
      }
      if (found === true) break
    }

    if (found === false) whiteCount++

    return whiteCount
  },
}
