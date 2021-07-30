<template>
  <div class="relative">
    <div
      :data-tcolor="tcolor"
      class="tile shadow"
      :class="[tcolor]"
      @dragstart="startDrag(tcolor)"
      :draggable="draggable"
    ></div>
    <div
      v-if="primary"
      class="absolute rounded-full right-2 top-2 w-1 h-1 bg-white"
    ></div>
  </div>
</template>
<script>
export default {
  props: {
    tcolor: { type: String, default: 'red', required: true },
    draggable: { type: Boolean, default: false },
    primary: { type: Boolean, default: false },
    size: { type: Number, default: 50 },
  },
  methods: {
    startDrag(event) {
      console.log(event)
      this.$emit('move', event)
      // event.dataTransfer.setData('tileColor', tcolor)
    },
  },
}
</script>
<style scoped>
.tile {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 2px;
  border: 1px solid #fefeee;
}
</style>
