<template>
    <div>
        <b-button  variant="secondary"  @click="moveToBasket()">Przejdź do koszyka</b-button>
    </div>
</template>
<script>
export default {
    methods: {
    async moveToBasket(){
      this.$router.push('/basket');
    },
    }
}
</script>