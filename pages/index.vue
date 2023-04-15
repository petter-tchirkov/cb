<template>
  <section class="w-full">
    <HeaderLite>
      <template #pageTitle> Дашборд </template>
    </HeaderLite>
    <div class="p-5">
      <LineChart
        :chart-data="testData"
        :options="chartOptions"
        @click="ok"
      />
    </div>
    <ui-toast />
  </section>
</template>

<script lang="ts" setup>
  import { LineChart } from 'vue-chart-3'
  import { Chart, registerables } from 'chart.js'
  import { useNotification } from '@kyvg/vue3-notification'
  const { notify } = useNotification()

  const ok = () => {
    notify({
      text: 'ok',
      type: 'success',
    })
  }

  Chart.register(...registerables)

  definePageMeta({
    middleware: ['login', 'auth'],
  })

  const chartLabels = ref([
    '2023-01-01',
    '2023-01-03',
    '2023-01-04',
    '2023-01-05',
    '2023-01-06',
    '2023-01-01',
    '2023-01-03',
    '2023-01-04',
    '2023-01-05',
    '2023-01-06',
  ])
  const chartOptions = ref({
    responsive: true,
    height: 200,
    plugins: {
      legend: false,
      title: {
        display: true,
        text: 'Чарт',
        color: '#030712',
        font: {
          size: 30,
        },
      },
    },
    animations: {
      radius: {
        duration: 400,
        easing: 'linear',
        loop: (context: { active: unknown }) => context.active,
      },
    },
    scales: {
      x: {
        grid: {
          color: '#f1f5f9',
          borderColor: '#1d4ed8',
        },
      },
      y: {
        grid: {
          color: '#f1f5f9',
          borderColor: '#1d4ed8',
        },
      },
    },
  })

  const testData = {
    labels: chartLabels.value,
    datasets: [
      {
        data: [110, 130, 240, 20, 58, 110, 130, 400, 10, 58],
        backgroundColor: '#3b82f6',
        borderColor: '#1d4ed8',
        pointStyle: 'circle',
        pointRadius: 5,
        pointHoverRadius: 10,
      },
    ],
  }
</script>

<style lang="scss" scoped></style>
