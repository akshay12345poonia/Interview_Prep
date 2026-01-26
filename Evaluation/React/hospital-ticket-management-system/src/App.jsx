import { useState } from 'react'
import './App.css'
import React, {useState, useEffect} from "react"
import Header from "./components/Header";
import Controls from "./components/Controls"
import TicketCard from './components/TicketCard';
import Summary from "./components/Summary";
import { initialPatients } from './data/patients';
import { LS_KEYS } from './utils/storage';

const SESSION_DURATION = 15 * 60;

function App() {
const [currentIndex, setCurrentIndex] = useState(() => {
  return parseInt(localStorage.getItem(LS_KEYS.CURRENT_PATIENT)) || 0;


});

const [timer, setTimer] = useState(() => {
  const savedTime = localStorage.getItem(LS_KEYS.TIMER);
  return savedTime ? parseInt(savedTime) : SESSION_DURATION;
});

const [patientStatus, setPatientStatus] = useState(() => {
  return JSON.parse(localStorage.getItem(LS_KEYS.PATIENT_STATUS_MAP)) || {};
});

const [isSessionActive, setIsSessionActive] = useState(true);

const treatedCount = Object.values(patientStatus).filter(s => s === "treated").length;
const notTreatedCount = Object.values(patientStatus).filter(s => s === 'not_treated').length;
const processedCount = treatedCount + notTreatedCount;
const pendingCount = initialPatients.length - processedCount;

useEffect(() => {
  if(!isSessionActive || timer <= 0){
    if(timer <= 0) setIsSessionActive(false);
    return;
  }
  const interval = setInterval(() => {
    setTimer((prev) => {
      const newTime = prev - 1;
      localStorage.setItem(LS_KEYS.TIMER, newTime);
      return newTime;
    })
  }, 1000);
  return () => clearInterval(interval);
}, [timer, isSessionActive])

  useEffect(() => {
    if(timer === 0 || processedCount === initialPatients.length){
      setIsSessionActive(false);
    }
  }, [timer, processedCount]);

  const handleNext = () => {
    if(currentIndex < initialPatients.length){
      setCurrentIndex(prev => prev +1)
    }
  };

  const handlePrev = () => {
    if(currentIndex > 0){
      setCurrentIndex(prev => prev - 1)
    }
  };

  const handleStatusUpdate = (status) => {
    const currentPatient = initialPatients[currentIndex];
    setPatientStatus(prev => ({
      ...prev,
      [currentPatient.id] : status
    }));
  }

  const resetSystem = () => {
localStorage.clear();
    setTimer(SESSION_DURATION);
    setCurrentIndex(0);
    setPatientStatus({});
    setIsSessionActive(true);
    window.location.reload();
  };



  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-800 flex flex-col items-center">
      
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Hospital OPD Ticket Manager
        </h1>

        <Header 
          timer={timer} 
          treated={treatedCount} 
          notTreated={notTreatedCount} 
          pending={pendingCount} 
        />

        <div className="mb-4 text-center">
          <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            Patient {currentIndex + 1} of {initialPatients.length}
          </span>
        </div>

        <TicketCard 
          patient={initialPatients[currentIndex]} 
          status={patientStatus[initialPatients[currentIndex].id]} 
        />

        <Controls 
          onNext={handleNext}
          onPrev={handlePrev}
          onStatusUpdate={handleStatusUpdate}
          isFirst={currentIndex === 0}
          isLast={currentIndex === initialPatients.length - 1}
          currentStatus={patientStatus[initialPatients[currentIndex].id]}
          isSessionActive={isSessionActive}
        />
      </div>

      {!isSessionActive && (
        <Summary 
          total={initialPatients.length}
          treated={treatedCount}
          notTreated={notTreatedCount}
          pending={pendingCount}
          onReset={resetSystem}
        />
      )}
    </div>
  );
}

export default App
