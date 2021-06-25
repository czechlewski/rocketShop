<template>
    <div v-if="isAuthenticated">
        <span>Jesteś zalogowany jako: {{ user.username+' '+user.userlastname }}</span>
    </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
    computed:{ 
    ...mapState(['user','products','basket','order']),
    ...mapActions(['GetProducts']),
    ...mapGetters(['isAuthenticated','StateBasket','StateProducts'])
    },
    methods: {
   }
}
</script>