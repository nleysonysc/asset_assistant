<script setup>
  import { onMounted, ref } from 'vue';
import { useAssetStore } from '../stores/assetStore'
  
  let assetStore = useAssetStore();
  let stream;
  let videoEl = ref(null)

  onMounted(async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {
            ideal: "environment"
          }
        },
        audio: false
      });
    } 
    catch (e) {
      if (e.name === "NotFoundError"){
        console.log("A camera could not be found")
      }
      else if (e.name === "NotAllowedError"){
        console.log("Camera access was not allowed")
      }
      return false;
    }

    videoEl.srcObject = stream;
    await videoEl.play();
    const barcodeDetector = new BarcodeDetector({formats: ['code_128', 'qr_code']});
    window.setInterval(async () => {
      const barcodes = await barcodeDetector.detect(videoEl);
      if (barcodes.length <= 0) return;
      alert(barcodes.map(barcode => barcode.rawValue));
    }, 600)
  });

</script>

<template>
  <div>
    <video ref="videoEl" />
  </div>
</template>

<style scoped>

</style>