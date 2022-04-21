import "styles/ui/LobbyButton.scss";

export const LobbyButton = props => (
  <lobbyButton
    {...props}
    style={{width: props.width, ...props.style}}
    className={`primary-button ${props.className}`}>
    {props.children}
  </lobbyButton>
);
