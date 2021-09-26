import { mount } from '@vue/test-utils'
import InfoSection from '@/components/InfoSection.vue'

describe("InfoSection", () => {
  const movieScreenInfo = []
  const theaterName = "THE TCL CHINESE THEATER"
  const componentData = {
    localizedToday: new Date().toLocaleDateString('ja'),
    hours: '0',
    minutes: '00',
    todayNumber: '0',
    selectedDate: '0',
    nameOfDays: ['日', '月', '火', '水', '木', '金', '土'],
    daysOfWeek: [],
  }

  const wrapper = mount(InfoSection, {
    propsData: {
      movieScreenInfo: movieScreenInfo,
      theaterName: theaterName
    }
  })

  test("inherits movieScreenInfo from parent component", () => {
    expect(wrapper.props('movieScreenInfo')).toBe(movieScreenInfo)
  })

  test("inherits theaterName from parent component", () => {
    expect(wrapper.props('theaterName')).toBe(theaterName)
  })

  test("set data", () => {
    wrapper.setData(componentData)
    expect(wrapper.vm.localizedToday).toBe(new Date().toLocaleDateString('ja'))
    expect(wrapper.vm.hours).toBe('0')
    expect(wrapper.vm.minutes).toBe('00')
    expect(wrapper.vm.todayNumber).toBe('0')
    expect(wrapper.vm.selectedDate).toBe('0')
    expect(wrapper.vm.nameOfDays).toStrictEqual(['日', '月', '火', '水', '木', '金', '土'])
    expect(wrapper.vm.daysOfWeek).toStrictEqual([])
  })

  test("checks href to twitter", () => {
    const a = wrapper.findAll('a').at(0);
    expect(a.attributes().href).toBe('https://twitter.com/intent/tweet?&text=THE TCL CHINESE THEATER&hashtags=映画MAP&url=https://domain&screen_name=映画MAP')
  })

  test("checks href to facebook", () => {
    const a = wrapper.findAll('a').at(1);
    expect(a.attributes().href).toBe('https://www.facebook.com/sharer.php?u=https://domain&t=THE TCL CHINESE THEATER')
  })

  test("change movieScreenInfo when user change selected date", async () => {
    await wrapper.setData(
      {
        daysOfWeek:['日', '月', '火', '水', '木', '金', '土'],
        selectedDate: '0'
      }
    )
    const options = wrapper.find('select').findAll('option')
    await options.at(0).setSelected()

    var dayOfWeek = new Date().getDay()
    var dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][dayOfWeek]

    expect(wrapper.find('option:checked').element.value).toBe(dayOfWeekStr)
  })
})