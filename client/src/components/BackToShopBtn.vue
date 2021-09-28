<template>
    <div>
      <b-button  variant="secondary"  @click="moveToHome()">Wróć do sklepu</b-button>
    </div>
</template>
<script>
export default {
    methods: {
    async moveToHome(){
      this.$router.push('/');
    },
    }
}
</script>