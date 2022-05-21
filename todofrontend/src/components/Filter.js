const Filter = ({onChange}) => {
  return (
    <div className="filter">
        <span>Hide complete tasks?</span>
        <input type="checkbox" onClick={(event) => onChange(event.target.checked)}/>
    </div>
  )
}

export default Filter