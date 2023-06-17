import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './components/Header';
import Productos from './components/Productos.jsx';
import NuevoProducto from './components/NuevoProducto';
import EditarProducto from './components/EditarProducto';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Header />

        <div className="container mt-5">
          <Routes>
            <Route path='/' element={<Productos />} />
            <Route path='/productos/nuevo' element={<NuevoProducto />} />
            <Route path='/productos/editar/:id' element={<EditarProducto />} />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
