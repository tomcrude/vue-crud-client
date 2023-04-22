<template>
  <header>
    <nav>
      <span title="Home" class="material-symbols-outlined icon"><router-link to="/home">home</router-link></span>
      <span title="Create review" class="material-symbols-outlined icon"><router-link icon to="/review/create/0">drive_folder_upload</router-link></span>
      <p>{{username}}</p>
      <span @click="logOut" id="logout" title="Log out" class="material-symbols-outlined click">logout</span>
    </nav>
  </header>
</template>

<script>
import {deleTokens} from "../utils/utils.js"
export default {
  name: 'NavComponent',
  data(){
    return{
      username: localStorage.getItem("username")
    }
  },
  methods:{
    logOut(){
      deleTokens()
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
 #logout{
    background: rgb(50, 197, 255);
    color: rgb(255, 255, 255);
    padding: 6px;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    margin-left: 20px;
    transform: translateY(12px);
  }
  .icon{
    transform: translate(15px,15px);
    font-size: 28px;
    flex: 0.1;
    text-decoration: none;
  }
  nav {
    background: rgb(50, 255, 166);
    margin: -16px;
    box-shadow: 0 0 7px #696969;
    margin-bottom: 15px;
    display: flex;
    height: 50px;
  }
  p{
    padding: 5px;
    font-size: 16px;
    font-weight: 700;
    color: rgb(0, 0, 0);
    flex: 0.76;
    text-align: end;
  }
  a{
    color: rgb(0, 0, 0);
    text-decoration: none;
  }
  span:last-child:hover{
    box-shadow: 0 0 5px #000000;
  }
</style>