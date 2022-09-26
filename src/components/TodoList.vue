<template>
  <div class="col-12" v-if="tasks">
    <b-spinner v-if="isRequesting" variant="success"></b-spinner>
    <div class="py-2 my-2" v-if="filteredTask.length > 0">
      <span ><span style="color: gray" class="font-14">Tasks of day: </span><span class="font-16" style="color: gray; font-weight: 800;">{{' ' + filteredTask.length > 0 ? filteredTask[0].deadLineTimeShamsi.split(' ')[0] : '' }}</span></span>
      <draggable class="pt-1 mt-1" v-model="filteredTask" group="people" @start="drag=true" @end="drag=false">
        <div class="listItem" v-for="(element, index) in filteredTask" :key="element.id" :class="{borderTop: index == 0}">
          <div class="row">
            <div>
              <span style="cursor: pointer;"><i class="bi-grip-vertical font-16 px-1"></i></span>
            </div>
            <div class="col-11">
              <div class="row">
                <div class="list-item col-12">
                  <div class="row">
                    <div class="col-8 left" @click="toggleTask(element.id, index)">
                      <span class="circle center font-16"><i class="bi-check align-self-center"></i></span><span class="px-3 font-14" :class="{'done' : element.isDone}">{{ element.tittle }}</span>
                    </div>
                    <div class="col-4 right">
                      <span><i style="cursor: pointer" class="bi-pencil-square" @click="editTask(element.id)"></i></span>
                    </div>
                  </div>
                </div>
                <div class="left col-12">
                  <span class="font-12 text-secondary">{{element.description}}</span>
                </div>
                <div class="col-12">
                  <div class="row">
                    <div class="col-5">
                      <span  class="font-12 text-danger"><span><i class="bi-calendar3"></i></span><span>{{' ' + element.deadLineTimeShamsi.split(' ')[0]}}</span></span>
                    </div>
                    <div class="col-3 font-12">
                      <span><i class="bi-flag-fill px-1" :style="{color: element.periorityColorClass}"></i><span class="px-1" :style="{color: element.periorityColorClass}"> {{'periority: ' + element.periorityCodeValue}}</span></span>
                    </div>
                    <div class="col-4 font-12">
                      <span><span class="p-1 m-1" style="color: white; border-radius: 4px;" :style="{backgroundColor: label.color}" v-for="label in element.labels" :key="label.id"> {{label.tittle}}</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </draggable>
    </div>
    <div class="listItem" style="border: none">
      <div class="list-item col-12">
        <div class="row">
          <div class="col-8 left" @mouseover="upHere = true" @mouseleave="upHere = false" v-b-modal="'modalForCreate'">
            <span :class="{activeIcon: upHere}" class="center circleWithoutBorder font-16" ><i class="bi-plus align-self-center"></i></span><span :class="{activeText: upHere}" class="px-3 font-14">Add task</span>                
          </div>
        </div>
      </div>
    </div>
    <ModalForCreate :taskIdForUpdate="taskIdForUpdate"></ModalForCreate>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import ModalForCreate from './modalForCreate.vue';

export default {
  name: "simple",
  display: "Simple",
  order: 0,
  components: {
    draggable,
    ModalForCreate
  },
  props: ['filter'],
  created(){
    console.log("filter", this.filter);
  },
  watch:{
    filter: function(newVal, oldVal){
      console.log(newVal);
      this.filterTasks(JSON.parse(newVal));
    }
  },
  data() {
      return {
        taskIdForUpdate: 0,
        isRequesting: false,
        today : '',
        upHere: false,
        modalTarget: null,
        modalClass: null,
        enabled: true,
        tasks: [],
        filteredTask: [],
        dragging: false
        };
  },
  computed: {
      draggingInfo() {
      return this.dragging ? "under drag" : "";
      }
  },
  mounted(){
    var today1 = new Date();
    var dd = String(today1.getDate()).padStart(2, '0');
    var mm = String(today1.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today1.getFullYear();
    this.today = yyyy + '/' + mm + '/' + dd
    this.getTasks();
  },
  methods: {
      
      filterTasks: function(filter)
      {
        
        this.filteredTask = this.tasks
          .filter(x => filter.timeFilter.length > 0 ? x.deadLineTimeShamsi.split(' ')[0] == filter.timeFilter : x.deadLineTimeShamsi.split(' ')[0] == this.tasks[0].deadLineTimeShamsi.split(' ')[0])
          .filter(x => {
            if(filter.stateFilter == 1){
              return true
            }
            else if(filter.stateFilter == 2)
            {
              if(x.isDone == true)
              {
                return true
              }
              else{
                return false
              }
            }
            else{
              if(x.isDone == false)
              {
                return true
              }
              else{
                return false
              }
            }
          })
          
        console.log("this.filteredTask", this.filteredTask);
        
      },
      add: function() {
      this.list.push({ name: "Juan " + id, id: id++ });
      },
      replace: function() {
      this.list = [{ name: "Edgard", id: id++ }];
      },
      checkMove: function(e) {
      window.console.log("Future index: " + e.draggedContext.futureIndex);
      },
      getTasks: function() {

        this.isRequesting = true;
        this.axios.get("Task/getTasks").then(res => {
          
          this.tasks = res.data; 
          console.log("task :", this.tasks);
          this.isRequesting = false;
          this.filteredTask = this.tasks.filter(x => x.deadLineTimeShamsi.split(' ')[0] == this.tasks[0].deadLineTimeShamsi.split(' ')[0])
          this.stateFilter = 1;
          this.timeFilter = this.tasks.length > 0 ? this.tasks[0].deadLineTimeShamsi.split(' ')[0] : ''
        })
      },
      editTask: function(taskId){
        this.taskIdForUpdate = taskId;
        this.$bvModal.show('modalForCreate')
      },
      toggleTask: function(taskId, taskIndex){
        console.log("done", taskId, taskIndex, this.filteredTask[taskIndex]);
        this.filteredTask[taskIndex].isDone = !this.filteredTask[taskIndex].isDone;
        console.log("ref test", this.tasks[taskIndex]);
        console.log("done", taskId, taskIndex, this.filteredTask[taskIndex]);
        this.axios.put(`Task/toggleTask/${taskId}`).then(res => {
          
        })
      }
  }
  

}
</script>

<style>
.listItem{
  border-bottom: .5px solid rgb(235, 232, 232);
  padding-left: 10PX;
  padding-right: 10PX;
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: left;
}

.borderTop{
  border-top: .5px solid rgb(235, 232, 232);
}

.circle {
  width: 15px;
  height: 15px;
  border-radius: 100%;
  border: 2px solid lightgray;
  background-color: white;
  color: white

}
.circle:hover {
  background: gray;
  color: white;
}

.circleWithoutBorder {
  width: 15px;
  height: 15px;
  border-radius: 100%;
  background-color: white;
  color: #dd4b39
}

.activeIcon {

  background-color: #dd4b39;
  color: white
}

.activeText {
  color: #dd4b39
}

.done{
  text-decoration-line: line-through;
}

</style>