<template>
  <div>
    <NavComponent/>
    <p style="color: rgb(255,255,255); font-size: 25px">{{message}}</p>
    <span v-for="(value) in reviews" :key="value.id">
      <ReviewComponent :id="value.id" :title="value.title" :description="value.description" :img="value.img"/>
    </span>
  </div>
</template>

<script>
import NavComponent from "../components/NavComponent.vue"
import ReviewComponent from "../components/ReviewComponent.vue"
import {home} from "../services/services.js"
export default {
   name: 'MainView',
   components:{NavComponent,ReviewComponent},
   data(){
    return {
      reviews: [],
      message: "",
      error: false
    }
   },
   async beforeCreate(){

    let getAll = await home()

    if (getAll == "error"){
      this.message = getAll[1]
    }
    else if (getAll[1] == "401"){
      this.$router.push('/')
    }
    else {
      this.reviews = getAll
    }

    }
}
</script>
