<template>
    <div>
        <register-btn></register-btn>
        <back-to-shop-btn></back-to-shop-btn>
        <move-to-basket-btn></move-to-basket-btn>  
        <label for="uname"><b>Nazwa użytkownika</b></label>
        <br>
        <input type="text" placeholder="Użytkownik" name="uname" v-model="loginData.username" required>
        <br>
        <label for="psw"><b>Hasło</b></label>
        <br>
        <input type="password" placeholder="Hasło" name="psw" v-model="loginData.password" required>
        <br>
        <button type="submit" @click.enter="submit()">Zaloguj się</button>
        <br>
        <span v-if="incorrectPsw">Nieparwidłowy login lub hasło</span>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import BackToShopBtn from './BackToShopBtn.vue';
import MoveToBasketBtn from './MoveToBasketBtn.vue';
import RegisterBtn from './RegisterBtn.vue';
    export default {
        name: 'LogIn',
        components: {
            BackToShopBtn,
            MoveToBasketBtn,
            RegisterBtn
        },
        data(){
            return{
                incorrectPsw:false,
                loginData: {
                    username:null,
                    password:null
                } 
            }
        },
        computed:{
        },
        methods:{
            ...mapActions(['LogIn']),
                async submit() {
                    try {
                        await this.LogIn({username:this.loginData.username,password:this.loginData.password})
                        .then(data=>{
                        if(data) this.$router.push("/"); 
                        else this.incorrectPsw=true})
                        .catch(err=>console.log(err))
                    }
                    catch(err) {console.log(err)}
            }
        }
    }
</script>