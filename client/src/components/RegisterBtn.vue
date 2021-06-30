<template>
    <div v-if="!isAuthenticated">
        <button @click="moveToRegisterPage()">Zarejestruj się</button>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    computed:{ 
    ...mapGetters(['isAuthenticated'])
    },
    methods: {
    async moveToRegisterPage(){
      this.$router.push('/register');
          }
    }
}
</script>