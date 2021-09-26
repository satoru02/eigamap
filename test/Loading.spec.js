import { mount } from '@vue/test-utils'
import Loading from '@/components/Loading.vue'

describe("Loading", () => {
  const wrapper = mount(Loading)

  test("is rendered", () => {
    expect(wrapper.vm).toBeTruthy()
  })
})