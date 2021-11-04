<template>
  <div class="p-8">
    <div class="grid grid-cols-1 place-items-center">
      <div class="text-3xl font-bold">Your Score</div>
      <div class="text-8xl font-extrabold">{{ score }}</div>
      <div class="mt-4">
        <div class="grid grid-cols-4 gap-2">
          <div><span class="font-bold">Moves :</span> {{ moves }}</div>
          <div>
            <span class="font-bold">4 square :</span>
            <span>{{ squares[4] }}</span>
          </div>
          <div>
            <span class="font-bold">3 square :</span>
            <span>{{ squares[3] }}</span>
          </div>
          <div>
            <span class="font-bold">2 square :</span>
            <span>{{ squares[2] }}</span>
          </div>
        </div>
      </div>
      <hr />
      <div id="modalcontrols" class="justify-center flex flex-col">
        <div v-if="displayForm" class="m-2 flex flex-col">
          <div class="font-bold flex-none">Record in Hall of Fame</div>
          <input
            class="p-2 rounded-xl bg-gray-100 border"
            placeholder="Player"
            type="text"
            maxlength="12"
            v-model="player"
          />

          <button
            @click="recordScore"
            class="
              bg-green-500
              font-bold
              text-white
              p-2
              leading-none
              rounded-xl
              mt-1
              cursor-pointer
            "
            :class="[loading ? 'disabled' : '', '']"
          >
            Go
          </button>
        </div>
        <!-- <div v-if="!displayForm" class="mb-2">
          <nuxt-link class="cursor-pointer" to="hof"
            >Browse Hall of Fame</nuxt-link
          >
        </div> -->
        <button
          class="
            bg-blue-500
            mt-2
            font-bold
            text-white
            p-2
            rounded
            cursor-pointer
          "
          @click="$emit('download')"
        >
          Download grid image
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    score: {
      type: Number,
      default: 475,
    },
    moves: {
      type: Number,
      default: 90,
    },

    squares: {
      type: Number,
      default: 0,
    },
    playtime: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {
      loading: false,
      displayForm: true,
      player: '',
    }
  },
  methods: {
    async recordScore() {
      this.loading = true
      let docRef = null //  to save the recently added ref
      const primaresScore = this.$fire.firestore
        //.collection('users')
        // .doc(this.currentUser.uid)
        .collection('score')
      // .doc('journal') // if add
      try {
        await primaresScore
          .add({
            //   set to replace and add to add
            score: this.score,
            moves: this.moves,
            square4: this.squares[4],
            square3: this.squares[3],
            square2: this.squares[2],
            playtime: this.playtime,
            entry_date: Date.now(),
            player: this.player,
          })
          .then((docid) => {
            docRef = docid.id
            this.displayForm = false
            this.$toast.success(
              '<span class="font-extrabold mx-auto text-center text-xl">Recorded in the Hall of fame</span>'
            )
            this.$emit('close')
          })
      } catch (e) {
        this.$toast.error('Ooops, something went wrong ...like...' + e)
      }
    }, //readScore
  },
}
</script>
