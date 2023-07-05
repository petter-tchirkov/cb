import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export const useDocumentStore = defineStore('documents', () => {
  const url = useRuntimeConfig().public.baseURL
  const documents = ref([])
  const types = ref([])
  const statuses = ref([])

  const fetchDocuments = async () => {
    await useFetch(`${url}/Admin/document`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`,
      },
      onResponse({ response }) {
        documents.value = response._data
        documents.value.map((e) => {
          if (e.type === 0) {
            e.type = 'Invoice'
          } else {
            e.type = 'Act'
          }
          return documents.value
        })
      },
    })
  }

  const fetchTypes = async () => {
    await useFetch(`${url}/Admin/document/types`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`,
      },
      onResponse({ response }) {
        types.value = response._data
      },
    })
  }

  const fetchStatuses = async () => {
    await useFetch(`${url}/Admin/document/statuses`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`,
      },
      onResponse({ response }) {
        statuses.value = response._data
      },
    })
  }

  return {
    fetchDocuments,
    documents,
    fetchTypes,
    types,
    fetchStatuses,
    statuses,
  }
})
