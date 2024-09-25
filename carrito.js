const { createApp } = Vue;

createApp({
    data() {
        return {
            products: [],
            cart: [],
            searchQuery: '',
            isCartModalOpen: false // Propiedad para controlar el modal
        };
    },
    computed: {
        filteredProducts() {
            return this.products.filter(product => {
                return product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
            });
        },
        cartTotal() {
            return this.cart.reduce((total, product) => total + parseFloat(product.price), 0).toFixed(2);
        }
    },
    methods: {
        async fetchProducts() {
            const response = await fetch('products.json');
            if (!response.ok) {
                console.error('Error al cargar productos:', response.statusText);
                return;
            }
            this.products = await response.json();
        },
        addToCart(product) {
            this.cart.push(product);
            Swal.fire({
                icon: 'success',
                title: '¡Producto Agregado!',
                text: `${product.name} ha sido agregado al carrito`,
            });
        },
        openCartModal() {
            this.isCartModalOpen = true; // Abre el modal
        },
        closeCartModal() {
            this.isCartModalOpen = false; // Cierra el modal
        },
        confirmRemoveProduct(index) {
            Swal.fire({
                title: "¿Estás seguro?",
                text: "Una vez eliminado, no podrás recuperar este producto!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminarlo!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.cart.splice(index, 1);
                    Swal.fire({
                        icon: 'success',
                        title: '¡Producto eliminado!',
                        text: 'El producto ha sido eliminado del carrito.',
                    });
                }
            });
        },
        searchProduct() {
            // La búsqueda se maneja automáticamente en la propiedad computed filteredProducts
        }
    },
    mounted() {
        this.fetchProducts();
    }
}).mount('#app');
