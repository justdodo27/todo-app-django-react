import {FaTimes} from 'react-icons/fa'

const Task = ({task, onDelete, onChange}) => {
  return (
    <div className={`task ${task.completion ? 'checked' : ''}`}>
        <h3 style={{placeSelf: 'start', margin: '0'}}>
            {task.task_name}{' '}
        </h3>
        <input type='checkbox' checked={task.completion} value="" onChange={() => onChange(task.id)}/>
        <FaTimes size={24}
            style={{ color: 'red', cursor: 'pointer'}} 
            onClick={() => onDelete(task.id)}
        />
    </div>
  )
}

export default Task