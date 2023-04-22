<template>
    <footer>
        Copyright @VueCrud {{date}}
    </footer>
</template>



<script>
export default {
  name: 'FooterComponent',
  data(){
    return {
        date : new Date().getFullYear()
    }
  }
}

</script>

<style>
    footer{
        margin-top: 90vh;
        color: rgb(241, 241, 241);
    }
</style>