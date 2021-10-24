<template>
  <div>
    {{ board }}
  </div>
</template>
<script>
import BonusEngine, { bonusengine } from '~/plugins/bonusengine.js'

export default {
  components: {
    BonusEngine,
  },
  data() {
    return {
      /*  newboard: {
       [ "purple",
        "purple",
        "purple",
        "red",
        "red",
        "red",
        "red",
        "red"
    ],
    [
        "purple",
        "purple",
        "purple",
        "red",
        "red",
        "red",
        "red",
        "orange"
    ],
    [
        "purple",
        "purple",
        "purple",
        "red",
        "orange",
        "orange",
        "orange",
        "orange"
    ],
    [
        "blue",
        "green",
        "green",
        "orange",
        "orange",
        "orange",
        "orange",
        "orange"
    ],
    [
        "blue",
        "green",
        "green",
        "yellow",
        "yellow",
        "yellow",
        "yellow",
        "yellow"
    ],
    [
        "blue",
        "green",
        "green",
        "yellow",
        "yellow",
        "yellow",
        "yellow",
        "yellow"
    ],
    [
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green"
    ],
    [
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green"
    ]
    }, */
      board: {
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
    }
  }, // data
  methods: {
    init() {
      const objArray = []
      const row = []
      Object.keys(this.board).forEach((key) => {
        const row = []
        Object.keys(this.board[key]).forEach((item) =>
          row.push(this.board[key][item])
        )
        objArray.push(row)
      })
      console.log(objArray)
      bonusengine.bonus(this.board)
    },
  }, // methods
  mounted() {
    this.init()
  },
}
</script>
