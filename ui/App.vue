
<template>
  <section class="flex justify-center my-4">
    <div class="border p-2 rounded">
      <canvas id="canvas"></canvas>
    </div>
  </section>
  <div class="flex justify-center">
    <textarea v-model="shareLink" name="" id="" cols="30" rows="2" class="border rounded p-2"></textarea>
  </div>
  <div class="flex justify-between items-center py-2 px-4">
    <a class="text-slate-400" href="https://github.com/Mr-wang007s/QrLink" target="_blank">
      <svg viewBox="0 0 16 16" class="w-5 h-5" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
    </a>
    <button class="px-4 py-1 text-sm text-blue-500 border rounded hover:text-blue-600" @click="downloadImage">下载</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import QRCode from 'qrcode';
const shareLink = ref('https://github.com/Mr-wang007s/QrLink')
let canvas:any = null

// 在组件挂载之后
onMounted(() => {
  canvas = document.getElementById('canvas');
  if (shareLink.value) {
    createCanvas(canvas, shareLink.value)
  }
});

watch(shareLink, (newVal, oldVal) => {
  createCanvas(canvas, newVal)
})

function createCanvas(canvas: Element, newVal: string) {
  QRCode.toCanvas(canvas, newVal, { 
    margin: 1,
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

function downloadImage() {
  const dataURL = canvas.toDataURL('image/jpeg', 1.0);
  const link = document.createElement('a');
  link.download = 'my-share-qr.jpeg';
  link.href = dataURL;
  link.click();
}

</script>
