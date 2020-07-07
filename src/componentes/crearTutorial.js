import React, { Component } from 'react'
import axios from 'axios'

export default class crearTutorial extends Component {

    state = {
        id: 0,
        tutorial: '',
        descripcion: '',
        publicado: false,
        edicion: false
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:3001/tutoriales');
        this.setState({
            id: res.data.length+1
        })
        if(this.props.match.params.id) {
            const res = await axios.get('http://localhost:3001/tutoriales/'+this.props.match.params.id);
            this.setState({
            tutorial: res.data.titulo,
            descripcion: res.data.descripcion,
            edicion: true,
            id: this.props.match.params.id
        })
    }}

    onSubmit = async (e) => {
        e.preventDefault();
        const nuevoTutorial = {
            id: this.state.id,
            titulo: this.state.tutorial,
            descripcion: this.state.descripcion,
            publicado: this.state.publicado
        };
        if(this.state.edicion)
        {
            await axios.put('http://localhost:3001/tutoriales/' + this.state.id, nuevoTutorial);
        } else {
            await axios.post('http://localhost:3001/tutoriales', nuevoTutorial);
        }
        
        window.location.href = '/';
    }

    onImputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Crear Tutorial</h4>

                    <div className="form-group">
                        <input 
                        type="text"
                        className="form-control" 
                        placeholder="Tutorial" 
                        name="tutorial" 
                        onChange={this.onImputChange}
                        value={this.state.tutorial}
                        required
                        />
                    </div>

                    <div className="form-group">
                        <textarea 
                        className="form-control" 
                        placeholder="Descripción" 
                        name="descripcion" 
                        onChange={this.onImputChange}
                        value={this.state.descripcion}
                        >
                        </textarea>
                    </div>

                    <form onSubmit={this.onSubmit}>
                        <button type="submit" className="btn btn-primary">
                            Agregar
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}