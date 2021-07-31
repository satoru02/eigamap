<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" :viewBox="viewBox"
    :aria-labelledby="iconName" role="presentation">
    <title :id="iconName" lang="en">{{ iconName }} icon</title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<script>
  export default {
    name: "IconBase",
    props: {
      viewBox: {
        type: String,
      },
      iconName: {
        type: String,
        default: 'box'
      },
      width: {
        type: [Number, String],
        default: 18
      },
      height: {
        type: [Number, String],
        default: 18
      },
      iconColor: {
        type: String,
        default: '#ffffff'
      }
    }
  }
</script>