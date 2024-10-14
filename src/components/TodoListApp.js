import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../index.css';
import { PiTrashBold } from "react-icons/pi";

const TodoList = () => {
  const [task, setTask] = useState([]);
  const [arrTask, setArrTask] = useState("");


// Add new tasks
  const addTask = (e) => {
    e.preventDefault();   // Prevent from submission
    if (arrTask.trim() !== "") {
      setTask([...task, { main: arrTask, completed: false }]);
      setArrTask("");
    }
  };


  //Mark task as completed
  const markHandler = (index) => {
    const completedTask = task.map((tasks, id) =>
      id === index ? { ...tasks, completed: true } : tasks
    );
    setTask(completedTask);
  };


  // Delete a task
  const deleteHandler = (index) => {
    const temp = task.filter((_, id) => id !== index);
    setTask(temp);
  };


  //Get incomplete task
  const incomplete = task.filter((tasks) => !tasks.completed);

  //Get complete task
  const complete = task.filter((tasks) => tasks.completed);

  return (
    <div className="text-center !important div1">
      <div className="div2">
        <h1>To-Do List</h1>

        <Form onSubmit={addTask}>
          <Form.Label><strong>Add New Tasks</strong></Form.Label>

          <Form.Control
            value={arrTask}
            onChange={(e) => setArrTask(e.target.value)}
            style={{ margin: "auto", width: "34%" }}
            placeholder="Add New Tasks"/>

          <Button variant="secondary" type="submit" className="button">Add Task</Button>
        </Form>
      </div>

      <h3>List of Incomplete Tasks</h3>
      {incomplete.length > 0 ? (
        <ul>
          {incomplete.map((tasks, index) => (
            <li key={index}>
              {tasks.main}
             
                <Button className='complete text-center'  variant="success" onClick={() => markHandler(index)}>Complete</Button>
                <PiTrashBold  className='trash' onClick={() => deleteHandler(index)} />
              
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-muted">No Tasks</div>
      )}

      <h3>List of Completed Tasks</h3>
      {complete.length > 0 ? (
        <ul>
          {complete.map((tasks, index) => (
            <li key={index}>
              {tasks.main}
                <PiTrashBold className='trash' onClick={() => deleteHandler(index)} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-muted">No Completed Tasks</div>
      )}
      
    </div>
  );
};

export default TodoList;