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
        >
          {{ idx * 8 + index }}
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
        ['red', 'red', 'red', 'red', 'red', 'orange', 'orange', 'yellow'],
        ['red', 'red', 'red', 'red', 'orange', 'yellow', 'yellow', 'yellow'],
        [
          'orange',
          'orange',
          'orange',
          'orange',
          'orange',
          'yellow',
          'yellow',
          'yellow',
        ],
        [
          'purple',
          'purple',
          'orange',
          'orange',
          'orange',
          'yellow',
          'yellow',
          'yellow',
        ],
        [
          'blue',
          'blue',
          'purple',
          'purple',
          'green',
          'green',
          'green',
          'green',
        ],
        ['blue', 'blue', 'blue', 'blue', 'green', 'green', 'green', 'green'],
        ['blue', 'blue', 'blue', 'purple', 'green', 'green', 'green', 'green'],
        [
          'blue',
          'blue',
          'purple',
          'purple',
          'green',
          'green',
          'green',
          'green',
        ],
      ],
      boardcopy: [],
      results: [],
      rembered: [],
      total: 0,
    }
  },
  methods: {
    // deep clone an array
    arrayFlatten(arr) {
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
    bocalc3(len) {
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
                if (
                  this.boardcopy[vector[a]] === this.boardcopy[vector[a] + 8]
                ) {
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
                  this.boardcopy[vector[a]] ===
                    this.boardcopy[vector[a] + 16] &&
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
  },
  created() {
    this.arrayFlatten(this.board)
    this.bocalc3(4)
    //console.log('grille de 4')
    console.log(this.boardcopy)
    this.bocalc3(3)
    console.log('grille de 3')
    console.log(this.boardcopy)
    this.bocalc3(2)
    // console.log('grille de 2')
    console.log(this.boardcopy)
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
  font-size: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
}
</style>
