// Class constructor productos
class Producto {
    constructor (id, nombre, precio, img, stock){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio.toFixed(2);
        this.img = img;
        this.stock = stock;
        this.seleccion = 1;
        this.subtotal = this.precio;
    }
    subTotalProd() {
        return this.precio * this.seleccion
    }
};



// Array productos
let productos = [];
// Array url .json
let urlProd = 'data/productos.json';
// Array carrito de compras
let carrito = [];



// Archivo productos.json
$.get(urlProd, function (datos){

    // Agregar productos en el Array
    datos.forEach((prod) => {
        productos.push(new Producto(prod.id, prod.nombre, prod.precio, prod.img, prod.stock))
    });

    // Mostrar productos en el HTML
    mostrarProd(productos);
    generarCarrito();
    recuperarLS();
});



// Insertar cards de productos en el HTML
function mostrarProd() {
    productos.forEach((producto) =>{

        // Items cards en el HTML
        itemsCards(producto);
        
        // Agregar productos en el carrito
        $(`#agregar${producto.id}`).click(() => {

            // Carrito vacio
            $('.carrito--vacio').hide();

            // Mostrar mensaje al agregar producto
            msjProdAgregado(producto);

            // Mostrar productos agregados al carrito
            añadirCompra(producto.id);
        });

        // Carga cards listas con Jquery .ready
        $('#contenedor__cards--item').ready( function(){
            console.log('Items Cards -> Cargadas');
        });
    });
};



// Función mostrar en el carrito
function añadirCompra(productoId){
    
    let encontrado = carrito.find((prod) => prod.id == productoId);
    if (encontrado == undefined){
        let busqueda = productos.find((prod) => prod.id == productoId);
            carrito.push(busqueda);

            // Items agregados al carrito
            itemsCarrito(busqueda);

            // Aparecer carrito .show
            $("#contenedor__carrito").show();

            // Btn borrar items del carrito
            eliminarProd(busqueda);

            // Btn vaciar carrito
            $('#vaciar--carrito').on('click', vaciarCarrito);

            // Btn finalizar compra (mensaje de despedida)
            $('#btn__finalizar--compra').on('click', msjTerminarCompra);

            // Mostrar subtotal, iva, total en carrito
            calcularTotales();

    } else {
        encontrado.seleccion = encontrado.seleccion + 1;

        $(`.seleccion--prod${encontrado.id}`).html(`${encontrado.seleccion}`);
        $(`#subtotal--prod${encontrado.id}`).html(`${encontrado.subTotalProd().toFixed(2)}`);

        // Actualizar subtotal, iva, total en carrito si estan repetidos
        calcularTotales();
    }

    // Almacenamiento en el localStorage 
    localStorage.setItem('productosLS', JSON.stringify(carrito));
};



// Función montos totales en carrito
function  calcularTotales(){
    let total = 0; subtotal = 0; iva = 0;

        contador = carrito.reduce((acc, producto) => acc + producto.seleccion, 0);
        subtotal = carrito.reduce((acc, producto) => (acc + (producto.precio * producto.seleccion)), 0);
        iva = iva + (subtotal * 0.21);
        total = total + subtotal + iva;

        // Contador de productos en carrito
        $('.cantidad--productos').html(`${contador}`);

        // Subtotal compra
        $('#subtotal').html(`${subtotal.toFixed(2)}`);

        // IVA compra
        $('#IVA').html(`${iva.toFixed(2)}`);

        // Total compra
        $('.total').html(`${total.toFixed(2)}`);
};