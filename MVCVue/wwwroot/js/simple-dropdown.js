const ax = axios;

var app = new Vue({
    el: '#vueApp',
    data: {
        selectedBrandId: '',
        brands: [],
    },
    created() {
        ax.get(`/api/cars`)
            .then(response => { this.brands = response.data; })
            .catch(e => { this.errors.push(e); });
    }
});