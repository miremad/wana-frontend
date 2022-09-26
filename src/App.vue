<template>
  <div id="app">
    <div class="container-fluid p-0">
      <router-view/>
    </div>
  </div>
</template>
<script>
import ModalForCreate from './components/modalForCreate.vue';
export default {
 
  components: {
    ModalForCreate,
    ModalForCreate
},
}

</script>

<style>
@import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  body{
    overflow-x: hidden;
  }
  nav {
    padding: 30px;
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  nav a.router-link-exact-active {
    color: #42b983;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .left {
    display: flex;
    justify-content: left;
    align-items: center;
  }
  .right{
    display: flex;
    justify-content: right;
    align-items: center;
  }

  .align-self-center {
    display: flex;
    align-self: center;
  }
  .font-12{
    font-size: 12px !important;
  }
  .font-14 {
    font-size: 14px !important;

  }
  .font-20 {
    font-size: 20px !important;
  }
</style>
