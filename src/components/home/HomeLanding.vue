<template>
  <div
    :class="{
      'overflow-hidden lg:overflow-visible': isAsideMobileExpanded
    }"
  >
    <div
      :class="[{ 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
      class="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] bg-white overflow-y-auto text-center shadow-lg rounded-lg"
    >
      <NavBar class="ml-60 lg:ml-0" />
    </div>
    <div class="p-4 xl:ml-80 fixed top-0 bottom-0 w-[80%]">
      <div class="flex flex-1">
        <div class="flex flex-1 text-left text-4xl mt-2 w-4/5 mx-auto font-bold">
          <h1>Reclutamiento</h1>
        </div>
        <img
          class="h-8 w-8 rounded-full"
          src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
          alt=""
        />
      </div>
      <div class="overflow-x shadow-lg rounded-lg bg-white h-[90%]">
        <div class="h-[12%]">
          <div
            class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 font-bold text-purple-500 dark:border-gray-200"
          >
            <ul class="flex flex-wrap -mb-px">
              <li class="me-2">
                <a
                  :href="baseUrl"
                  class="inline-block p-4 border-b-2 rounded-t-lg hover:text-purple-500 border-purple-300"
                  >Vacantes</a
                >
              </li>
              <li>
                <a
                  class="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-200"
                  >Candidatos</a
                >
              </li>
            </ul>
          </div>
          <div class="flex items-center justify-between w-full p-4">
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <img class="icon" :src="searchIcon" alt="description" />
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-4 ps-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-grey-500 focus:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:border-gray-500"
                placeholder="Buscar"
                required
              />
            </div>
            <button
              type="button"
              class="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              @click="openModal = !openModal"
            >
              Añadir candidato
            </button>
          </div>
        </div>
        <div class="flex flex-1 overflow-y-auto h-[88%]">
          <vacancy-container />
        </div>
      </div>
    </div>
  </div>
  <modal-new-candidates v-if="openModal" @closeModal="openModal = false" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ModalNewCandidates from '@/components/home/modal/ModalNewCandidates.vue'
import NavBar from '@/components/navbar/NavBar.vue'
import VacancyContainer from '@/components/draggable/VacancyContainer.vue'
import { variables } from '@external/application/variables/variables'
import searchIcon from '@/assets/icons/search.svg'

export default defineComponent({
  name: 'HomeLanding',
  components: {
    ModalNewCandidates,
    NavBar,
    VacancyContainer
  },
  data(): any {
    return {
      baseUrl: variables.baseUrl,
      openModal: false,
      isAsideMobileExpanded: true
    }
  },
  setup() {
    return {
      searchIcon
    }
  }
})
</script>
<style scoped>
.min-h {
  min-height: 90vh;
  margin-top: 1rem;
}
</style>
