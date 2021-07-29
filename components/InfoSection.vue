<template>
<section>

  <ul>
    <li v-for="(day, index) in days" :key="index">
      {{ setWeekDays(index) }}
    </li>
  </ul>

  <div class="mt-8 bg-white sm:rounded-lg p-6" v-for="(movie,index) in info[0]" :key="index">
    <h2 class="text-xl leading-7 font-semibold">
      {{ movie.title }}
    </h2>
    <p class="new_badge mt-3 text-gray-600 text-base" v-for="(date, index) in movie.props[0][getDayOfWeek(dayChanger)]" :key="index">
      {{ date.time }}
    </p>
  </div>
</section>
</template>

<script>
export default {
  name: 'InfoSection',
  data(){
    return {
      targetDayOfWeek: this.changeDayOfWeek(),
      dayChanger: Date.now(),
      days: this.setDays()
    }
  },
  props: {
    info: {
      type: "",
      default: ""
    },
  },
  methods: {
    setDays(){
      let today = new Date(Date.now())
      let restDaysOfWeek = 7 - today.getDay()
      return restDaysOfWeek
    },
    setWeekDays(dayCount){
      let options = { month: 'long', day: 'numeric' }
      let today = new Date().toLocaleDateString('ja', options)
      var nextDay = new Date()

      switch(dayCount){
        // case 0 :
        //   return today
        default :
          nextDay.setDate(nextDay.getDate() + dayCount)
          return new Date(nextDay).toLocaleDateString('ja', options)
      }
    },
    changeDayOfWeek(){
      this.dayChanger = ''
    },
    getDayOfWeek(date){
      let day = new Date(date)
      let dayOfWeek = day.getDay()
      return dayOfWeek
    }
  }
}
</script>
