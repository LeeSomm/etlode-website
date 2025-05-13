<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';

  let canvas: HTMLCanvasElement;
  let animationId: number | null = null;
  let resizeObserver: ResizeObserver;
  
  onMount(() => {
    if (!canvas) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    function setupCanvas() {
      // Set canvas dimensions with device pixel ratio for sharp rendering
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      // Set canvas size in CSS
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      return { width: rect.width, height: rect.height };
    }

    // Initial setup
    let { width, height } = setupCanvas();
    let centerX = width / 2;
    let centerY = height / 2;
    
    // Calculate scale factor based on canvas size
    const getScaleFactor = () => {
      const minDimension = Math.min(width, height);
      return minDimension / 400; // Base scale on a 400px reference
    };

    // Draw the main circular AI core
    const drawCore = (scale: number) => {
      // Outer glow
      const coreRadius = 60 * scale;
      const glowRadius = 100 * scale;
      
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowRadius);
      gradient.addColorStop(0, "rgba(45, 212, 191, 0.8)"); // teal-400
      gradient.addColorStop(0.7, "rgba(45, 212, 191, 0.2)");
      gradient.addColorStop(1, "rgba(45, 212, 191, 0)");

      ctx.beginPath();
      ctx.arc(centerX, centerY, glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Inner core
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(17, 24, 39, 0.9)"; // gray-900
      ctx.strokeStyle = "rgba(45, 212, 191, 0.8)"; // teal-400
      ctx.lineWidth = 2 * scale;
      ctx.fill();
      ctx.stroke();

      // Center dot
      ctx.beginPath();
      ctx.arc(centerX, centerY, 10 * scale, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(45, 212, 191, 1)"; // teal-400
      ctx.fill();
    };

    // Draw orbiting elements representing languages and data
    const drawOrbitingElements = (time: number, scale: number) => {
      const languages = ["EN", "ES", "FR", "DE", "ZH", "JA", "AR", "RU"];
      const orbitRadius = 160 * scale;
      const nodeRadius = 20 * scale;

      languages.forEach((lang, i) => {
        const angle = (i / languages.length) * Math.PI * 2 + time / 5000;
        const x = centerX + Math.cos(angle) * orbitRadius;
        const y = centerY + Math.sin(angle) * orbitRadius;

        // Draw connecting line
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(45, 212, 191, ${0.2 + Math.sin(time / 5000 + i) * 0.1})`;
        ctx.lineWidth = scale;
        ctx.stroke();

        // Draw language node
        ctx.beginPath();
        ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(17, 24, 39, 0.9)"; // gray-900
        ctx.strokeStyle = "rgba(45, 212, 191, 0.8)"; // teal-400
        ctx.lineWidth = 1.5 * scale;
        ctx.fill();
        ctx.stroke();

        // Draw language text
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.font = `${Math.max(10 * scale, 8)}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(lang, x, y);
      });
    };

    // Draw data streams
    const drawDataStreams = (time: number, scale: number) => {
      const streamCount = 24;
      const innerRadius = 70 * scale;

      for (let i = 0; i < streamCount; i++) {
        const angle = (i / streamCount) * Math.PI * 2;
        const length = (40 + Math.sin(time / 5000 + i * 0.5) * 20) * scale;
        const outerRadius = innerRadius + length;

        const startX = centerX + Math.cos(angle) * innerRadius;
        const startY = centerY + Math.sin(angle) * innerRadius;
        const endX = centerX + Math.cos(angle) * outerRadius;
        const endY = centerY + Math.sin(angle) * outerRadius;

        const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
        gradient.addColorStop(0, "rgba(45, 212, 191, 0.9)");
        gradient.addColorStop(1, "rgba(45, 212, 191, 0)");

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2 * scale;
        ctx.stroke();
      }
    };

    // Draw binary/data particles
    const drawDataParticles = (time: number, scale: number) => {
      const particleCount = 50;
      const baseDistance = 80 * scale;
      const variation = 30 * scale;

      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = baseDistance + Math.sin(time / 5000 + i) * variation;
        const x = centerX + Math.cos(angle + time / 2000) * distance;
        const y = centerY + Math.sin(angle + time / 2000) * distance;

        ctx.fillStyle = `rgba(45, 212, 191, ${0.4 + Math.sin(time / 5000 + i) * 0.2})`;
        ctx.font = `${Math.max(8 * scale, 6)}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Alternate between 1 and 0 for binary effect
        const text = i % 2 === 0 ? "1" : "0";
        ctx.fillText(text, x, y);
      }
    };

    // Draw network connections between languages
    const drawNetworkConnections = (time: number, scale: number) => {
      const languages = 8;
      const orbitRadius = 130 * scale;

      for (let i = 0; i < languages; i++) {
        const angle1 = (i / languages) * Math.PI * 2 + time / 5000;
        const x1 = centerX + Math.cos(angle1) * orbitRadius;
        const y1 = centerY + Math.sin(angle1) * orbitRadius;

        for (let j = i + 1; j < languages; j++) {
          if (Math.random() > 0.7) continue; // Only draw some connections

          const angle2 = (j / languages) * Math.PI * 2 + time / 5000;
          const x2 = centerX + Math.cos(angle2) * orbitRadius;
          const y2 = centerY + Math.sin(angle2) * orbitRadius;

          const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          const maxDistance = 300 * scale;
          const opacity = Math.max(0, 1 - distance / maxDistance);

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgba(45, 212, 191, ${opacity * 0.3})`;
          ctx.lineWidth = 0.5 * scale;
          ctx.stroke();
        }
      }
    };

    // Animation loop
    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      
      // Get current scale factor based on canvas size
      const scale = getScaleFactor();

      drawCore(scale);
      drawDataStreams(time, scale);
      drawOrbitingElements(time, scale);
      drawDataParticles(time, scale);
      drawNetworkConnections(time, scale);

      animationId = requestAnimationFrame(animate);
    };

    animate(0);

    // Handle window resizing
    resizeObserver = new ResizeObserver(() => {
      // Update canvas dimensions and recalculate centerX/Y
      const dimensions = setupCanvas();
      width = dimensions.width;
      height = dimensions.height;
      centerX = width / 2;
      centerY = height / 2;
    });
    
    resizeObserver.observe(canvas);
  });

  onDestroy(() => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
  });
</script>

<div 
  class="relative w-full aspect-square md:aspect-[4/3]" 
  in:fade={{ duration: 5000 }}
>
  <canvas
    bind:this={canvas}
    class="w-full h-full"
    style="filter: drop-shadow(0 0 10px rgba(45, 212, 191, 0.3));"
  ></canvas>
</div>