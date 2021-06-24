<template>
    <div>
        <h1>Witamy w naszym sklepie z rakietami!</h1>
        <log-in-btn></log-in-btn>
        <move-to-basket-btn></move-to-basket-btn>
        <log-out-btn></log-out-btn>
        <div v-if="isAuthenticated">
          <span>Jesteś zalogowany jako: {{ user.username+' '+user.userlastname }}</span>
          <br>
          <button @click="moveToUserPage()">Moje konto</button>
          <br>
        </div>
        <products></products>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions} from "vuex";
import Products from './Products.vue'
import LogInBtn from './LogInBtn.vue';
import LogOutBtn from './LogOutBtn.vue';
import MoveToBasketBtn from './MoveToBasketBtn.vue';
export default {
  name: 'Home',
  components: {
    Products,
    LogInBtn,
    LogOutBtn,
    MoveToBasketBtn
  },
  computed:{ 
    ...mapState(['user','products','basket','order']),
    ...mapActions(['GetProducts']),
    ...mapGetters(['isAuthenticated','StateBasket','StateProducts'])
  },
  methods: {
    
    async moveToUserPage(){
      this.$router.push('/user');
          }
  }
}
</script>