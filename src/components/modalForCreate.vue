<template>
    <b-modal size="lg" id="modalForCreate" hide-header @shown="getData">
      <div class="row">
        <div class="col-12">
          <input type="text" v-model="newTaskObj.Tittle" class="removeBorder font-16 text-secondary" placeholder="e.g., My new task"/>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <textarea v-model="newTaskObj.Description" class="removeBorder discriptionErea font-14 text-secondary" placeholder="e.g., My task description"></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <b-button class="w-100" size="sm" variant="outline-success" @click="showCalendar = !showCalendar"><i v-show="newTaskObj.DeadLineDate.length == 0" class="bi-calendar mx-1"></i>{{newTaskObj.DeadLineDate.length == 0 ? 'Today' : newTaskObj.DeadLineDate}}</b-button>
          <input id="calendar" type="hidden" />
          <date-picker
            v-model="newTaskObj.DeadLineDate"
            format="jYYYY/jMM/jDD"
            display-format="jYYYY/jMM/jDD"
            :show="showCalendar"
            @close="showCalendar=false"
            :editable="true"
            custom-input="#calendar"
          />
        </div>
        <div class="col-9">
          <div class="row">
            <div class="col-6 pl-0">
              <v-select v-model="selectedPeriority" :options="periorities" label="name" box placeholder="Periority"  @input="setPerioritySelected">
                <template v-slot:option="option">
                  <span class="ml-1" :style="{'color': option.color}">{{option.name}}</span>
                </template>
              </v-select>
            </div>
            <div class="col-6 pl-0">
              <v-select multiple v-model="selectedLabels" :options="labels" label="name" box placeholder="Label" @input="setLabelSelected">
                <template v-slot:option="option">
                  <span class="ml-1" :style="{'color': option.color}">{{option.name}}</span>
                </template>
              </v-select>
              <span v-if="!showLabelForm" class="font-14" style="color: #dd4b39" @click="showLabelForm = true">
                <i class="bi-plus"></i>
                <span class="mx-1">Add label</span>
              </span>
              <span v-if="showLabelForm" class="font-14" style="color: #dd4b39" @click="hideLabelForm()">
                <span class="font-16 mx-1" style="font-weight: 500">-</span>
                <span class="mx-1">Hide label form</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="row py-4" v-if="showLabelForm == true">
        <div class="col-3">
          <label class="font-12" for="labelColor">Label color:</label>
          <input class="mx-2" type="color" v-model="newLabelColor" name="labelColor" value="#ff0000"/>
        </div>
        <div class="col-6 display-flex">
          <div class="w-25" style="float: left;">
            <label class="font-12" for="labelColor">Label Title:</label>
          </div>
          <div class="w-75" style="float: left;">
            <input type="text" class="mx-1 pl-0" style="border-bottom: 1px lightgray solid;" v-model="newLabelTitle" name="newLabelColor" />
          </div>
        </div>
        <div class="col-3">
          <button class="btn btn-outline-warning w-100 btn-sm" @click="AddNewLabel">Add new label</button>
        </div>
      </div>
      <template #modal-footer="{hide}">
        <div class="w-100">
          <b-spinner variant="danger" v-if="isRequesting" type="grow"></b-spinner>
          <b-button
            v-if="!isRequesting"
            variant="danger"
            size="sm"
            class="float-right mx-1"
            @click="mood == 0 ? AddTask() : updateTask()"
          >
            <span>{{mood == 0 ? 'Add Task': 'Update Task'}}</span>
          </b-button>
          <b-button
            variant="outline-secondary"
            size="sm"
            class="float-right mx-1"
            @click="hide()"
          >
            Cancel
          </b-button>
        </div>
      </template>
    </b-modal>
</template>

<script>
  import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
  import dropdown from 'vue-dropdowns'

  export default {
    name: 'Home',
    props: ['taskIdForUpdate'],
    mounted() {
      // props are exposed on `this`
      console.log('taskIdForUpdate', this.taskIdForUpdate)
    },
    data(){
      return {
        labelsList: [],
        newTaskObj: {
          Tittle: null,
          PeriorityCode: null,
          DeadLineDate: '',
          Description: null,
          DoneOn: null,
          DeadLineTime: null,
          Label: []
        },
        date: '',
        showCalendar: false,
        showLabelForm: false,
        newLabelTitle: '',
        newLabelColor: null,
        labels: [],
        selectedLabels: [],
        isRequesting: false,
        mood: 0, // 0 for create and 1 for update
        periorities: [{
          name: 'Low',
          value: 1,
          color: 'lightgray'
        },
        {
          name: 'Medium',
          value: 2,
          color: 'blue'
        },
        {
          name: 'High',
          value: 3,
          color: 'orange'
        },
        {
          name: 'VeryHigh',
          value: 4,
          color: 'red'
        }],
        selectedPeriority: null
      }
    },

    components: {
      datePicker: VuePersianDatetimePicker,
      'dropdown': dropdown
    },

    watch: { 
      taskIdForUpdate: function(newVal, oldVal) { // watch it
        if(newVal != 0)
        {
          this.mood = 1;
          this.getTaskById(newVal);
        }
      }
    },

    methods: {
      getData() {

        this.axios.get('Label/getLabels').then(response => {
          console.log(response);
          this.labels = response.data.map(x => {return {id: x.id, color: x.color, name: x.tittle}})
        })
      },  
      methodToRunOnSelect(payload) {
        this.object = payload;
      },
      AddTask() {
        
        this.isRequesting = true;
        this.newTaskObj.PeriorityCode = this.selectedPeriority.value
        this.newTaskObj.Label = this.selectedLabels.map(x =>{return {Tittle : x.name, Color : x.color, Id: x.id}} )
        console.log(this.newTaskObj);
        this.axios.post("Task/createTask", this.newTaskObj).then(res => {
          console.log("task :", res);
          this.isRequesting = false;
          this.$bvModal.hide('modalForCreate')
        })
        .catch(err => {
          this.isRequesting = false;
          this.$bvModal.hide('modalForCreate')
        })
        .finally(e => {
          window.location.reload();
        })
      },
      getTaskById(taskId){
        this.axios.get(`Task/getTaskById/${taskId}`).then(res => {

          console.log("get task", res);
          this.newTaskObj.Description = res.data.description;
          this.newTaskObj.Tittle = res.data.tittle;
          this.selectedPeriority = this.periorities.filter(x => x.value == res.data.periorityCode)[0];
          this.selectedLabels = res.data.labels.map(x => {return {id: x.id, color: x.color, name: x.tittle}});
          this.newTaskObj.DeadLineDate = res.data.deadLineTimeShamsi;
          console.log("task ", this.newTaskObj);

        }).catch(err => {})
      },
      hideLabelForm(){

        this.newLabelTitle = '';
        this.newLabelColor = null;
        this.showLabelForm = false;
        
      },
      setPerioritySelected(value){
        console.log(value.color);
      },
      setLabelSelected(value){
        console.log(value);
      },
      AddNewLabel() {

        this.selectedLabels.push({id: 0, color: this.newLabelColor, name: this.newLabelTitle})
        this.labels.push({id: 0, color: this.newLabelColor, name: this.newLabelTitle})
        this.newLabelColor = null;
        this.newLabelTitle = ''
        console.log(this.selectedLabels);

      },

      updateTask()
      {
        console.log("task 1", this.selectedLabels, this.selectedPeriority);
        this.isRequesting = true;
        this.newTaskObj.PeriorityCode = this.selectedPeriority.value
        this.newTaskObj.Label = this.selectedLabels.map(x =>{return {Tittle : x.name, Color : x.color, Id: x.id}});
        this.newTaskObj.Id = this.taskIdForUpdate;
        console.log("task ", this.newTaskObj);
        this.axios.put('Task/updateTask', this.newTaskObj).then(res => {
          
        })
        .catch(err => {})
        .finally(b => {
          this.newTaskObj = {
            Tittle: null,
            PeriorityCode: null,
            DeadLineDate: '',
            Description: null,
            DoneOn: null,
            DeadLineTime: null,
            Label: []
          };
          this.mood = 0;
          window.location.reload();
        })
      }

    }
  }
</script>
<style>
  .removeBorder {
    border: none;
    outline: none;
  }
  .discriptionErea {
    width: 80%;
    height: 50px;
    resize: none;
  }
</style>