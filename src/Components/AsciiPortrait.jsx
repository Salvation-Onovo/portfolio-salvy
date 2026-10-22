import React, { useRef, useEffect, useState } from "react";

// Module-level cache to persist between remounts
const memoryCache = {};

/*
|--------------------------------------------------------------------------
| RESPONSIVE PORTRAIT SIZE
|--------------------------------------------------------------------------
*/

const calculateSize = (width) => {
  if (width <= 480) {
    return Math.min(220, width - 30);
  } else if (width <= 768) {
    return Math.min(280, width - 50);
  } else {
    return 500;
  }
};

const AsciiPortrait = () => {
  const canvasRef = useRef(null);

  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    active: false,
  });

  const mouseTargetRef = useRef({
    x: -1000,
    y: -1000,
  });

  const particlesRef = useRef([]);

  const startTimeRef = useRef(null);

  const [size, setSize] = useState(() => calculateSize(window.innerWidth));

  const [dataReady, setDataReady] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | ASCII CHARACTER SET
  |--------------------------------------------------------------------------
  |
  | From light/sparse → dark/dense
  |
  */

  const chars = " .·:-=+*#%@".split("");

  /*
  |--------------------------------------------------------------------------
  | RESPONSIVE SIZE LISTENER
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const updateSize = () => {
      setSize(calculateSize(window.innerWidth));
    };

    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | CREATE PARTICLES
  |--------------------------------------------------------------------------
  */

  const createParticlesFromRaw = (rawParticles, isMobileSize) => {
    const fontSize = isMobileSize ? 3 : 4;

    return rawParticles.map((p) => ({
      /*
      | Start particles scattered around
      | the portrait
      */
      x: p.x + (Math.random() - 0.5) * 500,

      y: p.y + (Math.random() - 0.5) * 500,

      /*
      | Final position
      */
      targetX: p.x,
      targetY: p.y,

      /*
      | Movement
      */
      vx: 0,
      vy: 0,

      /*
      | ASCII character
      */
      char: p.char,

      /*
      | Tiny characters
      */
      fontSize: fontSize,

      /*
      | Darker opacity
      */
      baseAlpha: p.alpha,

      currentAlpha: 0,

      /*
      | Staggered formation
      */
      delay: Math.random() * 0.5,

      /*
      | Shimmer phase
      */
      shimmer: Math.random() * Math.PI * 2,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | PROCESS THE ACTUAL PROFILE IMAGE
  |--------------------------------------------------------------------------
  */

  const processImage = (img, targetSize) => {
    const canvasWidth = targetSize;

    const canvasHeight = targetSize;

    const offscreen = document.createElement("canvas");

    const offCtx = offscreen.getContext("2d", {
      willReadFrequently: true,
    });

    offscreen.width = canvasWidth;

    offscreen.height = canvasHeight;

    /*
    |--------------------------------------------------------------------------
    | IMAGE SCALE
    |--------------------------------------------------------------------------
    |
    | 0.95 makes your portrait fill
    | more of the ASCII canvas.
    |
    */

    const scale = 0.80;

    const imgAspect = img.width / img.height;

    let drawHeight = canvasHeight * scale;

    let drawWidth = drawHeight * imgAspect;

    /*
    | Keep image inside canvas
    */

    if (drawWidth > canvasWidth * scale) {
      drawWidth = canvasWidth * scale;

      drawHeight = drawWidth / imgAspect;
    }

    /*
    |--------------------------------------------------------------------------
    | CENTER IMAGE
    |--------------------------------------------------------------------------
    */

    const offsetX = (canvasWidth - drawWidth) / 2;

    const offsetY = (canvasHeight - drawHeight) / 2;

    /*
    |--------------------------------------------------------------------------
    | DRAW ORIGINAL PNG
    |--------------------------------------------------------------------------
    */

    offCtx.clearRect(0, 0, canvasWidth, canvasHeight);

    offCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    /*
    |--------------------------------------------------------------------------
    | READ IMAGE PIXELS
    |--------------------------------------------------------------------------
    */

    const imageData = offCtx.getImageData(0, 0, canvasWidth, canvasHeight);

    const pixels = imageData.data;

    const rawParticles = [];

    /*
    |--------------------------------------------------------------------------
    | SMALLER CHARACTERS = MORE PARTICLES
    |--------------------------------------------------------------------------
    */

    const isMobileSize = targetSize <= 340;

    const fontSize = isMobileSize ? 3 : 4;

    /*
    | Smaller gaps produce
    | a denser portrait.
    */

    const colGap = fontSize * 0.65;

    const rowGap = fontSize * 0.85;

    /*
    |--------------------------------------------------------------------------
    | CONVERT IMAGE TO ASCII
    |--------------------------------------------------------------------------
    */

    for (let y = 0; y < canvasHeight; y += rowGap) {
      for (let x = 0; x < canvasWidth; x += colGap) {
        const pixelX = Math.floor(x);

        const pixelY = Math.floor(y);

        const i = (pixelY * canvasWidth + pixelX) * 4;

        /*
        | RGBA
        */

        const r = pixels[i];

        const g = pixels[i + 1];

        const b = pixels[i + 2];

        const a = pixels[i + 3];

        /*
        |--------------------------------------------------------------------------
        | IGNORE TRANSPARENT PIXELS
        |--------------------------------------------------------------------------
        |
        | Important for your PNG because
        | the background is transparent.
        |
        */

        if (a < 100) {
          continue;
        }

        /*
        |--------------------------------------------------------------------------
        | BRIGHTNESS
        |--------------------------------------------------------------------------
        */

        const brightness = (r + g + b) / (3 * 255);

        /*
        | Keep darker areas too.
        |
        | This gives more detail to the
        | hair, shirt and face.
        */

        if (brightness < 0.025) {
          continue;
        }

        /*
        |--------------------------------------------------------------------------
        | SELECT ASCII CHARACTER
        |--------------------------------------------------------------------------
        */

        const charIndex = Math.floor(brightness * (chars.length - 1));

        /*
        |--------------------------------------------------------------------------
        | SAVE PARTICLE
        |--------------------------------------------------------------------------
        */

        rawParticles.push({
          x: Number(x.toFixed(1)),

          y: Number(y.toFixed(1)),

          char: chars[charIndex],

          /*
          | Darker portrait
          */

          alpha: Number((0.1 + brightness * 0.4).toFixed(2)),
        });
      }
    }

    return rawParticles;
  };

  /*
  |--------------------------------------------------------------------------
  | LOAD IMAGE
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    setDataReady(false);

    /*
    |--------------------------------------------------------------------------
    | CHECK MEMORY CACHE
    |--------------------------------------------------------------------------
    */

    if (memoryCache[size]) {
      const isMobileSize = size <= 340;

      particlesRef.current = createParticlesFromRaw(
        memoryCache[size],
        isMobileSize,
      );

      startTimeRef.current = performance.now();

      setDataReady(true);

      return;
    }

    /*
    |--------------------------------------------------------------------------
    | LOAD YOUR PORTRAIT
    |--------------------------------------------------------------------------
    */

    const img = new Image();

    img.src = "/profile.png";

    img.onload = () => {
      const raw = processImage(img, size);

      /*
      | Save processed data
      | for future renders.
      */

      memoryCache[size] = raw;

      const isMobileSize = size <= 340;

      particlesRef.current = createParticlesFromRaw(raw, isMobileSize);

      startTimeRef.current = performance.now();

      setDataReady(true);
    };

    img.onerror = () => {
      console.error("Unable to load /profile.png");
    };
  }, [size]);

  /*
  |--------------------------------------------------------------------------
  | CANVAS ANIMATION
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    const dpr = window.devicePixelRatio || 1;

    /*
    |--------------------------------------------------------------------------
    | HIGH DPI CANVAS
    |--------------------------------------------------------------------------
    */

    canvas.width = size * dpr;

    canvas.height = size * dpr;

    canvas.style.width = `${size}px`;

    canvas.style.height = `${size}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let animationId;

    /*
    |--------------------------------------------------------------------------
    | DRAW
    |--------------------------------------------------------------------------
    */

    const draw = () => {
      animationId = requestAnimationFrame(draw);

      ctx.clearRect(0, 0, size, size);

      if (!dataReady || !particlesRef.current.length) {
        return;
      }

      const particles = particlesRef.current;

      const mouse = mouseRef.current;

      const mouseTarget = mouseTargetRef.current;

      const elapsed = (performance.now() - startTimeRef.current) / 1000;

      /*
      |--------------------------------------------------------------------------
      | SMOOTH MOUSE
      |--------------------------------------------------------------------------
      */

      mouse.x += (mouseTarget.x - mouse.x) * 0.5;

      mouse.y += (mouseTarget.y - mouse.y) * 0.5;

      /*
      |--------------------------------------------------------------------------
      | SMALL ASCII FONT
      |--------------------------------------------------------------------------
      */

      const isMobileSize = size <= 340;

      const fontSize = isMobileSize ? 3 : 4;

      ctx.font = `${fontSize}px monospace`;

      ctx.textAlign = "center";

      ctx.textBaseline = "middle";

      /*
      |--------------------------------------------------------------------------
      | PARTICLES
      |--------------------------------------------------------------------------
      */

      particles.forEach((p) => {
        const particleTime = elapsed - p.delay;

        if (particleTime < 0) {
          return;
        }

        /*
        |--------------------------------------------------------------------------
        | FADE IN
        |--------------------------------------------------------------------------
        */

        const fadeProgress = Math.min(particleTime / 1.5, 1);

        const easedFade = 1 - Math.pow(1 - fadeProgress, 2);

        /*
        |--------------------------------------------------------------------------
        | ACTIVE STATE
        |--------------------------------------------------------------------------
        */

        const isActive = mouse.active || particleTime < 3;

        /*
        |--------------------------------------------------------------------------
        | SUBTLE SHIMMER
        |--------------------------------------------------------------------------
        */

        const shimmerVal = isActive
          ? Math.sin(elapsed * 2 + p.shimmer) * 0.045
          : 0;

        p.currentAlpha = Math.max(0, p.baseAlpha * easedFade + shimmerVal);

        /*
        |--------------------------------------------------------------------------
        | MOUSE REPULSION
        |--------------------------------------------------------------------------
        */

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;

          const dist = Math.sqrt(dx * dx + dy * dy);

          /*
          | Interaction area
          */

          const maxDist = size * 0.25;

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 6;

            p.vx += (dx / dist) * force;

            p.vy += (dy / dist) * force;
          }
        }

        /*
        |--------------------------------------------------------------------------
        | RETURN TO ORIGINAL POSITION
        |--------------------------------------------------------------------------
        */

        const dx = p.targetX - p.x;

        const dy = p.targetY - p.y;

        const moveProgress = Math.min(particleTime / 2.5, 1);

        const easedMove = 1 - Math.pow(1 - moveProgress, 3);

        const pullStrength = 0.01 + easedMove * 0.08;

        p.vx += dx * pullStrength;

        p.vy += dy * pullStrength;

        /*
        |--------------------------------------------------------------------------
        | BREATHING EFFECT
        |--------------------------------------------------------------------------
        */

        if (isActive) {
          const breathX = Math.sin(elapsed * 0.5 + p.targetY * 0.1) * 0.12;

          const breathY = Math.cos(elapsed * 0.5 + p.targetX * 0.1) * 0.12;

          p.vx += breathX;

          p.vy += breathY;

          p.vx *= 0.96;

          p.vy *= 0.96;
        } else {
          /*
          | Settle particles
          */

          p.vx *= 0.85;

          p.vy *= 0.85;

          if (particleTime > 4 && Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01) {
            p.x = p.targetX;

            p.y = p.targetY;

            p.vx = 0;
            p.vy = 0;
          }
        }

        /*
        |--------------------------------------------------------------------------
        | UPDATE POSITION
        |--------------------------------------------------------------------------
        */

        p.x += p.vx;

        p.y += p.vy;

        /*
        |--------------------------------------------------------------------------
        | DARK GREEN ASCII
        |--------------------------------------------------------------------------
        */

        ctx.fillStyle = `rgba(
            100,
            255,
            218,
            ${p.currentAlpha * 0.7}
          )`;

        /*
        |--------------------------------------------------------------------------
        | DRAW CHARACTER
        |--------------------------------------------------------------------------
        */

        ctx.fillText(p.char, p.x, p.y);
      });
    };

    /*
    |--------------------------------------------------------------------------
    | MOUSE MOVE
    |--------------------------------------------------------------------------
    */

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();

      mouseTargetRef.current.x = e.clientX - rect.left;

      mouseTargetRef.current.y = e.clientY - rect.top;

      mouseRef.current.active = true;
    };

    /*
    |--------------------------------------------------------------------------
    | TOUCH MOVE
    |--------------------------------------------------------------------------
    */

    const handleTouchMove = (e) => {
      if (!e.touches.length) {
        return;
      }

      const rect = canvas.getBoundingClientRect();

      const touch = e.touches[0];

      mouseTargetRef.current.x = touch.clientX - rect.left;

      mouseTargetRef.current.y = touch.clientY - rect.top;

      mouseRef.current.active = true;

      if (e.cancelable) {
        e.preventDefault();
      }
    };

    /*
    |--------------------------------------------------------------------------
    | LEAVE
    |--------------------------------------------------------------------------
    */

    const handleLeave = () => {
      mouseRef.current.active = false;

      mouseTargetRef.current.x = -1000;

      mouseTargetRef.current.y = -1000;
    };

    /*
    |--------------------------------------------------------------------------
    | EVENTS
    |--------------------------------------------------------------------------
    */

    canvas.addEventListener("mousemove", handleMouseMove);

    canvas.addEventListener("mouseleave", handleLeave);

    canvas.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    canvas.addEventListener("touchend", handleLeave);

    /*
    |--------------------------------------------------------------------------
    | START ANIMATION
    |--------------------------------------------------------------------------
    */

    draw();

    /*
    |--------------------------------------------------------------------------
    | CLEANUP
    |--------------------------------------------------------------------------
    */

    return () => {
      cancelAnimationFrame(animationId);

      canvas.removeEventListener("mousemove", handleMouseMove);

      canvas.removeEventListener("mouseleave", handleLeave);

      canvas.removeEventListener("touchmove", handleTouchMove);

      canvas.removeEventListener("touchend", handleLeave);
    };
  }, [size, dataReady]);

  /*
  |--------------------------------------------------------------------------
  | CANVAS
  |--------------------------------------------------------------------------
  */

  return (
    <canvas
      ref={canvasRef}
      className="block"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        cursor: "crosshair",
        touchAction: "none",
      }}
    />
  );
};

export default AsciiPortrait;
