import React, { useState } from "react";
import "../utils/Task.css";
import HandsOnTaskList from "./HandsOnTaskList";

const SubTaskToolTip = ({ description, handsOnTask }) => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);

    const toggleTooltip = () => {
        setTooltipVisible((prev) => !prev);
        console.log(isTooltipVisible);
    };

    return (
        <div>
            <button
                onClick={toggleTooltip}
                className="tooltip-button"
                style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "5px",
                }}
                aria-label="Toggle Tooltip"
            >
                <span className="material-symbols-outlined lightbulb-icon">lightbulb_2</span>
            </button>

            {isTooltipVisible && (
                <div className="tooltip-overlay">
                    <div className="tooltip-content">
                        <button
                            className="close-tooltip"
                            onClick={toggleTooltip}
                            aria-label="Close Tooltip"
                        >
                            ✕
                        </button>
                        <h3>Instructor Notes</h3>
                        <div className="tooltip-body">
                            <p>
                                <strong>Description:</strong> {description}
                            </p>
                                <strong>Hands-On Task:</strong>
                                <HandsOnTaskList handsOnTask={handsOnTask} />
                            
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubTaskToolTip;


