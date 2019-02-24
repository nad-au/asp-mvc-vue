const ax = axios;

Vue.component('brand-select', {
    props: ['value'],
    data: function() {
        return {
            brands: [],
        };
    },
    created() {
        ax.get(`/api/brands`)
            .then(response => { this.brands = response.data; })
            .catch(e => { this.errors.push(e); });
    },
    template: `
        <select :value="value" @input="$emit('input', $event.target.value)">
            <option value="">Select a brand</option>
            <option v-for="brand in brands" v-bind:value="brand.brandId">{{brand.brandName}}</option>
        </select>
    `
});

var app = new Vue({
    el: '#vueApp',
    data: { name: '' },
});
