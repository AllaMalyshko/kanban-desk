import './App.css';
import Header from './header'
import Main from './main'
import Footer from './footer'
import { useMediaQuery } from 'react-responsive'
import { BrowserRouter as Router } from 'react-router-dom';
import { useState } from 'react';
import { MockData } from './server_response_mock';

function App() {
  const isMobileScreen = useMediaQuery({ query: '(max-width: 768px)' })

  const getInitActiveTaskCounts = () => {
    return getBoardByName('In Progress').tasks.length
  }

  const getInitFinishTaskCounts = () => {
    return getBoardByName('Finished').tasks.length
  }

  const getBoardByName = (name) => {
    return getBoards().find(x => x.title === name)
  }

  const getBoards = () => {
    const storedBoards = localStorage.getItem('boards')
    if (storedBoards) {
      return JSON.parse(storedBoards)
    }
    else {
      return MockData
    }
  }

  const [activeCount, setActiveCount] = useState(() => getInitActiveTaskCounts());
  const [finishedCount, setFinishedCount] = useState(() => getInitFinishTaskCounts());

  return (
    <Router>
      <div className="App">
        <Header isMobileScreen={isMobileScreen} />
        <Main boards={getBoards} activeCountChanged={setActiveCount} finishedCountChanged={setFinishedCount} isMobileScreen={isMobileScreen} />
        <Footer isMobileScreen={isMobileScreen} activeCount={activeCount} finishedCount={finishedCount} />
      </div>
    </Router>
  );
}

export default App;
