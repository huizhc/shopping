<template>
    <div v-show="list.length">
        <div class="list-control">
            <div class="list-control-filter">
                <span>品牌：</span>
                <span class="list-control-filter-item" v-for="(item, index) in brands"
                :key="index" :class="{ on: item === filterBrand }"
                @click="handleFilterBrand(item)">{{ item }}</span>
            </div>
            <div class="list-control-filter">
                <span>颜色：</span>
                <span
                class="list-control-filter-item"
                :class="{on: item === filterColor}"
                v-for="(item, index) in colors" :key="index"
                @click="handleFilterColor(item)">{{ item }}</span>
            </div>
            <div class="list-control-order">
                <span>排序：</span>
                <span class="list-control-order-item" :class="{ on: order === '' }"
                 @click="handleOrderDefault">默认</span>
                <span class="list-control-order-item" :class="{ on: order === 'sales' }"
                 @click="handleOrderSales">销量
                <template v-if="order === 'sales'">↓</template>
                 </span>
                <span class="list-control-order-item" :class="{ on: order.indexOf('cost') > -1 }"
                 @click="handleOrderCost">价格
                 <template v-if="order === 'cost-asc'">↑</template>
                 <template v-if="order === 'cost-desc'">↓</template>
                 </span>
            </div>
        </div>
        <Product v-for="item in filteredAndOrderedList" :info="item" :key="item.id"></Product>
        <div class="product-not-fount" v-show="!filteredAndOrderedList.length">
            暂无相关商品
        </div>
    </div>
</template>

<script>
import Product from '../components/pdct'
export default {
    components: {
        Product
    },
    data () {
        return {
            order: '',
            filterBrand: '',
            filterColor: ''
        }
    },
    computed: {
        list () {
            return this.$store.state.productList
        },
        filteredAndOrderedList () {
            let a = [...this.list];
            if (this.filterBrand !== '') {
                a = a.filter(item => item.brand === this.filterBrand);
            }
            if (this.filterColor !== '') {
                a = a.filter(item => item.color === this.filterColor);
            }
            if (this.order !== '') {
                if (this.order === 'sales') {
                    a = a.sort((a, b) => b.sales - a.sales)
                } else if (this.order === 'cost-desc') {
                    a = a.sort((a ,b) => b.cost - a.cost)
                } else if (this.order === 'cost-asc') {
                    a = a.sort((a, b) => a.cost - b.cost)
                }
            }
            return a;
        },
        brands () {
            return this.$store.getters.brands;
        },
        colors () {
            return this.$store.getters.colors;
        }
    },
    methods: {
        handleOrderDefault () {
            this.order = '';
        },
        handleOrderSales () {
            this.order = 'sales';
        },
        handleOrderCost () {
            if (this.order === 'cost-desc') {
                this.order = 'cost-asc';
            } else {
                this.order = 'cost-desc';
            }
        },
        handleFilterBrand (brand) {
            if (this.filterBrand === brand) {
                this.filterBrand = '';
            } else {
                this.filterBrand = brand;
            }
        },
        handleFilterColor (color) {
            if (this.filterColor === color) {
                this.filterColor = '';
            } else {
                this.filterColor = color;
            }
        },
    },
    mounted () {
        this.$store.dispatch('getProductList')
    }
}
</script>

<style scoped>
    .list-control{
        background: #fff;
        border-radius: 6px;
        margin: 16px;
        padding: 16px;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
    }
    .list-control-filter{
        margin-bottom: 16px;
    }
    .list-control-filter-item,
    .list-control-order-item {
        cursor: pointer;
        display: inline-block;
        border: 1px solid #e9eaec;
        border-radius: 4px;
        margin-right: 6px;
        padding: 2px 6px;
    }
    .list-control-filter-item.on,
    .list-control-order-item.on{
        background: #f2352e;
        border: 1px solid #f2352e;
        color: #fff;
    }
    .product-not-found{
        text-align: center;
        padding: 32px;
    }
</style>