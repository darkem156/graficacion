import { Canvas, useThree } from '@react-three/fiber';
import { AxesHelper, Matrix4, Vector3, Euler } from 'three';
import { useState, useEffect, useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import Controls from './Controls';
import './App.css';

const Shape = ({ transform, shape }) => {
  const meshRef = useRef();

  useEffect(() => {
    if (meshRef.current) {
      const matrix = new Matrix4();

      // 1. Aplicar matriz de sesgado
      matrix.set(
        1, transform.shear[0], transform.shear[1], 0, // Eje X
        transform.shear[0], 1, transform.shear[2], 0, // Eje Y
        transform.shear[1], transform.shear[2], 1, 0, // Eje Z
        0, 0, 0, 1                                  // Translación (no usada aquí)
      );

      // 2. Aplicar rotación (en radianes)
      const rotationMatrix = new Matrix4().makeRotationFromEuler(
        new Euler(
          (transform.rotation[0] * Math.PI) / 180,
          (transform.rotation[1] * Math.PI) / 180,
          (transform.rotation[2] * Math.PI) / 180
        )
      );
      matrix.multiply(rotationMatrix);

      // 3. Aplicar escala
      const scaleMatrix = new Matrix4().makeScale(transform.scale, transform.scale, transform.scale);
      matrix.multiply(scaleMatrix);

      // 4. Aplicar posición
      const positionMatrix = new Matrix4().makeTranslation(transform.position[0], transform.position[1], transform.position[2]);
      matrix.multiply(positionMatrix);

      // Aplicar la matriz final al mesh
      meshRef.current.matrix.identity(); // Reiniciar matriz
      meshRef.current.applyMatrix4(matrix);
      meshRef.current.matrixAutoUpdate = false; // Evitar actualización automática de la matriz
    }
  }, [transform]);

  const geometryProps = {
    cube: <boxGeometry args={[1, 1, 1]} />,
    pyramid: <coneGeometry args={[1, 1, 4]} />,
    donut: <torusGeometry args={[0.7, 0.3, 16, 32]} />,
    halfCircle: <sphereGeometry args={[1, 32, 32, 0, Math.PI]} />,
    cylinder: <cylinderGeometry args={[0.7, 0.7, 1, 32]} />,
    rhombus: <octahedronGeometry args={[1]} />,
    hexagon: <dodecahedronGeometry args={[1]} />,
  };

  return (
    <mesh ref={meshRef}>
      {geometryProps[shape]}
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

const DynamicCamera = ({ cameraPosition }) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(...cameraPosition);
    camera.lookAt(0, 0, 0);
  }, [cameraPosition]);

  return null;
};

const App = () => {
  const [transform, setTransform] = useState({
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    cameraPosition: [5, 5, 5],
    shear: [0, 0, 0],
    brightness: 1,
    scale: 1,
  });

  const [shape, setShape] = useState('cube');

  return (
    <>
      <Controls onTransform={setTransform} shape={shape} setShape={setShape} />
      <Canvas
        style={{ height: '100vh', width: '100vw', background: '#03A' }}
        camera={{ position: [5, 5, 5], fov: 50 }}
      >
        <OrbitControls enablePan enableZoom enableRotate />
        <DynamicCamera cameraPosition={transform.cameraPosition} />

        <ambientLight intensity={transform.brightness} />
        <pointLight position={[10, 10, 10]} />
        <primitive object={new AxesHelper(100)} />
        <Shape transform={transform} shape={shape} />
        <gridHelper args={[100, 100, 0xff0000, 'teal']} />
      </Canvas>
    </>
  );
};

export default App;