<template>
  <div>
    <span id="core-board">
      <span v-for="(r, idx) in board" :key="idx" class="flex flex-row">
        <div
          v-for="(c, index) in r"
          :key="index"
          :data-pos="idx + index"
          class="box"
          :class="[c]"
        ></div>
      </span>
    </span>

    <span id="bin-board">
      <h2>Bin board</h2>
      <span v-for="(r, idx) in binaryBoard" :key="idx" class="flex flex-row">
        <div v-for="(c, index) in r" :key="index" :data-pos="idx + index">
          {{ c }}
        </div>
      </span>
    </span>
    {{ results }}
    {{ total }}
    {{ squareCounts }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      colors: ['red', 'blue', 'green', 'yellow', 'orange', 'purple'],
      points: [0, 0, 15, 75, 180, 300],
      squareCounts: [0, 0, 0, 0, 0, 0],
      colorscount: [
        { col: 'red', count: 0, pos_start: 0, pos_end: 0 },
        { col: 'blue', count: 0, pos_start: 0, pos_end: 0 },
        { col: 'yellow', count: 0, pos_start: 0, pos_end: 0 },
        { col: 'orange', count: 0, pos_start: 0, pos_end: 0 },
        { col: 'green', count: 0, pos_start: 0, pos_end: 0 },
        { col: 'purple', count: 0, pos_start: 0, pos_end: 0 },
      ],
      binaryBoard: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
      board: [
        [
          'blue',
          'blue',
          'blue',
          'blue',
          'purple',
          'purple',
          'purple',
          'purple',
        ],
        [
          'blue',
          'green',
          'green',
          'purple',
          'purple',
          'purple',
          'orange',
          'green',
        ],
        [
          'purple',
          'green',
          'green',
          'purple',
          'orange',
          'green',
          'yellow',
          'yellow',
        ],
        [
          'blue',
          'green',
          'green',
          'green',
          'orange',
          'orange',
          'yellow',
          'yellow',
        ],
        [
          'blue',
          'green',
          'green',
          'green',
          'orange',
          'orange',
          'yellow',
          'yellow',
        ],
        [
          'green',
          'orange',
          'yellow',
          'black',
          'red',
          'red',
          'orange',
          'orange',
        ],
        ['yellow', 'yellow', 'orange', 'orange', 'red', 'red', 'red', 'red'],
        [
          'yellow',
          'yellow',
          'orange',
          'orange',
          'orange',
          'orange',
          'red',
          'red',
        ],
      ],
      boardCpy: [],
      results: [],
      rembered: [],
      total: 0,
    }
  },
  methods: {
    // deep clone an array
    arrayClone(arr) {
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
    },
    // isolate the non adjacent tiles
    initBinary() {
      //copy board and remove extremities
      this.boardCpy = this.arrayClone(this.board)
      this.board.forEach((item) => {
        var mi = Number(this.board.indexOf(item))
        for (let i in item) {
          var a = Number(i)
          // if first
          if (a === 0 && this.board[mi][a] !== this.board[mi][a + 1]) {
            this.boardCpy[mi][a] = 0 //first of the row
          }
          // for others
          /*   if (a > 0 && a < 7 && this.board[mi][a] !== this.board[mi][a + 1]) {
            if (this.board[mi][a] !== this.board[mi][a - 1])
              this.boardCpy[mi][a] = 0
          } */
          //for last of the row
          if (a === 7 && this.board[mi][a] !== this.board[mi][a - 1]) {
            this.boardCpy[mi][a] = 0
          }
        }
      })
      console.log('init')
      console.log(this.boardCpy)
    },
    // removes already counted bonuses
    remgrid() {
      let unique = this.rembered.filter((c, index) => {
        return this.rembered.indexOf(c) === index
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
      this.rembered = []
    },
    binaried(len) {
      console.log('binary :value' + len)
      let total = 0
      this.results = []
      this.boardCpy.forEach((item) => {
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
    },
    calcResult(len) {
      let total = 0
      let iterator = 0
      const lin = { lin: null, col: 'null', start_pos: 0, end_pos: 0 }
      //let linsav = Object.create(lin)
      let linsav = [lin]
      this.results.forEach((item) => {
        var mi = Number(this.results.indexOf(item)) //from 0
        if (
          item[0].start_pos === linsav[0].start_pos &&
          item[0].end_pos === linsav[0].end_pos &&
          item[0].col === linsav[0].col &&
          item[0].lin - linsav[0].lin === 1
        ) {
          iterator++

          this.rembered.push(mi)
          this.rembered.push(linsav)
        }

        if (iterator === len - 1) {
          console.log('grille de ' + len)
          // now remove grid

          this.squareCounts[len] = this.squareCounts[len] + 1
          this.total = this.total + this.points[len]
          iterator = 0
          this.remgrid()
        }
        linsav = [...item]
      })
      return total
    },
  },
  created() {
    this.initBinary()
    //this.binaried(4)
    //this.binaried(3)
    this.binaried(2)
  },
}
</script>
<style>
.box {
  margin: 1px;
  background-color: #ccc;
  border-radius: 6px;
  font-family: Helvetica;
  font-weight: bold;
  font-size: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
}
</style>
