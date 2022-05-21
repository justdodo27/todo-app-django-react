import { useState } from "react"

const NewTask = ({ onAdd }) => {
    const [text, setText] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if(!text) {
            alert("Please add a task!")
            return
        }

        onAdd({text})

        setText('')
    }

  return (
    <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
            <label>Task</label>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Add Task" />
        </div>
        <input type="submit" value="Save Task"/>
    </form>
  )
}

export default NewTask