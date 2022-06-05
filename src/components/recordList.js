import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import './styles.css'

const Record = (props) => (
  <tr>
    <td>{props.record.name}</td>
    <td>{props.record.position}</td>
    <td>{props.record.level}</td>
    <td>
      <Link className="btn btn-link"  to={`/edit/${props.record._id}`} ><i className="bi bi-pencil-square"></i></Link> |
      </td>
       <td>
      <button className="btn btn-link"
        onClick={() => {
           Swal.fire({
            title: 'Seguro desea eliminar el registro?',
            text: "Esta acción es irreversible!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!',
            cancelButtonText: 'cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              props.deleteRecord(props.record._id);
              Swal.fire(
                'Eliminado!',
                'Registro eliminado con éxito.',
                'success'
              )
            }
          })
          
        }}
      >
        <i className="bi bi-trash-fill"></i>
      </button>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`https://todolistprojectcrud.herokuapp.com/record`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return; 
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`https://todolistprojectcrud.herokuapp.com/${id}`, {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div className="tableContainer">
      <h3 className="formTitle">Lista de tareas</h3>
      <table className="table" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Tarea</th>
            <th>Descripción</th>
            <th>Proceso</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
     
    </div>
  );
}
