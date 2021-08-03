<template>
  <div>
    <p>Hello</p>
    <BaseIcon icon-name="icon-theater-mark" :viewBox="'0 0 410 410'" :iconColor="'#ffea00'" :height="'20'"
      :width="'20'">
      <UploadMark />
    </BaseIcon>
  </div>
</template>

<script>
  import BaseIcon from './BaseIcon.vue';
  import UploadMark from './UploadMark.vue';

  export default {
    name: "LinkModal",
    components: {
      BaseIcon,
      UploadMark
    }
  }

</script>
