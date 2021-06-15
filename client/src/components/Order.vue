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
      <div v-if="this.formInputNotOK">Nie wszystkie pola zostały wypełnione</div>
      <br>
      <div v-if="this.postalCodeNotOK">Nieprawidłowy kod</div>
      <br>
      <div v-if="formSend">Zamówienie zostało wysłane</div>
      <form>
        <label for="fname">Imię</label><br>
        <input type="text" v-model="user"><br>
        <label for="lname">Nazwisko</label><br>
        <input type="text"><br>
        <label for="place">Miejscowość</label><br>
        <input type="text" v-model="localOrder.address.place" required><br>
        <label for="street">Ulica</label><br>
        <input type="text" v-model="localOrder.address.street" required><br>
        <label for="hNumber" >Nr domu</label><br>
        <input type="text" v-model="localOrder.address.hNumber" required><br>
        <label for="fNumber">Nr mieszkania</label><br>
        <input type="text" v-model="localOrder.address.fNumber" required><br>
        <label for="postalCode">Kod pocztowy</label><br>
        <input type="text" v-model="localOrder.address.postalCode" required><br>
        <label for="comment">Komentarz</label><br>
        <textarea v-model="localOrder.address.comment"></textarea><br><br>
        <br><br>
        <input type="submit" value="Wyślij zamówienie" @click.prevent="updateLocalOrder()">
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
                  orderedProducts:null,
                  address:{place:null, street:null,hNumber:null, fNumber:null,postalCode:null},
                  comment:null
                  },
      formInputNotOK:null,
      postalCodeNotOK:null,
      formSend:null
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
      let address=this.localOrder.address;
      let addressOK=(!!address.place&&!!address.street&&!!address.hNumber&&!!address.fNumber&&!!address.postalCode);
      if(addressOK&&this.isPolishZipCode(this.localOrder.address.postalCode)){
              let d=new Date();
              this.localOrder.id=uuidv4();
              this.localOrder.date=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
              this.localOrder.time=d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
              this.localOrder.orderedProducts=this.basket; 
              this.sendOrder(this.localOrder)
              this.formInputNotOK=false;
              this.postalCodeNotOK=false;
              this.formSend=true;
            }
            else {
              if(addressOK) {
                this.postalCodeNotOK=true
              }
              else this.formInputNotOK=true
            }
    },
      isPolishZipCode(input){
      let regExp=/^[0-9]{2}[-]{1}[0-9]{3}$/;
      if(regExp.test(input)) return true;
      else return false;
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