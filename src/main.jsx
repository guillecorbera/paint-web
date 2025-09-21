// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// Importar AOS
import AOS from 'aos';
import 'aos/dist/aos.css'; // Estilos base de AOS

// Tu App
import App from './App';
import './index.css';

// Inicializar AOS
AOS.init({
  duration: 800,
  once: true,
  offset: 50,
  easing: 'ease-out-cubic',
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);