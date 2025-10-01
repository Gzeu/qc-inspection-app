import React, { useState, useEffect, useRef } from 'react';
import { Camera, CheckCircle, AlertCircle, Upload } from 'lucide-react';

const CameraCapture = ({ onPhotoCapture, onRetake, currentPhoto = null }) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(currentPhoto);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    setCapturedPhoto(currentPhoto);
  }, [currentPhoto]);

  const startCamera = async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Nu se poate accesa camera. Verifică permisiunile.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to blob
    canvas.toBlob((blob) => {
      if (blob) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const photoData = {
            blob: blob,
            dataUrl: reader.result,
            timestamp: new Date().toISOString(),
            size: blob.size
          };
          
          setCapturedPhoto(photoData);
          onPhotoCapture(photoData);
          stopCamera();
        };
        reader.readAsDataURL(blob);
      }
    }, 'image/jpeg', 0.9);
  };

  const handleCaptureClick = async () => {
    if (!stream) {
      setIsCapturing(true);
      await startCamera();
      setIsCapturing(false);
    } else {
      capturePhoto();
    }
  };

  const handleRetake = () => {
    setCapturedPhoto(null);
    stopCamera();
    onRetake();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Vă rugăm să selectați un fișier imagine valid');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Imaginea este prea mare. Mărimea maximă este 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const photoData = {
        blob: file,
        dataUrl: reader.result,
        timestamp: new Date().toISOString(),
        size: file.size,
        name: file.name
      };
      
      setCapturedPhoto(photoData);
      onPhotoCapture(photoData);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  // Check if camera is supported
  const isCameraSupported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

  return (
    <div className="camera-capture">
      <div className="camera-controls">
        <h3 className="section-title">
          <Camera className="icon" />
          Capturează fotografia materialului
        </h3>
        
        {error && (
          <div className="error-message">
            <AlertCircle className="icon error" />
            <span>{error}</span>
          </div>
        )}
        
        {!capturedPhoto ? (
          <div className="capture-section">
            {/* Camera Preview */}
            {stream && (
              <div className="camera-preview">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="preview-video"
                />
                <canvas ref={canvasRef} style={{ display: 'none' }} />
              </div>
            )}
            
            <div className="capture-options">
              {isCameraSupported && (
                <button
                  onClick={handleCaptureClick}
                  disabled={isCapturing}
                  className="btn btn-primary capture-btn"
                >
                  {isCapturing ? (
                    <>
                      <div className="spinner"></div>
                      Pregătire cameră...
                    </>
                  ) : stream ? (
                    <>
                      <Camera className="icon" />
                      Fotografiază
                    </>
                  ) : (
                    <>
                      <Camera className="icon" />
                      Deschide camera
                    </>
                  )}
                </button>
              )}
              
              <div className="upload-option">
                <label htmlFor="photo-upload" className="btn btn-secondary">
                  <Upload className="icon" />
                  Încarcă din galerie
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="photo-preview">
            <div className="preview-container">
              <img
                src={capturedPhoto.dataUrl}
                alt="Material fotografiat"
                className="captured-photo"
              />
              <div className="photo-info">
                <div className="info-item">
                  <CheckCircle className="icon success" />
                  <span>Fotografie capturată</span>
                </div>
                <div className="info-item">
                  <span className="timestamp">
                    {new Date(capturedPhoto.timestamp).toLocaleString('ro-RO')}
                  </span>
                </div>
                {capturedPhoto.size && (
                  <div className="info-item">
                    <span className="file-size">
                      {(capturedPhoto.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="photo-actions">
              <button
                onClick={handleRetake}
                className="btn btn-outline"
              >
                🔄 Fotografiază din nou
              </button>
            </div>
          </div>
        )}
      </div>

      {!isCameraSupported && (
        <div className="warning-message">
          <AlertCircle className="icon warning" />
          <p>
            Camera nu este disponibilă. Puteți încărca o imagine din galerie.
          </p>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;