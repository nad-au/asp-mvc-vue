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
        ax.get(`/api/brands`)
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
            <option value=''>Select a brand...</option>
            <option v-for="brand in brands" v-bind:value="brand.brandId">{{brand.brandName}}</option>
        </select>
    `
});

Vue.component('model-select', {
    props: ['value', 'brand', 'initial'],
    data: function() {
        return {
            models: [],
            initialValueSet: false,
            brandUpdated: false
        };
    },
    watch: { 
        brand: function(brand) {
            if (brand == null || brand === '') {
                this.models = [];
                return;
            }

            this.brandUpdated = true;
            ax.get(`/api/brands/${brand}/models`)
                .then(response => { this.models = response.data; })
                .catch(e => { this.errors.push(e); });
        }
    },
    updated() {
        if (this.brandUpdated) {
            this.$emit('input', '');
            this.brandUpdated = false;
        }

        if (!this.initialValueSet) {
            this.$emit('input', this.initial);
            this.initialValueSet = true;
        }
    },
    template: `
        <select :value="value" @input="$emit('input', $event.target.value)">
            <option value=''>Select a model...</option>
            <option v-for="model in models" v-bind:value="model.modelId">{{model.modelName}}</option>
        </select>
    `
});

var app = new Vue({
    el: '#vueApp',
    data: {
         brandId: '',
         modelId: ''
    },
    watch: { 
        brandId: function() {
            if (this.brandId === '') {
                this.modelId = '';
            }
        }
    }
});
