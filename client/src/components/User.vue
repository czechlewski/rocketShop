<template>
    <div>
        <h1>Twój profil</h1>
        <div v-if="isAuthenticated">
          <button @click="moveToHome()">Wróć do sklepu</button>
          <br>
          <button @click="moveToBasket()">Przejdź do koszyka</button>
          <br>
          <button  @click="LogOut()">Wyloguj się</button>
          <div>Imię:{{ user.username }}</div>
          <div>Nazwisko:{{ user.userlastname }}</div>
          <div>Email:{{ user.useremail }}</div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions} from "vuex";
export default {
  name: 'User',
  components: {
  },
  computed:{ 
    ...mapState(['user','products','basket','order']),
    ...mapActions(['GetProducts']),
    ...mapGetters(['isAuthenticated','StateBasket','StateProducts'])
  },
  methods: {
    ...mapActions(['LogOut']),
    async moveToBasket(){
      this.$router.push('/basket');
    },
    async moveToHome(){
      this.$router.push('/');
    },
    async moveToLoginPage(){
      this.$router.push('/login');
          }
  }
}
</script>