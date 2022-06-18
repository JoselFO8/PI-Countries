import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter} from 'react-router-dom'
import reportWebVitals from './reportWebVitals'; // repetidor de rendimiento que le permite medir y analizar el rendimiento de su aplicación


import './index.css';
import App from './Containers/App.js';
import store from './Redux/store/store.js'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter> 
          <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// <BrowserRouter> Es una envoltura para nuestra aplicación. Esta envoltura nos da acceso al API de historia de HTML5 para mantener nuestra interfaz gráfica en sincronía con la locación actual o URL

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
