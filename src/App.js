import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddTaskForm from './components/AddTaskForm.jsx'
import UpdateForm from './components/UpdateForm.jsx'
import ToDo from './components/ToDo.jsx'
import './App.css';

function App() {

  //Task (Todo List) state
  const [toDo, setTodo] = useState([])

  //Temp State
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  //Add task
  const addTask =() =>{
    if (newTask){
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false }
      setTodo([...toDo, newEntry])
      setNewTask('');
    }
  }

  //Delete task
  const deleteTask = (id) =>{
    let newTasks = toDo.filter(task => task.id !== id)
    setTodo(newTasks);
  }

  //Mark task as done or completed
  const markDone =(id) =>{
    let newTask = toDo.map(task => {
      if(task.id === id){
        return ({ ...task, status:!task.status})
      }
      return task;
    })
    setTodo(newTask);
  }
    
  //Cancel Update
  const cancelUpdate =() =>{
    setUpdateData('');

  }

  //Change task for update
  const changeTask = (e) =>{
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status:updateData.status ? true : false,
    }
    setUpdateData(newEntry);
  }

  //Update task
  const updateTask = (e) =>{
    let filterRecords = [...toDo].filter(task => task.id !== updateData.id)
    let updatedObject = [...filterRecords, updateData]
    setTodo(updatedObject);
    setUpdateData('');

  }


  return (
    <div className="container App">
      <br/><br/>
      <h2>To Do List App  (ReactJS)</h2>
      <br/><br/>

      {/* Update Task */}
      {updateData && updateData ? (
        <UpdateForm
        updateData = {updateData}
        changeTask = {changeTask}
        updateTask = {updateTask}
        cancelUpdate ={cancelUpdate}
        />
      ) : (
       <AddTaskForm
          newTask ={newTask}
          setNewTask = {setNewTask}
          addTask ={addTask}
        />
      )}
      

      {/* Display TOdos */}
      {toDo && toDo.length ? '' : 'No tasks...'}
      <ToDo
      toDo = {toDo}
      markDone = {markDone}
      setUpdateData = {setUpdateData}
      deleteTask = {deleteTask}
      />

    </div>
  );
}

export default App;

