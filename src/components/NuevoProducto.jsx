import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Action de Redux
import { crearNuevoProductoAction } from '../actions/productoActions';
import { mostrarAlerta, ocultarAlertaAction } from '../actions/aletaActions';


const NuevoProducto = () => {

  // state del componente
  const [nombre, setnombre] = useState('');
  const [precio, setprecio] = useState(0);

  // utilizar use Dispatch y te crea una funcion
  const dispatch = useDispatch();

  // Acceder al state del store
  const cargando = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);
  const alerta = useSelector(state => state.alerta.alerta);

  // console.log(cargando);

  // mandar llamar el Action del ProductoAction
  const agregarProducto = (producto) => dispatch(crearNuevoProductoAction(producto));

  // Cuando el usuario haga submit
  const submitNuevoProducto = e => {
    e.preventDefault();

    // validar formulario
    if (nombre.trim() === '' || precio <= 0) {

      const alerta = {
        msg: 'Ambos campos son oblogatorios',
        classes: 'alert alert-danger text-center text-uppercase p3'
      };
      dispatch(mostrarAlerta(alerta));
      return;
    }

    // si no hay errores
    dispatch(ocultarAlertaAction());

    // crear el nuevo producto
    agregarProducto({
      nombre,
      precio
    });
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className='text-center mb-4 font-weight-bold'>
              Agregar Nuevo Producto
            </h2>

            {alerta ? (<p className={alerta.classes}>{alerta.msg}</p>) : (null)}

            <form
              onSubmit={submitNuevoProducto}
            >
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className='form-control'
                  placeholder='Nombre del Producto'
                  name='nombre'
                  value={nombre}
                  onChange={e => setnombre(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  type="number"
                  className='form-control'
                  placeholder='Precio del Producto'
                  name='precio'
                  value={precio}
                  onChange={e => setprecio(Number(e.target.value))}
                />
              </div>
              <button
                type='submit'
                className='btn btn-primary font-weight text-uppercase d-block w-100'
              >Agregar
              </button>
            </form>

            {cargando ? (<p>Cargando...</p>) : (null)}
            {error ? (
              <p className='alert alert-danger p2 mt-4 text-center'>Hubo un Error</p>
            ) : (null)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;