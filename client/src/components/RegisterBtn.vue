<template>
    <div v-if="!isAuthenticated">
        <b-button  variant="danger"  @click="moveToRegisterPage()">Zarejestruj się</b-button>
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