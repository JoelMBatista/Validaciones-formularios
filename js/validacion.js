export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajesDeError(tipoDeInput, input);
  }
}

const tiposDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajeDeError = {
  nombre: {
    valueMissing: "El campo nombre no puede estar vacío.",
  },

  email: {
    valueMissing: "El campo correo no puede estar vacío.",
    typeMismatch: "El formato del correo electrónico es incorrecto.",
  },

  password: {
    valueMissing: "El campo contraseña no puede estar vacío.",
    patternMismatch:
      "Tu Contraseña debe tener mínimo ocho caracteres, al menos una letra y un número.",
  },

  nacimiento: {
    valueMissing: "El campo fecha de nacimiento no puede estar vacío.",
    customError: "Debes tener al menos 18 años de edad",
  },

  numero: {
    valueMissing: "El campo numero de teléfono no puede estar vacío.",
    patternMismatch:
      "El formato requerido es ###-###-####.",
  },

  direccion: {
    valueMissing: "El campo dirección no puede estar vacío.",
    patternMismatch:
      "La dirección debe contener entre 10 a 40 caracteres.",
  },

  ciudad: {
    valueMissing: "El campo ciudad no puede estar vacío.",
    patternMismatch:
    "La ciudad debe contener entre 4 a 30 caracteres.",
  },

  estado: {
    valueMissing: "El campo estado no puede estar vacío.",
    patternMismatch:
    "El estado debe contener entre 4 a 30 caracteres.",
  },
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajesDeError(tipoDeInput, input) {
    let mensajes = "";
    tiposDeErrores.forEach( error => {

        if (input.validity[error]) {
           mensajes = mensajeDeError[tipoDeInput][error]
        }
    } ) ;

    return mensajes;
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }

  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );

  return diferenciaFechas <= fechaActual;
}
