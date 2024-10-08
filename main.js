// Verifica si el valor es un número válido y positivo
function esNumeroValido(valor) {
    return valor !== "" && !/[^0-9.]/.test(valor) && Number(valor) > 0;
}

// Función para simular una llamada a la API que obtiene la tasa de interés
function obtenerTasaInteres() {
    return new Promise((resolve) => {
        // Simula un retraso como si estuvieras haciendo un Fetch
        setTimeout(() => {
            const tasaInteresFija = 2; 
            resolve(tasaInteresFija);
        }, 3000); 
    });
}

function mostrarCarga() {
    document.getElementById('loadingMessage').textContent = "Cargando... Por favor espera.";
    document.getElementById('results').classList.add('hidden'); 
}

function ocultarCarga() {
    document.getElementById('loadingMessage').textContent = "";
}

async function calcularPrestamo() {
    const montoPrestamo = document.getElementById('loanAmount').value;
    const plazo = document.getElementById('loanTerm').value;

    mostrarCarga(); 

    // Verificar que las entradas sean válidas
    if (!esNumeroValido(montoPrestamo)) {
        ocultarCarga(); 
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El monto del préstamo debe ser un número positivo.',
        });
        return;
    }
    if (!esNumeroValido(plazo) || !Number.isInteger(Number(plazo))) {
        ocultarCarga(); 
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El plazo debe ser un número entero positivo.',
        });
        return;
    }

    const monto = Number(montoPrestamo);
    const meses = Number(plazo);

    const tasaInteresFija = await obtenerTasaInteres(); 
    const tasaMensual = (tasaInteresFija / 100) / 12;
    let totalAPagar = 0;

    // Array para almacenar las cuotas mensuales
    const cuotasMensuales = [];

    // Ciclo para calcular el monto total a pagar en cuotas
    for (let i = 0; i < meses; i++) {
        const cuotaMensual = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -meses)); // Cálculo de la cuota
        cuotasMensuales.push(cuotaMensual); // Almacenar la cuota en el array
        totalAPagar += cuotaMensual; 
    }

    // Mostrar resultados
    document.getElementById('totalAmount').textContent = `Monto del préstamo: $${Math.round(monto)}`;
    document.getElementById('monthlyPayment').textContent = `Cuota mensual: $${Math.round(cuotasMensuales[0])}`;
    document.getElementById('totalToPay').textContent = `Total a pagar: $${Math.round(totalAPagar)}`;
    document.getElementById('allPayments').textContent = `Todas las cuotas mensuales: $${cuotasMensuales.map(cuota => Math.round(cuota)).join(', ')}`;

    ocultarCarga(); 
    document.getElementById('results').classList.remove('hidden'); 

    Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'El préstamo ha sido calculado correctamente.',
    });
}

function cargarDatosGuardados() {
    const datosGuardados = localStorage.getItem('datosPrestamo');
    if (datosGuardados) {
        const { montoPrestamo, plazo, cuotaMensual, totalAPagar, cuotasMensuales } = JSON.parse(datosGuardados); //JSON

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

    // Limpiar los resultados
    document.getElementById('totalAmount').textContent = '';
    document.getElementById('monthlyPayment').textContent = '';
    document.getElementById('totalToPay').textContent = '';
    document.getElementById('allPayments').textContent = '';

    // Ocultar los resultados y mensajes de error
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
