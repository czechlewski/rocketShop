<template>
    <div>
        <button @click="moveToBasket()">Przejdź do koszyka</button>
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