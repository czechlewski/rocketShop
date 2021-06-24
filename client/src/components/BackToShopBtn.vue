<template>
    <div>
      <button @click="moveToHome()">Wróć do sklepu</button>
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