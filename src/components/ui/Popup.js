import React from "react";
import "styles/ui/Popup.scss";

const Popup = props => {
    return (
        <div className="popup">
            <div className="popup box">
                <span className="close-icon" onClick={props.handleClose}>x</span>
                {props.content}
            </div>
        </div>
    );
};

export default Popup;