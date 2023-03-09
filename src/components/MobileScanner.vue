<script setup>
  import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  
  let assetTag = ref("")
  let router = useRouter()
  let stream;
  let videoEl = ref(null)
  let scanInterval = ref()

  let props = defineProps({
    onNavigate: Function
  })

  watch(assetTag, (newTag) => {
    if (newTag.match(/^[a-zA-Z]{2}[a-zA-Z0-9]{2}\d{4}$/)){
      if (typeof props.onNavigate == "function") {props.onNavigate(newTag)}
      router.push({name: 'assetByTag', params: {'assetTag': newTag}})
    }
  })

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
    videoEl.value.srcObject = stream;
    await videoEl.value.play();
    const barcodeDetector = new BarcodeDetector({formats: ['code_128', 'qr_code']});
    scanInterval.value = window.setInterval(async () => {
      const barcodes = await barcodeDetector.detect(videoEl.value);
      if (barcodes.length <= 0) return;
      console.log(barcodes);
      assetTag.value = barcodes[0].rawValue
    }, 500)
  });

  onBeforeUnmount(async () => {
    clearInterval(scanInterval.value)
  })

</script>

<template>
  <div>
    <video ref="videoEl" />
  </div>
</template>

<style scoped>

</style>