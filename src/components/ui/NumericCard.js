import "styles/ui/NumericCard.scss";
import React from "react";
import { AiOutlineStop } from "react-icons/ai";
import {BsArrowLeftRight} from "react-icons/bs";
import{GiCardDiscard} from "react-icons/gi";

export const NumericCard = (props) => {

    let color = props.color;
    let symbol = props.symbol;

    switch (symbol){
        case "WILDCARD":
            return(
                <div className="card WILDCARD BLACK"
                     onClick={() => props.onClick()}>
                    <span className="inner">
                    <span className="mark">WILD</span>
                    </span>
                </div>
            )
        case "EXTREME_HIT":
            return(
                <div className="card EXTREME_HIT BLACK"
                     onClick={() => props.onClick()}>
                    <span className="inner">
                    <span className="mark">Xtrem</span>
                    </span>
                </div>
            )
        case "HIT_2":
            return(
                <div className={`card HIT_2 ${color}`}
                     onClick={() => props.onClick()}>
                    <span className="inner">
                    <span className="mark">2x</span>
                    </span>
                </div>
            )
        case "DISCARD_ALL":
            return(
                <div className= {`card DISCARD_ALL ${color}`}
                     onClick={() => props.onClick()}>
                    <span className="inner">
                    <span className="mark"><GiCardDiscard/></span>
                    </span>
                </div>
            )
        case "SKIP":
            return(
                <div className= {`card SKIP ${color}`}
                     onClick={() => props.onClick()}>
                    <span className="inner">
                    <span className="mark" ><AiOutlineStop/></span>
                    </span>
                </div>
            )
        case "REVERSE":
            return(
                <div className= {`card REVERSE ${color}`}
                     onClick={() => props.onClick()}>
                    <span className="inner">
                    <span className="mark"><BsArrowLeftRight/></span>
                    </span>
                </div>
            )
        case "ONE":
            return (
                <div className= {`card num-1 ${color}`}
                     onClick={() => props.onClick()}>
                    <span className="inner">
                    <span className="mark">1</span>
                    </span>
                </div>
            )
        case "TWO":
            return (
                <div className= {`card num-2 ${color}`}
                     onClick={() => props.onClick()}>
                    <span className="inner">
                    <span className="mark">2</span>
                    </span>
                </div>
            )
        case "THREE":
            return (
                <div className= {`card num-3 ${color}`}
                     onClick={() => props.onClick()}>
                    <span className="inner">
                    <span className="mark">3</span>
                    </span>
                </div>
            )
        case "FOUR":
            return (
                <div className= {`card num-4 ${color}`}
                     onClick={() => props.onClick()}>
                    <span className="inner">
                    <span className="mark">4</span>
                    </span>
                </div>
            )
        case "FIVE":
            return (
                <div className= {`card num-5 ${color}`}
                     onClick={() => props.onClick()}>
                    <span className="inner">
                    <span className="mark">5</span>
                    </span>
                </div>
            )
        case "SIX":
            return (
                <div className= {`card num-6 ${color}`}
                     onClick={() => props.onClick()}>
                    <span className="inner">
                    <span className="mark">6</span>
                    </span>
                </div>
            )
        case "SEVEN":
            return (
                <div className= {`card num-7 ${color}`}
                     onClick={() => props.onClick()}>
                    <span className="inner">
                    <span className="mark">7</span>
                    </span>
                </div>
            )
        case "EIGHT":
            return (
                <div className= {`card num-8 ${color}`}
                     onClick={() => props.onClick()}>
                    <span className="inner">
                    <span className="mark">8</span>
                    </span>
                </div>
            )
        case "NINE":
            return (
                <div className= {`card num-9 ${color}`}
                     onClick={() => props.onClick()}>
                    <span className="inner">
                    <span className="mark">9</span>
                    </span>
                </div>
            )
        case "TEN":
            return (
                <div className= {`card num-10 ${color}`}
                     onClick={() => props.onClick()}>
                    <span className="inner">
                    <span className="mark">10</span>
                    </span>
                </div>
            )
        default:
            return(
                <div className= {`card ${color}`}
                     onClick={() => props.onClick()}>
                    {symbol}
                </div>
            );
    }
  }
