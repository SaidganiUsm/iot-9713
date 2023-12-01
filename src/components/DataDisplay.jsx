// src/components/DataDisplay.js
import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import TextToSpeech from './TextToSpeech';
import './DataDisplay.css';
import Circle from 'react-circle';

const DataDisplay = () => {
  const [temp, setTemp] = useState(null);
  const [humid, setHumid] = useState(null);
  const [ledStatus, setLedStatus] = useState(null);
  const [soilMoisture, setSoilMoisture] = useState(null);
  const [pumpStatus, setPumpStatus] = useState(null);
  const [fanStatus, setFanStatus] = useState(null);

  useEffect(() => {
    // Set up Firebase listeners for real-time updates
    const tempRef = firebase.database().ref('temp');
    const humidRef = firebase.database().ref('humid');
    const ledRef = firebase.database().ref('LED');
    const soilMoisture = firebase.database().ref('soilMoisture');
    const pumpRef = firebase.database().ref('pump');
    const fanRef = firebase.database().ref('fan');

    const handleTempChange = (snapshot) => {
      setTemp(snapshot.val());
    };

    const handleHumidChange = (snapshot) => {
      setHumid(snapshot.val());
    };

    const handleLedStatusChange = (snapshot) => {
      setLedStatus(snapshot.val());
    };

    const handleSoilMoistureChange = (snapshot) => {
      setSoilMoisture(snapshot.val());
    }

    const handlePumpStatusChange = (snapshot) => {
      setPumpStatus(snapshot.val());
    };

    const handleFanStatusChange = (snapshot) => {
      setFanStatus(snapshot.val());
    };

    tempRef.on('value', handleTempChange);
    humidRef.on('value', handleHumidChange);
    ledRef.on('value', handleLedStatusChange);
    soilMoisture.on('value', handleSoilMoistureChange);
    pumpRef.on('value', handlePumpStatusChange);
    fanRef.on('value', handleFanStatusChange);

    return () => {
      tempRef.off('value', handleTempChange);
      humidRef.off('value', handleHumidChange);
      ledRef.off('value', handleLedStatusChange);
      soilMoisture.off('value', handleSoilMoistureChange);
      pumpRef.off('value', handlePumpStatusChange);
      fanRef.off('value', handleFanStatusChange);
    };
  }, []);

  const toggleLed = () => {
    const newLedStatus = ledStatus === 0 ? 1 : 0;
    firebase.database().ref('LED').set(newLedStatus);
  };

  const togglePump = () => {
    const newPumpStatus = pumpStatus === 0 ? 1 : 0;
    firebase.database().ref('pump').set(newPumpStatus);
  };

  const toggleFan = () => {
    const newFanStatus = fanStatus === 0 ? 1 : 0;
    firebase.database().ref('fan').set(newFanStatus);
  };

  const convertToPercentage = (rawValue, max) => {
    const percentage = (rawValue / max) * 100;
    return Math.min(percentage, 100);
  };

  return (
    <div className="main">
      <div className="header">
        <h1>00009713</h1>
      </div>
      <h2>Data Display</h2>
      <div className="data-display">
        {/* First Line - Progress Bars */}
        <div className="progress-bars">
          {temp !== null && (
            <div className="data-item">
              <p>Temperature: {temp} °C</p>
              {/* Use Circle component instead of CircularProgressbar */}
              <Circle
                animate={true}
                animationDuration="3s"
                progress={temp}
                progressColor={
                  temp < 20 ? 'blue' : 
                  temp >= 20 && temp <= 30 ? 'green' : 
                  temp > 30 ? 'orange' : 'red'
                }
                bgColor="#d6d6d6"
                textColor="#fff"
                size={200}
                lineCap="butt"
                lineWidth={50}
                roundedStroke={true}
                showPercentageSymbol={true}
              />
              {temp !== null && <TextToSpeech text={`The temperature is ${temp} degrees Celsius`} />}
            </div>
          )}
          {humid !== null && (
            <div className="data-item">
              <p>Humidity: {humid} %</p>
              <Circle
                animate={true}
                animationDuration="1s"
                progress={humid}
                progressColor={"green"}
                bgColor="#d6d6d6"
                textColor="#fff"
                size={200}
                lineWidth={50}
                roundedStroke={true}
                showPercentageSymbol={true}
              />
              {humid !== null && <TextToSpeech text={`The humidity is ${humid} percent`} />}
            </div>
          )}
          {soilMoisture !== null && (
            <div className="data-item">
              <p>Soil Moisture: {soilMoisture}</p>
              <Circle
                animate={true}
                animationDuration="1s"
                progress={soilMoisture}
                progressColor={"green"}
                bgColor="#d6d6d6"
                textColor="#fff"
                size={200}
                lineWidth={50}
                roundedStroke={true}
                showPercentageSymbol={true}
              />
              {soilMoisture !== null && <TextToSpeech text={`The soil moisture is ${soilMoisture}`} />}
            </div>
          )}
        </div>

        {/* Second Line - Switches */}
        <div className="switches">
          {ledStatus !== null && (
            <div className="data-item">
              <p>LED Status</p>
              <label className="toggle-switch">
                <input type="checkbox" checked={ledStatus === 1} onChange={toggleLed} />
                <span className="slider"></span>
              </label>
              {ledStatus !== null && <TextToSpeech text={`The LED is ${ledStatus === 1 ? 'On' : 'Off'}`} />}
            </div>
          )}
          {fanStatus !== null && (
            <div className="data-item">
              <p>Fan Status</p>
              <label className="toggle-switch">
                <input type="checkbox" checked={fanStatus === 1} onChange={toggleFan} />
                <span className="slider"></span>
              </label>
              {fanStatus !== null && <TextToSpeech text={`The fan is ${fanStatus === 1 ? 'On' : 'Off'}`} />}
            </div>
          )}
          {pumpStatus !== null && (
            <div className="data-item">
              <p>Pump Status</p>
              <label className="toggle-switch">
                <input type="checkbox" checked={pumpStatus === 1} onChange={togglePump} />
                <span className="slider"></span>
              </label>
              {pumpStatus !== null && <TextToSpeech text={`The pump is ${pumpStatus === 1 ? 'On' : 'Off'}`} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataDisplay;
