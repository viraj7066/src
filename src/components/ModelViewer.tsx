import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface ModelViewerProps {
  file: File | null;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ file }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const orbitControlsRef = useRef<OrbitControls | null>(null);

  const [loading, setLoading] = useState(false);
  const [modelSize, setModelSize] = useState<{ length: number; width: number; height: number; volume: number; area: number } | null>(null);
  const [isWireframe, setIsWireframe] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const MAX_DIMENSIONS = { length: 220, width: 210, height: 210 }; // Maximum allowed dimensions in mm

  const resetCamera = () => {
    if (cameraRef.current && orbitControlsRef.current) {
      // Position camera to show full grid
      cameraRef.current.position.set(300, 300, 300);
      cameraRef.current.lookAt(0, 0, 0);
      orbitControlsRef.current.target.set(0, 0, 0);
      orbitControlsRef.current.update();
    }
  };

  const loadModel = async (file: File) => {
    if (!sceneRef.current || !file) return;

    setLoading(true);
    setModelSize(null);
    setIsWireframe(false);
    setErrorMessage(null);

    const fileName = file.name.toLowerCase();
    const fileExtension = fileName.split('.').pop();

    let loader: any;

    if (fileExtension === 'stl') {
      loader = new STLLoader();
    } else if (fileExtension === 'obj') {
      loader = new OBJLoader();
    } else {
      console.error('Unsupported file format.');
      setLoading(false);
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      if (!event.target?.result || !sceneRef.current) {
        setLoading(false);
        return;
      }

      try {
        const data = event.target.result;
        let model: THREE.Object3D;

        if (fileExtension === 'stl') {
          const geometry = loader.parse(data as ArrayBuffer);
          geometry.computeBoundingBox();

          const boundingBox = geometry.boundingBox!;
          const size = boundingBox.getSize(new THREE.Vector3());

          if (size.x > MAX_DIMENSIONS.length || size.y > MAX_DIMENSIONS.height || size.z > MAX_DIMENSIONS.width) {
            setErrorMessage(`Model dimensions exceed the allowed limits of ${MAX_DIMENSIONS.length}mm × ${MAX_DIMENSIONS.width}mm × ${MAX_DIMENSIONS.height}mm.`);
            setLoading(false);
            return;
          }

          const center = boundingBox.getCenter(new THREE.Vector3());
          geometry.translate(-center.x, -center.y, -center.z);

          model = new THREE.Mesh(
            geometry,
            new THREE.MeshStandardMaterial({
              color: 0xaaaaaa,
              metalness: 0.5,
              roughness: 0.7,
              wireframe: isWireframe,
            })
          );

          const length = size.x.toFixed(2);
          const width = size.z.toFixed(2);
          const height = size.y.toFixed(2);
          const volume = (size.x * size.y * size.z).toFixed(2);
          const area = (size.x * size.z).toFixed(2);

          setModelSize({
            length: parseFloat(length),
            width: parseFloat(width),
            height: parseFloat(height),
            volume: parseFloat(volume),
            area: parseFloat(area),
          });

          model.position.y = size.y / 2;
        } else {
          model = loader.parse(data as string);
        }

        sceneRef.current.children.forEach((child) => {
          if (child.userData?.isModel) {
            sceneRef.current?.remove(child);
          }
        });

        model.userData.isModel = true;
        sceneRef.current.add(model);

        // Reset camera to show full grid after loading model
        resetCamera();
      } catch (error) {
        console.error('Error loading model:', error);
      } finally {
        setLoading(false);
      }
    };

    if (fileExtension === 'stl') {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    sceneRef.current = new THREE.Scene();
    sceneRef.current.background = new THREE.Color(0xf0f0f0);

    cameraRef.current = new THREE.PerspectiveCamera(
      45, // Reduced FOV for better perspective
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      2000 // Increased far plane to accommodate zoomed out view
    );

    // Initial camera position to show full grid
    cameraRef.current.position.set(300, 300, 300);
    cameraRef.current.lookAt(0, 0, 0);

    rendererRef.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    rendererRef.current.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(rendererRef.current.domElement);

    orbitControlsRef.current = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
    orbitControlsRef.current.enableDamping = true;
    orbitControlsRef.current.dampingFactor = 0.05;
    orbitControlsRef.current.minDistance = 50; // Set minimum zoom distance
    orbitControlsRef.current.maxDistance = 800; // Set maximum zoom distance

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    sceneRef.current.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    sceneRef.current.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.6);
    pointLight.position.set(-10, 10, 10);
    sceneRef.current.add(pointLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(0, 10, 5);
    spotLight.angle = Math.PI / 4;
    spotLight.castShadow = true;
    sceneRef.current.add(spotLight);

    // Create a grid helper with 210mm x 210mm dimensions
    const gridSize = 210;
    const gridDivisions = 21; // One division per 10mm
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x888888, 0x444444);
    gridHelper.position.y = 0;
    sceneRef.current.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(5);
    sceneRef.current.add(axesHelper);

    const animate = () => {
      requestAnimationFrame(animate);
      orbitControlsRef.current?.update();
      rendererRef.current?.render(sceneRef.current!, cameraRef.current!);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      orbitControlsRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (file) {
      loadModel(file);
    }
  }, [file]);

  const toggleWireframe = () => {
    sceneRef.current?.children.forEach((child) => {
      if (child.userData?.isModel) {
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.MeshStandardMaterial;
        material.wireframe = !material.wireframe;
        setIsWireframe(material.wireframe);
      }
    });
  };

  return (
    <div className="relative">
      {loading && <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">Loading...</div>}
      {errorMessage && (
        <div className="absolute top-2 left-2 bg-red-500 text-white p-2 rounded shadow-md">
          {errorMessage}
        </div>
      )}
      <div ref={containerRef} className="w-full h-[500px] bg-gray-200" />
      {modelSize && (
        <div className="p-2 bg-white shadow-md text-sm grid grid-cols-2 gap-4">
          <div>
            <p>Length: {modelSize.length} mm</p>
            <p>Height: {modelSize.height} mm</p>
          </div>
          <div>
            <p>Width: {modelSize.width} mm</p>
            <p>Volume: {modelSize.volume} mm³</p>
          </div>
          <div className="col-span-2">
            <p>Area: {modelSize.area} mm²</p>
          </div>
        </div>
      )}
      <button onClick={toggleWireframe} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded shadow-md">
        Toggle Wireframe
      </button>
    </div>
  );
};

export default ModelViewer;