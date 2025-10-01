import React, { useState, useRef } from 'react';
import { FileText, Download, Mail, Printer, Calendar, User, MapPin, AlertTriangle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const CONFORMITY_STATUS = {
  'conform': { label: 'Conform', color: '#22c55e', icon: CheckCircle },
  'neconform': { label: 'Neconform', color: '#ef4444', icon: AlertTriangle },
  'conditional': { label: 'Acceptabil cu remarci', color: '#f59e0b', icon: AlertTriangle }
};

function InspectionReport({ 
  inspectionData, 
  onSave, 
  onEmail,
  onGeneratePDF 
}) {
  const [reportNotes, setReportNotes] = useState('');
  const [inspector, setInspector] = useState({
    name: '',
    certification: '',
    company: ''
  });
  const [conformityStatus, setConformityStatus] = useState('conform');
  const [recommendations, setRecommendations] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const reportRef = useRef();

  const currentStatus = CONFORMITY_STATUS[conformityStatus];
  const StatusIcon = currentStatus.icon;

  const handleGeneratePDF = async () => {
    const reportElement = reportRef.current;
    
    if (!reportElement) {
      console.error('Element raport nu a fost găsit');
      return;
    }

    try {
      // Temporarily show full report for PDF generation
      const wasPreviewMode = showPreview;
      if (!showPreview) setShowPreview(true);

      // Wait for re-render
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;

      pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      const filename = `raport-qc-${inspectionData.material?.type || 'material'}-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(filename);

      // Restore preview mode
      if (!wasPreviewMode) setShowPreview(false);

      if (onGeneratePDF) {
        onGeneratePDF({
          pdf,
          filename,
          inspector,
          reportNotes,
          conformityStatus,
          recommendations
        });
      }
    } catch (error) {
      console.error('Eroare la generarea PDF:', error);
    }
  };

  const handleSave = () => {
    const reportData = {
      ...inspectionData,
      inspector,
      reportNotes,
      conformityStatus,
      recommendations,
      timestamp: new Date().toISOString(),
      reportId: `QC-${Date.now()}`
    };
    
    if (onSave) onSave(reportData);
  };

  const handleEmail = () => {
    const reportData = {
      ...inspectionData,
      inspector,
      reportNotes,
      conformityStatus,
      recommendations
    };
    
    if (onEmail) onEmail(reportData);
  };

  const defectCount = inspectionData.defects?.length || 0;
  const criticalDefects = inspectionData.defects?.filter(d => d.severity === 'critical').length || 0;
  const majorDefects = inspectionData.defects?.filter(d => d.severity === 'major').length || 0;
  const minorDefects = inspectionData.defects?.filter(d => d.severity === 'minor').length || 0;

  return (
    <div className="inspection-report">
      {/* Report Form Controls */}
      <div className="report-controls">
        <div className="report-header">
          <h2>
            <FileText className="icon" />
            Raport Inspecție QC
          </h2>
          <div className="control-buttons">
            <button 
              onClick={() => setShowPreview(!showPreview)}
              className="btn btn-outline"
            >
              {showPreview ? <EyeOff className="icon" /> : <Eye className="icon" />}
              {showPreview ? 'Ascunde Preview' : 'Afișare Preview'}
            </button>
          </div>
        </div>

        {/* Inspector Information */}
        <div className="inspector-section">
          <h3>Informații Inspector</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Nume Inspector</label>
              <input
                type="text"
                value={inspector.name}
                onChange={(e) => setInspector(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nume și prenume"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Certificări/Calificări</label>
              <input
                type="text"
                value={inspector.certification}
                onChange={(e) => setInspector(prev => ({ ...prev, certification: e.target.value }))}
                placeholder="ex: ISO 9712, ASNT Level II"
                className="form-input"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Companie/Organizație</label>
            <input
              type="text"
              value={inspector.company}
              onChange={(e) => setInspector(prev => ({ ...prev, company: e.target.value }))}
              placeholder="Numele companiei sau organizației"
              className="form-input"
            />
          </div>
        </div>

        {/* Conformity Assessment */}
        <div className="conformity-section">
          <h3>Evaluare Conformitate</h3>
          <div className="conformity-options">
            {Object.entries(CONFORMITY_STATUS).map(([key, status]) => {
              const Icon = status.icon;
              return (
                <label key={key} className="conformity-option">
                  <input
                    type="radio"
                    name="conformity"
                    value={key}
                    checked={conformityStatus === key}
                    onChange={(e) => setConformityStatus(e.target.value)}
                  />
                  <div className="option-content" style={{ borderColor: status.color }}>
                    <Icon style={{ color: status.color }} className="icon" />
                    <span>{status.label}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Additional Notes */}
        <div className="notes-section">
          <div className="form-group">
            <label>Note și Observații</label>
            <textarea
              value={reportNotes}
              onChange={(e) => setReportNotes(e.target.value)}
              placeholder="Note adiționale, observații, condiții de inspecție..."
              className="form-textarea"
              rows={4}
            />
          </div>

          <div className="form-group">
            <label>Recomandări și Măsuri</label>
            <textarea
              value={recommendations}
              onChange={(e) => setRecommendations(e.target.value)}
              placeholder="Recomandări pentru remediere, măsuri preventive, următoarele pași..."
              className="form-textarea"
              rows={3}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button onClick={handleSave} className="btn btn-outline">
            <FileText className="icon" />
            Salvează Raport
          </button>
          <button onClick={handleGeneratePDF} className="btn btn-primary">
            <Download className="icon" />
            Generează PDF
          </button>
          <button onClick={handleEmail} className="btn btn-outline">
            <Mail className="icon" />
            Trimite Email
          </button>
        </div>
      </div>

      {/* Report Preview */}
      {showPreview && (
        <div className="report-preview">
          <div ref={reportRef} className="printable-report">
            {/* Report Header */}
            <div className="report-header-print">
              <div className="company-header">
                <h1>RAPORT INSPECȚIE CONTROL CALITATE</h1>
                <div className="report-meta">
                  <div><strong>Raport ID:</strong> QC-{Date.now()}</div>
                  <div><strong>Data:</strong> {new Date().toLocaleDateString('ro-RO')}</div>
                  <div><strong>Ora:</strong> {new Date().toLocaleTimeString('ro-RO')}</div>
                </div>
              </div>
              
              <div className="conformity-status-print">
                <div className="status-badge" style={{ backgroundColor: currentStatus.color }}>
                  <StatusIcon className="icon" />
                  <strong>{currentStatus.label}</strong>
                </div>
              </div>
            </div>

            {/* Inspector Information */}
            <div className="section">
              <h3><User className="icon" /> Inspector</h3>
              <div className="info-grid">
                <div><strong>Nume:</strong> {inspector.name || 'Nu este specificat'}</div>
                <div><strong>Certificări:</strong> {inspector.certification || 'Nu sunt specificate'}</div>
                <div><strong>Companie:</strong> {inspector.company || 'Nu este specificată'}</div>
              </div>
            </div>

            {/* Material Information */}
            {inspectionData.material && (
              <div className="section">
                <h3>Informații Material</h3>
                <div className="info-grid">
                  <div><strong>Tip Material:</strong> {inspectionData.material.type}</div>
                  {inspectionData.material.grade && (
                    <div><strong>Grad Material:</strong> {inspectionData.material.grade}</div>
                  )}
                  {inspectionData.material.dimension && (
                    <div><strong>Dimensiuni:</strong> {inspectionData.material.dimension}</div>
                  )}
                  {inspectionData.material.supplier && (
                    <div><strong>Furnizor:</strong> {inspectionData.material.supplier}</div>
                  )}
                  {inspectionData.material.batchNumber && (
                    <div><strong>Număr Lot:</strong> {inspectionData.material.batchNumber}</div>
                  )}
                </div>
              </div>
            )}

            {/* Defects Summary */}
            <div className="section">
              <h3><AlertTriangle className="icon" /> Sumar Defecte</h3>
              <div className="defects-summary">
                <div className="summary-stats">
                  <div className="stat"><strong>Total Defecte:</strong> {defectCount}</div>
                  <div className="stat critical"><strong>Critice:</strong> {criticalDefects}</div>
                  <div className="stat major"><strong>Majore:</strong> {majorDefects}</div>
                  <div className="stat minor"><strong>Minore:</strong> {minorDefects}</div>
                </div>
              </div>

              {/* Detailed Defects */}
              {inspectionData.defects && inspectionData.defects.length > 0 && (
                <div className="defects-detailed">
                  {inspectionData.defects.map((defect, index) => (
                    <div key={defect.id} className="defect-report-item">
                      <div className="defect-header">
                        <strong>Defect #{index + 1}: {defect.type}</strong>
                        <span className={`severity-badge ${defect.severity}`}>
                          {defect.severity === 'critical' ? 'Critic' : 
                           defect.severity === 'major' ? 'Major' : 'Minor'}
                        </span>
                      </div>
                      <div className="defect-details">
                        <div><strong>Localizare:</strong> {defect.location}</div>
                        {defect.dimensions && (
                          <div><strong>Dimensiuni:</strong> {defect.dimensions}</div>
                        )}
                        {defect.description && (
                          <div><strong>Descriere:</strong> {defect.description}</div>
                        )}
                        {defect.photos && defect.photos.length > 0 && (
                          <div><strong>Fotografii:</strong> {defect.photos.length} imagine(i) anexată/anexate</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Photos Section */}
            {inspectionData.photos && inspectionData.photos.length > 0 && (
              <div className="section">
                <h3>Fotografii Generale</h3>
                <div className="photos-grid-print">
                  {inspectionData.photos.map((photo, index) => (
                    <div key={index} className="photo-item">
                      <img src={photo.dataUrl} alt={`Foto ${index + 1}`} />
                      <p>Foto {index + 1} - {new Date(photo.timestamp).toLocaleString('ro-RO')}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes and Recommendations */}
            {(reportNotes || recommendations) && (
              <div className="section">
                <h3>Note și Recomandări</h3>
                {reportNotes && (
                  <div className="subsection">
                    <h4>Observații:</h4>
                    <p>{reportNotes}</p>
                  </div>
                )}
                {recommendations && (
                  <div className="subsection">
                    <h4>Recomandări:</h4>
                    <p>{recommendations}</p>
                  </div>
                )}
              </div>
            )}

            {/* Report Footer */}
            <div className="report-footer">
              <div className="signature-section">
                <div className="signature-line">
                  <div>Semnătura Inspector</div>
                  <div className="signature-box"></div>
                </div>
                <div className="signature-line">
                  <div>Data și Ora</div>
                  <div>{new Date().toLocaleString('ro-RO')}</div>
                </div>
              </div>
              
              <div className="footer-note">
                <p>Acest raport a fost generat automat de sistemul QC Inspector</p>
                <p>Pentru informații adiționale sau clarificări, contactați inspectorul responsabil</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InspectionReport;