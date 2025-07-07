<script setup>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { computed } from 'vue'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps({
    todos: Array,
})

const chartData = computed(() => ({
    labels: props?.todos?.length > 0 ? ['Todo', 'Doing', 'Done'] : ['Tidak Ada Data'],
    datasets: [
        {
            data:
                props?.todos?.length > 0
                    ? [
                          props?.todos?.filter((todo) => {
                              return todo.status == 'todo'
                          }).length,
                          props?.todos?.filter((todo) => {
                              return todo.status == 'doing'
                          }).length,
                          props?.todos?.filter((todo) => {
                              return todo.status == 'done'
                          }).length,
                      ]
                    : [1],
            backgroundColor:
                props?.todos?.length > 0 ? ['#ecc9c9', '#b3cde0', '#60e47c'] : ['white'],
            borderWidth: 1,
        },
    ],
}))

const chartOptions = computed(() => ({
    plugins: {
        tooltip: {
            enabled: props?.todos?.length > 0 ? true : false,
        },
        legend: {
            labels: {
                color: '#ffffff',
                font: {
                    size: 14,
                    family: 'Arial',
                },
            },
        },
    },
    responsive: true,
    maintainAspectRatio: false,
}))
</script>
<template>
    <Pie :data="chartData" :options="chartOptions" />
</template>
