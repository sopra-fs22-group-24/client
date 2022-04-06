import "styles/ui/NumGreenCard.scss";

export const NumGreenCard = props => (
  <numgreencard
    {...props}
    style={{width: props.width, ...props.style}}
    className={`numgreencard ${props.className}`}>
    {props.children}
  </numgreencard>
);
