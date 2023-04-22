<template>


  <AuthenComponent title="Register" button="Send" linkText="Do you already have an account? log in"></AuthenComponent>
   


</template>

<script>
 import AuthenComponent from "../../components/AuthenComponent.vue"

export default {
  name: 'RegisterView',
  components: {AuthenComponent}
}
</script>