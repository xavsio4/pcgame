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
  </div>
</template>
<script>
export default {
  data() {
    return {
      colors: ['red', 'blue', 'green', 'yellow', 'orange', 'purple'],
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
      boardo: {
        1: {
          1: 'green',
          2: 'green',
          3: 'purple',
          4: 'red',
          5: 'red',
          6: 'black',
          7: 'yellow',
          8: 'yellow',
        },
        2: {
          1: 'green',
          2: 'purple',
          3: 'purple',
          4: 'purple',
          5: 'purple',
          6: 'orange',
          7: 'yellow',
          8: 'yellow',
        },
        3: {
          1: 'green',
          2: 'purple',
          3: 'purple',
          4: 'purple',
          5: 'purple',
          6: 'orange',
          7: 'yellow',
          8: 'yellow',
        },
        4: {
          1: 'green',
          2: 'purple',
          3: 'purple',
          4: 'purple',
          5: 'purple',
          6: 'orange',
          7: 'yellow',
          8: 'yellow',
        },
        5: {
          1: 'green',
          2: 'purple',
          3: 'purple',
          4: 'purple',
          5: 'purple',
          6: 'orange',
          7: 'orange',
          8: 'orange',
        },
        6: {
          1: 'green',
          2: 'green',
          3: 'blue',
          4: 'blue',
          5: 'purple',
          6: 'orange',
          7: 'yellow',
          8: 'yellow',
        },
        7: {
          1: 'green',
          2: 'green',
          3: 'blue',
          4: 'blue',
          5: 'purple',
          6: 'orange',
          7: 'green',
          8: 'green',
        },
        8: {
          1: 'green',
          2: 'green',
          3: 'blue',
          4: 'purple',
          5: 'red',
          6: 'purple',
          7: 'green',
          8: 'green',
        },
      },
      board: [
        ['green', 'green', 'purple', 'red', 'red', 'black', 'yellow', 'yellow'],
        [
          'green',
          'purple',
          'purple',
          'purple',
          'purple',
          'orange',
          'yellow',
          'yellow',
        ],
        [
          'green',
          'purple',
          'purple',
          'purple',
          'purple',
          'orange',
          'yellow',
          'yellow',
        ],
        [
          'green',
          'purple',
          'purple',
          'purple',
          'purple',
          'orange',
          'yellow',
          'yellow',
        ],
        [
          'green',
          'purple',
          'purple',
          'purple',
          'purple',
          'orange',
          'orange',
          'orange',
        ],
        [
          'green',
          'green',
          'blue',
          'blue',
          'purple',
          'orange',
          'yellow',
          'yellow',
        ],
        [
          'green',
          'green',
          'blue',
          'blue',
          'purple',
          'orange',
          'green',
          'green',
        ],
        [
          'green',
          'green',
          'blue',
          'purple',
          'green',
          'green',
          'green',
          'green',
        ],
      ],
      results: [],
      total: 0,
    }
  },
  methods: {
    boardCalc(len) {
      let iterate = 0
      let arrSearch = []
      for (let [key, value] of Object.entries(this.board)) {
        let intVal = 0

        /*  for (let [key2, value2] of Object.entries(value)) {
          if (key2 === 1) {
            iterate++
            intVal = value2
            arrSearch.push(value2)
          } else if (intVal === value2) {
            arrSearch.push(value2)
            intVal = value2
            iterate++
          } else {
            iterate = 0
            arrSearch = []
            intVal = value2
          }
        } */
      }
    },
    calcResult(len) {
      let total = 0
      let iterator = 0
      const lin = { lin: 0, col: 'null', start_pos: 0, end_pos: 0 }
      let linsav = Object.create(lin)
      this.results.forEach((item) => {
        //var mi = Number(this.results.indexOf(item)) //from 0
        console.log(item)
        console.log(Number(item.lin) - Number(linsav.lin))
        if (
          Number(item.lin) - Number(linsav.lin) === 1 &&
          item.col === linsav.col &&
          item.start_pos === linsav.start_pos &&
          item.end_pos === linsav.end_pos
        ) {
          linsav = item
          console.log(iterator)
          iterator++
          if (iterator === len - 1) {
            console.log('grille de ' + len)
            // now remove grid
            this.remgrid()
            this.total = this.total + 75
            iterator = 0
          }
        } else {
          iterator = 0
          linsav = item
        }
      })
    },
    remgrid() {
      this.results.forEach((item) => {
        for (
          let i = Number(item.start_pos);
          i < Number(item.end_pos) + 1;
          i++
        ) {
          this.binaryBoard[item.lin][i] = 0
        }
      })
      console.log(this.binaryBoard)
    },
    binaried(len) {
      let total = 0
      this.board.forEach((item) => {
        let iterator = 0
        var mi = Number(this.board.indexOf(item))
        for (let i in item) {
          if (Number(i) < 8 && Number(i) !== 0 && Number(i) + 1 !== 0) {
            if (item[Number(i)] === item[Number(i) + 1]) {
              this.binaryBoard[mi][Number(i)] = item[Number(i)]
              this.binaryBoard[mi][Number(i) + 1] = item[Number(i) + 1]
              iterator++
              if (iterator === len - 1) {
                this.results.push({
                  lin: mi,
                  col: item[Number(i)],
                  start_pos: Number(i) - (len - 2),
                  end_pos: Number(i) + 1,
                })
                iterator = 0
              }
            } else {
              //  if this.binaryBoard[mi][Number(i)]
              // this.binaryBoard[mi][Number(i)] = 0
              this.binaryBoard[mi][Number(i) + 1] = 0
              iterator = 0
            }
          }
        }
      })
      this.total = this.calcResult(len)
    },
  },
  created() {
    this.binaried(4)
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
  width: 4rem;
  height: 4rem;
}
</style>
