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
import Tip from './components/Tip/Tip';
import EditTip from './components/EditTip/EditTip';
import Random from './components/Random/Random';
import AddTip from './components/AddTip/AddTip';
import SearchResults from './components/SearchResults/SearchResults';

import TipsDeckContext from './TipsDeckContext';

class App extends React.Component {
  static contextType = TipsDeckContext;
  state = {
    categories: [],
    tips: [],
  };





  //load the dummy file values
  componentDidMount() {
    setTimeout(() => this.setState(dummyStore), 600);
  };

  //delete the tip
  deleteTip = tipId => {
    const tipsArray = this.state.tips.filter(tip => tip.id !== tipId);
    this.setState({ tips: tipsArray })
  };

  //add a tip
  addTip = tip => {
    //this.setState({ tips: [...this.state.tips, tip] });
    console.log(tip);
    console.log('here is the tip from function ' )

    console.log(this.state.tips);
    console.log('here tips ');

    this.setState({tips: (this.state.tips.push.apply(this.state.tips,tip))});
    
    // this.state.tips.concat(tip);

    // this.setState({tips: [...newArray]});

    //this.setState({ tips: [...this.state.tips, [tip]] });
  
    console.log(this.state.tips);
    console.log('tips from app')
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
          
          {/* Routes for Search Results */}
          <Route path='/SearchResults' component={SearchResults} />

          {/* Route for Category List page */}
          <Route path='/Category' exact component={Category} />

          {/* Routes for Adding a tip */}
          <Route path='/addTip' exact component={AddTip} />

          {/* Route Random Page */}
          <Route path='/random' exact component={Random} />

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

          <Route component={NotFoundPage} />
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

export default App;