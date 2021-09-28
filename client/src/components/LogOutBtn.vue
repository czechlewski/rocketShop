<template>
    <div v-if="isAuthenticated">
        <b-button  variant="dark" button  @click="LogOut()&&moveToHome()">Wyloguj się</b-button>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
    computed:{ 
    ...mapGetters(['isAuthenticated'])
    },
    methods: {
    ...mapActions(['LogOut']),
    async moveToHome(){
      this.$router.push('/');
        }
    }
}
</script>