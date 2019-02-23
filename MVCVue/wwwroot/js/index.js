const ax = axios;

var app = new Vue({
    el: '#vueApp',
    data: {
        selectedBrandId: '',
        brands: [],
        selectedModelId: '',
        models: [],
    },
    methods: {
        brandChanged: function () {
            this.selectedModelId = '';
            this.models = [];
            ax.get(`/api/brands/${this.selectedBrandId}/models`)
                .then(response => { this.models = response.data; })
                .catch(e => { this.errors.push(e); });
        }
    },
    created() {
        ax.get(`/api/brands`)
            .then(response => { this.brands = response.data; })
            .catch(e => { this.errors.push(e); });
    }
});