
<template>
  <!-- <button @click="getNewString">Hello, {{ mg }}</button> -->
  <input v-model="shareLink" type="text">
  <canvas id="canvas"></canvas>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import QRCode from 'qrcode';
const shareLink = ref('')

watch(shareLink, (newVal, oldVal) => {
  QRCode.toCanvas(document.getElementById('canvas'), newVal, function (error: any) {
    if (error) console.error(error)
    console.log('success!');
  })
})

</script>
