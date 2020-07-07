import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navegacion from './componentes/navegacion'
import ListaTutoriales from './componentes/listaTutoriales'
import CrearTutorial from './componentes/crearTutorial'

function App() {
  return (
    <Router>
      <Navegacion/>

      <div className="container p-4">
        <Route path="/" exact component={ListaTutoriales} />
        <Route path="/editar/:id" component={CrearTutorial} />
        <Route path="/crear" component={CrearTutorial} />
      </div>

    </Router>
  );
}

export default App;
