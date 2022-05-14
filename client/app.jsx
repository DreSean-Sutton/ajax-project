import React from 'react';
import FighterList from './pages/fighter-list';
import Navbar from './components/navbar';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'characterList'
    };
  }

  render() {
    return (
      <>
        <header>
          <Navbar view={this.state.currentView} />
        </header>
        <main>
          <FighterList />
        </main>
      </>
    );
  }
}
