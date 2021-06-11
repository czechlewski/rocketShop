<template>
  <div>
    <span>Jesteś zalogowany jako: {{ user }}</span>
    <br>
    <button @click="moveToHome()">Wróć do sklepu</button>
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
      <button @click="moveToBasket()">Wróć do koszyka</button>
      <br>
      <form>
        <label for="fname">Imię</label><br>
        <input type="text" v-model="user"><br>
        <label for="lname">Nazwisko</label><br>
        <input type="text"><br>
        <label for="place">Miejscowość</label><br>
        <input type="text"><br>
        <label for="street">Ulica</label><br>
        <input type="text"><br>
        <label for="hNumber">Nr domu</label><br>
        <input type="text"><br>
        <label for="fNumber">Nr mieszkania</label><br>
        <input type="text"><br>
        <label for="postalCode">Kod pocztowy</label><br>
        <input type="text"><br><br>
        <button @click.once="updateLocalOrder()">Wyślij zamówienie</button>
      </form> 
    </div>
  </div>
  
</template>
<script>
import { mapGetters, mapState,mapActions,mapMutations} from "vuex";
import { v4 as uuidv4 } from 'uuid';
export default {
  name: 'Order',
  components: {
  },
  data() {
    return {
      total:0,
      localOrder:{id:null,
                  date:null,
                  time:null,
                  orderedProducts:null}
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
    async moveToBasket(){
      this.$router.push('/basket');
    },
    async updateLocalOrder(){
      let d=new Date();
      this.localOrder.id=uuidv4();
      this.localOrder.date=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
      this.localOrder.time=d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
      this.localOrder.orderedProducts=this.basket;
      this.sendOrder(this.localOrder);
    },
    ...mapMutations([
      'addAmountToBasket',
      'modifyAmountInBasket',
      'addProductToBasket',
      'deleteProductFromBasket',
      'updateOrder'
      ]),
    ...mapActions([
      'updateAmountInBasket',
      'removeProductFromBasket',
      'sendOrder'
      ])
  }
}
</script>