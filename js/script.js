document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="number"]');
    const totalIngresosField = document.getElementById('totalIngresos');
    const totalGastosField = document.getElementById('totalGastos');
    const saldoFinalField = document.getElementById('saldoFinal');

    const resumenAhorroField = document.getElementById('resumenAhorro');
    const resumenGastosTotalesField = document.getElementById('resumenGastosTotales');
    const resumenSaldoFinalField = document.getElementById('resumenSaldoFinal');
    const mensajeFinalField = document.getElementById('mensajeFinal');

    const summaryBox = document.querySelector('.summary-for-user');
    const superavitImage = document.getElementById('superavitImage');
    const deficitImage = document.getElementById('deficitImage');
    const equilibrioImage = document.getElementById('equilibrioImage');

    function formatCurrency(value) {
        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
            return "€0.00"; 
        }
        return `€${numValue.toFixed(2)}`;
    }

    function calcularPresupuesto() {
        const ingresosOrdinarios = parseFloat(document.getElementById('ingresosOrdinarios').value) || 0;
        const ingresosExtraordinarios = parseFloat(document.getElementById('ingresosExtraordinarios').value) || 0;
        const calculoTotalIngresos = ingresosOrdinarios + ingresosExtraordinarios;
        totalIngresosField.value = formatCurrency(calculoTotalIngresos);

        const gastosImprescindibles = parseFloat(document.getElementById('gastosImprescindibles').value) || 0;
        const gastosNecesarios = parseFloat(document.getElementById('gastosNecesarios').value) || 0;
        const gastosPrescindibles = parseFloat(document.getElementById('gastosPrescindibles').value) || 0;
        const gastosExtraordinarios = parseFloat(document.getElementById('gastosExtraordinarios').value) || 0;
        const ahorro = parseFloat(document.getElementById('ahorro').value) || 0;
        const calculoTotalGastos = gastosImprescindibles + gastosNecesarios + gastosPrescindibles + gastosExtraordinarios + ahorro;
        totalGastosField.value = formatCurrency(calculoTotalGastos);

        const calculoSaldoFinal = calculoTotalIngresos - calculoTotalGastos;
        saldoFinalField.value = formatCurrency(calculoSaldoFinal);

        resumenAhorroField.textContent = formatCurrency(ahorro);
        resumenGastosTotalesField.textContent = formatCurrency(calculoTotalGastos);
        resumenSaldoFinalField.textContent = formatCurrency(calculoSaldoFinal);

        summaryBox.classList.remove('superavit-summary', 'deficit-summary');
        if(superavitImage) superavitImage.style.display = 'none';
        if(deficitImage) deficitImage.style.display = 'none';
        if(equilibrioImage) equilibrioImage.style.display = 'none';
        
        mensajeFinalField.classList.remove('mensaje-positivo', 'mensaje-negativo', 'mensaje-neutro');
        
        if (calculoSaldoFinal > 0) { 
            mensajeFinalField.textContent = "¡Genial! 🎉 Tienes dinero extra. ¡Sigue así!";
            mensajeFinalField.classList.add('mensaje-positivo');
            summaryBox.classList.add('superavit-summary');
            if(superavitImage) superavitImage.style.display = 'block';
        } else if (calculoSaldoFinal < 0) { 
            // MENSAJE DE DÉFICIT MODIFICADO AQUÍ:
            mensajeFinalField.textContent = "¡Oh, oh! 😟 Parece que tus gastos son mayores que tus ingresos.";
            mensajeFinalField.classList.add('mensaje-negativo');
            summaryBox.classList.add('deficit-summary');
            if(deficitImage) deficitImage.style.display = 'block';
        } else { 
            mensajeFinalField.textContent = "¡Equilibrio perfecto! 👌 Ni sobra, ni falta. ¡Buen trabajo!";
            mensajeFinalField.classList.add('mensaje-neutro');
            if(equilibrioImage) equilibrioImage.style.display = 'block';
        }
    }

    inputs.forEach(input => {
        input.addEventListener('input', calcularPresupuesto);
    });

    calcularPresupuesto(); 
});