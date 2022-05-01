import "styles/ui/NumericCard.scss";
import React from "react";

export const NumericCard = (props) => {

    let color = props.color;
    let symbol = props.symbol;

    if ( symbol == "WILDCARD" ||symbol == "EXTREME_HIT" ){
        return(
        <div className="numeric-card black"
             onClick={() => props.onClick()}>
            {symbol}
        </div>
        )
    }
    if (color == "YELLOW") {
      return (
        <div className="numeric-card yellow"
             onClick={() => props.onClick()}>
          {symbol}
        </div>
      );
    }
    else if (color == "BLUE"){
      return (
            <div className="numeric-card blue"
                 onClick={() => props.onClick()}>
              {symbol}
            </div>
      );
    }
    else if (color == "RED"){
      return (
        <div className="numeric-card red"
             onClick={() => props.onClick()}>
          {symbol}
        </div>);
    }
    else if (color == "GREEN"){
      return (
        <div className="numeric-card green"
             onClick={() => props.onClick()}>
          {symbol}
        </div>);
    }

  }
