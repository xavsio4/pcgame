<template>
  <div class="p-0 md:p-6">
    <div class="grid grid-cols-1">
      <!-- left column -->

      <!-- Outside controls -->
      <div class="mx-auto w-4/5 p-4 inline-block">
        <div class="flex flex-row justify-between">
          <div class="w-4/12 md:w-3/12 float-left">
            <!-- <div
              class="
                text-gray-700
                bg-gray-200
                text-center
                p-2
                rounded-md
                font-semibold
              "
            >
              00:00:00
            </div>-->
          </div>
          <div
            class="
              w-2/12
              md:w-6/12
              p-3
              text-center
              rounded-md
              text-black
              font-bold
              leading-none
            "
          >
            <div class="text-center hidden md:block">
              {{ gameMessage }}
            </div>
          </div>
          <div class="w-6/12 md:w-3/12">
            <div class="flex flex-row">
              <button
                class="
                  p-2
                  flex
                  bg-gradient-to-r
                  from-green-400
                  to-blue-500
                  text-white
                  cursor-pointer
                  rounded-md
                  mr-2
                "
                v-if="status === 'end'"
              >
                <ShareIcon size="1.2x" class="flex" />
              </button>
              <button
                v-if="status === 'end'"
                @click="getImage"
                title="Download a jpeg of your board"
                class="
                  p-2
                  flex
                  bg-gradient-to-r
                  from-green-400
                  to-blue-500
                  text-white
                  cursor-pointer
                  rounded-md
                  mr-2
                "
              >
                <ArrowCircleDownIcon size="1.2x" class="flex" />
              </button>
              <button
                @click="$modal.show('helpmodal')"
                title="Help"
                class="
                  p-2
                  flex
                  bg-blue-500
                  text-white
                  cursor-pointer
                  rounded-md
                  mr-2
                "
              >
                <InformationCircleIcon size="1.2x" class="flex" />
              </button>
              <nuxt-link
                class="
                  text-black
                  rounded-md
                  border-solid border-black
                  flex
                  cursor-pointer
                "
                to="hof"
                >HoF</nuxt-link
              >
              <button
                title="Restart Game"
                class="
                  p-2
                  flex
                  bg-blue-500
                  text-white
                  cursor-pointer
                  rounded-md
                "
                @click="init"
              >
                <RefreshIcon size="1.2x" class="flex" />
              </button>

              <button
                @click="switchSound()"
                class="
                  ml-1
                  p-2
                  flex
                  bg-blue-500
                  text-white
                  cursor-pointer
                  rounded-md
                "
                title="Toggle Sound"
              >
                <VolumeUpIcon
                  v-if="soundStatus === 'on'"
                  size="1.2x"
                  class="flex"
                />
                <VolumeOffIcon
                  v-if="soundStatus !== 'on'"
                  size="1.2x"
                  class="flex"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- BOARD GAME -->
      <div
        class="
          mt-1
          game-board
          shadow-xl
          flex flex-col
          mx-auto
          bg-gray-100
          rounded-lg
          border
        "
      >
        <!-- Seconde head -->
        <div id="boardhead" class="flex">
          <div
            class="
              group
              inline-block
              relative
              w-3/12
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
          <div
            class="
              w-6/12
              bolder
              p-2
              flex
              justify-center
              text-white
              rounded-xl
              h-12
              m-1
            "
            :class="mcolor"
          >
            <div
              class="content-center hidden md:block"
              :class="status === 'end' ? 'text-black' : 'text-white'"
            >
              <span class="font-bold">Moves:</span>
              {{ players[0].moves }}
              <span class="font-bold">Scores:</span>
              {{ players[0].score }}
              <span class="font-bold">Tiles:</span>
              {{ 64 - tileCount }}
            </div>
          </div>
          <div
            v-if="enabledBlack"
            @click="switchColor('black')"
            class="w-3/12 h-12 rounded-xl mb-1 bg-black cursor-pointer m-1"
          >
            &nbsp;
          </div>
        </div>
        <span id="core-board" :class="'cursor_' + mcolor">
          <div v-for="(r, idx) in board" :key="idx" class="flex flex-row">
            <div
              v-for="(c, index) in r"
              :key="index"
              :data-pos="idx + index"
              @dragover.prevent="allowDrop"
              @dragleave="dragleave"
              @click="click"
              class="
                m-1
                bg-gray-200
                rounded-lg
                flex
                justify-center
                w-9
                h-9
                hover:bg-gray-400
                md:w-16 md:h-16
              "
              :class="[c]"
            ></div>
          </div>
        </span>
      </div>
      <div
        class="
          mx-auto
          rounded-xl
          bg-gray-100
          p-2
          content-center
          mt-4
          text-lg
          md:hidden
        "
      >
        <span class="font-bold">Moves:</span>
        <span class="rounded-xl font-bold text-white bg-pink-300 p-1">{{
          players[0].moves
        }}</span>
        <span class="font-bold">Points:</span>
        <span class="rounded-xl font-bold text-white bg-pink-300 p-1">
          {{ players[0].score }}</span
        >
        <span class="font-bold">Tiles:</span>
        <span class="rounded-xl font-bold text-white bg-pink-300 p-1">{{
          64 - tileCount
        }}</span>
      </div>
      <div class="text-center font-bold p-2 md:hidden">
        {{ gameMessage }}
      </div>
      <!-- /board game -->
    </div>
    <modal name="endgame" :width="330" :height="440" :adaptive="true">
      <end-modal
        @download="getImage"
        :score="players[0].score"
        :moves="players[0].moves"
        :squares="players[0].squareCounts"
      ></end-modal
    ></modal>
    <modal
      name="helpmodal"
      class="m-3"
      :adaptive="true"
      :height="300"
      :scrollable="true"
    >
      <help-modal></help-modal>
    </modal>
  </div>
</template>

<script>
import RulesEngines, { rulesengine } from '~/plugins/rulesengine.js'
import BonusEngine, { bonusengine } from '~/plugins/bonusengine.js'
import domtoimage from 'dom-to-image'
import EndModal from '~/components/EndModal.vue'
import HelpModal from '~/components/HelpModal.vue'

import {
  TrashIcon,
  ShareIcon,
  PauseIcon,
  SaveIcon,
  LogoutIcon,
  PlayIcon,
  VolumeUpIcon,
  VolumeOffIcon,
  RefreshIcon,
  InformationCircleIcon,
  ChevronDownIcon,
  ArrowCircleDownIcon,
} from '@vue-hero-icons/outline'
import { Howl } from 'howler'

export default {
  components: {
    ArrowCircleDownIcon,
    TrashIcon,
    ShareIcon,
    PauseIcon,
    SaveIcon,
    LogoutIcon,
    PlayIcon,
    VolumeUpIcon,
    VolumeOffIcon,
    RefreshIcon,
    ChevronDownIcon,
    InformationCircleIcon,
    EndModal,
    HelpModal,
  },
  data() {
    return {
      bonusPop: 0,
      isOpen: false, //white tile dropdown
      firstMove: true, // start wherever you want
      bonusPhase: false, // the bonus phase happens at the end of the game if you still
      tileCount: 0, // number of place tiles
      whiteCount: 0,
      enabledBlack: true,
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
          playtime: 0,
          squareCounts: null,
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
        tapCorrect: new Howl({
          src: ['audio/game-tap.mp3'],
          volume: 0.05,
        }),
        tapWrong: new Howl({
          src: ['audio/game-wrong-tap.mp3'],
          volume: 0.15,
        }),
        tapBlack: null,
        getWhite: null,
        endGame: null,
        bonusPhase: null,
        scoreCalc: null,
        win: new Howl({ src: ['audio/game-win.mp3'], volume: 0.4 }),
        lose: new Howl({ src: ['audio/game-lose.mp3'], volume: 0.4 }),
        bg: new Howl({
          src: ['audio/game-background.mp3'],
          loop: true,
          volume: 0.2,
        }),
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
    openmodal() {
      this.$modal.show('endgame')
    },

    init() {
      this.rollDices()
      this.bonusPop = 0
      this.enabledBlack = true

      // re iniiate tile count
      this.tileCount = 0
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
      this.sounds.bg.stop()
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
      if (this.tileCount < 64) {
        //this.movet(e)
        this.players[this.current_player].moves++
        //console.log(e.target)
        //console.log(e.toElement)
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
          if (this.soundStatus === 'on') {
            this.sounds.bg.stop()
            this.sounds.bg.play()
          }
          this.gameMessage = 'Game Started'
          this.$toast.info(
            '<span class="font-extrabold mx-auto text-center text-xl">Game has started</span>'
          )
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
        this.$toast.success(
          '<span class="font-extrabold mx-auto text-center text-xl">Game has ended</span>'
        )
        this.status = 'end'
        console.log(this.board)
      }
      if (this.tileCount === 64 && this.whiteCount !== 0) {
        this.enabledBlack = false
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
            console.log(this.board)
            const bonusResults = bonusengine.bonus(this.board)
            this.players[0].score = this.players[0].score + bonusResults[0]
            this.players[0].squareCounts = bonusResults[1]
            this.mcolor = 'blank'
            this.gameMessage = 'Game has ended'
            this.$toast.info(
              '<span class="font-extrabold mx-auto text-center text-xl">Game has ended</span>'
            )
            this.status = 'end'
            this.$modal.show('endgame')
          }
        }
      }
      if (this.status === 'bonus' && this.bonusPop === 0) {
        this.$toast.global.bonus()
        this.bonusPop = 1
      }
    },

    dragleave(e) {
      e.toElement.className = this.savedClass
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
        if (this.status !== 'start') this.sounds.bg.play()
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

#core-board.cursor_red {
  cursor: url('~assets/red.png'), auto;
}
#core-board.cursor_blue {
  cursor: url('~assets/blue.png'), auto;
}
#core-board.cursor_orange {
  cursor: url('~assets/orange.png'), auto;
}
#core-board.cursor_green {
  cursor: url('~assets/green.png'), auto;
}
#core-board.cursor_purple {
  cursor: url('~assets/purple.png'), auto;
}
#core-board.cursor_yellow {
  cursor: url('~assets/yellow.png'), auto;
}
#core-board.cursor_black {
  cursor: url('~assets/black.png'), auto;
}

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

/* .game-board {
  @apply mx-auto bg-gray-100 rounded-lg border;
   margin: 0 auto;
  background-color: #eee;
  color: #fff;
  border: 6px solid #eee;
  border-radius: 10px;
}*/

/* .box {
  margin: 1px;
  background-color: #ccc;
  border-radius: 6px;
  font-family: Helvetica;
  font-weight: bold;
  font-size: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.6rem;
  height: 2.6rem;
} */

/*.box {
  @apply m-1 bg-gray-200 rounded-lg flex justify-center w-10 h-10;
}

.box:hover {
  background-color: #bbb;
}*/

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
