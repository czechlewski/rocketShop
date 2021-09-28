<template>
    <div v-if="!isAuthenticated">
        <b-button  variant="dark" @click="moveToLoginPage()">Zaloguj się</b-button>
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
          }
    }
}
</script>