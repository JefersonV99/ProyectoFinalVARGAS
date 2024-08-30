alert("🤑¡Bienvenid@ al simulador de Prestamos!🤑");

// Verifica si el valor es un número válido y positivo
function esNumeroValido(valor) {
    return valor !== "" && !/[^0-9.]/.test(valor) && Number(valor) > 0;
}

function simularPagos() {
    const montoPrestamo = prompt("Ingresa el monto del préstamo:"); 
    const tasaInteresFija = 2; 
    const plazo = prompt("Ingresa el plazo del préstamo en meses:"); 

    // Verificar que las entradas sean válidas
    if (!esNumeroValido(montoPrestamo)) {
        console.log("El monto del préstamo debe ser un número positivo.");
        return;
    }
    if (!esNumeroValido(plazo) || !Number.isInteger(Number(plazo))) {
        console.log("El plazo debe ser un número entero positivo.");
        return;
    }

    const monto = Number(montoPrestamo);
    const meses = Number(plazo);

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

    console.log(`Monto del préstamo: $${Math.round(monto)}`);
    console.log(`Tasa de interés: ${tasaInteresFija}%`);
    console.log(`Plazo: ${meses} meses`);
    console.log(`Cuota mensual: $${Math.round(cuotaMensual)}`);
    console.log(`Total a pagar: $${Math.round(totalAPagar)}`);
    
    // metedo filfer
    const cuotasAltas = cuotasMensuales.filter(cuota => cuota > 0); // Filtra todas las cuotas, ya que todas son mayores que 0

    // metedo find para obtener la primera cuota del array 
    const primeraCuota = cuotasMensuales.find(cuota => cuota >= 0); // Encuentra la primera cuota que sea mayor o igual a 0

    // Mostrar todas las cuotas mensuales
    console.log(`Todas las cuotas mensuales: $${cuotasMensuales.map(cuota => Math.round(cuota)).join(', ')}`);
    console.log(`Cuotas filtradas: $${cuotasAltas.map(cuota => Math.round(cuota)).join(', ')}`);

    if (primeraCuota) {
        console.log(`Primera cuota encontrada: $${Math.round(primeraCuota)}`);
    } else {
        console.log(`No se encontró ninguna cuota.`);
    }
}

simularPagos();