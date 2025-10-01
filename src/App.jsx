import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MaterialSelector from './components/inspection/MaterialSelector';
import CameraCapture from './components/inspection/CameraCapture';
import { ClipboardCheck, Settings, Info } from 'lucide-react';

function HomePage() {
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const handleMaterialSelect = (materialData) => {
    setSelectedMaterial(materialData);
    if (materialData.type && currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handlePhotoCapture = (photoData) => {
    setCapturedPhoto(photoData);
    setCurrentStep(3);
  };

  const handleRetakePhoto = () => {
    setCapturedPhoto(null);
    setCurrentStep(2);
  };

  const resetInspection = () => {
    setSelectedMaterial(null);
    setCapturedPhoto(null);
    setCurrentStep(1);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <ClipboardCheck className="icon xl" />
            <div>
              <h1>QC Inspector</h1>
              <p>Control Calitate Materiale Feroase</p>
            </div>
          </div>
          
          <div className="step-indicator">
            <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">Material</span>
            </div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Foto</span>
            </div>
            <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-label">Raport</span>
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {currentStep === 1 && (
            <div className="step-content">
              <MaterialSelector
                selectedMaterial={selectedMaterial}
                onMaterialSelect={handleMaterialSelect}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="step-content">
              <CameraCapture
                onPhotoCapture={handlePhotoCapture}
                onRetake={handleRetakePhoto}
                currentPhoto={capturedPhoto}
              />
              
              <div className="navigation-buttons">
                <button 
                  onClick={() => setCurrentStep(1)}
                  className="btn btn-outline"
                >
                  ← Înapoi la Material
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="step-content">
              <div className="inspection-summary">
                <h2>Sumar Inspecție</h2>
                
                {selectedMaterial && (
                  <div className="summary-section">
                    <h3>Material Selectat</h3>
                    <div className="summary-info">
                      <p><strong>Tip:</strong> {selectedMaterial.type}</p>
                      {selectedMaterial.grade && <p><strong>Grad:</strong> {selectedMaterial.grade}</p>}
                      {selectedMaterial.dimension && <p><strong>Dimensiune:</strong> {selectedMaterial.dimension}</p>}
                    </div>
                  </div>
                )}
                
                {capturedPhoto && (
                  <div className="summary-section">
                    <h3>Fotografie</h3>
                    <img 
                      src={capturedPhoto.dataUrl} 
                      alt="Material inspectat" 
                      className="summary-photo"
                    />
                    <p className="photo-details">
                      Capturată: {new Date(capturedPhoto.timestamp).toLocaleString('ro-RO')}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="navigation-buttons">
                <button 
                  onClick={() => setCurrentStep(2)}
                  className="btn btn-outline"
                >
                  ← Înapoi la Foto
                </button>
                <button 
                  onClick={resetInspection}
                  className="btn btn-primary"
                >
                  🔄 Inspecție Nouă
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-info">
            <Info className="icon" />
            <span>Dezvoltat pentru industria metalurgică românească</span>
          </div>
          <div className="footer-links">
            <a href="https://github.com/Gzeu/qc-inspection-app" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router basename="/qc-inspection-app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;