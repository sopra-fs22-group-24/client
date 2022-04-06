import "styles/ui/NumYellowCard.scss";

export const NumYellowCard = props => (
  <numyellowcard
    {...props}
    style={{width: props.width, ...props.style}}
    className={`numyellowcard ${props.className}`}>
    {props.children}
  </numyellowcard>
);
