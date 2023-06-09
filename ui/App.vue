
<template>
  <header class="px-4 py-2 border">
    <input v-model="shareLink" placeholder="please enter the link" class="w-full h-9 border p-2 text-sm" type="text" />
  </header>
  <section class="flex p-4 ">
    <canvas id="canvas" class="m-auto"></canvas>
  </section>
  <footer class="absolute bottom-2 left-0 right-0">
    <p class="text-xs text-center text-slate-300">
      © 2023. Powered by Mrwang007s.
    </p>
  </footer>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import QRCode from 'qrcode';
const shareLink = ref('https://www.baidu.com/')
let canvas:any = null

// 在组件挂载之后
onMounted(() => {
  canvas = document.getElementById('canvas');
  debugger
  if (shareLink.value) {
    createCanvas(canvas, shareLink.value)
  }
});

watch(shareLink, (newVal, oldVal) => {
  createCanvas(canvas, newVal)
})

function createCanvas(canvas: Element, newVal: string) {
  QRCode.toCanvas(canvas, newVal, {
    margin: 0,
    width: 220
  }, function (error: any) {
    if (error) console.error(error)
    console.log('success!');
    // TODO: 添加中心Logo
    // var logo = new Image();
    // logo.src = 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg';
    // logo.onload = function() {
    //   var ctx = canvas.getContext('2d');
    //   var logoSize = canvas.width * 0.2; // Logo 大小为二维码尺寸的 20%
    //   ctx.drawImage(logo, (canvas.width - logoSize) / 2, (canvas.height - logoSize) / 2, logoSize, logoSize); // 将 Logo 居中绘制
    // };
  })
}

</script>
