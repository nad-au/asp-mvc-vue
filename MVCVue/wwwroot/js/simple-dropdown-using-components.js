const ax = axios;

Vue.component('brand-select', {
    props: ['value', 'initial'],
    data: function() {
        return {
            brands: [],
            initialValueSet: false
        };
    },
    created() {
        ax.get(`/api/cars`)
            .then(response => { this.brands = response.data; })
            .catch(e => { this.errors.push(e); });
    },
    updated() {
        if (!this.initialValueSet) {
            this.$emit('input', this.initial);
            this.initialValueSet = true;
        }
    },
    template: `
        <select :value="value" @input="$emit('input', $event.target.value)">
            <option value=''>Select a value...</option>
            <option v-for="brand in brands" v-bind:value="brand.brandId">{{brand.brandName}}</option>
        </select>
    `
});

var app = new Vue({
    el: '#vueApp',
    data: {
         brandId: ''
    }
});
