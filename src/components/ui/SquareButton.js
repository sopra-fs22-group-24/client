import "styles/ui/SquareButton.scss";

export const Button = props => (
    <button
        {...props}
        style={{width: props.width, ...props.style}}
        className={`button ${props.className}`}>
        {props.children}
    </button>
);
