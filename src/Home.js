import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const baseURL = "http://localhost:8000/employee/";

function Home() {
  const [employee, setEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    position: "",
  });

  useEffect(() => {
    getEmployee();
  }, []);

  //Fetch data from Json Server
  const getEmployee = async () => {
    await axios.get(baseURL).then((res) => setEmployee(res.data));
  };

  //Delete data from Json Server
  const handleDelete = async (id) => {
    await axios.delete(baseURL + id);
    getEmployee(); // After deleting, fetch the remaining data
  };

  //Add data to the Json Server
  const handleFormSubmit = async (e) => {
    await axios.post(baseURL, formData);
    setFormData({
      name: "",
      surname: "",
      position: "",
    });
    if (!formData){
      return null;

    }else {
      getEmployee(); // After deleting, fetch the remaining data
    }
  };

  return (
    <div>
      <h1 style={{ marginLeft: "35%" }}>Employee Admin</h1>
      <table id="employees">
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Position</th>
            <th> Action</th>
          </tr>
        </thead>
        <tbody>
          {employee &&
            employee.map((worker) => {
              return (
                <tr>
                  <td>{worker.name}</td>
                  <td>{worker.surname}</td>
                  <td>{worker.position}</td>
                  <td>
                    <button
                      id="button2"
                      onClick={() => handleDelete(worker.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          <tr>
            <td>
              <input
                type="text"
                class="form-control"
                id="exampleFormcontrol"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                class="form-control"
                id="exampleFormcontrol"
                placeholder="Please Enter Surname"
                value={formData.surname}
                onChange={(e) =>
                  setFormData({ ...formData, surname: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                class="form-control"
                id="exampleFormcontrol"
                placeholder="Please Enter Position"
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
              />
            </td>
            <td>
              <button id="button1" onClick={handleFormSubmit}>
                Add Employee
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Home;
