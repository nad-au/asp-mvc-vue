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

Vue.component('select2', {
    props: ['options', 'ajaxUrl', 'dispatch-id'],
    data() {
        return {
            list: []
        }
    },
    created() {
        const options = $.extend({}, this.options);
        this.bind(options);
        console.log(this.dispatchId);
    },
    methods: {
        bind(options) {
            var self = this;
            var data = options.data;
            // Map any select2 "data" params to the list data array, so vue can bind the list data.
            if (data) {
                this.$set('list', data);
                options.data = undefined;
            }
            $(this.$el).find('select').select2(options).on('change', function() {
                // Notify the listeners that the values have changed
                self.notify($(this).val());
            });
            // Populate the list via ajax if "data-url" prop has been defined.
            if (this.ajaxUrl !== undefined) {
                this.getList(this.ajaxUrl);
            }
        },
        getList(url) {
            ax.get(url)
                .then(response => {
                     this.list = response.data;
                })
                .catch(e => {
                     this.errors.push(e);
                });
        },
        flattenArray(key) {
            var list = this.list;
            var flattened = [];
            for (let i = 0; i < list.length; i++) {
                let value = list[i][key];
                flattened[i] = value.toString();
            }
            return flattened;
        },
        filterSelected(filterArray) {
            var ids = this.flattenArray('id');
            // Return all selected values that were pre-loaded (i.e. are in this.list).
            return ids.filter(x => filterArray.indexOf(x) >= 0);
        },
        filterCreated(filterArray) {
            var ids = this.flattenArray('id');
            // Return all tags that have been created (i.e. are not in this.list)
            return filterArray.filter(x => ids.indexOf(x) < 0);
        },
        notify(value) {
            this.notifySelected(value);
            this.notifyTagCreated(value);
        },
        notifySelected(value) {
            this.$dispatch('select2-selected', this.filterSelected(value), this.dispatchId);
        },
        notifyTagCreated(tags) {
            this.$dispatch('select2-tag-created', this.filterCreated(tags), this.dispatchId);
        }
    },
    template: `
        <select multiple="muiltiple" >
            <option v-for="item in list" :value="item.id">{{ item.text }}</option>
        </select>
    `
});