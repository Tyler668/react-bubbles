import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from './components/BubblePage';
import './styles.scss';

function App() {
  const [colorList, setColorList] = useState([]);
  return (
    <Router>
      <div className="App">


        <Switch>
        <Route exact path="/login" component={Login} />
          <Route exact path='/protected' component={BubblePage} />
          {/* <Route path = '/create' component = {}/> */}
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
