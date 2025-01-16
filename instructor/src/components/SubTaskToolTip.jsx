import React, { useState } from "react";
import '../utils/Task.css'

const SubTaskToolTip = ({ description, handsOnTask }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const toggleTooltip = () => {
    setTooltipVisible((prev) => !prev);
    console.log(isTooltipVisible)
  };

  

  return (
    <div className="tooltip">
      <button
        onClick={toggleTooltip}
        className="tooltip-button"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "5px",
        }}
      >
        <span className="material-symbols-outlined lightbulb-icon">lightbulb_2</span>
      </button>
      <div className={`tooltiptext ${isTooltipVisible ? "show" : ""}`}>
        <strong>Description:</strong> {description}
        <br />
        <strong>Hands-On Task:</strong> {handsOnTask}
      </div>
    </div>
  );
};

export default SubTaskToolTip;
