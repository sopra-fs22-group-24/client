import "styles/ui/NumericCard.scss";

export const NumericCard = props => (
  <numericcard
    {...props}
    style={{width: props.width, ...props.style}}
    className={`numericcard ${props.className}`}>
    {props.children}
  </numericcard>
);
