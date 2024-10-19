import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Navbar from "./components/navbar";
import TemplateList from "./components/templateList";
import TemplateForm from "./components/templateForm";
import Login from "./components/Login";

function PrivateRoute({ component: Component, currentUser, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar currentUser={currentUser} />
        <main className="container mx-auto px-4 py-8">
          <Switch>
            <Route
              path="/login"
              render={(props) =>
                currentUser ? <Redirect to="/" /> : <Login {...props} />
              }
            />
            <PrivateRoute
              exact
              path="/"
              component={TemplateList}
              currentUser={currentUser}
            />
            <PrivateRoute
              path="/add"
              component={TemplateForm}
              currentUser={currentUser}
            />
            <PrivateRoute
              path="/edit/:id"
              component={TemplateForm}
              currentUser={currentUser}
            />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
