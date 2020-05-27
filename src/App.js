import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import NavBar from './components/Navbar/NavBar';
import Footer from './components/Footer/Footer';
import LandingPage from './components/Landing/Landing';
import NotFoundPage from './components/NotFound/NotFoundPage';
import Category from './components/Category/Category';
import CategoryTips from './components/CategoryTips/CategoryTips';
import Tip from './components/Tip/Tip';
import EditTip from './components/EditTip/EditTip';
import Random from './components/Random/Random';
import AddTip from './components/AddTip/AddTip';

import TipsDeckContext from './TipsDeckContext';
import config from './config';
import PropTypes from 'prop-types';

class App extends React.Component {
  static contextType = TipsDeckContext;
  state = {
    categories: [],
    tips: [],
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.APIEndpoint}/Category`),
      fetch(`${config.APIEndpoint}/Tips`),
    ])
      .then(([catResponse, tipsResponse]) => {
        if (!catResponse.ok)
          return catResponse.json().then(event => Promise.reject(event));
        if (!tipsResponse.ok)
          return tipsResponse.json().then(event => Promise.reject(event));
        return Promise.all([catResponse.json(), tipsResponse.json()]);
      })
      .then(([categories, tips]) => {
        this.setState({ categories, tips });
      })
      .catch(error => {
        console.error({ error });
        alert('Could not retrieve categories and tips - ' + error);
      });
  }

  //delete the tip
  deleteTip = tipId => {
    const tipsArray = this.state.tips.filter(tip => tip.id !== tipId);
    //this.setState({ tips: tipsArray })
    this.setState({ tips: tipsArray })
  };

  //add a tip
  addTip = tip => {
    this.setState({ tips: [...this.state.tips, tip] });
  };

  //edit a tip
  editTip = editedTip => {
    const newArray = this.state.tips.map(tip =>
      tip.id !== editedTip.id ? tip : editedTip);
    this.setState({ tips: newArray });
  }

  //routes for the navigation bar
  renderNavRoutes() {
    return (
      <header>
        <Switch>
          <Route path='/' exact />
          <Route component={NavBar} />
        </Switch>
      </header>
    );
  }

  //routes for the content body
  renderMainRoutes() {
    return (
      <div>
        <Switch>
          <Route path='/' exact component={LandingPage} />

          {/* Route for Category List page */}
          <Route path='/Category' exact component={Category} />

          {/* Routes for Adding a tip */}
          <Route path='/addTip' exact component={AddTip} />

          {/* Route Random Page */}
          <Route path='/Random' exact component={Random} />


          {/* Routes for Category Tips list */}
          {['/Category/:name'].map(path => (
            <Route
              key={path}
              path={path}
              exact
              component={CategoryTips}
            />
          ))}

          {/* Routes for Each tip */}
          {['/Category/:name/:id'].map(path => (
            <Route
              key={path}
              path={path}
              exact
              component={Tip}
            />
          ))}

          {/* Routes for Editing Each tip */}
          <Route path='/Category/:name/:id/editTip' exact component={EditTip} />

          <Route path='*' component={NotFoundPage} />
        </Switch>
      </div>
    );
  }

  //routes for the footer
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
      deleteTip: this.deleteTip,
      addTip: this.addTip,
      editTip: this.editTip,
    };

    return (
      <TipsDeckContext.Provider value={contextValue}>
        <main>
          <div className="headerBox">
            {this.renderNavRoutes()}
          </div>
          
          <div className="content">
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

App.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ),
  tips: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      category_id: PropTypes.number.isRequired,
      tipname: PropTypes.string.isRequired,
      tipdescription: PropTypes.string.isRequired,
      directions: PropTypes.string.isRequired,
      sourcetitle: PropTypes.string,
      sourceurl: PropTypes.string,
      rating: PropTypes.number.isRequired,
      numraters: PropTypes.number.isRequired,
    })
  ),
};

export default App;