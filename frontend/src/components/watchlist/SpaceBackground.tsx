import React, { useRef, useMemo, useEffect } from 'react';
// useThree убран из импорта, если не используется в Stars/Dust
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

import * as THREE from 'three';

// --- Компонент Stars (без изменений с предыдущего шага, useFrame внутри него - ОК) ---
const Stars: React.FC<{ count?: number; scrollRatio: React.MutableRefObject<number> }> = ({
  count = 10000,
  scrollRatio, // Хотя scrollRatio больше не используется здесь
}) => {
  const meshRef = useRef<THREE.Points>(null!);
  //const circleTexture = useTexture('D:/SmartMoneyApp/frontend/public/star2.png');
  const { positions, colors } = useMemo(() => { // Теперь возвращаем объект
    const vertices = [];
    const vertexColors = []; // Массив для цветов
    const radius = 110;

    const baseColor = new THREE.Color('#FFFFFF'); // Базовый белый
    const warmColor = new THREE.Color('rgb(242, 200, 117)'); // Теплый желтоватый
    const coolColor = new THREE.Color('rgb(131, 127, 232)'); // Холодный голубоватый

    for (let i = 0; i < count; i++) {
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        const randomFactor = 0.7 + Math.random() * 0.9;
        vertices.push(x * randomFactor, y * randomFactor, z * randomFactor);

        // --- Логика добавления цвета ---
        let color = baseColor;
        const rand = Math.random();
        if (rand < 0.1) { // 10% "теплых" звезд
            color = warmColor;
        } else if (rand > 0.9) { // 10% "холодных" звезд
            color = coolColor;
        }
        // Добавляем R, G, B компоненты цвета
        vertexColors.push(color.r, color.g, color.b);
    }
    // Возвращаем позиции и цвета
    return {
        positions: new Float32Array(vertices),
        colors: new Float32Array(vertexColors)
    };
}, [count]);


  useFrame((state, delta) => { // Этот useFrame в порядке, т.к. Stars рендерится внутри Canvas
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.02;
      meshRef.current.rotation.x += delta * 0.005;
      const scrollEffect = 1 + scrollRatio.current * 0.01;
      meshRef.current.rotation.y += delta * 0.1 * scrollEffect * 0.09;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
        <bufferAttribute
                attach="attributes-color" // Стандартное имя для цветов вершин
                args={[colors, 3]} // Используем colors из useMemo
                count={colors.length / 3}
            />
      </bufferGeometry>
      <pointsMaterial /* ... параметры материала ... */
         attach="material"
         size={0.5}
         //color="#FFFFFF"
         //map={circleTexture} 
         sizeAttenuation={true}
         vertexColors={true} 
         transparent={true}
         opacity={0.9}
         depthWrite={false}
        //blending={THREE.AdditiveBlending} // AdditiveBlending обычно хорошо смотрится для звезд/света
         blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// --- Компонент Dust (без изменений с предыдущего шага, useFrame внутри него - ОК) ---
const Dust: React.FC<{ count?: number; scrollRatio: React.MutableRefObject<number> }> = ({
    count = 4000,
    scrollRatio, // Не используется
}) => {
    const meshRef = useRef<THREE.Points>(null!);
    const positions = useMemo(() => {
        const vertices = [];
        const radius = 100; // Или 500, если хотите в том же объеме, что и звезды
        for (let i = 0; i < count; i++) {
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);
            const randomFactor = 0.8 + Math.random() * 0.4;
            vertices.push(x * randomFactor, y * randomFactor, z * randomFactor);
        }
        return new Float32Array(vertices);
    }, [count]);

    useFrame((state, delta) => { // Этот useFrame в порядке
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.01;
        }
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                    count={positions.length / 3}
                />
            </bufferGeometry>
            <pointsMaterial /* ... параметры материала ... */
                attach="material"
                size={0.15} // <<< --- Делаем пыль ЗНАЧИТЕЛЬНО меньше
                 color="rgb(100, 100, 110)"
                sizeAttenuation={true}
                transparent={true}
                opacity={0.55}
                depthWrite={false}
                blending={THREE.NormalBlending}
            />
        </points>
    );
};


// --- НОВЫЙ КОМПОНЕНТ ДЛЯ УПРАВЛЕНИЯ КАМЕРОЙ ---
const CameraController: React.FC<{ scrollRatio: React.MutableRefObject<number> }> = ({ scrollRatio }) => {
  // Используем useFrame ЗДЕСЬ, внутри компонента, который будет рендериться ВНУТРИ Canvas
  useFrame((state, delta) => {
    const initialZ = 5;
    const maxZOffset = 45;
    const targetZ = initialZ + scrollRatio.current * maxZOffset;
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.08);
    state.camera.lookAt(0, 0, 0);
  });

  return null; // Этот компонент ничего не рендерит в DOM, он только выполняет логику анимации
};


// Основной компонент фона
const SpaceBackground: React.FC = () => {
  const scrollRatio = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRatio.current = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- УБРАЛИ useFrame отсюда ---

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: 'linear-gradient(to bottom, #000000,rgb(56, 0, 56))' }}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 70 }}
      >
        {/* --- ДОБАВЛЯЕМ КОМПОНЕНТ УПРАВЛЕНИЯ КАМЕРОЙ ВНУТРЬ CANVAS --- */}
        <CameraController scrollRatio={scrollRatio} />

        <fogExp2 attach="fog" args={[0x1a001a, 0.007]} />
         {/* --- ОСВЕЩЕНИЕ (ВАЖНО ДЛЯ ПЛАНЕТЫ) --- */}
        {/* Общий слабый свет со всех сторон */}
        <ambientLight intensity={0.2} />
        {/* Направленный свет, имитирующий солнце/звезду */}
        {/* Положение position определяет, с какой стороны свет падает */}
        <directionalLight
            intensity={8.5} // Сделаем поярче
            position={[5, 5, 5]} // Светит примерно справа-сверху-спереди
            color="rgb(255, 255, 255)"
        />
        <Stars scrollRatio={scrollRatio} />
        <Dust scrollRatio={scrollRatio} />
        <mesh position={[0, 0, -50]}> {/* Поставим перед камерой для теста */}
        <sphereGeometry args={[2.5, 32, 32]} /> {/* Сфера радиусом 2 */}
        <meshStandardMaterial color="rgba(128, 14, 101, 0)" roughness={0.5} metalness={1.1} />
        </mesh>
      </Canvas>
    </div>
  );
};

export default SpaceBackground;