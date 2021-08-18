import './App.css';
import Header from './header'
import Main from './main'
import Footer from './footer'
import Finished from './finished';
import { useMediaQuery } from 'react-responsive'
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const isMobileScreen = useMediaQuery({query: '(max-width: 768px)'})

  return (
    <div className="App">
      <Header isMobileScreen={isMobileScreen} />
      <Main />
      <Footer />
      {/* <Router>
        <Switch>
          <Route path='/' component={App}></Route>
          <Route path='/finished' component={Finished}></Route>
        </Switch>
      </Router> */}
    </div>
  );
}

export default App;
