<template>
    <div>
        <h1>Witamy w naszym sklepie z rakietami!</h1>
        <div v-if="!isAuthenticated">
          <h2 >Aby coś kupić, musisz być zalogowanym użytkownikiem.</h2>
          <br>
          <button @click="moveToLoginPage()">Zaloguj się</button>
        </div>
        <div v-else>
          <span>Jesteś zalogowany jako: {{ user }}</span>
          <span><button @click="moveToBasket()">Przejdź do koszyka</button></span>
          <br>
          <button  @click="LogOut()">Wyloguj się</button>
        </div>
        <Products/>
    </div>
</template>

<script>
import Products from './Products.vue'
import { mapGetters} from "vuex";
import { mapState} from "vuex";
import { mapActions} from "vuex";
export default {
  name: 'Home',
  components: {
    Products,
  },
  computed:{ 
    ...mapState(['user','products','basket','order']),
    ...mapActions(['GetProducts']),
    ...mapGetters(['isAuthenticated','StateBasket','StateProducts'])
  },
  methods: {
    ...mapActions(['LogOut']),
    async moveToLoginPage(){
      this.$router.push('/login');
    },
    async moveToBasket(){
      this.$router.push('/basket');
    },
  }
}
</script>