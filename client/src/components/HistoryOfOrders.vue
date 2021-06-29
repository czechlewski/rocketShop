<template>
  <div v-if="user.orders.length">
    <h2>Historia zamówień</h2>
    <table> 
      <thead>
        <tr>
          <th>Numer</th>
          <th>Data</th>
          <th>Godzina</th>
          <th>Wartość</th>
          <th>Zamówione produkty (liczba)</th>
        </tr>
      </thead>
        <tbody>
          <tr v-for="order in user.orders" :key="order.id">
            <td>{{ user.orders.indexOf(order)+1}}</td>
            <td>{{ order.date }}</td>
            <td>{{ order.time }}</td>
            <td>{{ order.price+'$'}}</td>
            <td>
              <ol>
                <li v-for="(product,index) in order.orderedProducts" :key="index">{{product.name+' '+'('+product.amount+')'}}</li>
              </ol>
            </td>
            <td><button @click="removeOrderFormUser(order)&&sendLocalUser()">Usuń z historii zamówień</button></td>
          </tr>
        </tbody>
      </table>
      
  </div>
  <div v-else><h3>Na razie nie masz zamówień</h3></div>
</template>
<script>
import { mapGetters, mapState, mapActions} from "vuex";
import axios from 'axios';
export default {
  name: 'HistoryOfOrders',
  components: {
  },
  computed:{ 
    ...mapState(['user','products','basket','order']),
    ...mapActions(['GetProducts']),
    ...mapGetters(['isAuthenticated','StateBasket','StateProducts'])
  },
  methods: {
    ...mapActions(['removeOrderFormUser']),
    async sendLocalUser(){
      await axios.post('user', this.user);
    }
  }
}
</script>