<template>
    <div v-if="isAuthenticated">
        <button @click="moveToUserPage()">Moje konto</button>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    computed:{ 
    ...mapGetters(['isAuthenticated'])
    },
    methods: {
    async moveToUserPage(){
      this.$router.push('/user');
          }
    }
}
</script>