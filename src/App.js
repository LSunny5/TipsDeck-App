import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import dummyStore from './dummy-store';

import NavBar from './components/Navbar/NavBar';
import Footer from './components/Footer/Footer';
import LandingPage from './components/Landing/Landing';
import NotFoundPage from './components/NotFound/NotFoundPage';
import Category from './components/Category/Category';
import CategoryTips from './components/CategoryTips/CategoryTips';

import TipsDeckContext from './TipsDeckContext';

class App extends React.Component {
  static contextType = TipsDeckContext;
  state = {
    categories: [],
    tips: [],
  }

  componentDidMount() {
    setTimeout(() => this.setState(dummyStore), 600);
  }

  //routes for the navigation bar
  renderNavRoutes() {
    return (
      <div>
        <Switch>
          <Route path='/' exact />
          <Route component={NavBar} />
        </Switch>
      </div>
    );
  }

  renderMainRoutes() {
    return (
      <div>
        <Switch>
          <Route path='/' exact component={LandingPage} />


          <Route path='/Category' exact component={Category} />

          {['/Category/:name'].map(path => (
            <Route
              key={path}
              path={path}
              exact
              component={CategoryTips}
            />
          ))}
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }

  renderFooterRoutes() {
    return (
      <div>
        <Switch>
          <Route path='/' exact />
          <Route component={Footer} />
        </Switch>
      </div>
    );
  }

  render() {
    const contextValue = {
      categories: this.state.categories,
      tips: this.state.tips,
      

      
    };

    return (
      <TipsDeckContext.Provider value={contextValue}>
        <main>
          <div className="navBarBox">
            {this.renderNavRoutes()}
          </div>
          <div className="mainContainer">
            {this.renderMainRoutes()}
          </div>
          <div className="footerBox">
            {this.renderFooterRoutes()}
          </div>
        </main>
      </TipsDeckContext.Provider>
    );
  }
}

export default App;