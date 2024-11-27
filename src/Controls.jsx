import { useState } from 'react';

const Controls = ({ onTransform, shape, setShape }) => {
  const [position, setPosition] = useState([0, 0, 0]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [cameraPosition, setCameraPosition] = useState([5, 5, 5]);
  const [shear, setShear] = useState([0, 0, 0]);
  const [brightness, setBrightness] = useState(1);
  const [scale, setScale] = useState(1);
  
  const [showPosition, setShowPosition] = useState(false);
  const [showRotation, setShowRotation] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showShear, setShowShear] = useState(false);
  const [showBrightness, setShowBrightness] = useState(false);
  const [showScale, setShowScale] = useState(false);

  const handlePositionChange = (axis, value) => {
    const newPosition = [...position];
    newPosition[axis] = value;
    setPosition(newPosition);
    onTransform({ position: newPosition, rotation, cameraPosition, shear, brightness, scale });
  };

  const handleRotationChange = (axis, value) => {
    const newRotation = [...rotation];
    newRotation[axis] = value;
    setRotation(newRotation);
    onTransform({ position, rotation: newRotation, cameraPosition, shear, brightness, scale });
  };

  const handleCameraPositionChange = (axis, value) => {
    const newCameraPosition = [...cameraPosition];
    newCameraPosition[axis] = value;
    setCameraPosition(newCameraPosition);
    onTransform({ position, rotation, cameraPosition: newCameraPosition, shear, brightness, scale });
  };

  const handleShearChange = (axis, value) => {
    const newShear = [...shear];
    newShear[axis] = value;
    setShear(newShear);
    onTransform({ position, rotation, cameraPosition, shear: newShear, brightness, scale });
  };

  const handleBrightnessChange = (value) => {
    setBrightness(value);
    onTransform({ position, rotation, cameraPosition, shear, brightness: value, scale });
  };

  const handleScaleChange = (value) => {
    setScale(value);
    onTransform({ position, rotation, cameraPosition, shear, brightness, scale: value });
  };

  return (
    <div id="controls" style={{ padding: '10px', marginBottom: '10px', display: 'flex' }}>
        <select
          id="shape-select"
          value={shape}
          onChange={(e) => setShape(e.target.value)}
        >
          <option value="cube">Cubo</option>
          <option value="pyramid">Pirámide</option>
          <option value="donut">Dona</option>
          <option value="halfCircle">Medio círculo</option>
          <option value="cylinder">Cilindro</option>
          <option value="rhombus">Rombo</option>
          <option value="hexagon">Hexágono</option>
        </select>
      <div>
        <button onClick={() => setShowPosition(!showPosition)}>
          <i className="fas fa-cogs"></i> Posición
        </button>
        {showPosition && (
          <div>
            {['X', 'Y', 'Z'].map((axis, index) => (
              <div key={`pos-${axis}`}>
                <label>
                  {axis} Posición:
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="0.1"
                      value={position[index]}
                      onChange={(e) => handlePositionChange(index, parseFloat(e.target.value))}
                      style={{ marginRight: '10px', flexGrow: '1' }}
                    />
                    <input
                      type="number"
                      min="-5"
                      max="5"
                      step="0.1"
                      value={position[index]}
                      onChange={(e) => handlePositionChange(index, parseFloat(e.target.value))}
                      style={{ width: '60px' }}
                    />
                  </div>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <button onClick={() => setShowRotation(!showRotation)}>
          <i className="fas fa-sync-alt"></i> Rotación
        </button>
        {showRotation && (
          <div>
            {['X', 'Y', 'Z'].map((axis, index) => (
              <div key={`rot-${axis}`}>
                <label>
                  {axis} Rotación (grados):
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      step="1"
                      value={rotation[index]}
                      onChange={(e) => handleRotationChange(index, parseFloat(e.target.value))}
                      style={{ marginRight: '10px', flexGrow: '1' }}
                    />
                    <input
                      type="number"
                      min="0"
                      max="360"
                      step="1"
                      value={rotation[index]}
                      onChange={(e) => handleRotationChange(index, parseFloat(e.target.value))}
                      style={{ width: '60px' }}
                    /> °
                  </div>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <button onClick={() => setShowCamera(!showCamera)}>
          <i className="fas fa-camera"></i> Cámara
        </button>
        {showCamera && (
          <div>
            {['X', 'Y', 'Z'].map((axis, index) => (
              <div key={`camera-${axis}`}>
                <label>
                  {axis} Cámara:
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="range"
                      min="-10"
                      max="10"
                      step="0.1"
                      value={cameraPosition[index]}
                      onChange={(e) => handleCameraPositionChange(index, parseFloat(e.target.value))}
                      style={{ marginRight: '10px', flexGrow: '1' }}
                    />
                    <input
                      type="number"
                      min="-10"
                      max="10"
                      step="0.1"
                      value={cameraPosition[index]}
                      onChange={(e) => handleCameraPositionChange(index, parseFloat(e.target.value))}
                      style={{ width: '60px' }}
                    />
                  </div>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <button onClick={() => setShowShear(!showShear)}>
          <i className="fas fa-arrows-alt"></i> Sesgado
        </button>
        {showShear && (
          <div>
            {['X', 'Y', 'Z'].map((axis, index) => (
              <div key={`shear-${axis}`}>
                <label>
                  {axis} Sesgado:
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="range"
                      min="-0.99"
                      max="0.99"
                      step="0.01"
                      value={shear[index]}
                      onChange={(e) => handleShearChange(index, parseFloat(e.target.value))}
                      style={{ marginRight: '10px', flexGrow: '1' }}
                    />
                    <input
                      type="number"
                      min="-0.99"
                      max="0.99"
                      step="0.01"
                      value={shear[index]}
                      onChange={(e) => handleShearChange(index, parseFloat(e.target.value))}
                      style={{ width: '60px' }}
                    />
                  </div>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <button onClick={() => setShowBrightness(!showBrightness)}>
          <i className="fas fa-sun"></i> Brillo
        </button>
        {showBrightness && (
          <div>
            <label>
              Brillo:
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={brightness}
                  onChange={(e) => handleBrightnessChange(parseFloat(e.target.value))}
                  style={{ marginRight: '10px', flexGrow: '1' }}
                />
                <input
                  type="number"
                  min="0"
                  max="2"
                  step="0.1"
                  value={brightness}
                  onChange={(e) => handleBrightnessChange(parseFloat(e.target.value))}
                  style={{ width: '60px' }}
                />
              </div>
            </label>
          </div>
        )}
      </div>

      <div>
        <button onClick={() => setShowScale(!showScale)}>
          <i className="fas fa-expand"></i> Escala
        </button>
        {showScale && (
          <div>
            <label>
              Escala:
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="range"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={scale}
                  onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
                  style={{ marginRight: '10px', flexGrow: '1' }}
                />
                <input
                  type="number"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={scale}
                  onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
                  style={{ width: '60px' }}
                />
              </div>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Controls;
