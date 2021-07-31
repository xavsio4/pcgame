<template>
  <div>
    <div
      class="
        hidden
        overflow-x-hidden overflow-y-auto
        fixed
        inset-0
        z-50
        outline-none
        focus:outline-none
        justify-center
        items-center
      "
      id="modal-score"
    >
      <div class="relative w-auto my-6 mx-auto max-w-sm">
        <!--content-->
        <div
          class="
            border-0
            rounded-lg
            shadow-lg
            relative
            flex flex-col
            w-full
            bg-white
            outline-none
            focus:outline-none
          "
        >
          <!--header-->

          <!--body-->
          <div class="relative p-8 flex-auto">
            <p class="text-center text-lg">Your score</p>
            <p class="font-extrabold text-gray-500 text-8xl leading-relaxed">
              85
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="hidden opacity-25 fixed inset-0 z-40 bg-black"
      id="modal-score-backdrop"
    ></div>
  </div>
</template>
<script>
export default {
  props: {
    content: String,
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    toggleModal(modalID) {
      document.getElementById(modalID).classList.toggle('hidden')
      document.getElementById(modalID + '-backdrop').classList.toggle('hidden')
      document.getElementById(modalID).classList.toggle('flex')
      document.getElementById(modalID + '-backdrop').classList.toggle('flex')
    },
  },
}
</script>
