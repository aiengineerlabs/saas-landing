"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Neural Network Node Cluster
function NeuralNodeCluster({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const nodes = useMemo(() => {
    const nodePositions: [number, number, number][] = [];
    const connections: [number, number][] = [];
    
    // Create 8-12 nodes in a cluster
    const nodeCount = 8 + Math.floor(Math.random() * 5);
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 0.3 + Math.random() * 0.3;
      nodePositions.push([
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 0.4
      ]);
    }
    
    // Create connections between nearby nodes
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const dist = Math.sqrt(
          Math.pow(nodePositions[i][0] - nodePositions[j][0], 2) +
          Math.pow(nodePositions[i][1] - nodePositions[j][1], 2) +
          Math.pow(nodePositions[i][2] - nodePositions[j][2], 2)
        );
        if (dist < 0.5) {
          connections.push([i, j]);
        }
      }
    }
    
    return { nodePositions, connections };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005 * speed;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + position[0]) * 0.3;
      groupRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * speed * 0.5) * 0.2;
    }
  });

  const lineObjects = useMemo(() => {
    const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.4 });
    return nodes.connections.map(([i, j]) => {
      const start = nodes.nodePositions[i];
      const end = nodes.nodePositions[j];
      const positions = new Float32Array([...start, ...end]);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      return new THREE.Line(geometry, material);
    });
  }, [nodes.connections, nodes.nodePositions, color]);

  return (
    <group ref={groupRef} position={position}>
      {/* Connections */}
      {lineObjects.map((lineObj, idx) => (
        <primitive key={idx} object={lineObj} />
      ))}
      
      {/* Nodes */}
      {nodes.nodePositions.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

// Data Flow Stream
function DataFlowStream({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Group>(null);
  
  const streamGeometry = useMemo(() => {
    const points: number[] = [];
    const segments = 50;
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = Math.sin(t * Math.PI * 2) * 0.3;
      const y = Math.cos(t * Math.PI * 1.5) * 0.2;
      const z = (t - 0.5) * 1.5;
      points.push(x, y, z);
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01 * speed;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.7) * 0.4;
    }
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        const t = ((i / 8 + state.clock.elapsedTime * speed * 0.3) % 1);
        const x = Math.sin(t * Math.PI * 2) * 0.3;
        const y = Math.cos(t * Math.PI * 1.5) * 0.2;
        const z = (t - 0.5) * 1.5;
        particle.position.set(x, y, z);
      });
    }
  });

  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.6 }), [color]);
  const lineObject = useMemo(() => new THREE.Line(streamGeometry, lineMaterial), [streamGeometry, lineMaterial]);

  return (
    <group ref={groupRef} position={position}>
      <primitive object={lineObject} />
      {/* Flowing particles along the stream */}
      <group ref={particlesRef}>
        {[...Array(8)].map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={1}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Abstract Data Network
function DataNetwork({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const networkGeometry = useMemo(() => {
    const vertices: number[] = [];
    const indices: number[] = [];
    const layers = 3;
    const nodesPerLayer = 6;
    
    // Create layered network structure
    for (let layer = 0; layer < layers; layer++) {
      const z = (layer - layers / 2) * 0.4;
      for (let i = 0; i < nodesPerLayer; i++) {
        const angle = (i / nodesPerLayer) * Math.PI * 2;
        const radius = 0.4;
        vertices.push(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          z
        );
      }
    }
    
    // Connect nodes between layers
    for (let layer = 0; layer < layers - 1; layer++) {
      for (let i = 0; i < nodesPerLayer; i++) {
        const currentIdx = layer * nodesPerLayer + i;
        const nextIdx = (layer + 1) * nodesPerLayer + (i + 1) % nodesPerLayer;
        indices.push(currentIdx, nextIdx);
      }
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    return geometry;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.008 * speed;
      groupRef.current.rotation.x += 0.005 * speed;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.6) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <lineSegments geometry={networkGeometry}>
        <lineBasicMaterial color={color} transparent opacity={0.5} />
      </lineSegments>
      {/* Nodes at intersections */}
      {[...Array(18)].map((_, i) => {
        const layer = Math.floor(i / 6);
        const node = i % 6;
        const angle = (node / 6) * Math.PI * 2;
        const z = (layer - 1) * 0.4;
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.4, Math.sin(angle) * 0.4, z]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.7}
              transparent
              opacity={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Flowing Data Ribbon
function DataRibbon({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Group>(null);
  
  const ribbonGeometry = useMemo(() => {
    const segments = 40;
    const vertices: number[] = [];
    const indices: number[] = [];
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = Math.sin(t * Math.PI * 4) * 0.2;
      const y = (t - 0.5) * 1.2;
      const z = Math.cos(t * Math.PI * 3) * 0.15;
      vertices.push(x, y, z);
    }
    
    for (let i = 0; i < segments; i++) {
      indices.push(i, i + 1);
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    return geometry;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.01 * speed;
      groupRef.current.rotation.y += 0.007 * speed;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.8) * 0.35;
    }
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        const t = ((i / 12 + state.clock.elapsedTime * speed * 0.2) % 1);
        const x = Math.sin(t * Math.PI * 4) * 0.2;
        const y = (t - 0.5) * 1.2;
        const z = Math.cos(t * Math.PI * 3) * 0.15;
        particle.position.set(x, y, z);
      });
    }
  });

  const ribbonLineMaterial = useMemo(() => new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.7 }), [color]);
  const ribbonLineObject = useMemo(() => new THREE.Line(ribbonGeometry, ribbonLineMaterial), [ribbonGeometry, ribbonLineMaterial]);

  return (
    <group ref={groupRef} position={position}>
      <primitive object={ribbonLineObject} />
      {/* Glowing particles */}
      <group ref={particlesRef}>
        {[...Array(12)].map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={1.2}
              transparent
              opacity={0.9}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Circuit Pattern
function CircuitPattern({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const circuitGeometry = useMemo(() => {
    const vertices: number[] = [];
    const indices: number[] = [];
    
    // Create a circuit-like pattern
    const gridSize = 4;
    const spacing = 0.3;
    
    // Create grid points
    const points: [number, number, number][] = [];
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        points.push([
          (x - gridSize / 2) * spacing,
          (y - gridSize / 2) * spacing,
          (Math.random() - 0.5) * 0.2
        ]);
      }
    }
    
    // Connect points in a circuit pattern
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[(i + 1) % points.length];
      vertices.push(...current, ...next);
      indices.push(i * 2, i * 2 + 1);
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    return geometry;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.006 * speed;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <lineSegments geometry={circuitGeometry}>
        <lineBasicMaterial color={color} transparent opacity={0.6} />
      </lineSegments>
      {/* Circuit nodes */}
      {[...Array(16)].map((_, i) => {
        const x = (i % 4 - 1.5) * 0.3;
        const y = (Math.floor(i / 4) - 1.5) * 0.3;
        return (
          <mesh key={i} position={[x, y, 0]}>
            <boxGeometry args={[0.06, 0.06, 0.06]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.9}
              metalness={0.95}
              roughness={0.05}
              transparent
              opacity={0.85}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Particle Field with data flow effect
function DataParticleField() {
  const particles = useMemo(() => {
    const count = 400;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    const color1 = new THREE.Color("#5ba8ff");
    const color2 = new THREE.Color("#016fee");
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 30;
      positions[i3 + 1] = (Math.random() - 0.5) * 30;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
      
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
      
      const color = Math.random() > 0.5 ? color1 : color2;
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    
    return { positions, colors, velocities };
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);

  useFrame((state) => {
    if (pointsRef.current && geometryRef.current) {
      pointsRef.current.rotation.y += 0.0003;
      
      // Animate particles in a flowing pattern
      const positions = geometryRef.current.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(state.clock.elapsedTime + i) * 0.01;
        positions[i + 1] += Math.cos(state.clock.elapsedTime * 0.7 + i) * 0.01;
      }
      geometryRef.current.attributes.position.needsUpdate = true;
    }
  });

  const pointsGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(particles.positions, 3));
    geom.setAttribute('color', new THREE.Float32BufferAttribute(particles.colors, 3));
    geometryRef.current = geom;
    return geom;
  }, [particles.positions, particles.colors]);

  return (
    <points ref={pointsRef} geometry={pointsGeometry}>
      <pointsMaterial 
        size={0.1} 
        transparent 
        opacity={0.8}
        vertexColors
        sizeAttenuation={true}
      />
    </points>
  );
}

export default function ThreeDBackground() {
  const shapes = useMemo(() => {
    return [
      { position: [-3, 0, -2] as [number, number, number], color: "#5ba8ff", type: "neural" as const, speed: 1 },
      { position: [3, 1, -3] as [number, number, number], color: "#016fee", type: "flow" as const, speed: 0.8 },
      { position: [0, -1, -4] as [number, number, number], color: "#5ba8ff", type: "network" as const, speed: 1.2 },
      { position: [-2, 2, -3] as [number, number, number], color: "#016fee", type: "ribbon" as const, speed: 0.9 },
      { position: [2, -1, -2] as [number, number, number], color: "#5ba8ff", type: "circuit" as const, speed: 1.1 },
      { position: [-1, -2, -3] as [number, number, number], color: "#016fee", type: "neural" as const, speed: 0.7 },
      { position: [1, 2, -2] as [number, number, number], color: "#5ba8ff", type: "flow" as const, speed: 1.3 },
      { position: [-2.5, -1.5, -3.5] as [number, number, number], color: "#016fee", type: "network" as const, speed: 1.4 },
      { position: [2.5, 1.5, -2.5] as [number, number, number], color: "#5ba8ff", type: "ribbon" as const, speed: 0.9 },
      { position: [-1.5, 0.5, -3] as [number, number, number], color: "#016fee", type: "circuit" as const, speed: 1.0 },
    ];
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.4} />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#5ba8ff" />
        <pointLight position={[0, 10, -5]} intensity={0.9} color="#016fee" />
        <directionalLight position={[5, 5, 5]} intensity={0.7} />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#5ba8ff" />
        
        {shapes.map((shape, index) => {
          switch (shape.type) {
            case "neural":
              return <NeuralNodeCluster key={index} {...shape} />;
            case "flow":
              return <DataFlowStream key={index} {...shape} />;
            case "network":
              return <DataNetwork key={index} {...shape} />;
            case "ribbon":
              return <DataRibbon key={index} {...shape} />;
            case "circuit":
              return <CircuitPattern key={index} {...shape} />;
            default:
              return null;
          }
        })}
        
        <DataParticleField />
      </Canvas>
    </div>
  );
}
