import PropTypes from 'prop-types'

const Button = ({text, color, onClick}) => {
  return (
    <button onClick={onClick} style={{backgroundColor: color}}>
        {text}
    </button>
  )
}

Button.defaultProps = {
    text: "Text",
    color: 'blue'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button