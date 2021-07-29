<template>
  <section>
    <ul>
      <li v-for="(day, index) in daysOfWeek" :key="index" @click="changeDay(day)">
        {{ setWeekDays(index) }}
      </li>
    </ul>
    <div class="mt-8 bg-white sm:rounded-lg p-6" v-for="(movie,index) in info[0]" :key="index">
      <h2 class="text-xl leading-7 font-semibold">
        {{ movie.title }}
      </h2>
      <p class="new_badge mt-3 text-gray-600 text-base"
        v-for="(date, index) in movie.props[0][getDayOfWeek(dayChanger)]" :key="index">
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
        dayChanger: Date.now(),
        daysOfWeek: []
      }
    },
    props: {
      info: {
        type: "",
        default: ""
      },
    },
    created() {
      this.daysOfWeek = this.setDays()
    },
    methods: {
      setDays() {
        let today = new Date(Date.now())
        let daysAry = []
        for (let i = today.getDay(); i < 7; i++) {
          daysAry.push(i)
        }
        return daysAry
      },
      setWeekDays(dayCount) {
        let options = {　month: 'long',　day: 'numeric'}
        let day = new Date()
        day.setDate(day.getDate() + dayCount)
        return new Date(day).toLocaleDateString('ja', options)
      },
      getDayOfWeek(date) {
        let day = new Date(date)
        let dayOfWeek = day.getDay()
        return dayOfWeek
      },
      changeDay(targetDay){
        let day = new Date()
        day.setDate(day.getDate() + targetDay)
        this.dayChanger = day.getDay()
      }
    }
  }
</script>
