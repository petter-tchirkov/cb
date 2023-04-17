<template>
  <XyzTransition xyz="fade right">
    <aside
      class="sticky top-0 flex flex-col justify-between h-screen px-3 py-4 transition-all duration-75 bg-white left-2"
    >
      <div class="flex flex-col">
        <NuxtLink
          to="/"
          class="flex items-center gap-2 p-2 font-semibold rounded-lg group hover:bg-gray-100"
        >
          <Icon
            name="bxs:dashboard"
            class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
          />
          <span
            v-show="isSidebarShown"
            class="transition-all duration-75"
            >Дашборд</span
          >
        </NuxtLink>
        <NuxtLink
          to="/costs"
          class="flex items-center gap-2 p-2 font-semibold rounded-lg group hover:bg-gray-100"
        >
          <Icon
            name="bxs:coin-stack"
            class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
          />
          <span
            v-show="isSidebarShown"
            class="transition-all duration-75"
            >Витрати</span
          >
        </NuxtLink>
        <div
          class="flex items-center justify-between p-2 font-semibold rounded-lg cursor-pointer group hover:bg-gray-100"
          @click="botsShown = !botsShown"
        >
          <div class="flex items-center gap-2">
            <Icon
              name="basil:viber-solid"
              class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
            />
            <span v-show="isSidebarShown">Боти Viber</span>
          </div>
          <Icon
            name="bxs:chevron-down"
            class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
            :class="{ 'rotate-180': botsShown }"
          />
        </div>
        <XyzTransition xyz="fade up duration-1">
          <ul
            v-if="botsShown"
            class="py-2 space-y-2"
          >
            <li
              v-for="bot in botsStore.bots"
              :key="bot.id"
            >
              <NuxtLink
                :to="`/bots/${bot.id}`"
                class="flex items-center w-full p-2 pl-10 text-sm font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100"
                >{{ bot.botName }}</NuxtLink
              >
            </li>
            <NuxtLink to="/bots/new-bot">
              <li
                class="flex items-center justify-between w-full p-2 pl-10 text-sm font-normal text-gray-900 transition duration-75 rounded-lg cursor-pointer group hover:bg-gray-100"
              >
                Додати бота
                <Icon
                  name="material-symbols:add"
                  class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                />
              </li>
            </NuxtLink>
          </ul>
        </XyzTransition>
        <NuxtLink
          to="/settings"
          class="flex items-center gap-2 p-2 font-semibold rounded-lg group hover:bg-gray-100"
        >
          <Icon
            name="bi:file-earmark-spreadsheet-fill"
            class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
          />
          <span
            v-show="isSidebarShown"
            class="transition-all duration-75"
            >Адміністрування</span
          >
        </NuxtLink>
      </div>
      <div class="flex justify-end">
        <Icon
          class="w-8 h-8 text-gray-500 transition duration-75 cursor-pointer hover:text-gray-900"
          :class="{ 'rotate-180': !isSidebarShown }"
          name="ic:baseline-keyboard-double-arrow-left"
          @click="isSidebarShown = !isSidebarShown"
        />
      </div>
      <NuxtLink
        class="flex items-center gap-2 p-2 font-semibold rounded-lg cursor-pointer group hover:bg-gray-100"
        @click="useAuthStore().logout()"
      >
        <Icon
          name="bxs:log-out"
          class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
        />
        <span v-if="isSidebarShown">Вийти</span>
      </NuxtLink>
    </aside>
  </XyzTransition>
</template>

<script lang="ts" setup>
  import { useAuthStore } from '~/store/auth'
  import { useBotsStore } from '~/store/bots'
  const isSidebarShown = ref<boolean>(true)
  const botsShown = ref<boolean>(false)

  const botsStore = useBotsStore()
  await botsStore.fetchBots()
</script>

<style lang="scss" scoped>
  .router-link-exact-active {
    @apply bg-gray-100;
  }
</style>
