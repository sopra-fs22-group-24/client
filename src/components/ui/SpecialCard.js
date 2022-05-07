import "styles/ui/SpecialCard.scss";

export const SpecialCard = props => (
  <div
    {...props}
    style={{width: props.width, ...props.style}}
    className={`specialcard ${props.className}`}>
    {props.children}
  </div>
);
