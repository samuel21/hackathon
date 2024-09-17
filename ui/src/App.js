import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import Questionnaire from './components/questionnarie';
import React, { useRef } from 'react';// Import the Navbar component
import MyCalendar from './components/calendar';
import CheckInTodoList from './components/checkin';

function App() {
  return (
    <div className="App">
      <Navbar /> 
      <div className='Body'>
        <div className='About'>
        <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to Stark Tech. Yes we work with Spiderman
          </p>
        </div>
        <div className='Questionnaire'>
          <section id="questionnaire">
            <Questionnaire />
          </section>
        </div>
        <div className='Calendar'>
          <section id="calendar">
            <MyCalendar/>
          </section>
        </div>
        <div className='Contact'>
          <section id="contact">
          </section>
        </div>
      </div>
      <MyCalendar/>
      <CheckInTodoList/>
    </div>
  );
}

export default App;
