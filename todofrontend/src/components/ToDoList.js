import Task from "./Task"

const ToDoList = ({tasks, onDelete, onChange, className}) => {
  return (
    <div className={"todo " + className}>
        {tasks.map((task) => (
            <Task key={task.id} task={task} onDelete={onDelete} onChange={onChange}/>
        ))}
    </div>
  )
}

export default ToDoList