<template>

  <div id="container">
    <div id="container-3"><img title="Vue image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1184px-Vue.js_Logo_2.svg.png" alt="Vue"></div>
    <div id="container-2">
        <div id="container-2-1" :style="title == 'User Login' ? 'margin-top:95px' : '' ">
            
            <form @submit="Send">
                <h1>{{title}}</h1>
                <input ref="username" name="username" autocomplete="on" placeholder="Username" type="text">
                <input ref="email" name="email" autocomplete="on" v-if="title != 'User Login'" placeholder="E-Mail" type="email">
                <input ref="password" name="password" autocomplete="on" placeholder="Password" type="password">
                <input ref="repeatPassword" autocomplete="on" v-if="title != 'User Login'" placeholder="Repeat Password" type="password">
                 <p id="error">{{message}}</p> 
                <button title="Send" type="submit" class="button-authentication">{{button}}</button>

            </form>
            <router-link v-bind:to="title === 'Register' ? '/login' : '/register' ">{{linkText}}</router-link>
        </div>
    </div>
  </div>
  <FooterComponent/>
</template>

<script>
import FooterComponent from "./FooterComponent.vue"
import {register, logIn,getToken} from "../services/services.js"

export default {
  name: 'AuthenComponent',
  props: {
    title: String,
    button: String,
    linkText: String,
  },
  components:{
    FooterComponent
  },
  data(){
    return{
      username: null,
      password: null,
      repeatPassword: null,
      email: null,
      message: null,
      access: false
    }
  }
  ,
  methods: {
    async Send(e){
      e.preventDefault();

      this.username = this.$refs.username.value
      this.password = this.$refs.password.value
      
      if(this.title == "Register"){

      this.repeatPassword = this.$refs.repeatPassword.value
      this.email = this.$refs.email.value  

      if (this.password !== this.repeatPassword){
        return this.message = "Password does not match."
      }
      else{

          let regis = await register(this.username,this.password,this.email)

          if(regis[0] == "error"){
            this.message = regis[1]
          }
          else {

            this.$router.push('login')

         }

         
         }
         
      }
      else { 
      let log = await logIn(this.username, this.password)

        if(log[0] == "error"){
          this.message = log[1]
        }
        else {

          await getToken(log[1][0].username,this.password)
          
          this.$router.push('home')}
        

    }}}

}
</script>


<style scoped src="../styles/forms.css"/>