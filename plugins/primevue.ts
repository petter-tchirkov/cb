import { defineNuxtPlugin } from '#app'
import PrimeVue from 'primevue/config'
import Password from 'primevue/password'
import Button from 'primevue/button'
import FileUpload from 'primevue/fileupload'
import InputText from 'primevue/inputtext'
import ProgressSpinner from 'primevue/progressspinner'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import Toast from 'primevue/toast'
import InputSwitch from 'primevue/inputswitch'
import Calendar from 'primevue/calendar'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import Row from 'primevue/row'
import InputNumber from 'primevue/inputnumber'
import AutoComplete from 'primevue/autocomplete'
import Paginator from 'primevue/paginator'
import ToggleButton from 'primevue/togglebutton'
import Tag from 'primevue/tag'
import OverlayPanel from 'primevue/overlaypanel'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true })
  nuxtApp.vueApp.component('Button', Button)
  nuxtApp.vueApp.component('InputText', InputText)
  nuxtApp.vueApp.component('ProgressSpinner', ProgressSpinner)
  nuxtApp.vueApp.component('FileUpload', FileUpload)
  nuxtApp.vueApp.component('Dialog', Dialog)
  nuxtApp.vueApp.component('Dropdown', Dropdown)
  nuxtApp.vueApp.component('Toast', Toast)
  nuxtApp.vueApp.component('InputSwitch', InputSwitch)
  nuxtApp.vueApp.component('Calendar', Calendar)
  nuxtApp.vueApp.component('DataTable', DataTable)
  nuxtApp.vueApp.component('Column', Column)
  nuxtApp.vueApp.component('ColumnGroup', ColumnGroup)
  nuxtApp.vueApp.component('Row', Row)
  nuxtApp.vueApp.component('InputNumber', InputNumber)
  nuxtApp.vueApp.component('AutoComplete', AutoComplete)
  nuxtApp.vueApp.component('Paginator', Paginator)
  nuxtApp.vueApp.component('ToggleButton', ToggleButton)
  nuxtApp.vueApp.component('Tag', Tag)
  nuxtApp.vueApp.component('Password', Password)
  nuxtApp.vueApp.component('OverlayPanel', OverlayPanel)
})
