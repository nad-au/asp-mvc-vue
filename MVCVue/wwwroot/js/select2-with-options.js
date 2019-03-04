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
            const select2CurrentBrands = [{
                    id: 0,
                    text: 'Current',
                    children: this.cars
                        .filter(car => car.current)
                        .map(car => {
                            return {
                                id: car.brandId,
                                text: car.brandName
                            };
                        })
                        .sort(this.textSort)
                }
            ];

            const select2PreviousBrands = [{
                    id: 0,
                    text: 'Previous',
                    children: this.cars
                        .filter(car => !car.current)
                        .map(car => {
                            return {
                                id: car.brandId,
                                text: car.brandName
                            };
                        })
                        .sort(this.textSort)
                }
            ];

            return select2CurrentBrands.concat(select2PreviousBrands);
        },
        getAvailableModels(selectedBrandIds) {
            var availableCurrentModels = [];
            this.cars
                .filter(car => selectedBrandIds.includes(car.brandId))
                .forEach(car => {
                    availableCurrentModels = availableCurrentModels.concat(
                        car.models
                            .filter(model => model.current)
                            .map(model => {
                                return {
                                    id: model.modelId,
                                    text: model.modelName
                                }})
                    );
                });

            const select2CurrentModels = [{
                    id: 0,
                    text: 'Current',
                    children: availableCurrentModels.sort(this.textSort)
                }
            ];

            var availablePreviousModels = [];
            this.cars
                .filter(car => selectedBrandIds.includes(car.brandId))
                .forEach(car => {
                    availablePreviousModels = availablePreviousModels.concat(
                        car.models
                        .filter(model => !model.current)
                        .map(model => {
                            return {
                                id: model.modelId,
                                text: model.modelName
                            }})
                    );
                });

            const select2PreviousModels = [{
                    id: 0,
                    text: 'Previous',
                    children: availablePreviousModels.sort(this.textSort)
                }
            ];

            return select2CurrentModels.concat(select2PreviousModels);
        },
        textSort(selectItem1, selectItem2) {
            var upperItem1 = selectItem1.text.toUpperCase(),
                upperItem2 = selectItem2.text.toUpperCase();
            if (upperItem1 > upperItem2) {
                return 1;
            }
            if (upperItem1 < upperItem2) {
                return -1;
            }
            return 0;
        }
    }
});
