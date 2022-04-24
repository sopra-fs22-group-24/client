import "styles/ui/NumericCard.scss";

export const NumericCard = props => (
  <numeric-card
    {...props}
    style={{width: props.width, backgroundColor: props.backgroundColor,...props.style}}
    className={`numeric-card ${props.className}`}>
    {props.children}
  </numeric-card>
);
