import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HomeLanding from '../home/HomeLanding.vue'

describe('HomeLanding', () => {
  it('renders properly', () => {
    const wrapper = mount(HomeLanding, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
