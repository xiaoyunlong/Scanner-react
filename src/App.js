import React from 'react';
import './App.css';
import Barcode from "./BarcodeScanner";
import QRcode from "./QRcodeScanner";

function App() {
  return (
    <div className="App">
       <Barcode / >
       <QRcode / >
    </div>
  );
}

export default App;
