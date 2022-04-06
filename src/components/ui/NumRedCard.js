import "styles/ui/NumRedCard.scss";

export const NumRedCard = props => (
  <numredcard
    {...props}
    style={{width: props.width, ...props.style}}
    className={`numredcard ${props.className}`}>
    {props.children}
  </numredcard>
);
