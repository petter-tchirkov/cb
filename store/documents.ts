import { defineStore } from 'pinia'
import { notify } from '@kyvg/vue3-notification'
import { useAuthStore } from './auth'
import { useDateStore } from './date'

export const useDocumentStore = defineStore('documents', () => {
  const url = useRuntimeConfig().public.baseURL
  const documents = ref([])
  const types = ref([])
  const statuses = ref([])
  const users = ref([])

  const acts = computed(() => {
    return documents.value.filter((e: any) => {
      return e.type === 0
    })
  })
  const invoices = computed(() => {
    return documents.value.filter((e: any) => {
      return e.type === 1
    })
  })

  const connectedDocs = reactive({
    first: {},
    second: {},
  })

  const connectDocuments = async () => {
    connectedDocs.first.connectedDocId = connectedDocs.second.id
    connectedDocs.second.connectedDocId = connectedDocs.first.id
    await useFetch(`${url}/Admin/document`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`,
      },
      body: Object.values(connectedDocs).map((e: any) => {
        delete e.user
        delete e.bot
        delete e.createdDate
        delete e.isDelete
        delete e.connectedDoc

        return e
      }),
    })
  }

  const fetchDocuments = async (role: string) => {
    await useFetch(`${url}/${role}/document`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`,
      },
      params: {
        date: useDateStore().docDatesSerialized,
      },
      onResponse({ response }) {
        documents.value = response._data
      },
    })
  }

  const updateDocuments = async () => {
    await useFetch(`${url}/Admin/document`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`,
      },
      body: documents.value.map((e: any) => {
        delete e.user
        delete e.bot
        delete e.createdDate
        delete e.isDelete
        delete e.connectedDoc

        switch (e.type) {
          case 'Invoice':
            e.type = 0
            break
          case 'Act':
            e.type = 1
            break
        }

        return e
      }),
      onResponse({ response }) {
        notify({
          text: 'Успішно оновлено',
          type: 'success',
        })
      },
    })
  }

  const fetchTypes = async () => {
    await useFetch(`${url}/Users/document/types`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`,
      },
      onResponse({ response }) {
        types.value = response._data
        console.log(typeof types)
      },
    })
  }

  const fetchStatuses = async () => {
    await useFetch(`${url}/Users/document/statuses`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`,
      },
      onResponse({ response }) {
        statuses.value = response._data
      },
    })
  }

  const fetchUsers = async () => {
    await useFetch(`${url}/Admin/users/bots`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`,
      },
      onResponse({ response }) {
        users.value = response._data
      },
    })
  }

  const removeDocument = async (id: number) => {
    await useFetch(`${url}/Admin/document/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`,
      },
      onResponse({ response }) {
        console.log(response)
        fetchDocuments('Admin')
        notify({
          text: 'Успішно видалено',
          type: 'success',
        })
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
    updateDocuments,
    fetchUsers,
    users,
    removeDocument,
    acts,
    invoices,
    connectedDocs,
    connectDocuments,
  }
})
