import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const randomColors = (count: number) => {
  return new Array(count)
    .fill(0)
    .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
};

interface TubesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

export function TubesBackground({ 
  children, 
  className,
  enableClickInteraction = true 
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const tubesRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    let cleanup: (() => void) | undefined;

    const initTubes = async () => {
      if (!canvasRef.current) return;

      try {
        // Strict WebGL check before loading the external script
        const canvas = canvasRef.current;
        // Attempt to get a WebGL context to verify support
        const gl = canvas.getContext('webgl', { 
          failIfMajorPerformanceCaveat: true,
          preserveDrawingBuffer: false 
        }) || canvas.getContext('experimental-webgl');
        
        if (!gl) {
          console.warn("WebGL context not available or hardware acceleration disabled.");
          return;
        }

        // Global error suppression for Three.js initialization failures
        const originalError = window.onerror;
        window.onerror = function(message, source, lineno, colno, error) {
          const msg = String(message);
          if (msg.includes('getSupportedExtensions') || msg.includes('Three.js')) {
            console.warn("Gracefully suppressed Three.js initialization error.");
            setIsLoaded(false); 
            return true; 
          }
          return originalError ? originalError(message, source, lineno, colno, error) : false;
        };

        // Try-catch block specifically for the library call
        try {
          // @ts-ignore
          const module = await import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js');
          const TubesCursor = module.default;

          if (!mounted || !canvasRef.current) {
            window.onerror = originalError;
            return;
          }

          const app = TubesCursor(canvasRef.current, {
            tubes: {
              colors: ["#f967fb", "#53bc28", "#6958d5"],
              lights: {
                intensity: 200,
                colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"]
              }
            }
          });

          tubesRef.current = app;
          setIsLoaded(true);
        } catch (innerError) {
          console.warn("Failed to initialize TubesCursor library:", innerError);
          setIsLoaded(false);
        } finally {
          // Restore handler after a delay to catch async init errors
          setTimeout(() => {
            window.onerror = originalError;
          }, 2000);
        }

      } catch (error) {
        console.error("Failed to load TubesCursor:", error);
      }
    };

    initTubes();

    return () => {
      mounted = false;
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div 
      className={cn("relative w-full h-full min-h-[400px] overflow-hidden bg-background", className)}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block"
        style={{ touchAction: 'none' }}
      />
      
      <div className="relative z-10 w-full h-full pointer-events-none">
        {children}
      </div>
    </div>
  );
}

export default TubesBackground;
