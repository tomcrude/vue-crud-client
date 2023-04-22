<template>

   <div id="container">
      <div id="container-2">
        <div id="container-3">
          <img :src="image" alt="Vue">
          <h1 class="white">VueCrud App</h1><div id="line"/>
        </div>
          <router-link :style="[style,color]" to="/login" :class="classB">Log in</router-link>
          <router-link :style="[style,color]" to="/register" :class="classB">Register</router-link>
          <p class="white">This app uses Vue.js and Python.</p>
      </div>
  </div>
  <FooterComponent/>
</template>

<script>
import FooterComponent from "../components/FooterComponent.vue"
export default {
  name: 'MainView',
  data(){
    return{ 
      style: "background: rgb(50, 255, 166)",
      color: "color: rgb(0,0,0)",
      classB: "button-authentication",
      image: require("../assets/vue-1.png") 
    }
  },
  components:{
    FooterComponent
  }
}
</script>

<style scoped>

  #container{
    width: 100%;
    height: 500px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  h1{
    font-size: 50px;
    display: inline-block;
  }
  a{
    width: 200px;
    margin: 20px;
    margin-top: 5px;
    display: inline-block;
    text-decoration: none;
    font-size: 18px;
  }
  #container-2 {
    margin: 70px;
  }
  img{
    width: 100px;
    transform: translate(-15px,25px);
  }
  #container-3 h1,#container-3 img{
    animation: 4s ani;
  } 

</style>