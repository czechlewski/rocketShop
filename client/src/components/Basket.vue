<template>
  <div>
    <logged-as-inf></logged-as-inf>
    <log-in-btn></log-in-btn>
    <move-to-user-account-btn></move-to-user-account-btn>
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
      <move-to-order-btn></move-to-order-btn>
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
import MoveToUserAccountBtn from './MoveToUserAccountBtn.vue';
import MoveToOrderBtn from './MoveToOrderBtn.vue';
import LoggedAsInf from './LoggedAsInf.vue';
export default {
  name: 'Basket',
  components: {
    LogInBtn,
    LogOutBtn,
    BackToShopBtn,
    MoveToOrderBtn,
    MoveToUserAccountBtn,
    LoggedAsInf
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
    ...mapMutations(['addAmountToBasket','modifyAmountInBasket','addProductToBasket','deleteProductFromBasket']),
    ...mapActions(['updateAmountInBasket','removeProductFromBasket'])
  }
}
</script>