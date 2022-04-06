import "styles/ui/SpecialCard.scss";

export const SpecialCard = props => (
  <specialcard
    {...props}
    style={{width: props.width, ...props.style}}
    className={`specialcard ${props.className}`}>
    {props.children}
  </specialcard>
);
