// will validate if the added tile
// is within the rules
export const rulesengine = {
  // Parameters: color, position and board to check
  rulesengine: function (color, position, board) {
    const primaries = ['blue', 'yellow', 'red']
    const secondaries = ['orange', 'purple', 'green']
    const specials = ['white', 'black']
    // primary possibilities
    const possibilities = [
      (red) => ['orange', 'yellow'],
      (blue) => ['purple', 'green'],
      (yellow) => ['red', 'blue'],
      (orange) => ['red', 'yellow'],
      (purple) => ['blue', 'red'],
      (green) => ['blue', 'yellow'],
    ]

    // Check left
    const leftpos = position - 1
    // Check right
    const rightpos = position + 1
    // check above
    const above = position - 10
    // check below
    const below = position + 10
  },
}
