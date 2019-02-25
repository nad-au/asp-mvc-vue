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
