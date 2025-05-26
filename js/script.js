document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los inputs numéricos y los campos de resultado
    const inputs = document.querySelectorAll('input[type="number"]');
    const totalIngresosField = document.getElementById('totalIngresos');
    const totalGastosField = document.getElementById('totalGastos');
    const saldoFinalField = document.getElementById('saldoFinal');

    // Seleccionar campos del resumen final
    const resumenAhorroField = document.getElementById('resumenAhorro');
    const resumenGastosTotalesField = document.getElementById('resumenGastosTotales');
    const resumenSaldoFinalField = document.getElementById('resumenSaldoFinal');
    const mensajeFinalField = document.getElementById('mensajeFinal');

    // Función para formatear números como moneda (euros)
    function formatCurrency(value) {
        return `€${parseFloat(value).toFixed(2)}`;
    }

    // Función para calcular y actualizar el presupuesto
    function calcularPresupuesto() {
        // Obtener valores de ingresos
        const ingresosOrdinarios = parseFloat(document.getElementById('ingresosOrdinarios').value) || 0;
        const ingresosExtraordinarios = parseFloat(document.getElementById('ingresosExtraordinarios').value) || 0;

        // Calcular total ingresos
        const calculoTotalIngresos = ingresosOrdinarios + ingresosExtraordinarios;
        totalIngresosField.value = formatCurrency(calculoTotalIngresos);

        // Obtener valores de gastos
        const gastosImprescindibles = parseFloat(document.getElementById('gastosImprescindibles').value) || 0;
        const gastosNecesarios = parseFloat(document.getElementById('gastosNecesarios').value) || 0;
        const gastosPrescindibles = parseFloat(document.getElementById('gastosPrescindibles').value) || 0;
        const gastosExtraordinarios = parseFloat(document.getElementById('gastosExtraordinarios').value) || 0;
        const ahorro = parseFloat(document.getElementById('ahorro').value) || 0;

        // Calcular total gastos
        const calculoTotalGastos = gastosImprescindibles + gastosNecesarios + gastosPrescindibles + gastosExtraordinarios + ahorro;
        totalGastosField.value = formatCurrency(calculoTotalGastos);

        // Calcular saldo final
        const calculoSaldoFinal = calculoTotalIngresos - calculoTotalGastos;
        saldoFinalField.value = formatCurrency(calculoSaldoFinal);

        // Actualizar resumen final
        resumenAhorroField.textContent = formatCurrency(ahorro);
        resumenGastosTotalesField.textContent = formatCurrency(calculoTotalGastos);
        resumenSaldoFinalField.textContent = formatCurrency(calculoSaldoFinal);

        // Mensaje final para niños
        mensajeFinalField.classList.remove('mensaje-positivo', 'mensaje-negativo', 'mensaje-neutro'); // Limpiar clases previas
        if (calculoSaldoFinal > 0) {
            mensajeFinalField.textContent = "¡Genial! 🎉 Tienes dinero extra. ¡Sigue así!";
            mensajeFinalField.classList.add('mensaje-positivo');
        } else if (calculoSaldoFinal < 0) {
            mensajeFinalField.textContent = "¡Oh, oh! 😟 Parece que tus gastos son mayores que tus ingresos. ¡Revisemos juntos!";
            mensajeFinalField.classList.add('mensaje-negativo');
        } else {
            mensajeFinalField.textContent = "¡Equilibrio perfecto! 👌 Ni sobra, ni falta. ¡Buen trabajo!";
            mensajeFinalField.classList.add('mensaje-neutro');
        }
    }

    // Añadir un 'event listener' a cada input para recalcular cuando cambie su valor
    inputs.forEach(input => {
        input.addEventListener('input', calcularPresupuesto);
    });

    // Calcular el presupuesto inicialmente al cargar la página
    calcularPresupuesto();
});