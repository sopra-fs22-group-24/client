import "styles/ui/NumBlueCard.scss";

export const NumBlueCard = props => (
  <numbluecard
    {...props}
    style={{width: props.width, ...props.style}}
    className={`numbluecard ${props.className}`}>
    {props.children}
  </numbluecard>
);
