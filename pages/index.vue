<template>
  <div class="p-6">
    <h1 class="title"></h1>
    <div class="grid grid-cols-2">
      <!-- left column -->

      <div class="col2">
        <span
          id="mesaging"
          class="
            m-4
            rounded-lg
            py-1
            px-2
            text-white text-3xl
            font-semibold
            bg-green-600
          "
          >Wait your turn...Estl is playing.</span
        >
        <div id="dice" class="mb-4 mt-4">
          <h2>Click the dice and drag it to the board</h2>
          <Dice v-on:move="move" class="" />
        </div>
        <div>
          <span class="font-semibold">Game Started on 2021-06-18 22:23</span>

          <div id="players" class="w-full border-2 border-black rounded-lg p-3">
            <h2 class="">Players</h2>
            <hr class="mb-2" />
            <div class="flex">
              <div
                class="
                  border-2
                  p-2
                  m-2
                  border-green-200
                  rounded-lg
                  flex flex-col flex-1
                "
              >
                <span class="font-bold text-lg">You</span>
                <span class="mb-1 justify-between"
                  ><span>Moves</span>
                  <span class="text-lg font-bold">12</span></span
                >
                <span class="justify-between"
                  ><span>Scrore</span>
                  <span class="text-lg font-bold">34</span></span
                >
              </div>
              <div
                class="
                  border-2
                  p-2
                  m-2
                  border-black
                  rounded-lg
                  flex flex-col flex-1
                "
              >
                <span class="font-bold text-lg">Estl</span>
                <span class="mb-1 justify-between"
                  ><span>Moves</span>
                  <span class="text-lg font-bold">10</span></span
                >
                <span class="justify-between"
                  ><span>Scrore</span>
                  <span class="text-lg font-bold">44</span></span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="w-full mt-4">
          <h2>Game Controls</h2>
          <span class="flex flex-row w-full">
            <a><SaveIcon size="1.4x" class="flex" /></a>
            <a><TrashIcon size="1.4x" class="flex" /></a>
            <a><PauseIcon size="1.4x" class="flex" /></a>
            <a><LogoutIcon size="1.4x" class="flex" /></a>
          </span>
        </div>

        <div class="absolute bottom-1 left-1">
          <h2>Available possibilities</h2>
          <div class="flex flex-row flex-wrap">
            <tile
              tcolor="red"
              :draggable="true"
              v-on:move="move"
              :primary="true"
            ></tile>
            <tile
              tcolor="yellow"
              :draggable="true"
              v-on:move="move"
              :primary="true"
            ></tile>
            <tile
              tcolor="blue"
              :draggable="true"
              v-on:move="move"
              :primary="true"
            ></tile>
            <tile tcolor="orange" :draggable="true" v-on:move="move"></tile>
            <tile tcolor="purple" :draggable="true" v-on:move="move"></tile>
            <tile tcolor="green" :draggable="true" v-on:move="move"></tile>
            <tile tcolor="white" :draggable="true" v-on:move="move"></tile>
            <tile tcolor="black" :draggable="true" v-on:move="move"></tile>
          </div>
        </div>
      </div>
      <!-- BOARD GAME -->
      <div class="game-board shadow flex-col col3">
        <span v-for="r in 8" :key="r" class="flex flex-row">
          <div
            v-for="c in 8"
            :key="c"
            :data-pos="r * 10 + c"
            @dragover.prevent="allowDrop"
            @dragleave="dragleave"
            @drop.prevent="drop"
            class="box"
          ></div>
        </span>
      </div>
      <!-- /board game -->
    </div>
  </div>
</template>

<script>
import {
  TrashIcon,
  PauseIcon,
  SaveIcon,
  LogoutIcon,
} from '@vue-hero-icons/outline'

export default {
  components: {
    TrashIcon,
    PauseIcon,
    SaveIcon,
    LogoutIcon,
  },
  data() {
    return {
      mcolor: null,
      board: null,
      savedClass: '',
    }
  },
  methods: {
    move(e) {
      this.mcolor = e
      console.log(e)
    },
    drop(e) {
      e.toElement.className = 'box ' + this.mcolor
    },
    dragleave(e) {
      e.toElement.className = this.savedClass
    },
    allowDrop(e) {
      console.log(e)
      this.savedClass = e.toElement.className
      if (e.toElement.className === 'box')
        e.toElement.className = 'box ' + 'pulsar'
    },
  },
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

h2 {
  @apply font-bold text-xl;
}

a {
  @apply border-2 border-black rounded-md py-1 px-2 mr-2;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.game-board {
  /*width: 500px;
  height: 524px;*/
  margin: 0 auto;
  background-color: #eee;
  color: #fff;
  border: 6px solid #eee;
  border-radius: 10px;
  /* display: flex; */
  /* grid-template: repeat(8, 1fr) / repeat(8, 1fr);*/
}

.box {
  border: 1px solid #eee;
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

.box:hover {
  background-color: #bbb;
}

.pulsar {
  -webkit-animation: pulse 1s infinite alternate;
}

@-webkit-keyframes pulse {
  0% {
    background-color: #45ceef;
  }
  25% {
    background-color: #fff5a5;
  }
  50% {
    background-color: #ffd4da;
  }
  75% {
    background-color: #99d2e4;
  }
  100% {
    background-color: #d8cab4;
  }
}
</style>
