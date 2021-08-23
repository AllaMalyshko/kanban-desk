import './App.css';
import Header from './header'
import Main from './main'
import Footer from './footer'
import { useMediaQuery } from 'react-responsive'
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const isMobileScreen = useMediaQuery({query: '(max-width: 768px)'})

  return (
    <Router>
        <div className="App">
          <Header isMobileScreen={isMobileScreen} />
          <Main isMobileScreen={isMobileScreen} />         
          <Footer />
        </div>
    </Router>
  );
}

export default App;
