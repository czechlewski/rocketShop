<template>
    <div>
        <h1>Twój profil</h1>
        <div v-if="isAuthenticated">
          <back-to-shop-btn></back-to-shop-btn>
          <move-to-basket-btn></move-to-basket-btn>
          <log-out-btn></log-out-btn>
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
import MoveToBasketBtn from './MoveToBasketBtn.vue';
import BackToShopBtn from './BackToShopBtn.vue';
import LogOutBtn from './LogOutBtn.vue';
import axios from 'axios';
export default {
  name: 'User',
  components: {
    LogOutBtn,
    MoveToBasketBtn,
    BackToShopBtn
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
    async sendLocalUser(){
      await axios.post('user', this.user);
    }
  }
}
</script>