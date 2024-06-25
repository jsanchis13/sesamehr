<template>
  <div v-for="(bloque, index) in menuItems" :key="index">
    <div class="flex items-center justify-between w-full">
      <div
        class="text-m font-light tracking-wide text-gray-500 flex justify-between w-full items-center"
        @click="toggleMenuManager('items', index)"
      >
        {{ bloque.label }}
        <img class="icon" :src="arrowIcon" />
      </div>
    </div>
    <div v-if="bloque?.items" class="hidden" :ref="'items' + index">
      <div v-for="(item, itemIndex) in bloque.items" :key="itemIndex">
        <template v-if="item?.props.dropdown">
          <div
            class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer"
            @click="toggleMenuManager('subMenu', itemIndex)"
          >
            <div class="flex justify-between w-full items-center">
              <img class="icon" :src="starIcon" />
              <span class="text-m tracking-wide text-purple-500 ml-1">
                {{ item.label }}
              </span>
              <img class="icon ml-auto" :src="arrowIcon" />
            </div>
          </div>
          <div
            class="text-left text-sm mt-2 w-4/5 mx-auto text-purple-500 font-bold hidden hover:border-l-2 hover:border-purple-600 mt-1"
            :ref="'subMenu' + itemIndex"
          >
            <h1
              v-for="(subMenuItem, subMenuIndex) in item.subMenu"
              :key="subMenuIndex"
              class="cursor-pointer p-2"
            >
              <a :href="subMenuItem.props.route">{{ subMenuItem.label }}</a>
            </h1>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import menuItems from '@external/infraestructure/connections/menu/menu'
import arrowIcon from '@/assets/icons/arrow.svg'
import starIcon from '@/assets/icons/star.svg'

export default defineComponent({
  name: 'NavBarItems',
  setup() {
    return {
      menuItems,
      arrowIcon,
      starIcon
    }
  },

  methods: {
    /**
     * Toggle the visibility of the dropdown menu
     *
     * @param {string} type
     * @param {number} itemIndex
     */
    toggleMenuManager(type: string, itemIndex: number): void {
      if (this.$refs[type + itemIndex]) {
        this.$refs[type + itemIndex][itemIndex].classList.toggle('hidden')
      }
    }
  }
})
</script>
