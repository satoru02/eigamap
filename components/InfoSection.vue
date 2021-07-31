<template>
  <section>
    <select v-if="this.info" v-model="selectedDay" class="rounded-sm text-xl mt-3 font-semibold bg-black mb-3 text-gray-300">
      <option v-for="(day, index) in daysOfWeek" :key="index" :value="index">
        {{ daysToWeekend(index) }}
      </option>
    </select>
    <div class="mt-3 bg-white sm:rounded-lg p-6" v-for="(movie,index) in info[0]" :key="index">
      <h2 class="text-lg leading-7 font-semibold">
        {{ movie.title }}
      </h2>
      <div class="hover:bg-blue-400 cursor-pointer border border-gray-300 rounded-3xl mt-4 text-lg text-current"
        v-for="(date, index) in movie.props[0][selectedDay]" :key="index">
        <p class="ml-14">{{ date.time }} </p>
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

  .new_badge {
    @apply border border-gray-300 rounded-lg px-3 py-1 text-lg font-semibold text-current;

    &:hover {
      @apply bg-gray-300;
    }
  }

</style>
