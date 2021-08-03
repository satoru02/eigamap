<template>
  <section>
    <select v-if="this.info" v-model="selectedDay" class="rounded-sm text-xl font-semibold bg-black mb-6 text-white">
      <option v-for="(day, index) in daysOfWeek" :key="index" :value="index">
        {{ daysToWeekend(index) }}
      </option>
    </select>
    <div class="font-semibold text-gray-400 mb-5" v-if="info">
      ※上映予定は、急遽変更になる可能性があります。上映時間直前の最新情報は、公式ホームページをご確認ください。
    </div>
    <div class="pb-7 sm:pb-9 bg-black sm:rounded-lg" v-for="(movie,index) in info[0]" :key="index">
      <h2 class="text-xl text-white font-semibold">
        {{ movie.title }}
      </h2>
      <div class="flex flex-wrap">
        <div class="badge mr-4 mt-4 cursor-pointer hover:text-blue-600"
          v-for="(date, index) in movie.props[0][selectedDay]" :key="index">
          {{ date.time }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'InfoSection',
    data() {
      return {
        daysOfWeek: [],
        selectedDay: 0
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
      setTargetDay(targetDay) {
        let day = new Date()
        day.setDate(day.getDate() + targetDay)
        return day
      },
      daysToWeekend(daysIndex) {
        let options = {
          month: 'long',
          day: 'numeric'
        }
        let day = this.setTargetDay(daysIndex)
        return new Date(day).toLocaleDateString('ja', options)
      },
      getCurrentTime() {}
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
  .badge {
    @apply bg-indigo-600 rounded-md px-8 py-1 text-lg font-semibold text-white;
    &:hover {
      @apply bg-gray-300;
    }
  }
</style>