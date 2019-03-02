$.fn.select2.defaults.set( "theme", "bootstrap" );

const app = new Vue({
    el: '#vueApp',
    data: {
        brandModels: [],
        brands: [],
        selectedBrandIds: [],
        models: [],
        selectedModelIds: []
    },
    created: function() {
        ax.get('/api/brands/withModels')
            .then(response => {
                this.brandModels = response.data;
                this.brands = Array.from(new Set(this.brandModels.map(bm => bm.brandId)))
                    .map(id => {
                        return {
                            id: id,
                            text: this.brandModels.find(d => d.brandId === id).brandName
                        };
                    });
            })
            .catch(e => { this.errors.push(e); });
    },
    watch: { 
        selectedBrandIds: function(ids, oldIds) {
            if (ids === undefined || ids === null || ids.length === 0) {
                this.models = [];
                this.selectedModelIds = [];
                return;
            }

            // Return if new & old values are same
            if ((ids.length === oldIds.length) && ids.every(function(element, index) {
                return element === oldIds[index]; 
            })) return ;

            this.models = this.brandModels
                .filter(bm => ids.includes(bm.brandId))
                .map(bm => {
                    return {
                        id: bm.modelId,
                        text: bm.modelName
                    };
                });
        }
    }
});
