var app = new Vue({
    el: '#vueApp',
    data: {
         brandId: '',
         modelId: ''
    },
    watch: { 
        brandId: function() {
            if (this.brandId === '' || this.brandId == null) {
                this.modelId = '';
            }
        }
    },
    computed: { 
        getModelsUrl: function() {
            if (this.brandId === '' || this.brandId == null) {
                return '';
            }

            return `/api/cars/${this.brandId}/models`;
        }
    }
});
