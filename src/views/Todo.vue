<template>
  <div>
    <navbar></navbar>
    <div class="row center p-1">
      <div class="col-8">
        <TodoList :filter="JSON.stringify(filter)"></TodoList>
      </div>
      <div class="col-3 px-1">
        <h3 class="py-3">filter box!</h3>
        <div class="row">
          <div class="col-4 p-1"><b-button @click="filter.stateFilter=1" :variant="filter.stateFilter == 1 ? 'info' : 'outline-info'" class="mx-1 w-100">All</b-button></div>
          <div class="col-4 p-1"><b-button @click="filter.stateFilter=2" :variant="filter.stateFilter == 2 ? 'info' : 'outline-info'" class="mx-1 w-100">Done</b-button></div>
          <div class="col-4 p-1"><b-button @click="filter.stateFilter=3" :variant="filter.stateFilter == 3 ? 'info' : 'outline-info'" class="mx-1 w-100">Not done</b-button></div>
          <div class="col-12 pl-2 pr-0 mt-4">
            <date-picker 
              simple 
              auto-submit
              v-model="filter.timeFilter"
              format="jYYYY/jMM/jDD"
              display-format="jYYYY/jMM/jDD"
              :editable="true"
            >
            </date-picker>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navbar from '@/components/navbar.vue'
import TodoList from '@/components/TodoList.vue';
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'


export default {
  components: { navbar, TodoList, datePicker: VuePersianDatetimePicker, },
  
  data() {
    return {
      name: 'BootstrapVue',
      show: true,
      tasks: null,
      filterValue: 1,
      timefilterValue: '',
      filter: {stateFilter: 1, timeFilter: ''}
    }
  },
  watch: {
    show(newVal) {
      console.log('Alert is now ' + (newVal ? 'visible' : 'hidden'))
    }
  },
  methods: {
    toggle() {
      console.log('Toggle button clicked')
      this.show = !this.show
    },
    dismissed() {
      console.log('Alert dismissed')
    }
  }
  
}
</script>

<style>
.filter-box{
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;

}

.vpd-input-group input {

  border: 1px solid #dadada !important;
  border-radius: 0.25rem;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.vpd-icon-btn {
  margin: 0px;
  border-radius: 0.25rem;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
</style>