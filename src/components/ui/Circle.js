import "styles/ui/Circle.scss";

export const Circle = props => (
    <div
        {...props}
        style={{width: props.width, ...props.style}}
        className={`circle ${props.className}`}>
        {props.children}
    </div>
);