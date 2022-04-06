import "styles/ui/Launcher.scss";

export const Launcher = props => (
  <launcher
    {...props}
    style={{width: props.width, ...props.style}}
    className={`launcher ${props.className}`}>
    {props.children}
  </launcher>
);
