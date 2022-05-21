import React from 'react'
import Header from "./components/Header";
import ToDoList from './components/ToDoList';
import NewTask from './components/NewTask';
import Filter from './components/Filter';
import {useState, useEffect} from 'react'

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      task_name: 'xd1',
      completion: false,
    },
    {
      id: 2,
      task_name: 'xd2',
      completion: true,
    },
  ])

  const [token, setToken] = useState('')

  useEffect(() => {
    const getToken = async () => {
      const tokenData = await fetchToken()
      setToken(tokenData)
    }

    getToken()
  }, [])

  useEffect(() => {
    const getTasks = async () => {
      if (token.access && token.access.length > 0){
        const tasksData = await fetchTasks()
        setTasks(tasksData)
      }
    }

    getTasks()
  }, [token])

  const fetchRefreshToken = async () => {
    const res = await fetch('http://localhost:8000/api/token/refresh/', {method: 'POST', mode: 'cors', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({'refresh': token.refresh})})
    const data = await res.json()

    return data
  }

  const fetchToken = async () => {
    const res = await fetch('http://localhost:8000/api/token/', {method: 'POST', mode: 'cors', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({'username': 'admin', 'password': 'admin'})})
    const data = await res.json()

    return data
  }

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:8000/api/tasks/', {method: 'GET', mode: 'cors', headers: {"Authorization": `Bearer ${token.access}`}})
    const data = await res.json()

    return data
  }


  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:8000/api/tasks/', {method: 'POST', mode: 'cors', headers: {"Authorization": `Bearer ${token.access}`, 'Content-Type': 'application/json'}, body: JSON.stringify({'task_name': task.text})})
    const data = await res.json()
    if (data.id) {
      setTasks([...tasks, data])
    }
  }

  // Delete Task
  const deleteTask = async (id) => {
    // send API delete request
    const res = await fetch('http://localhost:8000/api/tasks/' + id + '/', {method: 'DELETE', mode: 'cors', headers: {"Authorization": `Bearer ${token.access}`}})
    if (res.status === 204){
      setTasks(tasks.filter((task) => task.id !== id))
    }
  }

  // Update Task
  const updateTask = async (id) => {
    // send API put request
    let task = tasks.find(task => task.id === id)
    const res = await fetch('http://localhost:8000/api/tasks/' + id + '/', {method: 'PUT', mode: 'cors', headers: {"Authorization": `Bearer ${token.access}`, 'Content-Type': 'application/json'}, body: JSON.stringify({"completion": !task.completion})})
    const data = await res.json()

    setTasks(tasks.map((task) => {
      if (task.id === id) {
        task.completion = !task.completion
      }
      return task
    }))
  }

  const [hide, toggleHide] = useState(false)
  
  const hideComplete = (x) => {
    toggleHide(!hide)
  }


  return (
    <div className="App">
      <Header title="TODO APP"/>
      <NewTask onAdd={addTask}/>
      <Filter onChange={hideComplete}/>
      {
        tasks.length > 0 ? 
        <ToDoList className={`${hide ? "hide" : ""}`} tasks={tasks} onDelete={deleteTask} onChange={updateTask}/> : 
        <h2>No tasks to show</h2>
      }
    </div>
  );
}

export default App
