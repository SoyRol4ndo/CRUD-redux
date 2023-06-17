import {
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA
} from '../types';

// Muestra una alerta
export function mostrarAlerta(alerta) {
  return (dispath) => {
    dispath(crearAlerta(alerta));
  };
}

const crearAlerta = alerta => ({
  type: MOSTRAR_ALERTA,
  payload: alerta
});

// Ocultar la alerta
export function ocultarAlertaAction() {
  return (dispath) => {
    dispath(ocultarAlerta());
  };
}

const ocultarAlerta = () => ({
  type: OCULTAR_ALERTA,
  payload: null
});