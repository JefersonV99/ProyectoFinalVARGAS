alert("🤑¡Bienvenid@ al simulador de Prestamos!🤑")

function esNumeroValido(valor) {
    // Verifica si el valor es un número válido y positivo
    return valor !== "" && !/[^0-9.]/.test(valor) && Number(valor) > 0;
}

function simularPagos() {
    const montoPrestamo = prompt("Ingresa el monto del préstamo:"); 
    const tasaInteresFija = 5; 
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

    // Convertir las entradas a números
    const monto = Number(montoPrestamo);
    const meses = Number(plazo);

    // Cálculos
    const tasaMensual = (tasaInteresFija / 100) / 12; 
    let totalAPagar = 0; 
    let cuotaMensual = 0; 

    // Ciclo para calcular el monto total a pagar en cuotas
    for (let i = 0; i < meses; i++) {
        cuotaMensual = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -meses)); // Cálculo de la cuota
        totalAPagar += cuotaMensual; // Sumar a total a pagar
    }

    // Mostrar resultados redondeados
    console.log(`Monto del préstamo: $${Math.round(monto)}`);
    console.log(`Tasa de interés: ${tasaInteresFija}%`);
    console.log(`Plazo: ${meses} meses`);
    console.log(`Cuota mensual: $${Math.round(cuotaMensual)}`);
    console.log(`Total a pagar: $${Math.round(totalAPagar)}`);
}

// Ejecuta la función
simularPagos();
