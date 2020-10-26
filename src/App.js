import "./App.css";
import {BrowserRouter as  Router, Route, Switch } from "react-router-dom";
import SavedForm from "./components/SavedForm";
import Form from "./components/Form";
function App() {
  return (
    <div className="App">
      {/* Usually Routes are kept in a different folder */}
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={Form} />
            <Route path="/contactInformation" component={SavedForm} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
