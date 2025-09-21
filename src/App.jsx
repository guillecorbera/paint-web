// src/App.jsx
import React from 'react'; // ✅ Añade esta línea
import { LangProvider } from './context/LangContext';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';

function App() {
  return (
    <LangProvider>
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    </LangProvider>
  );
}

export default App;