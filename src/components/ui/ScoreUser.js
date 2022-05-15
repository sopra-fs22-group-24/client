import 'styles/ui/ScoreUser.scss';

export const ScoreUser = (props) => {
    let username = props.username;
    let score = props.score;

    return(
        <div className = "scoreUser container">
            <div className="scoreUser username">{username}</div>
            <div className="scoreUser score">score: {score}</div>
        </div>
    )
}