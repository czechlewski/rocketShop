<template>
    <div>
        <div>Imię:{{ user.username }}</div>
        <div>Nazwisko:{{ user.userlastname }}</div>
        <div>Email:{{ user.useremail }}</div>
    </div>
</template>

<script>
import { mapGetters, mapState} from "vuex";
export default {
  name: 'UserData',
  components: {
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