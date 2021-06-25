<template>
  <div>
    <basket></basket>
    <div v-if="this.formInputNotOK">Nie wszystkie pola zostały wypełnione</div>
      <br>
    <div v-if="this.postalCodeNotOK">Nieprawidłowy kod</div>
      <br>
    <div v-if="formSend">Zamówienie zostało wysłane</div>
    <form>
        <label for="fname">Imię</label><br>
        <input type="text" v-model="user.username"><br>
        <label for="lname">Nazwisko</label><br>
        <input type="text" v-model="user.userlastname"><br>
        <label for="place">Miejscowość</label><br>
        <input type="text" v-model="order.address.place" required><br>
        <label for="street">Ulica</label><br>
        <input type="text" v-model="order.address.street" required><br>
        <label for="hNumber" >Nr domu</label><br>
        <input type="text" v-model="order.address.hNumber" required><br>
        <label for="fNumber">Nr mieszkania</label><br>
        <input type="text" v-model="order.address.fNumber" required><br>
        <label for="postalCode">Kod pocztowy</label><br>
        <input type="text" v-model="order.address.postalCode" required><br>
        <label for="comment">Komentarz</label><br>
        <textarea v-model="order.comment"></textarea><br><br>
        <br><br>
        <input type="submit" value="Wyślij zamówienie" @click.prevent="sendLocalOrder()">
      </form>
  </div>   
</template>
<script>
import { mapGetters, mapState,mapActions,mapMutations} from "vuex";
import Basket from './Basket.vue'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
export default {
  name: 'Order',
  components: {
    Basket
  },
  data() {
    return {
      total:0,
      order:{id:null,
                  date:null,
                  time:null,
                  orderedProducts:null,
                  address:{place:null, street:null,hNumber:null, fNumber:null,postalCode:null},
                  price:null,
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
    ...mapState(['user','products','basket']),
    ...mapGetters(['isAuthenticated','StateBasket','StateProducts']),
    ...mapActions(['GetProducts'])
  },
  methods: {
    async sendLocalOrder(){
      let address=this.order.address;
      let addressOK=(!!address.place&&!!address.street&&!!address.hNumber&&!!address.fNumber&&!!address.postalCode);
      if(addressOK&&this.isPolishZipCode(this.order.address.postalCode)){
              let d=new Date();
              this.order.id=uuidv4();
              this.order.date=d.toLocaleDateString();
              this.order.time=d.toLocaleTimeString();
              this.order.orderedProducts=this.basket;
              this.order.price=this.total;
              this.addOrderToUser(this.order)
              this.clearBasket();
              await axios.post('order', this.user);
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
      'updateOrder',
      'addOrderToUser',
      'clearBasket'
      ]),
    ...mapActions([
      'updateAmountInBasket',
      'removeProductFromBasket',
      'sendOrder',
      'modifyUser',
      'clearBasket'
      ])
  }
}
</script>