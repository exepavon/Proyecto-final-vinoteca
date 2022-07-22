// Función al eliminar productos del carrito
function eliminarProd(busqueda) {
    $(`#borrar${busqueda.id}`).click( function () {
        if (busqueda.seleccion > 1) {
            busqueda.seleccion = busqueda.seleccion - 1;

            // Actualizar cantidad producto
            $(`.seleccion--prod${busqueda.id}`).html(`
                                                    <span class="seleccion--prod${busqueda.id}">${busqueda.seleccion}</span>`);

            // Actualizar subtotal producto 
            $(`#subtotal--prod${busqueda.id}`).html(`
                                                    <span id="subtotal--prod${busqueda.id}">${busqueda.subTotalProd().toFixed(2)}</span>`);

            // Actualizar localStorage
            localStorage.setItem('productosLS', JSON.stringify(carrito));

            // Actualizar montos al eliminar producto
            calcularTotales();
        } else {
            $(this).parents('tr').remove()
            carrito = carrito.filter((prodEliminado) => prodEliminado.id != busqueda.id);

            // Si el carrito se vacía completamente
            if (carrito == false) {
                vaciarCarrito();
            };

            // Actualizar localStorage
            localStorage.setItem('productosLS', JSON.stringify(carrito));

            // Actualizar montos al eliminar producto
            calcularTotales();
        };
    });
};



// Función vaciar carrito
function vaciarCarrito() {
    // Eliminar productos del carrito
    carrito = [];

    // Mensaje al vaciar el carrito
    $('#contenedor__carrito--item').html(`
                                        <tr>
                                            <td colspan="5" class="text-center carrito--vacio">
                                            Vaciaste tu carrito
                                            </td>
                                        </tr>`);

    // Eliminar del carrito
    calcularTotales();
    localStorage.clear('productosLS');
};



// Función mensaje al finalizar compra (despedida)
function msjTerminarCompra() {

    let prodEncontado = carrito.find((elemento) => elemento = []);

    if (prodEncontado == undefined){

        // Mensaje si no tienes productos en el carrito
        $('#contenedor__carrito--item').html(`
                                            <tr>
                                                <td colspan="5" class="text-center carrito--vacio">
                                                No tienes productos en el carrito
                                                </td>
                                            </tr>`);

    } else{

        // Mensaje al finalizar la compra
        $('.modal-content').html(`
                                <div class="modal--header">
                                    <h5 class="modal-title text-center" id="exampleModalLabel">¡Gracias por su compra!</h5>
                                </div>
                                <div class="modal-body">
                                    <p class="text-center">En breve nos comunicaremos.</p>
                                    <p class="text-center">Orden n°: 000000012030</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                </div>`).fadeOut(4800);
        
        // Vaciar carrito 
        vaciarCarrito();
        // Refrescar sitio
        setInterval("refrescar()", 4900);
    }
};



// Función recuperar productos del localStorage
function recuperarLS() {
    if (JSON.parse(localStorage.getItem('productosLS')) != null) {
        let recuperadosLS = JSON.parse(localStorage.getItem('productosLS'));

        console.log('Productos recuperados LS :', recuperadosLS);
    };
};



// Función refrescar sitio
function refrescar() {
    location.reload(true);
};