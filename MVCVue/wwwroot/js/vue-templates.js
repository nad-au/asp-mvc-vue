const ax = axios;

Vue.component('vue-ajax-dropdown', {
    props: ['value', 'initial', 'ajaxUrl', 'placeholder', 'valueName', 'displayName'],
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

Vue.component('vue-ajax-secondary-dropdown', {
    props: ['value', 'initial', 'ajaxUrl', 'placeholder', 'valueName', 'displayName'],
    data: function() {
        return {
            options: [],
            initialValueSet: false,
            primaryValueUpdated: false
        };
    },
    watch: { 
        ajaxUrl: function(ajaxUrl) {
            if (ajaxUrl == null || ajaxUrl === '') {
                this.options = [];
                return;
            }

            this.primaryValueUpdated = true;
            ax.get(this.ajaxUrl)
                .then(response => { this.options = response.data; })
                .catch(e => { this.errors.push(e); });
        }
    },
    updated() {
        if (this.primaryValueUpdated) {
            this.$emit('input', '');
            this.primaryValueUpdated = false;
        }

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

Vue.component('vue-select2', {
    props: ['value','initial','ajaxUrl','placeholder','valueName', 'displayName'],
    mounted: function () {
        const vm = this;
        ax.get(this.ajaxUrl)
            .then(response => {
                $(this.$el)
                    .empty()
                    .select2({
                        placeholder: this.placeholder,
                        allowClear: true,
                        data: response.data.map(d => { return {
                                id: d[this.valueName],
                                text: d[this.displayName]
                            };
                        })
                    })
                    .val(this.value)
                    .trigger('change')
                    .on('change',
                        function() {
                            vm.$emit('input', this.value);
                        });

                vm.$emit('input', this.initial);
            })
            .catch(e => { this.errors.push(e); });
    },
    watch: {
        value: function (value) {
            // update value
            $(this.$el)
                .val(value)
                .trigger('change');
        }
    },
    destroyed: function () {
        $(this.$el).off().select2('destroy');
    },
    template: `
        <select>
            <option></option>
        </select>
    `
});

Vue.component('vue-select2-multiple-secondary', {
    props: ['value','initial','ajaxUrl','placeholder','valueName', 'displayName'],
    data: function() {
        return {
            initialValueSet: false
        };
    },
    mounted: function () {
        const vm = this;
        $(this.$el)
            .select2({
                placeholder: this.placeholder
            })
            .trigger('change')
            .on('change',
                function() {
                    vm.$emit('input', $(this).val());
                });
    },
    watch: {
        ajaxUrl: function(ajaxUrl) {
            ax.get(ajaxUrl)
                .then(response => {
                    $(this.$el)
                        .empty()
                        .select2({
                            placeholder: this.placeholder,
                            allowClear: true,
                            data: response.data.map(d => {
                                return {
                                    id: d[this.valueName],
                                    text: d[this.displayName]
                                };
                            })
                        })
                        .val('')
                        .trigger('change');

                    if (!this.initialValueSet) {
                        this.$emit('input', this.initial);
                        this.initialValueSet = true;
                    }
                })
                .catch(e => { this.errors.push(e); });
        },
        value: function (value) {
            if ([...value].sort().join(",") !== [...$(this.$el).val()].sort().join(","))
                $(this.$el).val(value).trigger('change');
        }
    },
    destroyed: function () {
        $(this.$el).off().select2('destroy');
    },
    template: `
        <select>
            <option></option>
        </select>
    `
});
