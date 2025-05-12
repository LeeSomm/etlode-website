<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Database, Cpu, BarChart3 } from '@lucide/svelte';

  let canvas: HTMLCanvasElement;
  let animationFrame: number | null = null;
  let containerWidth: number = 0;
  let containerHeight: number = 0;

  // Colors from the ET-Lode logo
  const colors = {
    black: "#000000",
    yellow: "#FFE610",
    teal: "#4FD6CA",
    orange: "#FF8001",
    red: "#FF0001",
    green: "#80C41C",
  };

  // Particle class
  class Particle {
    x: number;
    y: number;
    size: number;
    color: string;
    speedX: number;
    speedY: number;

    constructor(x: number, y: number, size: number, color: string, speedX: number, speedY: number) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
      this.speedX = speedX;
      this.speedY = speedY;
    }

    update(canvasWidth: number, canvasHeight: number): void {
      this.x += this.speedX;
      this.y += this.speedY;

      // Reset particle position when it goes off-screen
      if (this.x < 0 || this.x > canvasWidth) {
        this.x = Math.random() * canvasWidth * 0.3;
        this.y = canvasHeight * 0.5;
      }

      if (this.y < 0 || this.y > canvasHeight) {
        this.y = canvasHeight * 0.5;
        this.x = Math.random() * canvasWidth * 0.3;
      }
    }

    draw(ctx: CanvasRenderingContext2D): void {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.size, this.size);
      ctx.fill();
    }
  }

  let particles: Particle[] = [];

  // Resize observer to handle container size changes
  let containerElement: HTMLDivElement;
  let resizeObserver: ResizeObserver;

  function handleResize(): void {
    if (!canvas) return;
    
    // Update container dimensions
    containerWidth = containerElement.offsetWidth;
    containerHeight = containerElement.offsetHeight;
    
    // Set canvas dimensions
    canvas.width = containerWidth;
    canvas.height = containerHeight;
    
    // Reinitialize particles for the new dimensions
    initParticles();
  }

  onMount(() => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize the container width and height
    containerWidth = containerElement.offsetWidth;
    containerHeight = containerElement.offsetHeight;

    // Set canvas dimensions
    canvas.width = containerWidth;
    canvas.height = containerHeight;

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
    const particleCount = Math.max(15, Math.floor(containerWidth / 40)); // Scale particle count with width
    
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 6 + 2;
      const x = Math.random() * canvas.width * 0.3;
      const y = canvas.height * 0.5 + (Math.random() * 100 - 50);
      const speedX = Math.random() * 2 + 1;
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

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the ETL stages
    drawETLStages(ctx);

    // Update and draw particles
    particles.forEach(particle => {
      particle.update(canvas.width, canvas.height);
      particle.draw(ctx);
    });

    animationFrame = requestAnimationFrame(animate);
  }

  // Draw ETL stages
  function drawETLStages(ctx: CanvasRenderingContext2D): void {
    const stageWidth = canvas.width / 3;
    // Responsive height calculation
    const stageHeight = Math.min(120, Math.max(80, canvas.height * 0.3));
    const stageY = canvas.height / 2 - stageHeight / 2;
    
    // Calculate font size based on container width
    const fontSize = Math.max(12, Math.min(16, containerWidth / 50));
    
    // Extract stage
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.beginPath();
    roundRect(ctx, stageWidth * 0.1, stageY, stageWidth * 0.8, stageHeight, 10);
    ctx.fill();

    // Transform stage
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.beginPath();
    roundRect(ctx, stageWidth + stageWidth * 0.1, stageY, stageWidth * 0.8, stageHeight, 10);
    ctx.fill();

    // Load stage
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.beginPath();
    roundRect(ctx, stageWidth * 2 + stageWidth * 0.1, stageY, stageWidth * 0.8, stageHeight, 10);
    ctx.fill();

    // Stage labels with responsive font size
    ctx.fillStyle = "white";
    ctx.font = `bold ${fontSize}px system-ui`;
    ctx.textAlign = "center";
    ctx.fillText("EXTRACT", stageWidth * 0.5, stageY + 30);
    ctx.fillText("TRANSFORM", stageWidth * 1.5, stageY + 30);
    ctx.fillText("LOAD", stageWidth * 2.5, stageY + 30);

    // Connecting arrows
    ctx.strokeStyle = colors.teal;
    ctx.lineWidth = 3;

    // Arrow 1
    ctx.beginPath();
    ctx.moveTo(stageWidth * 0.9, stageY + stageHeight / 2);
    ctx.lineTo(stageWidth * 1.1, stageY + stageHeight / 2);
    ctx.stroke();

    // Arrow 2
    ctx.beginPath();
    ctx.moveTo(stageWidth * 1.9, stageY + stageHeight / 2);
    ctx.lineTo(stageWidth * 2.1, stageY + stageHeight / 2);
    ctx.stroke();

    // Arrow heads
    drawArrowHead(ctx, stageWidth * 1.1, stageY + stageHeight / 2, 0, 10, colors.teal);
    drawArrowHead(ctx, stageWidth * 2.1, stageY + stageHeight / 2, 0, 10, colors.teal);
  }

  // Draw arrow head
  function drawArrowHead(
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    angle: number, 
    size: number, 
    color: string
  ): void {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-size, -size / 2);
    ctx.lineTo(-size, size / 2);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  // Helper function for rounded rectangles (since not all browsers support roundRect)
  function roundRect(
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    width: number, 
    height: number, 
    radius: number
  ): void {
    if (typeof ctx.roundRect !== 'function') {
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
    } else {
      ctx.roundRect(x, y, width, height, radius);
    }
  }
</script>

<div 
  class="relative w-full h-[400px] flex flex-col items-center"
  bind:this={containerElement}
>
  <div class="absolute top-0 left-0 w-full h-full">
    <canvas bind:this={canvas} class="w-full h-full"></canvas>
  </div>

  <div class="relative z-10 mt-auto mb-8 flex justify-around w-full px-2">
    <div class="flex flex-col items-center">
      <div class="bg-black text-white p-2 md:p-4 rounded-full mb-2">
        <Database size={24} class="md:w-8 md:h-8" color="white" />
      </div>
      <span class="text-xs md:text-sm font-medium text-center">Raw Data</span>
    </div>

    <div class="flex flex-col items-center">
      <div class="bg-black text-white p-2 md:p-4 rounded-full mb-2">
        <Cpu size={24} class="md:w-8 md:h-8" color="white" />
      </div>
      <span class="text-xs md:text-sm font-medium text-center">AI Processing</span>
    </div>

    <div class="flex flex-col items-center">
      <div class="bg-black text-white p-2 md:p-4 rounded-full mb-2">
        <BarChart3 size={24} class="md:w-8 md:h-8" color="white" />
      </div>
      <span class="text-xs md:text-sm font-medium text-center">Business Growth</span>
    </div>
  </div>

  <div class="relative z-10 flex flex-col md:flex-row items-center justify-center bg-black text-white py-2 md:py-3 px-4 md:px-6 rounded-lg text-xs md:text-base">
    <span class="font-bold md:mr-2">ET-Lode:</span>
    <span class="text-center md:text-left">Extract value • Transform with AI • Load for growth</span>
  </div>
</div>

<style>
  /* Any additional styles can go here */
  canvas {
    display: block;
  }
</style>