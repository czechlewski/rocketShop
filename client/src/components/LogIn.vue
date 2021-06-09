<template>
    <div class="container">
        <div>
            <label for="uname"><b>Nazwa użytkownika</b></label>
            <input type="text" placeholder="Użytkownik" name="uname" v-model="user.username" required>
            <label for="psw"><b>Hasło</b></label>
            <input type="password" placeholder="Hasło" name="psw" v-model="user.password" required>
            <button type="submit" @click.enter="submit()">Zaloguj się</button>
            <br>
            <br>
            <span v-if="incorrectPsw">Nieparwidłowy login lub hasło</span>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
    export default {
        name: 'LogIn',
        data(){
            return{
                incorrectPsw:false,
                user:{
                    username:'',
                    password:''
                }
            }
        },
        computed:{
        },
        methods:{
            ...mapActions(['LogIn']),
                async submit() {
                    try {
                        await this.LogIn(this.user)
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