import { useState } from "react";
import "./App.css";

function App() {
  const [employee, setEmployee] = useState("");
  const [department, setDepartemnt] = useState("");
  const [salary, setSalary] = useState("");
  const [edit, setEdit] = useState(false);
  const [active, setActive] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [users, setUsers] = useState([]);

  const addUser = (e) => {
    e.preventDefault();

    const user = {
      employee,
      department,
      salary,
    };

   if(edit){
    let copy = users;
    Object.assign(copy[active], user);
    setUsers([...copy]);
    setEdit(false);
    setActive(null);
   }else{
    setUsers([...users, user]);
   }
    setEmployee("");
    setDepartemnt("");
    setSalary("");
  };

  const updateHandler = (index) => {
    const user = users[index];

    setEmployee(user.employee);
    setDepartemnt(user.department);
    setSalary(user.salary);

    setActive(index);
    setEdit(true);
  };

const deleteUser =(user)=>{
  let copy = users.filter((item)=> item !== user);
  setUsers([...copy]);
  console.log("item deleted")

}

  return (
    <div className="App">
      <h1>Employee Details</h1>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-10 col-md-8 col-lg-5">
            <form onSubmit={addUser}>
              <div className="form-group space">
                {/* <label htmlFor=''>Name</label> */}
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder=" Employees Name"
                  value={employee}
                  onChange={(e) => setEmployee(e.target.value)}
                />
              </div>
              <div className="form-group space">
                {/* <label>Department</label> */}
                <textarea
                  type="textarea"
                  required
                  className="form-control"
                  placeholder="Department"
                  value={department}
                  onChange={(e) => setDepartemnt(e.target.value)}
                />
              </div>
              <div className="form-group space">
                {/* <label>Salary</label> */}
                <input
                  type="Number"
                  className="form-control"
                  required
                  placeholder="Salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
              <div className="space">
                <button className="btn btn-success form-control">
                  {" "}
                  {edit ? "Update" : "ADD"}{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="form-group mt-5 col-xs-12 col-sm-10 col-md-8 col-lg-5">
                {/* <label>Salary</label> */}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  // value={salary}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
      <table className="table table-bordered mt-5">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.filter((user)=>{
            if(searchTerm==""){
              return user;
            }else if(user.employee.toLowerCase().includes(searchTerm.toLowerCase())){
              return user;
            }
          }).map((user, index) => {
            return (
              <tr>
                <td>{user.employee}</td>
                <td>{user.department}</td>
                <td>{user.salary}</td>
                <td>
                  <button className="btn btn-info" onClick={()=> updateHandler(index)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={()=> deleteUser(user)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
