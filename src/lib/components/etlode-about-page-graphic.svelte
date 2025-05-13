<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Database, Cpu, ChartNoAxesCombined } from '@lucide/svelte';
  import { t } from '$lib/i18n';

  let canvas: HTMLCanvasElement;
  let animationFrame: number | null = null;
  let containerWidth: number = 0;
  let containerHeight: number = 0;

  // Colors from the ET-Lode logo with opacity variants
  const colors = {
    black: "#000000",
    yellow: "#FFE610",
    teal: "#4FD6CA",
    orange: "#FF8001",
    red: "#FF0001",
    green: "#80C41C",
  };


  // Particle class with improved visuals
  class Particle {
    x: number;
    y: number;
    size: number;
    color: string;
    speedX: number;
    speedY: number;
    alpha: number;
    pulse: number;
    stage: number; // 0 = extract, 1 = transform, 2 = load

    constructor(x: number, y: number, size: number, color: string, speedX: number, speedY: number, stage: number = 0) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
      this.speedX = speedX;
      this.speedY = speedY;
      this.alpha = 0.7 + Math.random() * 0.3; // Slight opacity variation
      this.pulse = Math.random() * Math.PI * 2; // Random starting phase
      this.stage = stage;
    }

    update(canvasWidth: number, canvasHeight: number, time: number): void {
      // Pulse size slightly
      const pulseFactor = Math.sin(time * 0.003 + this.pulse) * 0.15 + 1;
      
      this.x += this.speedX;
      this.y += this.speedY;

      // Determine where the particle is horizontally (which stage)
      const stageWidth = canvasWidth / 3;
      const currentStage = Math.floor(this.x / stageWidth);
      
      // Track which stage the particle is in
      if (currentStage !== this.stage && currentStage >= 0 && currentStage <= 2) {
        this.stage = currentStage;
        // Adjust particle appearance slightly based on stage
        this.speedY = (Math.random() * 0.6 - 0.3) * (currentStage === 1 ? 1.5 : 1); // More vertical movement in transform stage
      }

      // Reset particle position when it goes off-screen
      if (this.x > canvasWidth) {
        // Restart from left with new properties
        this.x = Math.random() * stageWidth * 0.3;
        this.y = canvasHeight * 0.5 + (Math.random() * 60 - 30);
        this.speedX = Math.random() * 1.5 + 1;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.stage = 0;
      }

      // If particle drifts too far vertically, bring it back toward the center
      const centerY = canvasHeight * 0.5;
      const maxVerticalDrift = canvasHeight * 0.25;
      
      if (Math.abs(this.y - centerY) > maxVerticalDrift) {
        this.speedY = (centerY - this.y) * 0.01; // Gently push back to center
      }
    }

    draw(ctx: CanvasRenderingContext2D, time: number): void {
      // Pulse size slightly
      const pulseFactor = Math.sin(time * 0.003 + this.pulse) * 0.15 + 1;
      const drawSize = this.size * pulseFactor;
      
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      
      // Draw a rounded square for a more polished look
      ctx.beginPath();
      roundRect(ctx, this.x - drawSize/2, this.y - drawSize/2, drawSize, drawSize, drawSize/4);
      ctx.fill();
      
      ctx.globalAlpha = 1.0;
    }
  }

  let particles: Particle[] = [];
  let time = 0;

  // Resize observer to handle container size changes
  let containerElement: HTMLDivElement;
  let resizeObserver: ResizeObserver;

  function handleResize(): void {
    if (!canvas) return;
    
    // Update container dimensions
    containerWidth = containerElement.offsetWidth;
    containerHeight = containerElement.offsetHeight;
    
    // Set canvas dimensions with pixel ratio for better resolution
    const dpr = window.devicePixelRatio || 1;
    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
    
    // Reinitialize particles for the new dimensions
    initParticles();
  }

  onMount(() => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize the container width and height
    containerWidth = containerElement.offsetWidth;
    containerHeight = containerElement.offsetHeight;

    // Set canvas dimensions with proper pixel ratio
    const dpr = window.devicePixelRatio || 1;
    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    ctx.scale(dpr, dpr);

    // Initialize particles
    initParticles();

    // Start animation
    animate();

    // Set up resize observer for responsive canvas
    resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerElement);

    // Also handle window resize for good measure
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }
    };
  });

  onDestroy(() => {
    if (animationFrame !== null) {
      cancelAnimationFrame(animationFrame);
    }
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
  });

  // Initialize particles
  function initParticles(): void {
    particles = [];
    const particleCount = Math.max(20, Math.floor(containerWidth / 30)); // Slightly more particles
    
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 6 + 3; // Slightly larger particles
      const x = Math.random() * containerWidth * 0.3; // Start in first third
      const y = containerHeight * 0.5 + (Math.random() * 60 - 30);
      const speedX = Math.random() * 1.5 + 1;
      const speedY = Math.random() * 0.4 - 0.2;

      // Alternate between colors
      const colorKeys = Object.keys(colors).filter(key => key !== 'black');
      const color = colors[colorKeys[i % colorKeys.length] as keyof typeof colors];

      particles.push(new Particle(x, y, size, color, speedX, speedY));
    }
  }

  // Animation function
  function animate(): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, containerWidth, containerHeight);
    time += 16; // Approximate 60fps

    // Draw the ETL stages
    drawETLStages(ctx);

    // Update and draw particles
    particles.forEach(particle => {
      particle.update(containerWidth, containerHeight, time);
      particle.draw(ctx, time);
    });

    animationFrame = requestAnimationFrame(animate);
  }

  // Draw ETL stages with improved visuals
  function drawETLStages(ctx: CanvasRenderingContext2D): void {
    const stageWidth = containerWidth / 3;
    // Responsive height calculation
    const stageHeight = Math.min(130, Math.max(90, containerHeight * 0.2));
    const stageY = containerHeight / 2 - stageHeight / 2;
    
    // Calculate font size based on container width
    const titleFontSize = Math.max(12, Math.min(18, containerWidth / 40));
    

    // Shadow for all stages
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 3;
    
    // Extract stage
    const extractX = stageWidth * 0.1;
    const extractWidth = stageWidth * 0.8;
    ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
    ctx.beginPath();
    roundRect(ctx, extractX, stageY, extractWidth, stageHeight, 12);
    ctx.fill();

    // Thin colored border for extract
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = colors.teal;
    ctx.lineWidth = 2;
    ctx.beginPath();
    roundRect(ctx, extractX, stageY, extractWidth, stageHeight, 12);
    ctx.stroke();
    
    // Transform stage
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    const transformX = stageWidth + stageWidth * 0.1;
    const transformWidth = stageWidth * 0.8;
    ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
    ctx.beginPath();
    roundRect(ctx, transformX, stageY, transformWidth, stageHeight, 12);
    ctx.fill();

    // Thin colored border for transform
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = colors.orange;
    ctx.lineWidth = 2;
    ctx.beginPath();
    roundRect(ctx, transformX, stageY, transformWidth, stageHeight, 12);
    ctx.stroke();
    
    // Load stage
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    const loadX = stageWidth * 2 + stageWidth * 0.1;
    const loadWidth = stageWidth * 0.8;
    ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
    ctx.beginPath();
    roundRect(ctx, loadX, stageY, loadWidth, stageHeight, 12);
    ctx.fill();

    // Thin colored border for load
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = colors.red;
    ctx.lineWidth = 2;
    ctx.beginPath();
    roundRect(ctx, loadX, stageY, loadWidth, stageHeight, 12);
    ctx.stroke();

    // Stage labels with responsive font size
    let extractLabel = $t.terms.extract;
    let transformLabel = $t.terms.transform;
    let loadLabel = $t.terms.load;
    
    // Main labels
    ctx.fillStyle = "white";
    ctx.font = `bold ${titleFontSize}px system-ui`;
    ctx.textAlign = "center";
    ctx.fillText(extractLabel.toUpperCase(), stageWidth * 0.5, stageY + 30);
    ctx.fillText(transformLabel.toUpperCase(), stageWidth * 1.5, stageY + 30);
    ctx.fillText(loadLabel.toUpperCase(), stageWidth * 2.5, stageY + 30);
    


    // Fancy connecting arrows
    drawConnectingArrow(ctx, stageWidth * 0.9, stageY + stageHeight / 2, stageWidth * 1.1, stageY + stageHeight / 2, colors.teal);
    drawConnectingArrow(ctx, stageWidth * 1.9, stageY + stageHeight / 2, stageWidth * 2.1, stageY + stageHeight / 2, colors.orange);

  }

  
  // Draw a fancy connecting arrow
  function drawConnectingArrow(
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string
  ): void {
    ctx.save();
    // Arrow head
    const headSize = 10;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - headSize, y2 - headSize/2);
    ctx.lineTo(x2 - headSize, y2 + headSize/2);
    ctx.closePath();
    ctx.fill();
    
    // Arrow line
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2 - headSize, y2);
    ctx.stroke();
    
    ctx.restore();

  }

  // Helper function for rounded rectangles
  function roundRect(
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    width: number, 
    height: number, 
    radius: number
  ): void {
    if (width < 0 || height < 0) return;
    
    radius = Math.min(radius, Math.min(width, height) / 2);
    
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(x, y, width, height, radius);
    } else {
      // Fallback for browsers that don't support roundRect
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    }
  }
</script>

<div 
  class="relative w-full h-[400px] md:h-[450px] lg:h-[500px] flex flex-col items-center overflow-hidden"
  bind:this={containerElement}
>
  <div class="absolute top-0 left-0 w-full h-full">
    <canvas bind:this={canvas} class="w-full h-full"></canvas>
  </div>

  <div class="absolute w-full bottom-[120px] md:bottom-[130px] lg:bottom-[140px] px-4 max-w-4xl mx-auto">
    <div class="grid grid-cols-3 w-full">
      <div class="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
        <div class="bg-black text-white p-3 md:p-4 rounded-full mb-3 shadow-lg border border-teal-400">
          <Database size={20} class="md:w-7 md:h-7 lg:w-8 lg:h-8" color="white" />
        </div>
        <span class="text-xs md:text-sm font-medium text-center">{$t.terms.rawData}</span>
      </div>

      <div class="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
        <div class="bg-black text-white p-3 md:p-4 rounded-full mb-3 shadow-lg border border-orange-400">
          <Cpu size={20} class="md:w-7 md:h-7 lg:w-8 lg:h-8" color="white" />
        </div>
        <span class="text-xs md:text-sm font-medium text-center">{$t.terms.aiProcessing}</span>
      </div>

      <div class="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
        <div class="bg-black text-white p-3 md:p-4 rounded-full mb-3 shadow-lg border border-red-400">
          <ChartNoAxesCombined size={20} class="md:w-7 md:h-7 lg:w-8 lg:h-8" color="white" />
        </div>
        <span class="text-xs md:text-sm font-medium text-center whitespace-nowrap">{$t.terms.businessGrowth}</span>
      </div>
    </div>
  </div>

  <div class="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col md:flex-row items-center justify-center bg-black text-white py-3 md:py-4 px-5 md:px-8 rounded-lg shadow-xl max-w-xl w-[90%] border-t border-gray-800">
    <span class="font-bold text-sm md:text-base md:mr-2 min-w-[5rem]">ET-Lode:</span>
    <span class="text-center md:text-left text-sm md:text-base">{$t.terms.tagline}</span>
  </div>
</div>

<style>
  canvas {
    display: block;
  }
  

</style>