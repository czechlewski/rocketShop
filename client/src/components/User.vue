<template>
    <div>
        <h1>Twój profil</h1>
        <div v-if="isAuthenticated">
          <button @click="moveToHome()">Wróć do sklepu</button>
          <br>
          <button @click="moveToBasket()">Przejdź do koszyka</button>
          <br>
          <button  @click="LogOut()&&moveToHome()">Wyloguj się</button>
          <div>Imię:{{ user.username }}</div>
          <div>Nazwisko:{{ user.userlastname }}</div>
          <div>Email:{{ user.useremail }}</div>
          <div v-if="user.orders.length">
          <h2>Historia zamówień</h2>
          <table> 
            <thead>
            <tr>
                <th>Numer</th>
                <th>Data</th>
                <th>Godzina</th>
                <th>Wartość</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="order in user.orders" :key="order.id">
                <td>{{ user.orders.indexOf(order)+1}}</td>
                <td>{{ order.date }}</td>
                <td>{{ order.time }}</td>
                <td>{{ order.price }}</td>
                <td><button @click="removeOrderFormUser(order)&&sendLocalUser()">Usuń z historii</button></td>
                </tr>
            </tbody>
        </table>
        </div>
        <div v-else><h3>Nie masz żadnych zamówień</h3></div>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions} from "vuex";
import axios from 'axios';
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
    ...mapActions(['LogOut','removeOrderFormUser']),
    async moveToBasket(){
      this.$router.push('/basket');
    },
    async moveToHome(){
      this.$router.push('/');
    },
    async moveToLoginPage(){
      this.$router.push('/login');
    },
    async sendLocalUser(){
      await axios.post('user', this.user);
    }
  }
}
</script>