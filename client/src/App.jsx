import { useState } from "react";

function App() {
  const [lista, setLista] = useState([]);
  const [tarea, setTarea] = useState("");

  async function obtenTareas() {
    await fetch("http://localhost:7001/tasks")
      .then((response) => response.json())
      .then((json) => setLista(json.list))
      .catch((error) => console.error("Error de consulta", error));
  }

  async function nuevaTarea() {
    const body = { title: tarea };
    if (tarea !== "") {
      await fetch("http://localhost:7001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((json) => setLista(json.list))
        .catch((error) => console.error("Registro no guardado", error));
    }
  }

  async function actualizaTarea(id, campo, valor) {
    await fetch("http://localhost:7001/tasks/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ [campo]: valor }),
    })
      .then((response) => response.json())
      .then((json) => setLista(json.list))
      .catch((error) => console.error(error));
  }

  return (
    <>
      <hr />
      <div className="container">
        <h3>Nueva actividad</h3>
        <div className="row">
          <div className="col m-1">
            <label htmlFor="">Tarea: </label>
            <input
              type="text"
              className="m-1"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={nuevaTarea}
            >
              Guardar
            </button>
          </div>
        </div>

        <hr />
        <button type="button" className="btn btn-success" onClick={obtenTareas}>
          Obtener lista
        </button>
      </div>
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tarea</th>
              <th>Completado</th>
              <th>Activo</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((registro, i) => {
              return (
                <tr key={i}>
                  <td>{registro.id}</td>
                  <td>{registro.title}</td>
                  <td>{registro.isCompleted ? "Si" : "No"}</td>
                  <td>{registro.isActive ? "Si" : "No"}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        actualizaTarea(
                          registro.id,
                          "isCompleted",
                          !registro.isCompleted
                        )
                      }
                      className={
                        registro.isCompleted
                          ? " btn btn-danger"
                          : "btn btn-primary"
                      }
                    >
                      {registro.isCompleted ? "Reabrir" : "Completar"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger m-1"
                      onClick={() =>
                        actualizaTarea(registro.id, "isActive", false)
                      }
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
