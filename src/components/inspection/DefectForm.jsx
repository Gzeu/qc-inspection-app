import React, { useState } from 'react';
import { AlertTriangle, Plus, X, Camera } from 'lucide-react';

const DEFECT_TYPES = {
  'placa': [
    'Fisuri de suprafață',
    'Defecte de laminare',
    'Incluziuni nemetalice',
    'Deformări',
    'Coroziune/rugină',
    'Defecte de muchii',
    'Zgârieturi adânci',
    'Pori/bule',
    'Defecte de compoziție'
  ],
  'brama': [
    'Fisuri longitudinale',
    'Fisuri transversale',
    'Defecte de solidificare',
    'Segregări',
    'Incluziuni',
    'Defecte de suprafață',
    'Deformări geometrice',
    'Defecte de colțuri',
    'Marcaje inadecvate'
  ],
  'teava': [
    'Fisuri longitudinale',
    'Fisuri circumferențiale', 
    'Defecte de sudură',
    'Ovalitate excesivă',
    'Variații de grosime',
    'Defecte de suprafață internă',
    'Defecte de suprafață externă',
    'Defecte de capete',
    'Coroziune internă'
  ]
};

const SEVERITY_LEVELS = [
  { value: 'minor', label: 'Minor', color: '#22c55e' },
  { value: 'major', label: 'Major', color: '#f59e0b' },
  { value: 'critical', label: 'Critic', color: '#ef4444' }
];

function DefectForm({ materialType, onDefectsChange, defects = [] }) {
  const [newDefect, setNewDefect] = useState({
    type: '',
    severity: 'minor',
    location: '',
    dimensions: '',
    description: '',
    photos: []
  });

  const availableDefectTypes = DEFECT_TYPES[materialType] || [];

  const addDefect = () => {
    if (!newDefect.type || !newDefect.location) return;

    const defect = {
      id: Date.now(),
      ...newDefect,
      timestamp: new Date().toISOString()
    };

    const updatedDefects = [...defects, defect];
    onDefectsChange(updatedDefects);

    // Reset form
    setNewDefect({
      type: '',
      severity: 'minor',
      location: '',
      dimensions: '',
      description: '',
      photos: []
    });
  };

  const removeDefect = (defectId) => {
    const updatedDefects = defects.filter(d => d.id !== defectId);
    onDefectsChange(updatedDefects);
  };

  const handlePhotoCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      // Create a temporary video element to capture frame
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      video.onloadedmetadata = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);
        
        const photoData = {
          dataUrl: canvas.toDataURL('image/jpeg', 0.8),
          timestamp: new Date().toISOString()
        };
        
        setNewDefect(prev => ({
          ...prev,
          photos: [...prev.photos, photoData]
        }));
        
        // Stop camera
        stream.getTracks().forEach(track => track.stop());
      };
    } catch (err) {
      console.error('Eroare la capturarea fotografiei:', err);
    }
  };

  const removePhoto = (photoIndex) => {
    setNewDefect(prev => ({
      ...prev,
      photos: prev.photos.filter((_, index) => index !== photoIndex)
    }));
  };

  return (
    <div className="defect-form">
      <h3>
        <AlertTriangle className="icon" />
        Înregistrare Defecte
      </h3>

      {/* New defect form */}
      <div className="defect-input-form">
        <div className="form-row">
          <div className="form-group">
            <label>Tip Defect</label>
            <select
              value={newDefect.type}
              onChange={(e) => setNewDefect(prev => ({ ...prev, type: e.target.value }))}
              className="form-select"
            >
              <option value="">Selectează tipul defectului</option>
              {availableDefectTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Severitate</label>
            <select
              value={newDefect.severity}
              onChange={(e) => setNewDefect(prev => ({ ...prev, severity: e.target.value }))}
              className="form-select"
            >
              {SEVERITY_LEVELS.map(level => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Localizare</label>
            <input
              type="text"
              value={newDefect.location}
              onChange={(e) => setNewDefect(prev => ({ ...prev, location: e.target.value }))}
              placeholder="ex: partea superioară, margine stângă, zona centrală"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Dimensiuni (mm)</label>
            <input
              type="text"
              value={newDefect.dimensions}
              onChange={(e) => setNewDefect(prev => ({ ...prev, dimensions: e.target.value }))}
              placeholder="ex: 10x5, L=20, Ø=15"
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Descriere detaliată</label>
          <textarea
            value={newDefect.description}
            onChange={(e) => setNewDefect(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Descriere detaliată a defectului, cauze posibile, observații..."
            className="form-textarea"
            rows={3}
          />
        </div>

        <div className="form-group">
          <label>Fotografii defect</label>
          <div className="photo-capture-section">
            <button
              type="button"
              onClick={handlePhotoCapture}
              className="btn btn-outline"
            >
              <Camera className="icon" />
              Capturează Fotografie
            </button>
            
            {newDefect.photos.length > 0 && (
              <div className="defect-photos">
                {newDefect.photos.map((photo, index) => (
                  <div key={index} className="defect-photo">
                    <img src={photo.dataUrl} alt={`Defect ${index + 1}`} />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="remove-photo"
                    >
                      <X className="icon" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={addDefect}
          disabled={!newDefect.type || !newDefect.location}
          className="btn btn-primary"
        >
          <Plus className="icon" />
          Adaugă Defect
        </button>
      </div>

      {/* Defects list */}
      {defects.length > 0 && (
        <div className="defects-list">
          <h4>Defecte Identificate ({defects.length})</h4>
          {defects.map(defect => {
            const severityLevel = SEVERITY_LEVELS.find(s => s.value === defect.severity);
            return (
              <div key={defect.id} className="defect-item">
                <div className="defect-header">
                  <div className="defect-type">
                    <span 
                      className="severity-badge"
                      style={{ backgroundColor: severityLevel.color }}
                    >
                      {severityLevel.label}
                    </span>
                    <strong>{defect.type}</strong>
                  </div>
                  <button
                    onClick={() => removeDefect(defect.id)}
                    className="btn-remove"
                  >
                    <X className="icon" />
                  </button>
                </div>
                
                <div className="defect-details">
                  <p><strong>Localizare:</strong> {defect.location}</p>
                  {defect.dimensions && (
                    <p><strong>Dimensiuni:</strong> {defect.dimensions}</p>
                  )}
                  {defect.description && (
                    <p><strong>Descriere:</strong> {defect.description}</p>
                  )}
                  
                  {defect.photos.length > 0 && (
                    <div className="defect-photos-preview">
                      <strong>Fotografii ({defect.photos.length}):</strong>
                      <div className="photos-grid">
                        {defect.photos.map((photo, index) => (
                          <img 
                            key={index} 
                            src={photo.dataUrl} 
                            alt={`Defect foto ${index + 1}`}
                            className="photo-thumbnail"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DefectForm;