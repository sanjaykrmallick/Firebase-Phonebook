import React, { Component, Fragment } from 'react';
import firebase from './firebase';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	withRouter,
} from 'react-router-dom';
import HeaderComp from './components/HeaderComponent/HeaderComp';
import DisplayList from "./components/DisplayListComp/DisplayList.jsx"
import AddData from "./components/AddDataComp/AddData.jsx"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( <Fragment>
      <Router>
        <header>
          <HeaderComp/>
        </header>
        <main>
          <Switch>
          <Route exact path={["/", "/display"]} component={DisplayList} />
            <Route exact path="/add" component={AddData} />
          </Switch>
        </main>
      </Router>
    </Fragment> );
  }
}
 
export default App;
