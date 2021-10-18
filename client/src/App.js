import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { SocketProvider } from "./contexts/SocketContext";
import Login from "./views/Login";
import ChatRoom from "./views/ChatRoom";
import "./Styling.css";
import UserProvider from "./contexts/UserContext";
import AuthRoute from "./components/AuthRoute";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="container">
      <UserProvider>
        <SocketProvider>
          <Router>
            <NavBar />
            <Switch>
              <AuthRoute path="/" exact>
                <Redirect to="/room" />
              </AuthRoute>
              <AuthRoute path="/login">
                <Login />
              </AuthRoute>
              <AuthRoute path="/room">
                <ChatRoom />
              </AuthRoute>
              <AuthRoute needAuth={false} path="/test">
                <h1>Hi</h1>
              </AuthRoute>
            </Switch>
          </Router>
        </SocketProvider>
      </UserProvider>
    </div>
  );
}

export default App;
