import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class listaTutoriales extends Component {

    state = {
        tutoriales: []
    }

    async componentDidMount(){
        this.getTutoriales();
    }

    async getTutoriales() {
        const res = await axios.get('http://localhost:3001/tutoriales');
        this.setState({tutoriales: res.data })
    }

    borrarTutorial = async (id) => {
        await axios.delete('http://localhost:3001/tutoriales/'+id);
        this.getTutoriales();
    }

    render() {
        return (
            <div className="row">
                {
                    this.state.tutoriales.map(tutoriales => (
                        <div className="col-md-4 p-2" key={tutoriales.id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                <h5>{tutoriales.titulo}</h5>
                                <Link className="btn btn-secondary" to={"/editar/"+tutoriales.id}>
                                    Editar
                                </Link>
                                </div>
                                <div className="card-body">
                                    <p>{tutoriales.id}</p>
                                    <p>{tutoriales.descripcion}</p>
                                    <p>{tutoriales.publicado}</p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-danger" onClick={() => this.borrarTutorial(tutoriales.id)}>
                                        Borrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            // <div className="row">
            //     <div className="col-md4">
            //     </div>
            //     <div className="col-md8">
            //         <ul className="list group">
            //             {
            //                 this.state.tutoriales.map(tutoriales => <li className="list-group-item list-group-item-action" key={tutoriales.id}>
            //                     {tutoriales.titulo}
            //                 </li>)
            //             }
            //         </ul>
            //     </div>
            // </div>
        )
    }
}
