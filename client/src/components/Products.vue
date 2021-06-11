<template>
    <div>
        <h2>Oto nasze produkty</h2>
        <table> 
            <thead>
            <tr>
                <th>Nazwa</th>
                <th>Producent</th>
                <th>Cena</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="product in localProducts" :key="product._id">
                <td>{{ product.name }}</td>
                <td>{{ product.company }}</td>
                <td>{{ product.price }}</td>
                <td v-if="isAuthenticated"><button @click="updateBasket(product)">Dodaj do koszyka</button></td>
                <td v-if="isAuthenticated"><input min=1 type="number" v-model.number='product.amount'></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { mapMutations,mapState,mapActions,mapGetters} from "vuex";
    export default {
        name: 'Products',
        computed:{
            ...mapState(['products','basket','order']),
            ...mapActions(['GetProducts']),
            ...mapGetters(['isAuthenticated','StateBasket'])
        },
        data() {
            return {
                localProducts:null
            }
        },
        beforeMount() {
                 this.localProducts = this.products;
                 this.localProducts.forEach(element => {
                     element.amount=1;
                 });
        },
        methods: {
            ...mapMutations(['addAmountToBasket','addProductToBasket']),
            ...mapActions(['updateBasket'])
            }
    }
</script>