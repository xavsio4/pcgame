// will validate if the added tile
// is within the rules
export const bonusengine = {
  // Parameters: color, position and board to check
  rules: function (color, position, board) {
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
