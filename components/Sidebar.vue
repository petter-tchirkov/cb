<template>
  <XyzTransition xyz="fade right">
    <aside
      ref="target"
      class="fixed left-0 top-0 z-50 h-screen w-56 flex-col justify-between bg-white px-3 py-4 transition-all duration-75 lg:sticky lg:flex"
      :class="{
        'w-auto': !isSidebarFull,
        hidden: !useUiStore().isSidebarShown,
      }"
    >
      <div class="flex flex-col gap-3">
        <!-- <NuxtLink
          to="/"
          class="flex items-center gap-2 p-2 font-semibold rounded-lg group hover:bg-gray-100"
        >
          <Icon
            name="bxs:dashboard"
            class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
          />
          <span
            v-show="isSidebarFull"
            class="transition-all duration-75"
            >Дашборд</span
          >
        </NuxtLink> -->
        <NuxtLink
          to="/"
          class="group flex items-center gap-2 rounded-lg p-2 font-semibold hover:bg-gray-100"
        >
          <Icon
            name="bxs:coin-stack"
            class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-blue-600"
          />
          <span
            v-show="isSidebarFull"
            class="transition-all duration-75"
            >Витрати</span
          >
        </NuxtLink>
        <NuxtLink
          to="/rates"
          class="group flex items-center gap-2 rounded-lg p-2 font-semibold hover:bg-gray-100"
        >
          <Icon
            name="ion:pricetags-sharp"
            class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-blue-600"
          />
          <span
            v-show="isSidebarFull"
            class="transition-all duration-75"
            >Рейти</span
          >
        </NuxtLink>
        <div
          class="group flex cursor-pointer items-center justify-between rounded-lg p-2 font-semibold hover:bg-gray-100"
          @click="botsShown = !botsShown"
        >
          <div class="flex items-center gap-2">
            <Icon
              name="basil:viber-solid"
              class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-blue-600"
            />
            <span v-show="isSidebarFull">Боти Viber</span>
          </div>
          <Icon
            v-if="isSidebarFull"
            name="bxs:chevron-down"
            class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-blue-600"
            :class="{ 'rotate-180': botsShown }"
          />
        </div>
        <XyzTransition xyz="fade up duration-1">
          <ul
            v-if="botsShown && isSidebarFull"
            class="space-y-2 py-2"
          >
            <li
              v-for="bot in botsStore.bots"
              :key="bot.id"
            >
              <NuxtLink
                :to="`/bots/${bot.id}`"
                class="group flex w-full items-center truncate rounded-lg p-2 pl-10 text-sm font-normal text-gray-900 transition duration-75 hover:bg-gray-100"
              >
                {{ bot.botName !== '' ? bot.botName : 'Без назви' }}</NuxtLink
              >
            </li>
            <NuxtLink to="/bots/new-bot">
              <li
                class="group flex w-full cursor-pointer items-center justify-between rounded-lg p-2 pl-10 text-sm font-normal text-gray-900 transition duration-75 hover:bg-gray-100"
              >
                Додати бота
                <Icon
                  name="material-symbols:add"
                  class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-blue-600"
                />
              </li>
            </NuxtLink>
          </ul>
        </XyzTransition>
        <hr
          v-if="useAuthStore().user?.user_role === 'ADMIN'"
          class="border border-gray-100"
        />
        <NuxtLink
          v-if="useAuthStore().user?.user_role === 'ADMIN'"
          to="/admin"
          class="group flex items-center gap-2 rounded-lg p-2 font-semibold hover:bg-gray-100"
        >
          <Icon
            name="bi:file-earmark-spreadsheet-fill"
            class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-blue-600"
          />
          <span
            v-show="isSidebarFull"
            class="transition-all duration-75"
            >Адміністрування</span
          >
        </NuxtLink>
        <NuxtLink
          v-if="useAuthStore().user?.user_role === 'ADMIN'"
          to="/deposits"
          class="group flex items-center gap-2 rounded-lg p-2 font-semibold hover:bg-gray-100"
        >
          <Icon
            name="bi:piggy-bank-fill"
            class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-blue-600"
          />
          <span
            v-show="isSidebarFull"
            class="transition-all duration-75"
            >Депозити</span
          >
        </NuxtLink>
      </div>
      <div
        class="fixed bottom-48 hidden justify-end lg:flex"
        :class="[isSidebarFull ? 'left-44' : 'left-4']"
      >
        <Icon
          class="h-8 w-8 cursor-pointer text-gray-500 transition duration-75 hover:text-gray-900"
          :class="[{ 'rotate-180': !isSidebarFull }, ,]"
          name="ic:baseline-keyboard-double-arrow-left"
          @click="isSidebarFull = !isSidebarFull"
        />
      </div>
      <NuxtLink
        class="group fixed bottom-4 flex cursor-pointer items-center gap-2 rounded-lg p-2 font-semibold hover:bg-gray-100"
        @click="useAuthStore().logout()"
      >
        <Icon
          name="bxs:log-out"
          class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-blue-600"
        />
        <span v-if="isSidebarFull">Вийти</span>
      </NuxtLink>
    </aside>
  </XyzTransition>
</template>

<script lang="ts" setup>
  import { onClickOutside, useWindowSize } from '@vueuse/core'
  import { useAuthStore } from '~/store/auth'
  import { useBotsStore } from '~/store/bots'
  import { useUiStore } from '~/store/ui'

  const { width } = useWindowSize()

  const isSidebarFull = ref<boolean>(true)
  const botsShown = ref<boolean>(true)
  const target = ref(null)

  const botsStore = useBotsStore()

  onClickOutside(target, () => {
    if (width.value < 1024) {
      useUiStore().isSidebarShown = false
    }
  })
</script>

<style lang="scss" scoped>
  .router-link-exact-active {
    @apply bg-gray-100;
  }
</style>
