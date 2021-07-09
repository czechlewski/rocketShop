<template>
    <div>
        <back-to-shop-btn></back-to-shop-btn>
        <move-to-basket-btn></move-to-basket-btn>
        <label for="uname"><b>Imię</b></label>
        <br>
        <input type="text" placeholder="Imię" name="uname" v-model="registerData.username" required>
        <br>
        <label for="ulname"><b>Nazwisko</b></label>
        <br>
        <input type="text" placeholder="Nazwisko" name="ulname" v-model="registerData.userlastname" required>
        <br>
        <label for="email"><b>Adres email</b></label>
        <br>
        <input type="email" placeholder="Email" name="email" v-model="registerData.useremail" required>
        <br>
        <label for="psw"><b>Hasło</b></label>
        <br>
        <input type="password" placeholder="Hasło" name="psw" v-model="registerData.password" required>
        <br>
        <button type="submit" @click.enter="register()">Zarejestruj się</button>
        <br>
        <span v-if="incorrectRegisterData">Nieparwidłowe dane</span>
    </div>
</template>

<script>
import { mapActions, mapState,mapGetters} from "vuex";
import BackToShopBtn from './BackToShopBtn.vue';
import MoveToBasketBtn from './MoveToBasketBtn.vue';
    export default {
        name: 'Register',
        components: {
            BackToShopBtn,
            MoveToBasketBtn
        },
        data(){
            return{
                incorrectRegisterData:false,
                registerData: {
                    username:null,
                    userlastname:null,
                    useremail:null,
                    password:null,
                    orders:[]
                } 
            }
        },
        computed:{
        ...mapState(['user']),
        ...mapGetters(['isAuthenticated'])
        },
        methods:{
            ...mapActions(['Register']),
                async register() {
                    try {
                        await this.Register(
                        this.registerData)
                        .then(data=>{
                        if(data) this.$router.push("/");
                        else {
                        //this.$router.push("/register")
                        this.incorrectRegisterData=true;
                        }
                        })
                        .catch(err=>console.log(err))
                    }
                    catch(err) {console.log(err)}
            }
        }
    }
</script>