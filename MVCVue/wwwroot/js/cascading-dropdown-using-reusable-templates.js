const ax = axios;

Vue.component('vue-ajax-dropdown', {
    props: ['value', 'initial', 'ajaxUrl', 'placeholder', 'displayName', 'valueName'],
    data: function() {
        return {
            options: [],
            initialValueSet: false
        };
    },
    created() {
        ax.get(this.ajaxUrl)
            .then(response => { this.options = response.data; })
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
            <option value=''>{{placeholder}}</option>
            <option v-for="option in options" v-bind:value="option[valueName]">{{option[displayName]}}</option>
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
