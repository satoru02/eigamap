<template>
<section>
  <div class="mt-8 bg-white sm:rounded-lg p-6" v-for="(movie,index) in info[0]" :key="index">
    <h2 class="text-xl leading-7 font-semibold">
      {{ movie.title }}
    </h2>
    <p class="new_badge mt-3 text-gray-600 text-base" v-for="(date, index) in movie.props[0][0]" :key="index">
      {{ date.time }}
    </p>
  </div>
</section>
</template>

<script>
export default {
  name: 'InfoCard',
  data(){
    return {
      target_date: ''
    }
  },
  props: {
    info: {
      type: "",
      default: ""
    },
  },
  computed: {
    //　change movie.props[0][i] by target_date
  }
}
</script>
