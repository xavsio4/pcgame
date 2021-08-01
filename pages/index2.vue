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
      <span v-for="(r, idx) in binaryboard" :key="idx" class="flex flex-row">
        <div
          v-for="(c, index) in r"
          :key="index"
          :data-pos="idx + index"
          class="box"
          :class="[c]"
        ></div>
      </span>
    </span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      binaryBoard: [],
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
        ['green', 'green', 'blue', 'purple', 'red', 'purple', 'green', 'green'],
      ],
    }
  },
  methods: {
    binaried() {
      this.board.forEach((item) => {
        var mi = Number(this.board.indexOf(item))
        for (let i in item) {
          if (Number(i - 1) < 7) {
            if (item[i - 1] === item[Number(i - 1) + 1]) {
              console.log(mi + 1)
              console.log(Number(i - 1))
              this.binaryBoard[1][1] = 1
              //  this.binaryBoard[mi][i + 1] = 1
            } else {
              // this.binaryBoard[mi][i] = 0
              // this.binaryBoard[mi][i + 1] = 0
            }
          }
        }
      })
      //  console.log(this.binaryboard)
    },
  },
  mounted() {
    this.binaried()
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
