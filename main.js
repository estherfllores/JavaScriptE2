const prendas = [
    { nombre: "blazer", precio: 150000 },
    { nombre: "carteras", precio: 55000 },
    { nombre: "billeteras", precio: 25000 },
    { nombre: "jackets", precio: 200000 },
    { nombre: "zapatos", precio: 80000 }
];

let carrito = [];

function saludarCliente() {
    let nombreCliente;
    let nombreValido = false;

    do {
        nombreCliente = prompt("Por favor, ingrese su nombre");
        if (nombreCliente === null) {
            alert("Por favor, ingrese su nombre para continuar.");
        } else {
            if (nombreCliente.length < 3 || !isNaN(nombreCliente)) {
                alert("Por favor, ingrese un nombre válido.");
            } else {
                alert(`Bienvenido/a a Good Indumentaria ${nombreCliente}!`);
                nombreValido = true;
            }
        }
    } while (!nombreValido);
}

function comprarPrenda(opcion, cantidad) {
    const prenda = prendas[opcion - 1];
    const indicePrendaEnCarrito = carrito.findIndex(item => item.nombre === prenda.nombre);
    if (indicePrendaEnCarrito !== -1) {
        carrito[indicePrendaEnCarrito].cantidad += cantidad;
        carrito[indicePrendaEnCarrito].total += prenda.precio * cantidad;
        alert(`Usted ha agregado ${cantidad} ${prenda.nombre}(s) a su carrito. Su monto en ${prenda.nombre}(s) es de $${carrito[indicePrendaEnCarrito].total}`);
    } else {
        const totalPorPrenda = prenda.precio * cantidad;
        carrito.push({ nombre: prenda.nombre, cantidad: cantidad, total: totalPorPrenda });
        alert(`Usted a agregado ${cantidad} ${prenda.nombre}(s) a su carrito. Su monto en ${prenda.nombre}(s) es de $${totalPorPrenda}`);
    }
}

function eliminarPrenda(nombre, totalGastado) {
    const indicePrendaEnCarrito = carrito.findIndex(ropa => ropa.nombre === nombre);
    if (indicePrendaEnCarrito !== -1) {
        totalGastado = totalGastado - carrito[indicePrendaEnCarrito].total;
        carrito.splice(indicePrendaEnCarrito, 1);
        alert(`Se ha(n) quitado del carrito: ${nombre}(s)`);
    } else {
        alert(`No se encuentra(n) ${nombre}(s) en su carrito`);
    }
}

function mostrarCarrito() {
    let prendasEnElCarrito = "Usted a seleccionado:\n";
    carrito.forEach(ropa => {
        prendasEnElCarrito += `${ropa.cantidad} ${ropa.nombre}(s) - $${ropa.total}\n`;
    });
    alert(prendasEnElCarrito);
}

function calcularTotalGastado() {
    let total = 0;
    for (let item of carrito) {
        total += item.total;
    }
    return total;
}

function gestionarCompra() {
    let totalGastado = 0;
    let opcion;
    let cantidad = 0;
    let seguirComprando = true;

    saludarCliente();

    do {
        opcion = prompt("Ingrese el número de la opción que desea comprar: \n1. Blazer - $150000 \n2. Carteras - $55000 \n3. Billeteras - $25000 \n4. Jackets - $20000\n5. Zapatos - $80000\n0. Salir/Eliminar del carrito");

        if (isNaN(opcion)) {
            alert("Opcion invalida. Por favor seleccione una opcion entre 1 y 5 para comprar o 0 para salir o eliminar un producto del carrito");
            continue;
        } else {
            opcion = parseInt(opcion);
            if ((opcion < 0) || (opcion > 5)) {
                alert("Opcion invalida. Por favor seleccione una opcion entre 1 y 5 para comprar o 0 para salir o eliminar un producto del carrito");
                continue;
            }
        }

        if (opcion !== 0) {
            do {
                cantidad = parseInt(prompt("Ingrese la cantidad de prendas que desea comprar:"));
                if (isNaN(cantidad) || cantidad < 0) {
                    alert("Por favor, ingrese un número válido y mayor o igual a cero.");
                }
            } while (isNaN(cantidad) || cantidad < 0)
        }

        if (opcion > 0) {
            comprarPrenda(opcion, cantidad);
        } else if (opcion === 0) {
            const continuarComprandoRespuesta = prompt("Ingrese 'salir' para terminar la compra o 'eliminar' para quitar un producto del carrito").toLowerCase();
            if (continuarComprandoRespuesta === "eliminar") {
                mostrarCarrito()
                const prendaAEliminar = prompt("Ingrese el nombre de la prenda que desea quitar del carrito:").toLowerCase();
                eliminarPrenda(prendaAEliminar, totalGastado);
            } else if (continuarComprandoRespuesta === "salir") {
                seguirComprando = false;
            } else {
                alert("Seleccione una opcion valida. 'eliminar' para quitar un tipo de prenda del carrito o 'salir' para finalizar la compra");
            }
        } else {
            alert("Opcion invalida. Por favor seleccione una opcion entre 1 y 5 para comprar o 0 para salir o eliminar un producto del carrito");
        }
    } while (seguirComprando);

    mostrarCarrito();
    totalGastado = calcularTotalGastado();
    alert(`Debe abonar $${totalGastado} por su compra.`);
    alert("Gracias por elegirnos. Vuelva pronto.");
}

gestionarCompra();