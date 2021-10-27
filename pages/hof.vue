<template>
  <div class="p-10">
    <div
      class="
        grid grid-col-1
        justify-center
        p-10
        mx-auto
        bg-white
        rounded-xl
        w-full
        md:w-1/2
      "
    >
      <nuxt-link class="mx-auto mb-2 border-solid border-black" to="/"
        >Back to game</nuxt-link
      >
      <div class="text-6xl font-bold">Hall of fame</div>
      <div v-if="loading" class="mt-6 mx-auto font-bold">Loading...</div>
      <ul class="mt-6 mx-auto">
        <li v-for="item in scores" :key="item.id">
          <div class="text-xl font-bold text-gray-500">
            {{ item.data.player }} .......... {{ item.data.score }} pts
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      scores: [],
      loading: false,
    }
  },
  methods: {
    async readScores() {
      this.loading = true
      const scoreRef = this.$fire.firestore
        // .collection('users')
        // .doc(this.currentUser.uid)
        .collection('score')
      // .doc('journal')
      try {
        const snapshot = await scoreRef.orderBy('score', 'desc').get()
        //  const doc = snapshot.data() //  for one doc
        const doc = snapshot.docs.map((dd) => {
          return { id: dd.id, data: dd.data() }
        }) //   all collection
        //  const doc2 = snapshot.docs.map((doc) => doc)
        if (!doc) {
          this.$toast.error('Document not there !')
          return
        }
        this.scores = doc
        this.loading = false
        // this.docEntries = doc2
        console.log(this.scores)
      } catch (e) {
        this.$toast.error('Ooops, the app could not read a thing...' + e)
      }
    },
  },
  mounted() {
    this.readScores()
  },
}
</script>
