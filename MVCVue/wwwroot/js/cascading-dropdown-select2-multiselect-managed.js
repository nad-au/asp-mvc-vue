$.fn.select2.defaults.set( "theme", "bootstrap" );

const app = new Vue({
    el: '#vueApp',
    data: {
        cars: [],
        brands: [],
        selectedBrandIds: [],
        models: [],
        selectedModelIds: []
    },
    created: function() {
        ax.get('/api/cars')
            .then(response => {
                this.cars = response.data;
                this.brands = this.getAllBrands();
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

            this.models = this.getAvailableModels(ids);
        }
    },
    methods: {
        getAllBrands() {
            return this.cars.map(car => {
                return {
                    id: car.brandId,
                    text: car.brandName
                };
            });
        },
        getAvailableModels(selectedBrandIds) {
            var availableModels = [];
            this.cars
                .filter(car => selectedBrandIds.includes(car.brandId))
                .forEach(car => {
                    availableModels = availableModels.concat(
                        car.models.map(model => {
                            return {
                                id: model.modelId,
                                text: model.modelName
                            };
                        }));
                });

            return  availableModels;
        }
    }
});
