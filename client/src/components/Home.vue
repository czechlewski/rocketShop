<template>
    <div>
      <b-container>
        <b-row>
        <h1>Witamy w naszym sklepie z rakietami!</h1>
        </b-row>
        <b-row>
        <logged-as-inf></logged-as-inf>
        <move-to-user-account-btn></move-to-user-account-btn>
        <b-button-group>
        <register-btn></register-btn>
        <log-in-btn></log-in-btn>
        <move-to-basket-btn></move-to-basket-btn>
        </b-button-group>
        <log-out-home-btn></log-out-home-btn>
        <products></products>
        </b-row>
      </b-container>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions} from "vuex";
import Products from './Products.vue';
import LogInBtn from './LogInBtn.vue';
import RegisterBtn from './RegisterBtn.vue';
import LogOutHomeBtn from './LogOutHomeBtn.vue';
import MoveToBasketBtn from './MoveToBasketBtn.vue';
import MoveToUserAccountBtn from './MoveToUserAccountBtn.vue';
import LoggedAsInf from './LoggedAsInf.vue';
export default {
  name: 'Home',
  components: {
    Products,
    LogInBtn,
    RegisterBtn,
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