<template>
  <NavComponentVue/>
  <div id="container">
    <div id="container-2">

         <span v-if="id == review.user"><router-link :to="link" title="Edit" class="material-symbols-outlined icon" id="edit">edit</router-link></span>

        <h1>{{review.title}}</h1>
        <img id="img-1" :src="review.img" :alt="review.title">
        <p>{{review.description}}</p>
        <span @click="deleteReview" v-if="id == review.user"><p title="Delete" class="material-symbols-outlined icon" id="delete">delete</p></span>
    
        {{message}}
    </div>   
  </div>

  <div id="container-3">

    <span v-for="(value) in reviews" :key="value.id">
      <ReviewComponent :id="value.id" :title="value.title" :description="value.description" :img="value.img"/>
    </span>

  </div>
</template>

<script>
import NavComponentVue from '@/components/NavComponent.vue'
import ReviewComponent from "../../components/ReviewComponent.vue"
import {deleteReview,getSingleReview,getUserReviews} from "../../services/services.js"
export default {
  name: 'ReviewDetailsView',
  components:{
    NavComponentVue,
    ReviewComponent
  },
  data(){return {
    review: {title: "",description: "",img: "http://localhost:4000/media/images/loading.gif",user: "",id:""},
    error: false,
    id: localStorage.getItem("id"),
    message: "",
    reviews: [],
    link: "/review/create/" + this.$route.params.id 
  }}
  ,
  async created(){
      this.init()
    }
  ,
  watch: {
    '$route.params.id': {
      handler () {
        this.init()

        window.scrollTo({ top: 0})
      }
    }
  },

  methods:{

    async init(){

      let getReview = await getSingleReview(this.$route.params.id)

      if (getReview[0] == "error"){
        this.$router.push('../home')
      }else
      {
        this.review = getReview[0]; 
        this.review.img = getReview[1]
      }

      if (this.review.user != "")
      {
      let userReviews = await getUserReviews(this.review.user,this.$route.params.id)

      if (userReviews[0] == "error"){
        this.$router.push('../home')
      }
      else if (userReviews[0] == "success"){
        this.reviews = userReviews[1]
      }}
      },

    async deleteReview(){

        let delet = await deleteReview(this.$route.params.id, localStorage.getItem("token"))

        if (delet[0] == "error"){
            this.message = delet[1]
        }
        else if (delet[1] == "401"){
        this.$router.push('/')
        }
        else {
            this.$router.push('../home')
        }}}
}
</script>

<style scoped>

    #delete{
        background: rgb(250, 61, 61);
    }
    #edit{
        background: rgb(1, 142, 223);
        text-decoration: none;
        margin-top: 20px;
    }
    #container{
        width: 100%;
        display: flex;
        justify-content: center;
        padding-bottom: 50px;
        border-bottom: 1px solid black;
    }
    #container-2{
        width: 600px;
        height: 700px;
        background: white;
        border-radius: 25px;
        margin-top: 35px;
        box-shadow: 0 0 6px #353535;
        word-wrap: break-word;
    }
    #img-1{
        margin-top:25px;
        max-width: 400px;
        max-height: 400px;
    }
    #container-3{
        padding-top: 25px;
    }
    .icon{
        color: rgb(255, 255, 255);
        padding: 5px;
        border-radius: 25px;
    }

    .icon:hover{
        box-shadow: 0 0 6px #353535;
        cursor: pointer;
    }

    h1{
        margin: 25px;
        margin-bottom: -10px;
        margin-top: 20px;
    }

    p{
        margin: 25px;
        margin-bottom: 10px;
        margin-top: 10px;
    }

    @media screen and (max-width: 850px){
    #container-2{
        width: 95%;
    }
   
}
</style>