<template>
  <div class="mt-8 bg-white sm:rounded-lg p-6">
    <h2 class="text-xl leading-7 font-semibold">
      ブラックウィドウ
    </h2>
    <p class="new_badge mt-3 text-gray-600 text-base">
      12:00〜14:30
    </p>
  </div>
</template>

<script>
export default {
  name: 'InfoCard',
  props: {
    info: {
      type: Array,
      default: []
    }
  }
}
</script>
