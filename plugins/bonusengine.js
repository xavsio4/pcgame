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
    //const vertical = position % 10

    return whiteCount

    //check square 4

    //check square 3

    //check square 2

    // Check left
  },
}
