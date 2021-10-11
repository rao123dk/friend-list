import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = ({ label,ToggleSwitchAction }) => {
  // const [checked, setChecked]= React.useState(false);

  // const onToggleSwitchAction =()=>{
  //   setChecked(!checked)
  //   console.log(";;;;---",checked)
  // }
  return (
    <div className="container-btn">
      {label}{" "}
      <div className="toggle-switch">
        <input type="checkbox" className="checkbox"
               name={label} id={label} onClick={ToggleSwitchAction}/>
        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;