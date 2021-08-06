<template>
  <section>
    <select v-if="this.info" v-model="selectedDay" class="rounded-sm text-xl font-semibold bg-black mb-6 text-white">
      <option v-for="(day, index) in daysOfWeek" :key="index" :value="index">
        {{ daysToWeekend(index) }}
      </option>
    </select>
    <div class="flex items-center mb-6" v-if="this.info">
      <div class="font-semibold text-gray-100 text-sm mr-4">
        この映画館をシェア
      </div>
      <a :href="`https://twitter.com/intent/tweet?&text=${theaterName}&hashtags=映画MAP&url=https://domain&screen_name=映画MAP`"
        class="font-semibold cursor-pointer hover:text-indigo-600 text-xs mr-3 text-gray-300">
        <BaseIcon icon-name="icon-theater-mark" :viewBox="'0 0 512 512'" :iconColor="'#ffffff'" :height="'25'"
          :width="'25'">
          <TwitterMark />
        </BaseIcon>
      </a>
      <a :href="`https://www.facebook.com/sharer.php?u=https://domain&t=${theaterName}`"
        class="font-semibold cursor-pointer hover:text-indigo-600 text-xs mr-3 text-gray-300">
        <BaseIcon icon-name="icon-theater-mark" :viewBox="'0 0 512 512'" :iconColor="'#ffffff'" :height="'25'"
          :width="'25'">
          <FacebookMark />
        </BaseIcon>
      </a>
    </div>
    <div class="font-semibold text-gray-400 mb-5" v-if="info">
      ※上映予定は、急遽変更になる可能性があります。上映時間直前の最新情報は、公式ホームページをご確認ください。
    </div>
    <div class="pb-7 sm:pb-9 bg-black sm:rounded-lg" v-for="(movie,index) in info[0]" :key="index">
      <h2 class="text-xl text-white font-semibold">
        {{ movie.title }}
      </h2>
      <div class="flex flex-wrap" v-if="selectedDay === 0">
        <div
          :class="checkTime(date.time) ? 'time-button mr-4 mt-4 cursor-pointer hover:text-blue-600' : 'finish-time-button mr-4 mt-4 cursor-pointer'"
          v-for="(date, index) in movie.props[0][daysOfWeek[selectedDay]]" :key="index">
          {{ date.time }}
        </div>
      </div>
      <div class="flex flex-wrap" v-else>
        <div class="time-button mr-4 mt-4 cursor-pointer hover:text-blue-600"
          v-for="(date, index) in movie.props[0][daysOfWeek[selectedDay]]" :key="index">
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
        selectedDay: 0,
        currentTime: this.setCurrentTime(),
        today: new Date().toLocaleDateString('ja'),
        nameOfDays: ['日', '月', '火', '水', '木', '金', '土'],
      }
    },
    components: {
      'TwitterMark': () => import('@/components/TwitterMark.vue'),
      'FacebookMark': () => import('@/components/FacebookMark.vue'),
      'BaseIcon': () => import('@/components/BaseIcon.vue'),
    },
    props: {
      info: {
        type: "",
        default: ""
      },
      theaterName: {
        type: String,
        default: ''
      }
    },
    created() {
      this.daysOfWeek = this.setDaysToWeekend()
    },
    methods: {
      setCurrentTime() {
        let now = new Date()
        let currentDay = now.toLocaleDateString('ja')
        let currentTime = currentDay + " " + now.getHours() + ":" + now.getMinutes()
        return currentTime
      },
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
        let day = new Date(this.setTargetDay(daysIndex)).toLocaleDateString('ja', options)
        let nameOfday = this.nameOfDays[new Date(this.setTargetDay(daysIndex)).getDay()]
        return day + "(" + nameOfday + ")"
      },
      checkTime(time) {
        let playingTime = this.today + " " + `${time}`
        if (Date.parse(this.currentTime) < Date.parse(playingTime)) {
          return true
        } else {
          return false
        }
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
