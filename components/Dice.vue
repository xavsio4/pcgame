<template>
  <div class="wrapper-dice">
    <div id="dice-1" class="dice" @click="rollDices">
      <div class="spinner" v-bind:class="'dice-' + dices[0]">
        <div class="face1 red" @dragstart="startDrag('red')" draggable="true">
          1
        </div>
        <div
          class="face2 orange"
          @dragstart="startDrag('orange')"
          draggable="true"
        >
          2
        </div>
        <div
          class="face3 green"
          @dragstart="startDrag('green')"
          draggable="true"
        >
          3
        </div>
        <div
          class="face4 purple"
          @dragstart="startDrag('purple')"
          draggable="true"
        >
          4
        </div>
        <div class="face5 blue" @dragstart="startDrag('blue')" draggable="true">
          5
        </div>
        <div
          class="face6 yellow"
          @dragstart="startDrag('yellow')"
          draggable="true"
        >
          6
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dices',
  props: {
    dices: {
      type: Array,
      default: [1, 1],
    },
  },
  methods: {
    startDrag(event) {
      this.$emit('move', event)
      // event.dataTransfer.setData('tileColor', tcolor)
    },
    rollDices() {
      //   if (this.isPlaying) {
      let dice1 = Math.ceil(Math.random() * 6)
      this.dices = [dice1]
      //  if (dice1 == 1) {
      //   let activePlayer = this.activePlayer
      setTimeout(() => {
        //  alert(this.$t('stop_message', { player: activePlayer + 1 }))
        // alert(`Nguoi choi Player ${activePlayer + 1} da quay trung so 1. Rat tiec`);
      }, 10)
      // this.switchPlayer()
      //   } else {
      // this.currentScore += dice1
      //   }
      //   } else {
      //     alert(this.$t('please_choose_new_game'))
      //   }
    },
  },
}
</script>

<style>
.dice {
  border-radius: 6px;
  /*left: 50%;
  transform: translateX(-50%);*/
  width: 60px;
  height: 60px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}
.spinner div {
  position: absolute;
  width: 60px;
  height: 60px;
  border: 1px solid #ccc;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  line-height: 60px;
  font-size: 20px;
  color: #477ced;
  font-size: 0;
  transition: all 0.3s ease;
  opacity: 1;
}

.spinner .face1 {
  -webkit-transform: translateZ(30px);
  -ms-transform: translateZ(30px);
  transform: translateZ(30px);
  background-position: center;
  background-size: cover;
}
.spinner .face2 {
  -webkit-transform: rotateY(90deg) translateZ(30px);
  -ms-transform: rotateY(90deg) translateZ(30px);
  transform: rotateY(90deg) translateZ(30px);
  background-position: center;
  background-size: cover;
}
.spinner .face3 {
  -webkit-transform: rotateY(90deg) rotateX(90deg) translateZ(30px);
  -ms-transform: rotateY(90deg) rotateX(90deg) translateZ(30px);
  transform: rotateY(90deg) rotateX(90deg) translateZ(30px);
  background-position: center;
  background-size: cover;
}
.spinner .face4 {
  -webkit-transform: rotateY(180deg) rotateZ(90deg) translateZ(30px);
  -ms-transform: rotateY(180deg) rotateZ(90deg) translateZ(30px);
  transform: rotateY(180deg) rotateZ(90deg) translateZ(30px);
  background-position: center;
  background-size: cover;
}
.spinner .face5 {
  -webkit-transform: rotateY(-90deg) rotateZ(90deg) translateZ(30px);
  -ms-transform: rotateY(-90deg) rotateZ(90deg) translateZ(30px);
  transform: rotateY(-90deg) rotateZ(90deg) translateZ(30px);
  background-position: center;
  background-size: cover;
}
.spinner .face6 {
  -webkit-transform: rotateX(-90deg) translateZ(30px);
  -ms-transform: rotateX(-90deg) translateZ(30px);
  transform: rotateX(-90deg) translateZ(30px);
  background-position: center;
  background-size: cover;
}

.spinner {
  -webkit-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transform-origin: 30px 30px 0;
  -ms-transform-origin: 30px 30px 0;
  transform-origin: 30px 30px 0;
  -webkit-transition: all 0.9s ease;
  -o-transition: all 0.9s ease;
  transition: all 0.9s ease;
  -webkit-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  -ms-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  -o-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
}
.spinner.dice-1 {
  -webkit-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  -ms-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  -o-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
}
.spinner.dice-2 {
  -webkit-transform: rotateX(0deg) rotateY(-90deg) rotateZ(0deg);
  -ms-transform: rotateX(0deg) rotateY(-90deg) rotateZ(0deg);
  -o-transform: rotateX(0deg) rotateY(-90deg) rotateZ(0deg);
  transform: rotateX(0deg) rotateY(-90deg) rotateZ(0deg);
}
.spinner.dice-3 {
  -webkit-transform: rotateX(0deg) rotateY(-90deg) rotateZ(90deg);
  -ms-transform: rotateX(0deg) rotateY(-90deg) rotateZ(90deg);
  -o-transform: rotateX(0deg) rotateY(-90deg) rotateZ(90deg);
  transform: rotateX(0deg) rotateY(-90deg) rotateZ(90deg);
}
.spinner.dice-4 {
  -webkit-transform: rotateX(0deg) rotateY(180deg) rotateZ(90deg);
  -ms-transform: rotateX(0deg) rotateY(180deg) rotateZ(90deg);
  -o-transform: rotateX(0deg) rotateY(180deg) rotateZ(90deg);
  transform: rotateX(0deg) rotateY(180deg) rotateZ(90deg);
}
.spinner.dice-5 {
  -webkit-transform: rotateX(0deg) rotateY(90deg) rotateZ(0deg);
  -ms-transform: rotateX(0deg) rotateY(90deg) rotateZ(0deg);
  -o-transform: rotateX(0deg) rotateY(90deg) rotateZ(0deg);
  transform: rotateX(0deg) rotateY(90deg) rotateZ(0deg);
}
.spinner.dice-6 {
  -webkit-transform: rotateX(90deg) rotateY(90deg) rotateZ(0deg);
  -ms-transform: rotateX(90deg) rotateY(90deg) rotateZ(0deg);
  -o-transform: rotateX(90deg) rotateY(90deg) rotateZ(0deg);
  transform: rotateX(90deg) rotateY(90deg) rotateZ(0deg);
}
</style>
