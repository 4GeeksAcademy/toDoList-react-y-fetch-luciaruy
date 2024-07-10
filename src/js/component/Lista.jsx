import React, { useState, useEffect } from "react";

const List = () => {
    const [tarea, setTarea] = useState("");
    const [lista, setLista] = useState([]);
    const [usuario, setUsuario] = useState([])


    function crearUsuario() {
        fetch('https://playground.4geeks.com/todo/users/LuciaRuy', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((respose) => {
                if (respose.status === 201) {
                    obtenerTareas()
                }
                return respose.json()
            })
                    .then((data) => console.log(data))
                    .catch((error) => console.log(error));
           
            }
       
            
    // OBTIENE TODAS LAS TAREAS.        
    function obtenerTareas() {
                    fetch('https://playground.4geeks.com/todo/users/LuciaRuy', {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                        .then((respose) => {
                            if (respose.status === 404) {
                                crearUsuario()
                            }
                            console.log(respose)

                            return respose.json()

                        })

                        .then((data) => setLista(data.todos))
                        .catch((error) => console.log(error))
                }


    //ESTA FUNCION CREA UNA TAREA
    function crearTareas() {
                    fetch('https://playground.4geeks.com/todo/todos/LuciaRuy', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "label": tarea,
                            "is_done": false,
                        })
                    })
                         .then((respose) => {
                            if (respose.status === 201) {
                                obtenerTareas()
                            }
                            console.log(respose)

                            return respose.json()

                        })
                        .then((data) => console.log(data))
                        .catch((error) => console.log(error));

                }

    function eliminarDesdeApi(id) {
                    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                        method: 'DELETE',
                            headers: {
                            "Content-type": "application / json"

                        }
                    })

            .then((response) => {
                console.log(response)
                if (response.status === 204) {
                    obtenerTareas()
                } 
            })
                 
            .then((data) => console.log(data))
            .catch((error) => console.log(error));

    }


    function handleTarea(event) {
        setTarea(event.target.value);
    }


    useEffect(() => {
        crearUsuario()
        obtenerTareas()
    }, [])

    return (
        <div className="card">
            <div className="card-body">
                <input type="text" className="form-control" value={tarea} onChange={handleTarea} />
                <button className="btn btn-primary mt-2" onClick={crearTareas}>Agregar</button>
                <ul className="list-group mt-3">
                    {lista.length > 0 ? (
                        lista.map((item, index) => (
                            <li key={index}
                                className="list-group-item d-flex justify-content-between align-items-center"
                                onMouseEnter={(e) => e.currentTarget.querySelector('button').style.display = 'inline'}
                            >
                                {item.label}
                                <button className="btn btn-danger btn-sm" onClick={() => eliminarDesdeApi(item.id)}> Eliminar</button>
                            </li>
                        ))
                    ) : null}
                </ul>
            </div>
        </div>
    );
};


export default List;
