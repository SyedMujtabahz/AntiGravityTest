import React, { useRef, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  Variants,
} from 'framer-motion';
import { ServiceItem } from '../data/services';

interface TiltServiceCardProps {
  service: ServiceItem;
}

export const cardFadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const TiltServiceCard: React.FC<TiltServiceCardProps> = ({ service }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized cursor coordinates (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Pixel cursor coordinates for specular spotlight glare
  const glareX = useMotionValue(180);
  const glareY = useMotionValue(120);

  // Smooth spring physics for 3D tilt
  const springConfig = { stiffness: 260, damping: 22, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  const spotlightBackground = useMotionTemplate`radial-gradient(360px circle at ${glareX}px ${glareY}px, rgba(76, 215, 246, 0.16), rgba(77, 142, 255, 0.06) 45%, transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    mouseX.set(localX / width - 0.5);
    mouseY.set(localY / height - 0.5);
    glareX.set(localX);
    glareY.set(localY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      variants={cardFadeUpVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.985 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      animate={{
        scale: isHovered ? 1.02 : 1,
        borderColor: isHovered
          ? 'rgba(76, 215, 246, 0.55)'
          : 'rgba(140, 144, 159, 0.2)',
        boxShadow: isHovered
          ? '0 22px 45px -12px rgba(3, 181, 211, 0.28), 0 0 25px -5px rgba(77, 142, 255, 0.2)'
          : '0 4px 20px -4px rgba(0, 0, 0, 0.35)',
      }}
      transition={{
        scale: { type: 'spring', stiffness: 300, damping: 24 },
        borderColor: { duration: 0.2 },
        boxShadow: { duration: 0.25 },
      }}
      className="service-item glass-card p-5 sm:p-6 rounded-xl flex flex-col justify-between relative cursor-default will-change-transform"
      data-category={service.category}
    >
      {/* Dynamic 3D Specular Spotlight Glare */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl z-10"
        style={{
          background: spotlightBackground,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Top Service Image Header */}
      <div
        className="overflow-hidden rounded-t-xl relative -mt-5 -mx-5 sm:-mt-6 sm:-mx-6 mb-5 sm:mb-6"
        style={{ transform: 'translateZ(14px)' }}
      >
        <motion.img
          className="w-full h-40 sm:h-44 object-cover rounded-t-xl border-b border-outline-variant/30"
          src={service.imageUrl}
          alt={service.imageAlt}
          loading="lazy"
          decoding="async"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Card Body */}
      <div className="relative z-20" style={{ transform: 'translateZ(24px)' }}>
        <div className="flex items-center justify-between mb-4">
          <motion.div
            animate={{
              borderColor: isHovered
                ? 'rgba(76, 215, 246, 0.9)'
                : 'rgba(66, 71, 84, 1)',
            }}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-surface-container-high border border-outline-variant flex items-center justify-center text-secondary"
          >
            <span className="material-symbols-outlined text-xl sm:text-2xl">
              {service.icon}
            </span>
          </motion.div>
          <span className="font-label-sm text-label-sm text-outline">
            {service.code}
          </span>
        </div>

        <h3 className="font-headline-sm text-[18px] sm:text-headline-sm text-on-surface mb-2">
          {service.title}
        </h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 leading-relaxed">
          {service.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5 sm:mb-6">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded bg-surface-container-high text-outline font-label-sm text-label-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div
        className="relative z-20 flex items-center justify-between pt-4 border-t border-outline-variant/30"
        style={{ transform: 'translateZ(20px)' }}
      >
        <a
          className="font-label-sm text-label-sm text-secondary hover:text-on-surface flex items-center gap-1 py-1"
          href="#contact"
        >
          <span>Book Diagnostic</span>
          <motion.span
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="material-symbols-outlined text-xs"
          >
            arrow_forward
          </motion.span>
        </a>
        <span className="font-label-sm text-label-sm text-outline">
          {service.badge}
        </span>
      </div>
    </motion.article>
  );
};
