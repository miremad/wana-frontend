<template>
    <div>
        <navbar></navbar>
        <div class="row center mt-4">
            <div v-for="label in labels" :key="label.id" class="col-8 m-2 label-box" :style="{'borderLeftColor': label.color}">
                <div class="row h-100" @mouseover="label.isShowEditBox = true" @mouseleave="label.isShowEditBox = false">
                    <div class="col-6 left">
                        <span :style="{'color': label.color}">{{label.tittle}}</span>
                    </div>
                    <div class="col-6 right" v-if="label.isShowEditBox">
                        <span class="px-1"><i class="bi-pencil-square cursor-pointer"></i></span>
                        <span @click="deleteLabel(label.id)" class="px-1"><i class="bi-trash3 cursor-pointer"></i></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import navbar from '@/components/navbar.vue'
    export default {
        components: {navbar},
        data(){
            return{
                borderColor: 'green',
                isShow: true,
                labels: []
            }
        },
        methods: {
            getLabels: function()
            {
                this.axios.get("Label/getLabels").then(res => {
                    this.labels = res.data.map(x => {return {...x, isShowEditBox: false}} )
                })
            },
            deleteLabel: function(labelId)
            {
                this.axios.delete(`Label/delete/${labelId}`).then(res => {
                    this.labels = this.labels.filter(x => x.id != labelId);
                })
            }
        },
        mounted(){
            this.getLabels();
        }
    }
</script>

<style>
.label-box{
    background: white;
    border-radius: 5px;
    border-left: 5px solid;
    color: gray;
    font-size: 16px;
    height: 55px;
    -webkit-box-shadow: 0px 10px 18px 2px rgba(0,0,0,0.3); 
    box-shadow: 0px 10px 18px 2px rgba(0,0,0,0.3);
}
.cursor-pointer {
    cursor: pointer;
}
</style>