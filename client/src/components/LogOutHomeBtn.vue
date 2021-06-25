<template>
    <div v-if="isAuthenticated">
        <button  @click="LogOut()">Wyloguj się</button>
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