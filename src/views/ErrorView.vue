<template>
  <div>
    <img src="https://cdn-icons-png.flaticon.com/512/4989/4989793.png" alt="sad face" title="Sad face">
    <p class="white">The page you are trying to access does not exist.</p>
    <router-link class="white" to="/home">Return</router-link>
  </div>
</template>

<script>
export default {
   name: 'ErrorView',
}
</script>

<style scoped>

  div{
    margin-top: 100px;
  }
  img{
    width: 359px;
    filter: invert(1);
  }
  p{
    margin-top: 25px;
    font-size: 18px;
  }
  a{
    font-size: 21px;
  }
</style>
