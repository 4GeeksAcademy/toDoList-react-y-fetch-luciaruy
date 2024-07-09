import React, { useState } from "react";

const List = () => {
    const [tarea, setTarea] = useState("");
    const [lista, setLista] = useState([]);

    function handleTarea(event) {
        setTarea(event.target.value);
    }

    function agregarTarea() {
        if (tarea.trim()) {
            setLista([...lista, tarea]);
            setTarea("");
        }
    }

    function eliminarTarea(index) {
        const nuevasTareas = [...lista];
        nuevasTareas.splice(index, 1);
        setLista(nuevasTareas);
    }

    return (
        <div className="card">
            <div className="card-body">
                <input type="text"className="form-control" value={tarea} onChange={handleTarea}/>
                <button className="btn btn-primary mt-2" onClick={agregarTarea}>Agregar</button>
                <ul className="list-group mt-3">
                    {lista.length > 0 ? (
                        lista.map((tarea, index) => (
                            <li key={index}
                                className="list-group-item d-flex justify-content-between align-items-center"
                                onMouseEnter={(e) => e.currentTarget.querySelector('button').style.display = 'inline'}
                            >
                                {tarea}
                                <button className="btn btn-danger btn-sm" onClick={() => eliminarTarea(index)}> Eliminar</button>
                                </li>
                        ))
                    ) : null}
                </ul>
            </div>
        </div>
    );
};


export default List;
