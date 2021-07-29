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
        Sound {{ soundStatus }}
        <div id="dice" class="mb-4 mt-4"></div>
        <div>
          <span class="font-semibold">Game Started on 2021-06-18 22:23</span>

          <div id="players" class="w-full border-2 border-black rounded-lg p-3">
            <h2 class="">Players</h2>
            <hr class="mb-2" />
            <div class="flex">
              <div
                v-for="p in players"
                :key="p"
                class="p-2 m-2 rounded-lg flex flex-col flex-1"
              >
                <span class="font-bold text-lg">{{ p.name }}</span>
                <span class="mb-1 justify-between"
                  ><span>Moves</span>
                  <span class="text-lg font-bold">{{ p.moves }}</span></span
                >
                <span class="justify-between"
                  ><span>Scrore</span>
                  <span class="text-lg font-bold">{{ p.score }}</span></span
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
            <button
              id="game-btn-sound"
              :class="['gm-sound-' + soundStatus, 'gm-' + status]"
              @click="switchSound()"
            >
              Sound
            </button>
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
      <div class="game-board shadow flex flex-col">
        <div id="boardhead" class="flex">
          <div
            class="w-1/4 h-12 m-1 rounded-xl white cursor-pointer text-black"
          >
            0x
          </div>
          <div class="w-2/4 rounded-xl h-12 m-1" :class="mcolor">&nbsp;</div>
          <div
            @click="switchBlack"
            class="w-1/4 h-12 rounded-xl mb-1 bg-black cursor-pointer m-1"
          >
            &nbsp;
          </div>
        </div>
        <span v-for="(r, idx) in board" :key="idx" class="flex flex-row">
          <div
            v-for="(c, index) in r"
            :key="index"
            :data-pos="idx + index"
            @dragover.prevent="allowDrop"
            @dragleave="dragleave"
            @drop.prevent="drop"
            @click="click"
            class="box"
            :class="[c]"
          ></div>
        </span>
      </div>
      <!-- /board game -->
    </div>
  </div>
</template>

<script>
import ruelesEngines, { rulesengine } from '~/plugins/rulesengine.js'
import {
  TrashIcon,
  PauseIcon,
  SaveIcon,
  LogoutIcon,
  PlayIcon,
} from '@vue-hero-icons/outline'
import { Howl } from 'howler'

export default {
  components: {
    TrashIcon,
    PauseIcon,
    SaveIcon,
    LogoutIcon,
    PlayIcon,
  },
  data() {
    return {
      firstMove: true, // start wherever you want
      bonusPhase: false, // the bonus phase happens at the end of the game if you still
      // have white tiles
      mcolor: 'yellow',
      colors: [
        'red',
        'blue',
        'orange',
        'yellow',
        'green',
        'purple',
        'black',
        'white',
      ],
      dice: 1,
      players: [
        {
          name: 'you',
          is_turn: true,
          moves: 0,
          score: 0,
          pool: [],
        },
      ],
      current_player: 0,
      board: {
        1: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
        2: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
        3: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
        4: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
        5: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
        6: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
        7: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
        8: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
      },
      savedClass: '',

      status: 'not-started', // Game status: 'not-started', 'paused', 'playing' or 'ended'
      soundStatus: 'on', // Sound status: 'on' or 'off'
      sounds: {
        // Vars needed for sounds effects
        tapCorrect: null,
        tapWrong: null,
        tapBlack: null,
        getWhite: null,
        win: null,
        lose: null,
        bg: null,
      },
      points: {
        red: 2,
        blue: 2,
        yellow: 2,
        orange: 1,
        green: 1,
        purple: 1,
        white: 0,
        black: -3,
        square2: 15,
        square3: 75,
        square4: 180,
      },
    }
  },
  methods: {
    init() {
      // Instanciate sounds effects
      this.sounds.tapCorrect = new Howl({
        src: ['audio/game-tap.mp3'],
        volume: 0.05,
      })
      this.sounds.tapWrong = new Howl({
        src: ['audio/game-wrong-tap.mp3'],
        volume: 0.15,
      })
      this.sounds.win = new Howl({ src: ['audio/game-win.mp3'], volume: 0.4 })
      this.sounds.lose = new Howl({ src: ['audio/game-lose.mp3'], volume: 0.4 })
      this.sounds.bg = new Howl({
        src: ['audio/game-background.mp3'],
        loop: true,
        volume: 0.2,
      })
      this.sounds.bg.stop()
      if (this.soundStatus === 'on') {
        this.sounds.bg.play()
      }
    }, // init
    move(e) {
      this.mcolor = e
    },
    rollDices() {
      let dice1 = Math.ceil(Math.random() * 6)
      this.mcolor = this.colors[dice1 - 1]
      setTimeout(() => {}, 10)
    },
    switchBlack() {
      this.mcolor = 'black'
    },
    click(e) {
      // increment moves
      this.players[this.current_player].moves++
      if (!this.firstMove) {
        if (
          this.board[e.target.dataset.pos.split('')[0]][
            e.toElement.dataset.pos.split('')[1]
          ] === '' &&
          rulesengine.rules(this.mcolor, e.target.dataset.pos, this.board)
        ) {
          this.board[e.target.dataset.pos.split('')[0]][
            e.target.dataset.pos.split('')[1]
          ] = this.mcolor
          this.sounds.tapCorrect.play()
          this.score = this.score + this.points[this.mcolor]
          this.rollDices()
        } else this.sounds.tapWrong.play()
      } else {
        this.board[e.target.dataset.pos.split('')[0]][
          e.target.dataset.pos.split('')[1]
        ] = this.mcolor
        this.firstMove = false
      }
      console.log(e.target.dataset.pos)
    },
    drop(e) {
      if (
        this.board[e.toElement.dataset.pos.split('')[0]][
          e.toElement.dataset.pos.split('')[1]
        ] === '' &&
        rulesengine.rules(this.mcolor, e.toElement.dataset.pos, this.board)
      ) {
        this.board[e.toElement.dataset.pos.split('')[0]][
          e.toElement.dataset.pos.split('')[1]
        ] = this.mcolor
        this.sounds.tapCorrect.play()
      } else this.sounds.tapWrong.play()
    },
    dragleave(e) {
      e.toElement.className = this.savedClass
    },
    allowDrop(e) {
      // console.log(e)
      this.savedClass = e.toElement.className
      if (e.toElement.className === 'box')
        e.toElement.className = 'box ' + 'pulsar'
      else e.preventDefault
    },
    restartGame() {
      this.init()
    },
    switchSound() {
      if (this.soundStatus === 'on') {
        this.soundStatus = 'off'
        this.sounds.bg.stop()
      } else {
        this.soundStatus = 'on'
        this.sounds.bg.play()
      }
    },
  }, // methods
  mounted() {
    this.init()
    this.rollDices()
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
