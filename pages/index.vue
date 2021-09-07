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
          >{{ gameMessage }}</span
        >
        Sound {{ soundStatus }}
        <div id="dice" class="mb-4 mt-4"></div>
        <div>
          <span class="font-semibold">00:00:00</span>

          <div id="players" class="w-full border-2 border-black rounded-lg p-3">
            <h2 class="">Players</h2>

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
                <span>Tiles to go: {{ 64 - tileCount }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full mt-4">
          <h2>Game Controls</h2>
          <span class="flex flex-row w-full">
            <a @click="init"><RefreshIcon size="1.4x" class="flex" /></a>

            <a @click="switchSound()">
              <VolumeUpIcon
                v-if="soundStatus === 'on'"
                size="1.4x"
                class="flex"
              />
              <VolumeOffIcon
                v-if="soundStatus !== 'on'"
                size="1.4x"
                class="flex"
              />
            </a>
            <a class="ml-5 bg-blue-500 text-white"
              ><PlayIcon size="1.4x" class="flex"
            /></a>
          </span>
          <!-- modal -->
          <modal></modal>
        </div>
        <!-- //controls -->

        <div v-if="status === 'end'" class="text-2xl">
          Share your colored work of art with your entourage or download it
          <a @click="getImage">Download your work of art</a>
        </div>

        <div class="absolute bottom-1 left-1">
          <h2>Help</h2>
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
      <div class="game-board shadow-xl flex flex-col">
        <div id="boardhead" class="flex">
          <div
            class="
              group
              inline-block
              relative
              w-1/4
              h-12
              m-1
              p-1
              text-center
              bg-white
              rounded-xl
              cursor-pointer
              text-gray-400 text-3xl
              font-black
            "
          >
            <div @click="isOpen = !isOpen" class="inline-flex items-center">
              {{ whiteCount }}
              <ChevronDownIcon
                v-if="whiteCount > 0"
                class="float-right mt-3"
                size="0.8x"
              />
            </div>
            <ul
              v-if="isOpen && whiteCount > 0"
              class="absolute block rounded-lg w-5/6 bg-gray-100 pt-3 p-2"
            >
              <li
                @click="switchColor('red')"
                class="rounded-xl h-10 m-1 red"
              ></li>
              <li
                @click="switchColor('blue')"
                class="rounded-xl h-10 m-1 blue"
              ></li>
              <li
                @click="switchColor('yellow')"
                class="rounded-xl h-10 m-1 yellow"
              ></li>
              <li
                @click="switchColor('orange')"
                class="rounded-xl h-10 m-1 orange"
              ></li>
              <li
                @click="switchColor('green')"
                class="rounded-xl h-10 m-1 green"
              ></li>
              <li
                @click="switchColor('purple')"
                class="rounded-xl h-10 m-1 purple"
              ></li>
            </ul>
          </div>
          <div class="w-2/4 rounded-xl h-12 m-1" :class="mcolor">&nbsp;</div>
          <div
            @click="switchColor('black')"
            class="w-1/4 h-12 rounded-xl mb-1 bg-black cursor-pointer m-1"
          >
            &nbsp;
          </div>
        </div>
        <span id="core-board">
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
        </span>
      </div>
      <!-- /board game -->
    </div>
  </div>
</template>

<script>
import RulesEngines, { rulesengine } from '~/plugins/rulesengine.js'
import BonusEngine, { bonusengine } from '~/plugins/bonusengine.js'
import domtoimage from 'dom-to-image'

import {
  TrashIcon,
  PauseIcon,
  SaveIcon,
  LogoutIcon,
  PlayIcon,
  VolumeUpIcon,
  VolumeOffIcon,
  RefreshIcon,
  ChevronDownIcon,
} from '@vue-hero-icons/outline'
import { Howl } from 'howler'

export default {
  components: {
    TrashIcon,
    PauseIcon,
    SaveIcon,
    LogoutIcon,
    PlayIcon,
    VolumeUpIcon,
    VolumeOffIcon,
    RefreshIcon,
    ChevronDownIcon,
  },
  data() {
    return {
      isOpen: false, //white tile dropdown
      firstMove: true, // start wherever you want
      bonusPhase: false, // the bonus phase happens at the end of the game if you still
      tileCount: 1, // number of place tiles
      whiteCount: 0,
      gameMessage: 'Start game by clicking on the board',
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
          whites: 0,
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

      status: 'not-started', // Game status: 'started' 'not-started', 'paused', 'playing' or 'ended'
      soundStatus: 'on', // Sound status: 'on' or 'off'
      sounds: {
        // Vars needed for sounds effects
        tapCorrect: null,
        tapWrong: null,
        tapBlack: null,
        getWhite: null,
        endGame: null,
        bonusPhase: null,
        scoreCalc: null,
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
      //this.sounds.bg.play()

      // re iniiate tile count
      this.tileCount = 1
      // clearBoard
      this.board = {
        1: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
        2: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
        3: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
        4: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
        5: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
        6: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
        7: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
        8: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
      }
      // first move is now true
      this.firstMove = true
      // init players score
      this.players[0].score = 0
      this.players[0].moves = 0
      this.whiteCount = 0
      this.status = 'start'
    }, // init
    getImage() {
      domtoimage
        .toJpeg(document.getElementById('core-board'), { quality: 0.95 })
        .then(function (dataUrl) {
          var link = document.createElement('a')
          link.download = 'primares-game.jpeg'
          link.href = dataUrl
          link.click()
        })
    },
    move(e) {
      this.mcolor = e
    },
    movet(e) {},
    rollDices() {
      let dice1 = Math.ceil(Math.random() * 6)
      this.mcolor = this.colors[dice1 - 1]
      setTimeout(() => {}, 10)
    },
    switchColor(color) {
      this.mcolor = color
      this.isOpen = false
      if (this.whiteCount > 0 && this.status !== 'bonus') this.whiteCount--
    },
    click(e) {
      // increment moves
      if (this.tileCount < 63) {
        this.movet(e)
        this.players[this.current_player].moves++
        console.log(e.target)
        console.log(e.toElement)
        if (!this.firstMove) {
          var tile =
            this.board[e.target.dataset.pos.split('')[0]][
              e.target.dataset.pos.split('')[1]
            ]
          if (
            tile === '' &&
            rulesengine.rules(this.mcolor, e.target.dataset.pos, this.board)
          ) {
            this.board[e.target.dataset.pos.split('')[0]][
              e.target.dataset.pos.split('')[1]
            ] = this.mcolor
            this.sounds.tapCorrect.play()
            this.players[0].score =
              this.players[0].score + this.points[this.mcolor]
            this.tileCount++
            // get white tiles
            this.whiteCount =
              this.whiteCount +
              rulesengine.whites(this.mcolor, e.target.dataset.pos, this.board)
            this.rollDices()
          } else {
            this.sounds.tapWrong.play()
            this.players[0].score--
          }
        } else {
          // the first move section (no control)
          this.status = 'started'
          this.gameMessage = 'Game Started'
          this.board[e.target.dataset.pos.split('')[0]][
            e.target.dataset.pos.split('')[1]
          ] = this.mcolor
          this.sounds.tapCorrect.play()
          this.firstMove = false
          this.players[0].score =
            this.players[0].score + this.points[this.mcolor]
          this.tileCount++
        } // first modve end
        // if no more tiles and no bonuses
      } else if (this.whiteCount === 0) {
        this.sounds.tapWrong.play()
        this.gameMessage = 'Game has ended'
        this.status = 'end'
        console.log(this.board)
      } else {
        this.gameMessage = 'Entered Bonus phase'
        this.status = 'bonus'
        console.log('bonus phase')
        if (rulesengine.rules(this.mcolor, e.target.dataset.pos, this.board)) {
          this.board[e.target.dataset.pos.split('')[0]][
            e.target.dataset.pos.split('')[1]
          ] = this.mcolor
          this.sounds.tapCorrect.play()
          this.players[0].score =
            this.players[0].score + this.points[this.mcolor]
          this.whiteCount--
          if (this.whiteCount === 0) {
            this.players[0].score =
              this.players[0].score + bonusengine.bonus(this.board)
            this.gameMessage = 'Game has ended'
            this.status = 'end'
          }
        }
      }
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
