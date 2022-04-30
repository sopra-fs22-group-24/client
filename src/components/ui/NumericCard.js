import "styles/ui/NumericCard.scss";
import React, {Component} from "react";

class NumericCard extends Component {
  render(){

    let color =this.props.color;
    let symbol = this.props.symbol;

    if (color === "YELLOW") {
      return (
        <div className="numeric-card yellow"
             onClick={() => this.props.onClick()}>
          {symbol}
        </div>
      );
    }
    else if (color === "BLUE"){
      return (
            <div className="numeric-card blue"
                 onClick={() => this.props.onClick()}>
              {symbol}
            </div>
      );
    }
    else if (color === "RED"){
      return (
        <div className="numeric-card red"
             onClick={() => this.props.onClick()}>
          {symbol}
        </div>);
    }
    else if (color === "GREEN"){
      return (
        <div className="numeric-card green"
             onClick={() => this.props.onClick()}>
          {symbol}
        </div>);
    }

  }
}

export default NumericCard;


/*
export const NumericCard = props => (
  <numeric-card
    {...props}
    style={{width: props.width, backgroundColor: props.backgroundColor,...props.style}}
    className={numeric-card }>
    {props.children}
  </numeric-card>
);
*/
