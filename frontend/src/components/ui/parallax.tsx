import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export const Parallax = ({ children, speed = 0.5, className = '' }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
  
  return (
    <motion.div
      ref={ref}
      style={{ y, position: 'relative' }}
      className={`${className} relative`}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxSectionProps {
  children: ReactNode;
  bgImage: string;
  overlay?: boolean;
  className?: string;
}

export const ParallaxSection = ({ 
  children, 
  bgImage, 
  overlay = true, 
  className = '' 
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 15]);
  
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, position: 'absolute' }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center h-[120%] w-full" 
          style={{ backgroundImage: `url(${bgImage})`, position: 'absolute' }}
        />
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
        )}
      </motion.div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
