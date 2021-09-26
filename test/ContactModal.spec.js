import { mount } from '@vue/test-utils'
import ContactModal from '@/components/ContactModal.vue'

describe("ContactModal", () => {
  const wrapper = mount(ContactModal)

  test("is rendered", () => {
    expect(wrapper.vm).toBeTruthy()
  })
})