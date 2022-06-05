import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("https://todolistprojectcrud.herokuapp.com/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ name: "", position: "", level: "" });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div className="formContainer">
      <h3 className="formTitle">Agregar Nueva tarea</h3>
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
              required
            />
            <label htmlFor="SinComenzar" className="form-check-label">
              Sin Comenzar
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
              required
            />
            <label htmlFor="enProceso" className="form-check-label">
              En Proceso
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
              required
            />
            <label htmlFor="completado" className="form-check-label">
              Completado
            </label>
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Agregar tarea"
            className="btn btn-primary inputSubmit"
          />
        </div>
      </form>
    </div>
  );
}
