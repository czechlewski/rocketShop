<template>
    <div>
        <h2>Oto nasze produkty</h2>
        <table> 
            <thead>
            <tr>
                <th>Nazwa</th>
                <th>Producent</th>
                <th>Cena</th>
                <th>Liczba</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="product in this.localProducts" :key="product._id">
                <td>{{ product.name }}</td>
                <td>{{ product.company }}</td>
                <td>{{ product.price }}</td>
                <td><input min=1 type="number" v-model.number='product.amount'></td>
                <td><b-button variant="primary" @click="updateBasket(product)">Dodaj do koszyka</b-button></td>
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
            ...mapGetters(['isAuthenticated','StateBasket','StateProducts'])
        },
        data() {
            return {
                localProducts:null
            }
        },
        beforeMount() {
                this.GetProducts;
                this.StateProducts;
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