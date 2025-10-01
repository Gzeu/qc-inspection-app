import React, { useState } from 'react';
import { ChevronDown, Package, Info } from 'lucide-react';
import { MATERIAL_TYPES } from '../../utils/defectTypes';

const MaterialSelector = ({ selectedMaterial, onMaterialSelect, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedDimension, setSelectedDimension] = useState('');

  const handleMaterialChange = (materialType) => {
    const materialData = {
      type: materialType,
      grade: '',
      dimension: '',
      timestamp: new Date().toISOString()
    };
    
    onMaterialSelect(materialData);
    setSelectedGrade('');
    setSelectedDimension('');
    setIsOpen(false);
  };

  const handleGradeChange = (grade) => {
    setSelectedGrade(grade);
    const updatedMaterial = {
      ...selectedMaterial,
      grade: grade
    };
    onMaterialSelect(updatedMaterial);
  };

  const handleDimensionChange = (dimension) => {
    setSelectedDimension(dimension);
    const updatedMaterial = {
      ...selectedMaterial,
      dimension: dimension
    };
    onMaterialSelect(updatedMaterial);
  };

  const currentMaterialType = selectedMaterial ? MATERIAL_TYPES[selectedMaterial.type?.toUpperCase()] : null;

  return (
    <div className="material-selector">
      <div className="section-header">
        <h3 className="section-title">
          <Package className="icon" />
          Selectează tipul de material
        </h3>
      </div>

      {/* Material Type Selection */}
      <div className="dropdown-container">
        <button
          className={`dropdown-trigger ${isOpen ? 'open' : ''} ${disabled ? 'disabled' : ''}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <span className="dropdown-label">
            {selectedMaterial?.type ? 
              MATERIAL_TYPES[selectedMaterial.type.toUpperCase()]?.name : 
              'Alege tipul de material...'
            }
          </span>
          <ChevronDown className={`icon ${isOpen ? 'rotated' : ''}`} />
        </button>

        {isOpen && (
          <div className="dropdown-menu">
            {Object.values(MATERIAL_TYPES).map((material) => (
              <div
                key={material.id}
                className={`dropdown-item ${selectedMaterial?.type === material.id ? 'selected' : ''}`}
                onClick={() => handleMaterialChange(material.id)}
              >
                <div className="material-info">
                  <span className="material-name">{material.name}</span>
                  <span className="material-description">{material.description}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Material Grade Selection */}
      {currentMaterialType && (
        <div className="grade-selector">
          <label className="input-label">
            Gradul materialului
          </label>
          <select
            value={selectedGrade}
            onChange={(e) => handleGradeChange(e.target.value)}
            className="select-input"
            disabled={disabled}
          >
            <option value="">Selectează gradul...</option>
            {currentMaterialType.commonGrades.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Dimension Selection */}
      {currentMaterialType && (
        <div className="dimension-selector">
          <label className="input-label">
            {currentMaterialType.id === 'pipes' ? 'Diametrul' : 'Grosimea'}
          </label>
          <select
            value={selectedDimension}
            onChange={(e) => handleDimensionChange(e.target.value)}
            className="select-input"
            disabled={disabled}
          >
            <option value="">
              {currentMaterialType.id === 'pipes' ? 'Selectează diametrul...' : 'Selectează grosimea...'}
            </option>
            {(currentMaterialType.commonDiameters || currentMaterialType.commonThickness)?.map((dimension) => (
              <option key={dimension} value={dimension}>
                {dimension}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Material Information */}
      {currentMaterialType && (
        <div className="material-details">
          <div className="info-card">
            <Info className="icon info" />
            <div className="info-content">
              <h4>Informații despre material</h4>
              <p>{currentMaterialType.description}</p>
              
              {selectedMaterial?.grade && (
                <div className="selected-info">
                  <span className="info-label">Grad selectat:</span>
                  <span className="info-value">{selectedMaterial.grade}</span>
                </div>
              )}
              
              {selectedMaterial?.dimension && (
                <div className="selected-info">
                  <span className="info-label">
                    {currentMaterialType.id === 'pipes' ? 'Diametru:' : 'Grosime:'}
                  </span>
                  <span className="info-value">{selectedMaterial.dimension}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialSelector;