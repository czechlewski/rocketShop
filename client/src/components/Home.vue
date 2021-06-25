<template>
    <div>
        <h1>Witamy w naszym sklepie z rakietami!</h1>
        <logged-as-inf></logged-as-inf>
        <move-to-user-account-btn></move-to-user-account-btn>
        <log-in-btn></log-in-btn>
        <move-to-basket-btn></move-to-basket-btn>
        <log-out-home-btn></log-out-home-btn>
        <products></products>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions} from "vuex";
import Products from './Products.vue'
import LogInBtn from './LogInBtn.vue';
import LogOutHomeBtn from './LogOutHomeBtn.vue';
import MoveToBasketBtn from './MoveToBasketBtn.vue';
import MoveToUserAccountBtn from './MoveToUserAccountBtn.vue';
import LoggedAsInf from './LoggedAsInf.vue';
export default {
  name: 'Home',
  components: {
    Products,
    LogInBtn,
    LogOutHomeBtn,
    MoveToBasketBtn,
    MoveToUserAccountBtn,
    LoggedAsInf
  },
  computed:{ 
    ...mapState(['user','products','basket','order']),
    ...mapActions(['GetProducts']),
    ...mapGetters(['isAuthenticated','StateBasket','StateProducts'])
  },
  methods: {
  }
}
</script>