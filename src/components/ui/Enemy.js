import "styles/ui/Enemy.scss";

export const Enemy = props => (
    <enemy
        {...props}
        style={{width: props.width, ...props.style}}
        className={`enemy ${props.className}`}>
        {props.children}
    </enemy>
);