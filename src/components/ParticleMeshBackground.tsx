import React, { useEffect, useMemo, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ParticleNode {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

interface MeshEdge {
  id: string;
  source: ParticleNode;
  target: ParticleNode;
  distance: number;
}

export const ParticleMeshBackground: React.FC = () => {
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 45, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 25 });

  const parallaxX = useTransform(springX, [-0.5, 0.5], [-24, 24]);
  const parallaxY = useTransform(springY, [-0.5, 0.5], [-24, 24]);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobileViewport(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport, { passive: true });
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      mouseX.set(nx);
      mouseY.set(ny);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const { nodes, edges } = useMemo(() => {
    // Full 7x5 constellation on desktop; lighter 5x4 constellation on mobile for smooth 60fps mobile GPU performance
    const cols = isMobileViewport ? 5 : 7;
    const rows = isMobileViewport ? 4 : 5;
    const generatedNodes: ParticleNode[] = [];

    let id = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const seed = (r * cols + c + 1) * 9301 + 49297;
        const rand1 = (seed % 233280) / 233280 - 0.5;
        const rand2 = ((seed * 7) % 233280) / 233280 - 0.5;
        const baseX = ((c + 0.5) / cols) * 1440 + rand1 * 140;
        const baseY = ((r + 0.5) / rows) * 900 + rand2 * 110;

        generatedNodes.push({
          id: id++,
          x: Math.max(40, Math.min(1400, baseX)),
          y: Math.max(40, Math.min(860, baseY)),
          dx: rand1 * 38,
          dy: rand2 * 34,
          size: id % 4 === 0 ? 3.4 : id % 2 === 0 ? 2.4 : 1.8,
          duration: 7 + (id % 6) * 1.4,
          delay: (id % 5) * 0.4,
          color: id % 3 === 0 ? '#4d8eff' : '#4cd7f6',
        });
      }
    }

    const generatedEdges: MeshEdge[] = [];
    const maxDist = isMobileViewport ? 340 : 290;
    for (let i = 0; i < generatedNodes.length; i++) {
      for (let j = i + 1; j < generatedNodes.length; j++) {
        const a = generatedNodes[i];
        const b = generatedNodes[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < maxDist) {
          generatedEdges.push({
            id: `${a.id}-${b.id}`,
            source: a,
            target: b,
            distance: dist,
          });
        }
      }
    }

    return { nodes: generatedNodes, edges: generatedEdges };
  }, [isMobileViewport]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background">
      {/* Ambient Deep Cybernetic Glows */}
      <motion.div
        className="absolute -top-40 left-1/4 h-[340px] w-[340px] sm:h-[520px] sm:w-[520px] rounded-full bg-primary-container/10 blur-[110px] sm:blur-[140px]"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.55, 0.85, 0.55],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 h-[380px] w-[380px] sm:h-[600px] sm:w-[600px] rounded-full bg-secondary/10 blur-[120px] sm:blur-[160px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.45, 0.75, 0.45],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 -left-32 h-[320px] w-[320px] sm:h-[500px] sm:w-[500px] rounded-full bg-tertiary-container/10 blur-[110px] sm:blur-[140px]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      />

      {/* Subtle Framer Motion Particle Mesh Constellation */}
      <motion.svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{
          x: parallaxX,
          y: parallaxY,
        }}
        className="h-full w-full opacity-75"
      >
        <defs>
          <radialGradient id="nodeGlowCyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4cd7f6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4cd7f6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nodeGlowBlue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4d8eff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4d8eff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="meshLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4cd7f6" stopOpacity="0.22" />
            <stop offset="50%" stopColor="#4d8eff" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#2fd9f4" stopOpacity="0.22" />
          </linearGradient>
        </defs>

        {/* Animated Mesh Connection Lines */}
        {edges.map((edge, idx) => {
          const baseOpacity = Math.max(0.05, (1 - edge.distance / 340) * 0.24);
          return (
            <motion.line
              key={edge.id}
              x1={edge.source.x}
              y1={edge.source.y}
              x2={edge.target.x}
              y2={edge.target.y}
              stroke="url(#meshLineGrad)"
              strokeWidth={edge.distance < 190 ? 1.1 : 0.7}
              initial={{ opacity: baseOpacity }}
              animate={{
                x1: [
                  edge.source.x,
                  edge.source.x + edge.source.dx,
                  edge.source.x,
                ],
                y1: [
                  edge.source.y,
                  edge.source.y + edge.source.dy,
                  edge.source.y,
                ],
                x2: [
                  edge.target.x,
                  edge.target.x + edge.target.dx,
                  edge.target.x,
                ],
                y2: [
                  edge.target.y,
                  edge.target.y + edge.target.dy,
                  edge.target.y,
                ],
                opacity: [
                  baseOpacity * 0.6,
                  baseOpacity * 1.4,
                  baseOpacity * 0.6,
                ],
              }}
              transition={{
                duration: (edge.source.duration + edge.target.duration) / 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: (idx % 6) * 0.25,
              }}
            />
          );
        })}

        {/* Animated Particle Nodes */}
        {nodes.map((node) => (
          <motion.g
            key={node.id}
            animate={{
              x: [0, node.dx, 0],
              y: [0, node.dy, 0],
            }}
            transition={{
              duration: node.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: node.delay,
            }}
          >
            {/* Outer Halo */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.size * 3.8}
              fill={
                node.color === '#4d8eff'
                  ? 'url(#nodeGlowBlue)'
                  : 'url(#nodeGlowCyan)'
              }
              animate={{
                scale: [0.85, 1.35, 0.85],
                opacity: [0.25, 0.6, 0.25],
              }}
              transition={{
                duration: node.duration * 0.65,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: node.delay,
              }}
            />
            {/* Core Particle Dot */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill={node.color}
              opacity={0.75}
            />
          </motion.g>
        ))}
      </motion.svg>

      {/* Vignette Edge Darkening for High Contrast */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_center,transparent_25%,rgba(11,19,38,0.65)_100%)]
        "
      />
    </div>
  );
};
