$.fn.select2.defaults.set( "theme", "bootstrap" );

const app = new Vue({
    el: '#vueApp',
    data: {
        brands: [],
        selectedBrandIds: [],
        models: [],
        selectedModelIds: []
    },
    created: function() {
        ax.get('/api/brands')
            .then(response => {
                    this.brands = response.data.map(d => {
                        return { id: d.brandId, text: d.brandName }
                    });
                })
                .catch(e => { this.errors.push(e); });
    },
    watch: { 
        selectedBrandIds: function(ids) {
            if (ids === undefined || ids.length == 0) {
                this.selectedModelIds = [];
            }
        }
    }
});
