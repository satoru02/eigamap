<template>
  <section>
    <select v-if="this.movieScreenInfo" v-model="selectedDate" class="rounded-sm text-xl font-semibold bg-black mb-6 text-white">
      <option v-for="(day, index) in daysOfWeek" :key="index" :value="day">
        {{ screeningDate(index) }}
      </option>
    </select>
    <div v-if="this.movieScreenInfo" class="flex items-center mb-6">
      <div class="font-semibold text-gray-100 text-sm mr-4">
        この映画館をシェア
      </div>
      <a :href="`https://twitter.com/intent/tweet?&text=${theaterName}&hashtags=映画MAP&url=https://domain&screen_name=映画MAP`"
        class="font-semibold cursor-pointer hover:text-indigo-600 text-xs mr-3 text-gray-300">
        <BaseIcon icon-name="icon-theater-mark" :viewBox="'0 0 512 512'" :iconColor="'#ffffff'" :height="'25'"
          :width="'25'">
          <TwitterIcon />
        </BaseIcon>
      </a>
      <a :href="`https://www.facebook.com/sharer.php?u=https://domain&t=${theaterName}`"
        class="font-semibold cursor-pointer hover:text-indigo-600 text-xs mr-3 text-gray-300">
        <BaseIcon icon-name="icon-theater-mark" :viewBox="'0 0 512 512'" :iconColor="'#ffffff'" :height="'25'"
          :width="'25'">
          <FacebookIcon />
        </BaseIcon>
      </a>
    </div>
    <div v-if="movieScreenInfo" class="font-semibold text-gray-400 mb-5">
      ※上映予定は、急遽変更になる可能性があります。上映時間直前の最新情報は、公式ホームページをご確認ください。
    </div>
    <div v-for="(movie,index) in movieScreenInfo[0]" :key="index" class="pb-7 sm:pb-9 bg-black sm:rounded-lg">
      <h2 class="text-xl text-white font-semibold">
        {{ movie.title }}
      </h2>
      <div v-if="selectedDate === 0" class="flex flex-wrap">
        <div v-for="(date, index) in movie.props[0][selectedDate]" :key="index"
          :class="checkTime(date.time) ? 'time-button mr-4 mt-4 cursor-pointer hover:text-blue-600' : 'finish-time-button mr-4 mt-4 cursor-pointer'">
          {{ date.time }}
        </div>
      </div>
      <div v-else class="flex flex-wrap">
        <div v-for="(date, index) in movie.props[0][selectedDate]" :key="index" class="time-button mr-4 mt-4 cursor-pointer hover:text-blue-600">
          {{ date.time }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'InfoSection',
    components: {
      'BaseIcon': () => import('~/components/icon/BaseIcon.vue'),
      'TwitterIcon': () => import('@/components/icon/TwitterIcon.vue'),
      'FacebookIcon': () => import('@/components/icon/FacebookIcon.vue'),
    },
    props: {
      movieScreenInfo: {
        type: '',
        default: []
      },
      theaterName: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        localizedToday: new Date().toLocaleDateString('ja'),
        hours: '',
        minutes: '',
        todayNumber: '',
        selectedDate: '',
        nameOfDays: ['日', '月', '火', '水', '木', '金', '土'],
        daysOfWeek: [],
      }
    },
    mounted() {
      const today = new Date()
      this.hours = today.getHours()
      this.minutes = today.getMinutes()
      this.todayNumber = today.getDay()
      this.daysOfWeek = this.setDaysOfWeek()
      this.selectedDate = this.daysOfWeek[0]
    },
    methods: {
      setDaysOfWeek() {
        let remainingDays;
        let days = []

        if((this.todayNumber === 5) || (this.todayNumber === 6)){
          remainingDays = this.todayNumber + 7
        } else {
          remainingDays = 8 - this.todayNumber
        }

        for (let i = this.todayNumber; i < remainingDays; i++) {
          if ((this.todayNumber === 5) || (this.todayNumber === 6)) {
            days.push(i - 5)
          } else {
            days.push(i + 2)
          }
        }
        return days
      },
      selectDate(date) {
        let today = new Date()
        return today.setDate(today.getDate() + date)
      },
      screeningDate(date) {
        let options = { month: 'long', day: 'numeric' }
        let day = new Date(this.selectDate(date)).toLocaleDateString('ja', options)
        let nameOfday = this.nameOfDays[new Date(this.selectDate(date)).getDay()]
        return day + "（" + nameOfday + "）"
      },
      checkTime(time) {
        let screenTime = this.localizedToday + " " + `${time}`
        let currentTime = this.localizedToday + " " + this.hours + ":" + this.minutes
        if (Date.parse(currentTime) < Date.parse(screenTime)) {
          return true
        } else {
          return false
        }
      }
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

  .time-button {
    @apply bg-indigo-600 rounded-md px-8 py-1 text-lg font-semibold text-white;

    &:hover {
      @apply bg-gray-300;
    }
  }

  .finish-time-button {
    @apply bg-gray-600 rounded-md px-8 py-1 text-lg font-semibold text-white;

    &:hover {
      @apply bg-gray-300;
    }
  }
</style>
