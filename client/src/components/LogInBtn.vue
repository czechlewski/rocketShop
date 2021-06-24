<template>
    <div v-if="!isAuthenticated">
        <button @click="moveToLoginPage()">Zaloguj się</button>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    computed:{ 
    ...mapGetters(['isAuthenticated'])
    },
    methods: {
    async moveToLoginPage(){
      this.$router.push('/login');
          },
    }
}
</script>