import "styles/ui/Box.scss";

export const Box = props => (
  <box
    {...props}
    style={{width: props.width, ...props.style}}
    className={`box ${props.className}`}>
    {props.children}
  </box>
);
