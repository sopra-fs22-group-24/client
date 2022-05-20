import React from "react";
import "styles/ui/SelectionPopup.scss";

const SelectionPopup = props => {
    return (
        <div className="selection-popup">
            <div className="selection-popup bin">
                <span className="close-icon" onClick={props.handleClose}>x</span>
                {props.content}
            </div>
        </div>
    );
};

export default SelectionPopup;