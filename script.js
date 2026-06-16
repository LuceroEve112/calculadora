// Usamos funciones de flecha y manipulación estricta del DOM (Temas 4, 5 y 6 del documento)

// 1. Navegación entre pestañas ("páginas")
const mostrarSeccion = (seccion) => {
    const calcSec = document.getElementById("seccion-calculadora");
    const edadSec = document.getElementById("seccion-edad");
    const btnCalc = document.getElementById("btn-ir-calc");
    const btnEdad = document.getElementById("btn-ir-edad");

    if (seccion === 'calculadora') {
        calcSec.classList.remove("hidden");
        edadSec.classList.add("hidden");
        btnCalc.classList.add("active");
        btnEdad.classList.remove("active");
    } else {
        calcSec.classList.add("hidden");
        edadSec.classList.remove("hidden");
        btnCalc.classList.remove("active");
        btnEdad.classList.add("active");
    }
};

// 2. Lógica de la Calculadora Básica
const ejecutarOperacion = (operacion) => {
    // Captura de datos de los inputs del DOM
    const n1 = parseFloat(document.getElementById("num1").value);
    const n2 = parseFloat(document.getElementById("num2").value);
    let resultado = 0;

    // Validación básica: Verificar si el primer número es válido
    if (isNaN(n1)) {
        alert("Por favor, ingresa al menos el primer número.");
        return;
    }

    // Estructura de control condicional múltiple (switch) según la Tabla 4
    switch (operacion) {
        case 'suma':
            if (isNaN(n2)) return alert("Se requiere el segundo número para esta operación.");
            resultado = n1 + n2;
            break;
        case 'resta':
            if (isNaN(n2)) return alert("Se requiere el segundo número para esta operación.");
            resultado = n1 - n2;
            break;
        case 'multiplicacion':
            if (isNaN(n2)) return alert("Se requiere el segundo número para esta operación.");
            resultado = n1 * n2;
            break;
        case 'division':
            if (isNaN(n2)) return alert("Se requiere el segundo número para esta operación.");
            if (n2 === 0) {
                resultado = "Error (División por 0)";
            } else {
                resultado = n1 / n2;
            }
            break;
        case 'potencia':
            if (isNaN(n2)) return alert("Se requiere el exponente (Número 2).");
            resultado = Math.pow(n1, n2);
            break;
        case 'factorial':
            if (n1 < 0 || !Number.isInteger(n1)) {
                resultado = "Error (Debe ser entero ≥ 0)";
            } else {
                resultado = calcularFactorial(n1);
            }
            break;
        default:
            resultado = 0;
    }

    // Actualizar el DOM dinámicamente con innerText (Tabla 6)
    document.getElementById("res-calculadora").innerText = resultado;
};

// Función tradicional para resolver el Factorial mediante un bucle "for" (Tabla 4 y 5)
function calcularFactorial(num) {
    if (num === 0 || num === 1) return 1;
    let resultado = 1;
    for (let i = 2; i <= num; i++) {
        resultado *= i;
    }
    return resultado;
}

// 3. Lógica del Calculador de Edad
const calcularEdad = () => {
    const inputFecha = document.getElementById("fecha-nacimiento").value;
    
    // Validación de campo vacío (Tabla 7 de tu documento)
    if (inputFecha === "") {
        alert("La fecha de nacimiento es obligatoria.");
        return;
    }

    const fechaNac = new Date(inputFecha);
    const fechaActual = new Date();

    let edad = fechaActual.getFullYear() - fechaNac.getFullYear();
    const mes = fechaActual.getMonth() - fechaNac.getMonth();

    // Ajuste por si el cumpleaños no ha pasado en el año actual
    if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNac.getDate())) {
        edad--;
    }

    if (edad < 0) {
        document.getElementById("res-edad").innerText = "¡Fecha incoherente!";
    } else {
        document.getElementById("res-edad").innerText = `${edad} años`;
    }
};