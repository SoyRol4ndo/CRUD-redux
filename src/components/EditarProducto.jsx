import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editarProductoAction } from '../actions/productoActions';
import Swal from 'sweetalert2';

import { useNavigate } from 'react-router-dom';

const EditarProducto = () => {

  const dispatch = useDispatch();
  const navegate = useNavigate();

  // Nuevo State de producto
  const [producto, setproducto] = useState({
    nombre: '',
    precio: ''
  });

  // Producto a Editar
  const productoeditar = useSelector(state => state.productos.productoeditar);

  // Llenar el state automaticamente
  useEffect(() => {
    setproducto(productoeditar);
  }, [productoeditar]);

  // Leer los datos del formulario
  const onChangeFormulario = e => {
    setproducto({
      ...producto,
      [e.target.name]: e.target.value
    });
  };

  const { nombre, precio } = producto;

  const onSubmitEditarProducto = e => {
    e.preventDefault();
    dispatch(editarProductoAction(producto));
    Swal.fire(
      'Editado!',
      'El producto se edito correctamente',
      'success'
    );
    navegate('/');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className='text-center mb-4 font-weight-bold'>
              Editar Producto
            </h2>

            <form
              onSubmit={onSubmitEditarProducto}
            >
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className='form-control'
                  placeholder='Nombre del Producto'
                  name='nombre'
                  value={nombre}
                  onChange={onChangeFormulario}
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
                  onChange={onChangeFormulario}
                />
              </div>
              <button
                type='submit'
                className='btn btn-primary font-weight text-uppercase d-block w-100'
              >Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;