const poleras = document.querySelectorAll('.polera');
const preciosPoleras ={
    burdeo: 42000,
    gris: 40000,
    negro: 43000
};

const precioEnvios ={
    express: 5000,
    normal: 3000,
}

let totalItems = 0;
let totalPago = 0;

const elementoItems = document.querySelector('.itemTotal p:nth-child(1)');
const elementoPagos = document.querySelector('.itemTotal p:nth-child(2)');


poleras.forEach(polera =>{
    const btnAgregar = polera.querySelector('.btnAgregar');
    const btnQuitar = polera.querySelector('.btnQuitar');
    const contadorPoleras = polera.querySelector('.contador');
    let contador = 0;

    const idPolera = polera.getAttribute('data-producto-id');

    let precioPolera = 0;
    if (idPolera === "1") precioPolera = preciosPoleras.burdeo;
    else if (idPolera === "2") precioPolera = preciosPoleras.gris;
    else if (idPolera === "3") precioPolera = preciosPoleras.negro;

    // Botones agregar 
    btnAgregar.addEventListener('click', function(){
        contador++;
        contadorPoleras.innerText = contador;

        // actualiza total de items y pago
        totalItems++;
        totalPago += precioPolera;
        const totalPagoFormateado = totalPago.toLocaleString('es-ES');
        actualizarTotal();

        // Llevar a html
        elementoItems.innerText = `Items: ${totalItems}`;
        elementoPagos.innerText = `Total: $${totalPagoFormateado}`;
    });

    // Botones quitar
    btnQuitar.addEventListener('click', function(){
        if (contador > 0){
            contador--;
            contadorPoleras.innerText = contador;

            // verificador 
            if(totalItems > 0){
                totalItems--;
                totalPago -= precioPolera;
                const totalPagoFormateado = totalPago.toLocaleString('es-ES');
                actualizarTotal();

                elementoItems.innerText = `Items: ${totalItems}`;
                elementoPagos.innerText = `Total: $${totalPagoFormateado}`;
            }
        }
    });
})

const selectorEnvios = document.getElementById('tipoEnvio');
let costoEnvio = 0;

selectorEnvios.addEventListener('change', function(){
    const opcionSeleccionada = selectorEnvios.value;
    if (opcionSeleccionada === "envio1"){
        costoEnvio = precioEnvios.express;
    }

    else if ( opcionSeleccionada === "envio2"){
        costoEnvio = precioEnvios.normal;
    }

    else{
        costoEnvio = 0;
    }

    actualizarTotal();
});

const precioTotal = document.getElementById('totalPrice');
const descuento = document.getElementById('descuento');
const btnDescuento = document.getElementById('btnDescuento');
const codigoDescuento = 'JQUERY2222';

const actualizarTotal = ()=>{
  
    const total = totalPago + costoEnvio;
    const totalFormateado = total.toLocaleString('es-ES');

    precioTotal.innerText = totalFormateado;
}

btnDescuento.addEventListener('click', function(){
    let totalConDescuento = totalPago + costoEnvio;

    if(descuento.value.trim().toLowerCase() === codigoDescuento.toLowerCase()){
        totalConDescuento *= 0.9;
    }

    const totalFormateado = totalConDescuento.toLocaleString('es-ES');
    precioTotal.innerText = totalFormateado;
})

// Cambios color input
descuento.addEventListener('input', function(){
    if (descuento.value.trim() !== ''){
        descuento.classList.add('color');

        if (descuento.value.trim().toLowerCase() === codigoDescuento.toLowerCase()){
            descuento.classList.add('colorCorrecto');
        }
        else {
            descuento.classList.remove('colorCorrecto');
        }
    } 
    else{
        descuento.classList.remove('color');
        descuento.classList.remove('colorCorrecto');
    }
})

const elBotonCompra = document.getElementById('btnCompra');

let dobleclick = false;

elBotonCompra.addEventListener('click', function(){
    elBotonCompra.style.backgroundColor = 'orange';
    elBotonCompra.innerText = '¿Estás Seguro?';
});

elBotonCompra.addEventListener('dblclick', function(){
    elBotonCompra.style.backgroundColor = 'blue';
    elBotonCompra.innerText = '¡OK!';
    dobleclick = true;
});

elBotonCompra.addEventListener('mouseout', function(){
    if(dobleclick){
        elBotonCompra.style.backgroundColor = 'transparent';
        elBotonCompra.innerText = 'COMPRADO';
        elBotonCompra.style.color = 'green';
        elBotonCompra.disabled = true;

    }

})
