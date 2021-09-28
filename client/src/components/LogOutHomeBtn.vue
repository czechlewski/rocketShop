<template>
    <div v-if="isAuthenticated">
        <b-button  variant="dark" @click="LogOut()">Wyloguj się</b-button>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
    computed:{ 
    ...mapGetters(['isAuthenticated'])
    },
    methods: {
    ...mapActions(['LogOut'])
    }
}
</script>