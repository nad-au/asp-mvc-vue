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
            let allBrands = [];
            allBrands = allBrands
                .concat(this.getCurrentBrands())
                .concat(this.getPreviousBrands());
            return allBrands;
        },
        getCurrentBrands() {
            return {
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
            };
        },
        getPreviousBrands() {
            return {
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
            };
        },
        getAvailableModels(selectedBrandIds) {
            let allAvailableModels = [];
            allAvailableModels = allAvailableModels
                .concat(this.getAvailableCurrentModels(selectedBrandIds))
                .concat(this.getAvailablePreviousModels(selectedBrandIds));
            return allAvailableModels;
        },
        getAvailableCurrentModels(selectedBrandIds) {
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

            return {
                id: 0,
                text: 'Current',
                children: availableCurrentModels.sort(this.textSort)
            };
        },
        getAvailablePreviousModels(selectedBrandIds) {
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

            return {
                id: 0,
                text: 'Previous',
                children: availablePreviousModels.sort(this.textSort)
            };
        },
        selectAllCurrentBrands() {
            let newSelectedBrandIds = this.selectedBrandIds;
            newSelectedBrandIds = newSelectedBrandIds
                .concat(this.getCurrentBrands().children.map(s => { return s.id }));
            this.selectedBrandIds = [...new Set(newSelectedBrandIds)];
        },
        selectAllPreviousBrands() {
            let newSelectedBrandIds = this.selectedBrandIds;
            newSelectedBrandIds = newSelectedBrandIds
                .concat(this.getPreviousBrands().children.map(s => { return s.id }));
            this.selectedBrandIds = [...new Set(newSelectedBrandIds)];
        },
        clearSelectedBrands() {
            this.selectedBrandIds = [];
        },
        selectAllCurrentModels() {
            let newSelectedModelIds = this.selectedModelIds;
            newSelectedModelIds = newSelectedModelIds
                .concat(this.getAvailableCurrentModels(this.selectedBrandIds).children.map(s => { return s.id }));
            this.selectedModelIds = [...new Set(newSelectedModelIds)];
        },
        selectAllPreviousModels() {
            let newSelectedModelIds = this.selectedModelIds;
            newSelectedModelIds = newSelectedModelIds
                .concat(this.getAvailablePreviousModels(this.selectedBrandIds).children.map(s => { return s.id }));
            this.selectedModelIds = [...new Set(newSelectedModelIds)];
        },
        clearSelectedModels() {
            this.selectedModelIds = [];
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
