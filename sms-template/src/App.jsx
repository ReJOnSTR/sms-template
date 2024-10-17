import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar";
import TemplateList from "./components/templateList";
import TemplateForm from "./components/templateForm";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Switch>
            <Route exact path="/" component={TemplateList} />
            <Route path="/add" component={TemplateForm} />
            <Route path="/edit/:id" component={TemplateForm} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
