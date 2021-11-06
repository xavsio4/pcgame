// will validate if the added tile
// is within the rules

/*export const bonusengine = {
  // Parameters: color, position and board to check
  remembered: [],
  results: [],
  squareCounts: [0, 0, 0, 0, 0, 0],
  total: 0,
  points: [0, 0, 15, 75, 180, 300],
  boardCpy: [],

  bonus: function (board) {
    const result = []
    const row = []
    Object.keys(board).forEach((key) => {
      const row = []
      Object.keys(board[key]).forEach((item) => row.push(board[key][item]))
      result.push(row)
    })
    console.log(result)
    this.initBinary(result)
    this.binaried(5)
    this.binaried(4)
    this.binaried(3)
    this.binaried(2)
    return [this.total, this.squareCounts]
  },
  arrayClone: function (arr) {
    var i, copy

    if (Array.isArray(arr)) {
      copy = arr.slice(0)
      for (i = 0; i < copy.length; i++) {
        copy[i] = this.arrayClone(copy[i])
      }
      return copy
    } else if (typeof arr === 'object') {
      throw 'Cannot clone array containing an object!'
    } else {
      return arr
    }
  }, //arrayclone
  initBinary: function (board) {
    this.boardCpy = this.arrayClone(board)
    board.forEach((item) => {
      var mi = Number(board.indexOf(item))
      for (let i in item) {
        var a = Number(i)
        // if first
        if (a === 0 && board[mi][a] !== board[mi][a + 1]) {
          this.boardCpy[mi][a] = 0
        }
        // for others
        if (a > 0 && a < 7 && board[mi][a] !== board[mi][a + 1]) {
          if (board[mi][a] !== board[mi][a - 1]) this.boardCpy[mi][a] = 0
        }
        //for last of the row
        if (a === 7 && board[mi][a] !== board[mi][a - 1]) {
          this.boardCpy[mi][a] = 0
        }
      }
    })
    console.log(this.boardCpy)
  }, // Initbinary
  binaried: function (len) {
    console.log('binary :value' + len)
    let total = 0
    this.results = []
    this.boardCpy.forEach((item) => {
      //by line
      let iterator = 0
      var mi = Number(this.boardCpy.indexOf(item))
      for (let i in item) {
        var a = Number(i)
        if (a < 7 && item[a] !== 0) {
          if (item[a] === item[a + 1]) {
            // this.binaryBoard[mi][a] = item[a]
            // this.binaryBoard[mi][a + 1] = item[a + 1]
            iterator++
            if (iterator === len - 1) {
              if (this.results[mi] === undefined) this.results[mi] = []
              this.results[mi].push({
                lin: mi,
                col: item[a],
                start_pos: a - (len - 2),
                end_pos: a + 1,
              })
              iterator = 0
            }
          } else {
            iterator = 0
          }
        }
      }
    })
    console.log(this.results)
    this.calcResult(len)
  }, //binaried
  remgrid: function () {
    let unique = this.remembered.filter((c, index) => {
      return this.remembered.indexOf(c) === index
    }) // will remove duplicates
    this.results.forEach((item) => {
      for (let i in item) {
        for (
          let a = Number(item[i].start_pos);
          a < Number(item[i].end_pos) + 1;
          a++
        ) {
          //remove only lines that counted in bonus
          if (unique.includes(item[i].lin)) this.boardCpy[item[i].lin][a] = 0
        }
      }
    })
    console.log(this.boardCpy)
    this.remembered = []
  }, //remgrid
  calcResult: function (len) {
    let total = 0
    let iterator = 0
    const lin = { lin: null, col: 'null', start_pos: 0, end_pos: 0 }
    //let linsav = Object.create(lin)
    let linsav = [lin]
    this.results.forEach((item) => {
      var mi = Number(this.results.indexOf(item)) //from 0
      console.log(mi)
      for (let i in item) {
        //var a = Number(i)

        if (linsav[i] === undefined) linsav[i] = [lin]
        if (
          item[i].start_pos === linsav[i].start_pos &&
          item[i].end_pos === linsav[i].end_pos &&
          item[i].col === linsav[i].col &&
          item[i].lin - linsav[i].lin === 1
        ) {
          iterator++
          console.log(this.results)
          console.log(this.remembered)
          this.remembered.push(mi)
          this.remembered.push(linsav[i].lin)
        }

        if (iterator === len - 1) {
          console.log('grille de ' + len)
          // now remove grid
          // this.remgrid()
          this.squareCounts[len] = this.squareCounts[len] + 1
          this.total = this.total + this.points[len]
          iterator = 0
        }
      } // col loop
      linsav = [...item]
      if (linsav === undefined) linsav = [lin]
    })
    //console.log(this.remembered)
    this.remgrid()
    return total
  },
}*/
