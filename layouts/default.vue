<template>
  <div class="safe-top safe-left safe-right safe-bottom">
    <div class="max-h-screen h-full overflow-y-scroll">
      <Nuxt />
    </div>
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  background-image: url('assets/clearwood.jpg');
  -webkit-font-smoothing: antialiased;
}
</style>
