<template>
  <section>
    <ul v-if="this.info">
      <li v-for="(day, index) in daysOfWeek" :key="index" @click="changeDays(day)" class="mr-3 mt-2 cursor-pointer">
        <p class="text-base text-gray-500 hover:text-blue-500 font-medium">{{ daysToWeekend(index) }}</p>
      </li>
    </ul>
    <div class="mt-8 bg-white sm:rounded-lg p-6" v-for="(movie,index) in info[0]" :key="index">
      <h2 class="text-xl leading-7 font-semibold">
        {{ movie.title }}
      </h2>
      <p class="new_badge mt-3 text-gray-600 text-base"
        v-for="(date, index) in movie.props[0][cnmDayCount]" :key="index">
        {{ date.time }}
      </p>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'InfoSection',
    data() {
      return {
        daysOfWeek: [],
        cnmDayCount: ''
      }
    },
    props: {
      info: {
        type: "",
        default: ""
      },
    },
    created() {
      this.daysOfWeek = this.setDaysToWeekend()
    },
    computed: {
    },
    methods: {
      setDaysToWeekend() {
        let today = new Date(Date.now())
        let todayNumber = today.getDay()
        let ary = []
        for (let i = todayNumber; i < 7; i++) {
          ary.push(i)
        }
        return ary
      },
      setTargetDay(targetDay){
        let day = new Date()
        day.setDate(day.getDate() + targetDay)
        return day
      },
      daysToWeekend(daysIndex) {
        let options = {　month: 'long',　day: 'numeric'}
        let day = this.setTargetDay(daysIndex)
        return new Date(day).toLocaleDateString('ja', options)
      },
      changeDays(targetDay){
        this.cnmDayCount = targetDay
      },
    }
  }
</script>

<style lang="postcss">
ul {
  list-style-type: none;
  margin: 0;
  padding: 5%;
  overflow: hidden;
}

li {
  float: left;
}
</style>