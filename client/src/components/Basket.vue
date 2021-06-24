<template>
  <div>
    <span v-if="isAuthenticated">Jesteś zalogowany jako: {{ user.username+' '+user.userlastname }}</span>
    <log-in-btn></log-in-btn>
    <back-to-shop-btn></back-to-shop-btn>
    <log-out-btn></log-out-btn>
  <div v-if="this.basket.length">
    <h2>Produkty w Twoim koszyku to:</h2>
      <table> 
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Cena</th>
            <th>Liczba w koszyku</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in basket" :key="product._id">
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td><input min=1 type="number" v-model.number='product.amount' @click="updateAmountInBasket(product)"></td>
            <td><button @click="removeProductFromBasket(product)">Usuń z koszyka</button></td>
           </tr>
        </tbody>    
      </table>
      <br>
      <span>Do zapłaty:{{this.total}}</span>
      <br>
      <button v-if="isAuthenticated" @click="moveToOrder()">Złóż zamówienie</button>
    </div>
    <div v-else>
      <h1>Twój koszyk jest pusty</h1> 
    </div>
  </div>
  
</template>
<script>
import { mapGetters, mapState,mapActions,mapMutations} from "vuex";
import LogInBtn from './LogInBtn.vue';
import LogOutBtn from './LogOutBtn.vue';
import BackToShopBtn from './BackToShopBtn.vue';
export default {
  name: 'Basket',
  components: {
    LogInBtn,
    LogOutBtn,
    BackToShopBtn
  },
  data() {
    return {
      total:0
    }
  },
  beforeMount() {
            this.basket.forEach(element => {
              this.total+=element.price*element.amount;
            });
        },
  beforeUpdate() {
            this.total=0;
            this.basket.forEach(element => {
              this.total+=element.price*element.amount;
            });
        },
  computed:{ 
    ...mapState(['user','products','basket','order']),
    ...mapGetters(['isAuthenticated','StateBasket','StateProducts']),
    ...mapActions(['GetProducts'])
  },
  methods: {
    async moveToHome(){
      this.$router.push('/');  
    },
    async moveToLoginPage(){
      this.$router.push('/login');
    },
    async moveToOrder(){
      this.$router.push('/order');
    },
    ...mapMutations(['addAmountToBasket','modifyAmountInBasket','addProductToBasket','deleteProductFromBasket']),
    ...mapActions(['updateAmountInBasket','removeProductFromBasket'])
  }
}
</script>