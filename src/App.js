import "./App.css";
import Header from "./components/Header";
import { Switch, Route } from "react-router-dom";
import Table from "./components/Table";
import PieChart from "./components/PieChart";
import IncorrectRoute from "./components/IncorrectRoute";
function App() {
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <Header />
      <Switch>
        <Route exact path="/" component={Table} />
        <Route exact path="/page2" component={PieChart} />
        <Route path="*" component={IncorrectRoute} />
      </Switch>
    </div>
  );
}

export default App;
