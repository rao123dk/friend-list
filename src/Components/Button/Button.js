

const Button = (props) => {
    const { type, value, className, onClick, icon:Icon, ...restprops} = props
    return (
            <button {...restprops} type={type} onClick={onClick} className={`btn ${className}`}>
               {props.children ? props.children : value}
               {/* <span>
                   {(Icon)}
               </span> */}
            </button>
    )
}

export default Button;