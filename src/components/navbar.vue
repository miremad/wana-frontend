<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <a class="navbar-brand">Wana - ToDo</a>
            <button class="navbar-toggler text-dark" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i class="bi-list font-16"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/todo" class="nav-link active">Todo list</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/labels" class="nav-link">Labels</router-link>
                    </li>
                    <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span><span class="font-12">{{`Dear `}}</span><strong v-if="user" style="font-weight: 700;" class="font-16">{{`${user.firstName} ${user.lastName}`}}</strong><i class="bi-power px-1"></i></span>
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item">profile(disabled)</a></li>
                        <li><a class="dropdown-item" @click="logout">Logout</a></li>
                    </ul>
                    </li>
                </ul>
            </div>
        </div>
        </nav>
</template>
<script>

export default {

    data(){
        return{
            user: null
        }
    },

    mounted(){
        this.getUser()
    },
  
    methods: {
        getUser: function(){
            this.axios.get('/User/getCurrentUser').then(res => {
                this.user = res.data;
            }).catch(err => {})
        },
        logout: function() {
            localStorage.removeItem("token")
            window.location = "#/login"
        }
    }
}
</script>

<style>

</style>