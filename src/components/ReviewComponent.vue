<template>
  <div @click="reDirect" id="container-re" :title="title">
    <img :src="'https://python-crud.onrender.com' + img" alt="review">
    <div id="container-re-2">
     <h2>{{title}}</h2>
     <p>{{filter()}}</p>
    </div>  
  </div>
</template>

<script>
export default {
  name: 'ReviewComponent',
  props: {
    title: String,
    description: String,
    img: String,
    id: Number
  },
  methods:{
    filter(){
    const des = this.description + "."

    if(des.length > 30){
      return des.slice(0,30) + ".."
    }
    else{return des}

    },
    reDirect(){
      this.$router.push({ name: 'review', params: { id: this.id } })
    }}
}
</script>

<style scoped>
  #container-re {
    margin-top: 30px;
    width: 400px;
    height: 300px;
    background: rgb(255, 255, 255);
    margin-left: 20px;
    margin-right: 20px;
    word-wrap: break-word;
    box-shadow: 0 0 10px #2a2a2a;
    transition: 1s;
    display: inline-block;
  }
  #container-re:hover{
    cursor: pointer;
    width: 406px;
    height: 306px;
    transition: 0.5s;
  }
   #container-re-2{
    margin: 16px;
  }
  img{
    height: 155px;
    object-fit: cover;
  } 
  p{
    font-size: 14px;
  }
  h2{
    font-size: 20px;
  }

</style>