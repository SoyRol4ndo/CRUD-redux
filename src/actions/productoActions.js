import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

// Crear nuevos Productos
export function crearNuevoProductoAction(producto) {


  return async (dispatch) => {
    dispatch(agregarProducto());

    try {
      // insertar en la API
      await clienteAxios.post('/productos', producto);

      // si todo sale bien, actualizar el state
      dispatch(agregarProductoExito(producto));

      // Alerta Correcto
      Swal.fire(
        'Correcto',
        'El producto se agregó correctamente',
        'success'
      );
      window.location.href = '/';

    } catch (error) {
      console.log(error);
      // si hay un error, cambiar el state
      dispatch(agregarProductoError(true));

      // Alerta de error
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un Error',

      });
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true
});


// si el producto se guarda en la base de datos
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto
});

// si hubo un error
const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado
});

// Funcion que descarga los productos de la base de datos
export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch(descargarProdcutos());

    try {
      const respuesta = await clienteAxios.get('/productos');
      dispatch(descargaProductosExitosa(respuesta.data));
    } catch (error) {
      console.log(error);
      dispatch(descargaProductosError());
    }
  };
}

const descargarProdcutos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true
});

const descargaProductosExitosa = (productos) => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos
});

const descargaProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: true
});

// Selecciona y elimina el producto
export function borrarProductoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerProductoEliminar(id));

    try {
      await clienteAxios.delete(`/productos/${id}`);
      dispatch(eliminarProductoExito());

      // Si se elimina, mostrar alerta
      Swal.fire(
        'Eliminado',
        'El producto se elimino correctamente',
        'success'
      );
    } catch (error) {
      console.log(error);
      dispatch(eliminarProductoError());
    }
  };
}

const obtenerProductoEliminar = (id) => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id
});

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: true
});

// Colocar producto en edicion

export function obtenerProductoEditar(producto) {
  return (dispatch) => {
    dispatch(obtenerProductoEditarAction(producto));
  };
}

const obtenerProductoEditarAction = producto => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto
});

// Edita un regitro en la API y state
export function editarProductoAction(producto) {
  return async (dispatch) => {
    dispatch(editarProducto(producto));

    try {
      await clienteAxios.put(`/productos/${producto.id}`, producto);
      dispatch(editarProductoExito());
    } catch (error) {
      dispatch(editarProductoError());
      console.log(error);
    }

  };
}

const editarProducto = producto => ({
  type: COMENZAR_EDICION_PRODUCTO,
  payload: producto
});

const editarProductoExito = () => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: null
});

const editarProductoError = () => ({
  type: PRODUCTO_EDITADO_ERROR,
  payload: null
});