// will validate if the added tile
// is within the rules

export const bonusengine = {
  // Parameters: color, position and board to check
  remembered: [],
  results: [],
  squareCounts: [0, 0, 0, 0, 0, 0],
  total: 0,
  points: [0, 0, 15, 75, 180, 300],
  boardcopy: [],

  bonus: function (board) {
    const result = []
    const row = []
    Object.keys(board).forEach((key) => {
      const row = []
      Object.keys(board[key]).forEach((item) => row.push(board[key][item]))
      result.push(row)
    })
    console.log(result)
    this.arrayFlatten(result)
    this.binaried(4)
    this.binaried(3)
    this.binaried(2)
    return [this.total, this.squareCounts]
  },
  arrayFlatten: function (arr) {
    if (Array.isArray(arr)) {
      arr.forEach((item) => {
        item.forEach((cell) => {
          this.boardcopy.push(cell)
        })
      })
    }
    console.log('flatten')
    console.log(this.boardcopy)
  },
  binaried: function (len) {
    //marche pour 2
    console.log('for ' + len)
    console.log(this.boardcopy)

    let prevcol = ''
    let i = 0
    let iterator = 0
    let equality = 0
    let vector = []
    let grids = 0
    let noends = [7, 15, 23, 31, 39, 47, 53]
    let savecopy = 'zap'

    while (i < 64 - 4 * len) {
      //pas nécessaire d'aller jusqu'au bout de la grille
      savecopy = this.boardcopy[i]
      if (
        this.boardcopy[i] === prevcol &&
        this.boardcopy[i] !== '' &&
        prevcol !== '' &&
        !noends.includes(i - 1)
      ) {
        if (vector.length === 0 && this.boardcopy[i - 1] !== '')
          vector.push(i - 1)
        vector.push(i)
        if (noends.includes(vector[0]) && vector.length === len) {
          vector.splice(0, 1)
        }
        //on élimine le premier de la file pour rouler
        if (vector.length > len) vector.shift()
        //if (this.boardcopy[vector[i]] === this.boardcopy[vector[i - 1]])
        //check if same color
        if (vector.length === len) iterator++
        if (iterator === 1) {
          console.log(vector)
          for (let a = 0; a < len; a++) {
            if (len === 2) {
              if (this.boardcopy[vector[a]] === this.boardcopy[vector[a] + 8]) {
                equality++
              }
            } //len 2
            if (len === 3) {
              if (
                this.boardcopy[vector[a]] === this.boardcopy[vector[a] + 8] &&
                this.boardcopy[vector[a]] === this.boardcopy[vector[a] + 16]
              ) {
                equality++
              }
            }
            if (len === 4) {
              if (
                this.boardcopy[vector[a]] === this.boardcopy[vector[a] + 8] &&
                this.boardcopy[vector[a]] === this.boardcopy[vector[a] + 16] &&
                this.boardcopy[vector[a]] === this.boardcopy[vector[a] + 24]
              ) {
                equality++
              }
            }
          } //for
          if (equality === len) {
            //then we found a grid of len
            grids++
            this.squareCounts[len] = this.squareCounts[len] + 1
            this.total = this.total + this.points[len]
            console.log(grids)
            //now remove the counted grid
            for (let b = 0; b < vector.length; b++) {
              this.boardcopy[vector[b]] = ''
              this.boardcopy[vector[b] + 8] = ''
              if (len === 3) this.boardcopy[vector[b] + 16] = ''
              if (len === 4) this.boardcopy[vector[b] + 24] = ''
            }
            vector = []
          }
          if (equality > 0) vector.shift()
          else vector = []

          equality = 0
          iterator = 0
        } //found a tuple
      } else {
        vector = []
        if (vector.length === len) {
          iterator = 0
          equality = 0
        }
      }
      console.log('iter')
      console.log(vector)
      // vector = []
      prevcol = savecopy
      i++
    }
  }, //bocalc3
}
