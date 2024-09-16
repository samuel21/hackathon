import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import Questionnaire from './components/questionnarie';
import React, { useRef } from 'react';
import Navbar from './components/navbar'; // Import the Navbar component
import MyCalendar from './components/calendar';

function App() {
  const questionnaireRef = useRef(null);

    const scrollToQuestionnaire = () => {
        if (questionnaireRef.current) {
            questionnaireRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

  return (
    <div className="App">
      <header className='App-header'>
        <Navbar scrollToQuestionnaire={scrollToQuestionnaire} /> 
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Stark Tech. Yes we work with Spiderman
        </p>
      </header>
      <div className='About'></div>
      <div className='Questionnaire'>
        <section ref={questionnaireRef} id="questionnaire">
                <Questionnaire />
        </section>
      </div>
      <MyCalendar/>
    </div>
  );
}

export default App;
