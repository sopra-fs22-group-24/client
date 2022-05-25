import React from "react";
import "styles/ui/Popup.scss";

const Popup = props => {
    return (
        <div className="popup">
            <div className="popup bin">
                {props.content}
            </div>
        </div>
    );
};

export default Popup;