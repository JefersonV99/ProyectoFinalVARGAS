// Verifica si el valor es un número válido y positivo
function esNumeroValido(valor) {
    return valor !== "" && !/[^0-9.]/.test(valor) && Number(valor) > 0;
}

// Función para simular una llamada a la API que obtiene la tasa de interés
function obtenerTasaInteres() {
    return new Promise((resolve) => {
        // Simula un retraso como si estuvieras haciendo una llamada a una API
        setTimeout(() => {
            const tasaInteresFija = 2;
            resolve(tasaInteresFija);
        }, 3000); // Retraso de 3 segundo
    });
}

// Muestra un mensaje de carga
function mostrarCarga() {
    document.getElementById('loadingMessage').textContent = "Cargando... Por favor espera.";
    document.getElementById('results').classList.add('hidden'); // Oculta resultados previos
}

// Oculta el mensaje de carga
function ocultarCarga() {
    document.getElementById('loadingMessage').textContent = "";
}

async function calcularPrestamo() {
    const montoPrestamo = document.getElementById('loanAmount').value;
    const plazo = document.getElementById('loanTerm').value;

    const errorMessage = document.getElementById('errorMessage');
    const results = document.getElementById('results');

    // Limpiar mensajes de error y resultados anteriores
    errorMessage.textContent = '';
    mostrarCarga(); // Mostrar el mensaje de carga

    // Verificar que las entradas sean válidas
    if (!esNumeroValido(montoPrestamo)) {
        ocultarCarga(); // Ocultar carga si hay error
        errorMessage.textContent = "El monto del préstamo debe ser un número positivo.";
        return;
    }
    if (!esNumeroValido(plazo) || !Number.isInteger(Number(plazo))) {
        ocultarCarga(); // Ocultar carga si hay error
        errorMessage.textContent = "El plazo debe ser un número entero positivo.";
        return;
    }

    const monto = Number(montoPrestamo);
    const meses = Number(plazo);

    const tasaInteresFija = await obtenerTasaInteres(); // Obtener la tasa de interés
    const tasaMensual = (tasaInteresFija / 100) / 12;
    let totalAPagar = 0;
    let cuotaMensual = 0;

    // Array para almacenar las cuotas mensuales
    const cuotasMensuales = [];

    // Ciclo para calcular el monto total a pagar en cuotas
    for (let i = 0; i < meses; i++) {
        cuotaMensual = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -meses)); // Cálculo de la cuota
        cuotasMensuales.push(cuotaMensual); // Almacenar la cuota en el array
        totalAPagar += cuotaMensual; // Sumar a total a pagar
    }

    // Mostrar resultados
    document.getElementById('totalAmount').textContent = `Monto del préstamo: $${Math.round(monto)}`;
    document.getElementById('monthlyPayment').textContent = `Cuota mensual: $${Math.round(cuotaMensual)}`;
    document.getElementById('totalToPay').textContent = `Total a pagar: $${Math.round(totalAPagar)}`;

    // Método filter
    const cuotasAltas = cuotasMensuales.filter(cuota => cuota > 0);

    // Método find
    const primeraCuota = cuotasMensuales.find(cuota => cuota >= 0);

    // Mostrar todas las cuotas mensuales
    document.getElementById('allPayments').textContent = `Todas las cuotas mensuales: $${cuotasMensuales.map(cuota => Math.round(cuota)).join(', ')}`;
    document.getElementById('filteredPayments').textContent = `Cuotas filtradas: $${cuotasAltas.map(cuota => Math.round(cuota)).join(', ')}`;

    if (primeraCuota) {
        document.getElementById('firstPayment').textContent = `Primera cuota encontrada: $${Math.round(primeraCuota)}`;
    } else {
        document.getElementById('firstPayment').textContent = `No se encontró ninguna cuota.`;
    }

    ocultarCarga(); 
    results.classList.remove('hidden'); // Mostrar los resultados

    // Guardar datos en localStorage
    const datosPrestamo = {
        montoPrestamo: monto,
        plazo: meses,
        tasaInteresFija: tasaInteresFija,
        cuotaMensual: cuotaMensual,
        totalAPagar: totalAPagar,
        cuotasMensuales: cuotasMensuales
    };
    localStorage.setItem('datosPrestamo', JSON.stringify(datosPrestamo));
}

function cargarDatosGuardados() {
    const datosGuardados = localStorage.getItem('datosPrestamo');
    if (datosGuardados) {
        const { montoPrestamo, plazo, cuotaMensual, totalAPagar, cuotasMensuales } = JSON.parse(datosGuardados);

        document.getElementById('loanAmount').value = montoPrestamo;
        document.getElementById('loanTerm').value = plazo;

        document.getElementById('totalAmount').textContent = `Monto del préstamo: $${Math.round(montoPrestamo)}`;
        document.getElementById('monthlyPayment').textContent = `Cuota mensual: $${Math.round(cuotaMensual)}`;
        document.getElementById('totalToPay').textContent = `Total a pagar: $${Math.round(totalAPagar)}`;
        document.getElementById('allPayments').textContent = `Todas las cuotas mensuales: $${cuotasMensuales.map(cuota => Math.round(cuota)).join(', ')}`;
        
        document.getElementById('results').classList.remove('hidden');
    }
}

function limpiarFormulario() {
    // Limpiar los campos del formulario
    document.getElementById('loanAmount').value = '';
    document.getElementById('loanTerm').value = '';

    document.getElementById('totalAmount').textContent = '';
    document.getElementById('monthlyPayment').textContent = '';
    document.getElementById('totalToPay').textContent = '';
    document.getElementById('allPayments').textContent = '';
    document.getElementById('filteredPayments').textContent = '';
    document.getElementById('firstPayment').textContent = '';

    document.getElementById('results').classList.add('hidden');
    document.getElementById('errorMessage').textContent = '';

    // Limpiar localStorage
    localStorage.removeItem('datosPrestamo');
}

document.getElementById('calculateButton').addEventListener('click', function(event) {
    event.preventDefault(); 
    calcularPrestamo();
});

document.getElementById('clearButton').addEventListener('click', function() {
    limpiarFormulario();
});

document.addEventListener('DOMContentLoaded', cargarDatosGuardados);
