<template>
    <div>
        <button v-if="isAuthenticated" @click="moveToOrder()">Złóż zamówienie</button>
    </div>
</template>
<script>
import { mapGetters} from "vuex";
export default {
    computed:{
    ...mapGetters(['isAuthenticated'])
    },
    methods: {
        
    async moveToOrder(){
      this.$router.push('/order');
    }
    }
}
</script>