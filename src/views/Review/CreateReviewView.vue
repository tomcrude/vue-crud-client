<template>
  <NavComponentVue/>
    <div id="container">
    <div id="container-3"><img title="Vue image" :src="review.img" alt="Vue"></div>
    <div id="container-2">
        <div id="container-2-1" :style="title == 'User Login' ? 'margin-top:95px' : '' ">
            <form @submit="CreateReviewEdit">
                <h1>{{params == 0 ? "Create Review" : "Edit Review"}}</h1>
                <input @input="e => review.title = e.target.value" :value="review.title" required placeholder="Title" type="text">
                <textarea @input="e => review.description = e.target.value" :value="review.description" rows="5" resize="none" id="text" maxlength="100" required placeholder="Describe the review" type="text"/>
                <input @change='PreView' title="Upload a image" id="file" :required="params == 0" type="file">
                <span class="material-symbols-outlined"><p>image</p></span>
                <button title="Send" type="submit" class="button-authentication">{{params == 0 ? "CREATE" : "SEND"}}</button>
                
            </form>
          <div v-show="message == null" id="spinner"></div>
          <p style="color:rgb(255,0,0); fontSize:12px; marginTop:-12px">{{message}}</p>
        </div>
    </div>
  </div>
</template>

<script>
import NavComponentVue from '@/components/NavComponent.vue'
import {getSingleReview,postReview,putReview} from "../../services/services.js"
export default {
  name: 'CreateReviewView',
  components:{
    NavComponentVue
  },  
  data(){
    return {
      image: null,
      title: "",
      description: "",
      params:this.$route.params.id,
      error: false,
      message: "",
      review: {title: "", description: "", img: "https://static.vecteezy.com/system/resources/previews/005/217/482/non_2x/the-question-mark-in-a-circle-black-icon-vector.jpg"}
    }
  },
  watch: {
    '$route.params.id': {
      handler () {
        this.image= null,
        this.title= String,
        this.description= String,
        this.params= this.$route.params.id,
        this.error= false,
        this.message= "",
        this.review= {title: "", description: "", img: "https://static.vecteezy.com/system/resources/previews/005/217/482/non_2x/the-question-mark-in-a-circle-black-icon-vector.jpg"}
      }
    }
  },
  async beforeCreate(){

    if (this.$route.params.id != 0){

    let getReview = await getSingleReview(this.$route.params.id)

    if (getReview[0] == "error"){
        this.$router.push('../home')
    }else
    {
      this.review = getReview[0]; 
      this.review.img = getReview[1]
    }}
  }
  ,
  methods: {

     PreView(e){
       this.review.img = URL.createObjectURL(e.target.files[0]);
       this.image = e.target.files[0]
       },
      
     async CreateReviewEdit(e){

      e.preventDefault()
      this.message = null
      const formdata = new FormData()

      formdata.append('img', this.image);
      formdata.append('title', this.review.title);
      formdata.append('description', this.review.description);
      formdata.append('user', parseInt(localStorage.getItem("id")));

      if (this.$route.params.id == 0){

        let createReview = await postReview(formdata)

        if(createReview[0] == "error"){
          this.message = createReview[1]
        }
        else if (createReview[1] == "401"){
        this.$router.push('/')
        }   
        else {
          this.$router.push(`/review/${createReview[1]}`)
        }
        }
      
      else {
        formdata.append('token', localStorage.getItem("token"));

        if (this.image == null){
          let response = await fetch(this.review.img);
          let datas = await response.blob();
          let metadata = {
           type: 'image/jpeg'
           };
          let file = new File([datas], "test.jpg", metadata);

          formdata.append('img', file)}

          let updateReview = await putReview(formdata,this.$route.params.id)

          if(updateReview[0] == "error"){
          this.message = updateReview[1]
          }
          else if (updateReview[1] == "401"){
          this.$router.push('/')
          }
          else {
          this.$router.push(`/review/${this.$route.params.id}`)
          }
       }}}}

</script>

<style scoped src="../../styles/forms.css"/>