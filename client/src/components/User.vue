<template>
    <div v-if="isAuthenticated">
      <h1>Twój profil</h1>
        <back-to-shop-btn></back-to-shop-btn>
        <move-to-basket-btn></move-to-basket-btn>
        <log-out-btn></log-out-btn>
        <user-data></user-data>
        <history-of-orders></history-of-orders>
    </div>
</template>

<script>
import { mapGetters, mapState} from "vuex";
import MoveToBasketBtn from './MoveToBasketBtn.vue';
import BackToShopBtn from './BackToShopBtn.vue';
import LogOutBtn from './LogOutBtn.vue';
import UserData from './UserData.vue';
import HistoryOfOrders from './HistoryOfOrders.vue';
//import axios from 'axios';
export default {
  name: 'User',
  components: {
    LogOutBtn,
    MoveToBasketBtn,
    BackToShopBtn,
    UserData,
    HistoryOfOrders
  },
  computed:{ 
    ...mapState(['user','products','basket','order']),
    //...mapActions(['GetProducts']),
    ...mapGetters(['isAuthenticated','StateBasket','StateProducts'])
  },
  methods: {

  }
   /*  ...mapActions(['removeOrderFormUser']),
    async sendLocalUser(){
      await axios.post('user', this.user);
    }
  } */
}
</script>