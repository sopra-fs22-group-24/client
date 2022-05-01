import "styles/ui/NumericCard.scss";
import React from "react";

export const NumericCard = (props) => {

    let color = props.color;
    let symbol = props.symbol;

    switch (symbol){
        case "WILDCARD":
            return(
                <div className="numeric-card black"
                     onClick={() => props.onClick()}>
                    {symbol}
                </div>
            )
        case "EXTREME_HIT":
            return(
                <div className="numeric-card black"
                     onClick={() => props.onClick()}>
                    EXTREME
                    HIT
                </div>
            )
        case "HIT_2":
            return(
                <div className={`numeric-card ${color}`}
                     onClick={() => props.onClick()}>
                    HIT 2
                </div>
            )
        case "DISCARD_ALL":
            return(
                <div className= {`numeric-card ${color}`}
                     onClick={() => props.onClick()}>
                    DISCARD
                    ALL
                </div>
            )

        default:
            return(
                <div className= {`numeric-card ${color}`}
                     onClick={() => props.onClick()}>
                    {symbol}
                </div>
            );

    }


  }
