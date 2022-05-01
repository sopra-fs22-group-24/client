import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {GameGuard} from "components/routing/routeProtectors/GameGuard";
import GameRouter from "components/routing/routers/GameRouter";
import {LoginGuard} from "components/routing/routeProtectors/LoginGuard";
import Login from "components/views/Login";
import WebSocketTest from "components/views/webSocketTest"
import {RegisterGuard} from "components/routing/routeProtectors/RegisterGuard";
import Register from "components/views/Register";
import {DashboardGuard} from "components/routing/routeProtectors/DashboardGuard";
import Dashboard from "components/views/Dashboard";
import Profile from "components/views/Profile";
import Waitingroom from "../../views/Waitingroom";
import Ranking from "../../views/Ranking";
import Rules from "../../views/Rules";
import Lobby from "../../views/Lobby";
import UserProfile from "../../views/UserProfile";
import Game from "../../views/Game";
import WebSocketTestWithStates from "components/views/webSocketTest withStates";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /register renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/game/:id">
                    <Game/>
                </Route>
                <Route exact path="/game">
                    <Game/>
                </Route>
                <Route exact path="/login">
                    <LoginGuard>
                        <Login/>
                    </LoginGuard>
                </Route>
                <Route exact path="/register">
                    <RegisterGuard>
                        <Register/>
                    </RegisterGuard>
                </Route>
                <Route exact path="/dashboard">
                    <DashboardGuard>
                        <Dashboard/>
                    </DashboardGuard>
                </Route>
                <Route exact path="/">
                    <Redirect to="/login"/>
                </Route>
                <Route exact path="/test">
                    <WebSocketTest/>
                </Route>
                <Route exact path="/test-with-states">
                    <WebSocketTestWithStates />
                </Route>
                <Route exact path={"/dashboard"}>
                    <Dashboard/>
                </Route>
                <Route exact path={"/user"}>
                    <UserProfile/>
                </Route>
                <Route path="/profile/:id">
                    <Profile/>
                </Route>
                <Route exact path={"/waitingroom/:id"}>
                    <Waitingroom/>
                </Route>
                <Route exact path={"/ranking"}>
                    <Ranking/>
                </Route>
                <Route exact path={"/rules"}>
                    <Rules/>
                </Route>
                <Route exact path={"/lobby"}>
                    <Lobby/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

/*
* Don't forget to export your component!
 */
export default AppRouter;
