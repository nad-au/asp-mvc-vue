var vueApps = document.querySelectorAll(".vueApp");
for (const vueApp of vueApps) {
    var app = new Vue({
        el: `#${vueApp.id}`,
        data: {
            brandId: '',
            modelId: '',
            details: ''
        },
        watch: { 
            brandId: function() {
                if (this.brandId === '' || this.brandId == null) {
                    this.modelId = '';
                }
            },
            modelId: function() {
                if (this.modelId === '' || this.modelId == null) {
                    this.details = '';
                }
            }
        },
        computed: { 
            getModelsUrl: function() {
                if (this.brandId === '' || this.brandId == null) {
                    return '';
                }

                return `/api/brands/${this.brandId}/models`;
            }
        }
    });
}

