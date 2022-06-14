import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function Edit(props) {
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `https://todolistprojectcrud.herokuapp.com/record/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      name: form.name,
      position: form.position,
      level: form.level,
    };

    // This will send a post request to update the data in the database.
    await fetch(
      `https://todolistprojectcrud.herokuapp.com/update/${params.id}`,
      {
        method: "POST",
        body: JSON.stringify(editedPerson),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div className="formContainer">
      <h3 className="formTitle">Editar Tarea</h3>
      <form onSubmit={onSubmit} className="formBody">
        <div className="form-group">
          <label htmlFor="name">Tarea: </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Descripción: </label>
          <input
            type="text"
            className="form-control"
            id="position"
            value={form.position}
            onChange={(e) => updateForm({ position: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="SinComenzar"
              value="Sin Comenzar"
              checked={form.level === "Sin Comenzar"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="SinComenzar" className="form-check-label">
              Sin comenzar
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="enProceso"
              value="En Proceso"
              checked={form.level === "En Proceso"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="enProceso" className="form-check-label">
              En proceso
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="completado"
              value="Completado"
              checked={form.level === "Completado"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="completado" className="form-check-label">
              Completado
            </label>
          </div>
        </div>
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Editar Tarea"
            className="btn btn-primary inputSubmit"
          />
        </div>
      </form>
    </div>
  );
}
