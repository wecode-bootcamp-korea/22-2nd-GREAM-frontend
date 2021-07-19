import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Detail from './pages/Detail/Detail';
import Shop from './pages/Shop/Shop';
import MyPage from './pages/MyPage/MyPage';
import Bid from './pages/Bid/Bid';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Shop} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/detail" component={Detail} />
          <Route exact path="/mypage" component={MyPage} />
          <Route exact path="/bid" component={Bid} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default Routes;
