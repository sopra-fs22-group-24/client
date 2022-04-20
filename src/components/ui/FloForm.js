import { Button } from "./Button";
const { Callbacks } = require("jquery");
const { useState } = require("react")

const FloForm = props => {
    
    const [value, setValue] = useState(null);

    const callback = () => {
        console.log(props.callback)
        props.callback(value)
    }
    return (
        <div>
        <input type="text" placeholder={props.placeholder} onChange={(input) => setValue(input.target.value)} />
        <Button onClick={() => callback()}>{props.buttonMessage}</Button>
        </div>
    )
}


export default FloForm;