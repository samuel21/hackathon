import logo from './logo.svg';
// import D from './istockphoto-1125625274-612x612.jpg';
import './App.css';
import Navbar from './components/navbar'; // Import the Navbar component
import MyCalendar from './components/calendar';

function App() {
  return (
    <div className="App">
      <header>
        <Navbar /> {/* Add the Navbar component here */}
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Stark Tech. Yes we work with Spiderman
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <MyCalendar/>
    </div>
  );
}

export default App;
