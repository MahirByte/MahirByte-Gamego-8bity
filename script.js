const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");
const powerState = document.getElementById("powerState");
const cpuState = document.getElementById("cpuState");
const ramState = document.getElementById("ramState");
const powerBtn = document.getElementById("powerBtn");
const resetBtn = document.getElementById("resetBtn");
const audioBtn = document.getElementById("audioBtn");
const romInput = document.getElementById("romInput");
const loadRomBtn = document.getElementById("loadRomBtn");
const demoRomBtn = document.getElementById("demoRomBtn");
const demoRomCode = document.getElementById("demoRomCode");

const CHAR_WIDTH = 8;
const CHAR_HEIGHT = 16;

const FONT_5X7 = {
  "A": [
    "..#..",
    ".#.#.",
    "#...#",
    "#####",
    "#...#",
    "#...#",
    "#...#",
  ],
  "B": [
    "####.",
    "#...#",
    "#...#",
    "####.",
    "#...#",
    "#...#",
    "####.",
  ],
  "C": [
    ".###.",
    "#...#",
    "#....",
    "#....",
    "#....",
    "#...#",
    ".###.",
  ],
  "D": [
    "####.",
    "#...#",
    "#...#",
    "#...#",
    "#...#",
    "#...#",
    "####.",
  ],
  "E": [
    "#####",
    "#....",
    "#....",
    "####.",
    "#....",
    "#....",
    "#####",
  ],
  "F": [
    "#####",
    "#....",
    "#....",
    "####.",
    "#....",
    "#....",
    "#....",
  ],
  "G": [
    ".###.",
    "#...#",
    "#....",
    "#..##",
    "#...#",
    "#...#",
    ".###.",
  ],
  "H": [
    "#...#",
    "#...#",
    "#...#",
    "#####",
    "#...#",
    "#...#",
    "#...#",
  ],
  "I": [
    "#####",
    "..#..",
    "..#..",
    "..#..",
    "..#..",
    "..#..",
    "#####",
  ],
  "J": [
    "..###",
    "...#.",
    "...#.",
    "...#.",
    "...#.",
    "#..#.",
    ".##..",
  ],
  "K": [
    "#...#",
    "#..#.",
    "#.#..",
    "##...",
    "#.#..",
    "#..#.",
    "#...#",
  ],
  "L": [
    "#....",
    "#....",
    "#....",
    "#....",
    "#....",
    "#....",
    "#####",
  ],
  "M": [
    "#...#",
    "##.##",
    "#.#.#",
    "#...#",
    "#...#",
    "#...#",
    "#...#",
  ],
  "N": [
    "#...#",
    "##..#",
    "#.#.#",
    "#..##",
    "#...#",
    "#...#",
    "#...#",
  ],
  "O": [
    ".###.",
    "#...#",
    "#...#",
    "#...#",
    "#...#",
    "#...#",
    ".###.",
  ],
  "P": [
    "####.",
    "#...#",
    "#...#",
    "####.",
    "#....",
    "#....",
    "#....",
  ],
  "Q": [
    ".###.",
    "#...#",
    "#...#",
    "#...#",
    "#.#.#",
    "#..#.",
    ".##.#",
  ],
  "R": [
    "####.",
    "#...#",
    "#...#",
    "####.",
    "#.#..",
    "#..#.",
    "#...#",
  ],
  "S": [
    ".####",
    "#....",
    "#....",
    ".###.",
    "....#",
    "....#",
    "####.",
  ],
  "T": [
    "#####",
    "..#..",
    "..#..",
    "..#..",
    "..#..",
    "..#..",
    "..#..",
  ],
  "U": [
    "#...#",
    "#...#",
    "#...#",
    "#...#",
    "#...#",
    "#...#",
    ".###.",
  ],
  "V": [
    "#...#",
    "#...#",
    "#...#",
    "#...#",
    "#...#",
    ".#.#.",
    "..#..",
  ],
  "W": [
    "#...#",
    "#...#",
    "#...#",
    "#.#.#",
    "#.#.#",
    "##.##",
    "#...#",
  ],
  "X": [
    "#...#",
    "#...#",
    ".#.#.",
    "..#..",
    ".#.#.",
    "#...#",
    "#...#",
  ],
  "Y": [
    "#...#",
    "#...#",
    ".#.#.",
    "..#..",
    "..#..",
    "..#..",
    "..#..",
  ],
  "Z": [
    "#####",
    "....#",
    "...#.",
    "..#..",
    ".#...",
    "#....",
    "#####",
  ],
  "0": [
    ".###.",
    "#...#",
    "#..##",
    "#.#.#",
    "##..#",
    "#...#",
    ".###.",
  ],
  "1": [
    "..#..",
    ".##..",
    "..#..",
    "..#..",
    "..#..",
    "..#..",
    ".###.",
  ],
  "2": [
    ".###.",
    "#...#",
    "....#",
    "...#.",
    "..#..",
    ".#...",
    "#####",
  ],
  "3": [
    "####.",
    "....#",
    "...#.",
    "..##.",
    "....#",
    "#...#",
    ".###.",
  ],
  "4": [
    "...#.",
    "..##.",
    ".#.#.",
    "#..#.",
    "#####",
    "...#.",
    "...#.",
  ],
  "5": [
    "#####",
    "#....",
    "#....",
    "####.",
    "....#",
    "#...#",
    ".###.",
  ],
  "6": [
    ".###.",
    "#...#",
    "#....",
    "####.",
    "#...#",
    "#...#",
    ".###.",
  ],
  "7": [
    "#####",
    "....#",
    "...#.",
    "..#..",
    ".#...",
    ".#...",
    ".#...",
  ],
  "8": [
    ".###.",
    "#...#",
    "#...#",
    ".###.",
    "#...#",
    "#...#",
    ".###.",
  ],
  "9": [
    ".###.",
    "#...#",
    "#...#",
    ".####",
    "....#",
    "#...#",
    ".###.",
  ],
  ":": [
    ".....",
    "..#..",
    ".....",
    ".....",
    "..#..",
    ".....",
    ".....",
  ],
  ".": [
    ".....",
    ".....",
    ".....",
    ".....",
    ".....",
    "..#..",
    ".....",
  ],
  "-": [
    ".....",
    ".....",
    ".....",
    "#####",
    ".....",
    ".....",
    ".....",
  ],
  "/": [
    "....#",
    "...#.",
    "..#..",
    ".#...",
    "#....",
    ".....",
    ".....",
  ],
  "?": [
    ".###.",
    "#...#",
    "....#",
    "...#.",
    "..#..",
    ".....",
    "..#..",
  ],
  "[": [
    "..##.",
    "..#..",
    "..#..",
    "..#..",
    "..#..",
    "..#..",
    "..##.",
  ],
  "]": [
    ".##..",
    "..#..",
    "..#..",
    "..#..",
    "..#..",
    "..#..",
    ".##..",
  ],
  ">": [
    "#....",
    ".#...",
    "..#..",
    "...#.",
    "..#..",
    ".#...",
    "#....",
  ],
  "<": [
    "....#",
    "...#.",
    "..#..",
    ".#...",
    "..#..",
    "...#.",
    "....#",
  ],
  "!": [
    "..#..",
    "..#..",
    "..#..",
    "..#..",
    "..#..",
    ".....",
    "..#..",
  ],
  " ": [
    ".....",
    ".....",
    ".....",
    ".....",
    ".....",
    ".....",
    ".....",
  ],
};

const COLOR_PALETTE = {
  black: "#05070a",
  blue: "#3b6ef5",
  cyan: "#5bc0eb",
  green: "#62d96b",
  magenta: "#b04cff",
  orange: "#f59f3b",
  red: "#f45b69",
  white: "#f4f5f7",
  yellow: "#ffd166",
};

const ROM_LIBRARY = [
  {
    name: "STAR HOPPER",
    description: "Dodge the nebula and tap SPACE for boost beeps.",
    rom: {
      background: "#05070a",
      entities: [
        { id: "player", x: 40, y: 120, w: 8, h: 8, color: "#ffd166", vx: 0, vy: 0 },
        { id: "star", x: 200, y: 40, w: 4, h: 4, color: "#5bc0eb", vx: -0.8, vy: 0.4 },
      ],
      message: "PRESS SPACE FOR BOOST",
    },
  },
  {
    name: "BIT RACER",
    description: "Shift lanes and race the scanline.",
    rom: {
      background: "#070b12",
      entities: [
        { id: "player", x: 40, y: 80, w: 10, h: 6, color: "#62d96b", vx: 0, vy: 0 },
        { id: "rival", x: 220, y: 160, w: 10, h: 6, color: "#f45b69", vx: -1.2, vy: 0 },
      ],
      message: "ARROWS TO SHIFT LANES",
    },
  },
];

const BIOS_STEPS = [
  "GAMEGO-8BITY BIOS V1.0",
  "CHECKING CPU....OK",
  "CHECKING RAM....OK",
  "CHECKING PPU....OK",
  "CHECKING APU....OK",
  "LOADING GAME SELECTOR",
];

class APU {
  constructor() {
    this.context = null;
    this.enabled = false;
  }

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled && !this.context) {
      this.context = new (window.AudioContext || window.webkitAudioContext)();
    }
    return this.enabled;
  }

  beep(freq = 440, duration = 0.15) {
    if (!this.enabled || !this.context) {
      return;
    }
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();

    oscillator.type = "square";
    oscillator.frequency.value = freq;
    gain.gain.value = 0.08;

    oscillator.connect(gain);
    gain.connect(this.context.destination);

    oscillator.start();
    oscillator.stop(this.context.currentTime + duration);
  }
}

class Emulator {
  constructor() {
    this.state = "off";
    this.ram = new Uint8Array(2048);
    this.cpu = { pc: 0x0000, cycles: 0, acc: 0, x: 0, y: 0, sp: 0xff };
    this.apu = new APU();
    this.bootIndex = 0;
    this.bootTimer = 0;
    this.selectorIndex = 0;
    this.currentRom = null;
    this.roms = [...ROM_LIBRARY];
    this.lastFrame = performance.now();
    this.input = {
      up: false,
      down: false,
      left: false,
      right: false,
      confirm: false,
      back: false,
      action: false,
    };
  }

  power() {
    if (this.state === "off") {
      this.reset();
      this.state = "bios";
      this.bootIndex = 0;
      this.bootTimer = performance.now();
      this.cpu.cycles = 0;
      this.cpu.pc = 0x8000;
    } else {
      this.state = "off";
    }
  }

  reset() {
    this.ram.fill(0);
    this.cpu = { pc: 0x8000, cycles: 0, acc: 0, x: 0, y: 0, sp: 0xff };
    this.currentRom = null;
    this.selectorIndex = 0;
  }

  addRom(rom) {
    this.roms.push(rom);
  }

  selectRom(index) {
    this.selectorIndex = (index + this.roms.length) % this.roms.length;
  }

  startRom() {
    this.currentRom = JSON.parse(JSON.stringify(this.roms[this.selectorIndex]));
    if (this.currentRom.rom?.entities) {
      this.currentRom.rom.entities = this.currentRom.rom.entities.map((entity) => ({
        ...entity,
      }));
    }
    this.cpuState = "RUN";
    this.state = "running";
  }

  updateStatus() {
    powerState.textContent = this.state === "off" ? "Off" : "On";
    cpuState.textContent = this.state === "running" ? "Executing" : this.state.toUpperCase();
    ramState.textContent = `0x${this.cpu.pc.toString(16).padStart(4, "0").toUpperCase()}`;
  }

  tick(delta) {
    if (this.state === "bios") {
      this.cpu.cycles += Math.floor(delta / 16);
      const now = performance.now();
      if (now - this.bootTimer > 900) {
        this.bootTimer = now;
        this.bootIndex += 1;
        if (this.bootIndex >= BIOS_STEPS.length) {
          this.state = "selector";
        }
      }
    }

    if (this.state === "running" && this.currentRom) {
      this.cpu.cycles += 1;
      this.cpu.pc = (this.cpu.pc + 3) & 0xffff;
      const romState = this.currentRom.rom;
      if (romState?.entities) {
        romState.entities.forEach((entity) => {
          if (entity.id === "player") {
            if (this.input.left) entity.x -= 1.2;
            if (this.input.right) entity.x += 1.2;
            if (this.input.up) entity.y -= 1.2;
            if (this.input.down) entity.y += 1.2;
          }
          entity.x += entity.vx || 0;
          entity.y += entity.vy || 0;
          if (entity.x < 8) entity.x = 8;
          if (entity.x > 236) entity.x = 236;
          if (entity.y < 20) entity.y = 20;
          if (entity.y > 210) entity.y = 210;
        });
      }
      if (romState?.entities?.[1]) {
        const star = romState.entities[1];
        if (star.x < 16) {
          star.x = 240;
          star.y = 40 + Math.random() * 140;
        }
      }
    }
  }

  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = COLOR_PALETTE.black;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (this.state === "off") {
      drawText("POWER OFF", 60, 112, COLOR_PALETTE.blue);
      return;
    }

    if (this.state === "bios") {
      drawText("GAMEGO-8BITY", 52, 36, COLOR_PALETTE.cyan);
      drawText("BIOS", 104, 56, COLOR_PALETTE.cyan);
      BIOS_STEPS.slice(0, this.bootIndex + 1).forEach((line, index) => {
        drawText(line, 24, 90 + index * 18, COLOR_PALETTE.green);
      });
      return;
    }

    if (this.state === "selector") {
      drawText("GAME SELECTOR", 44, 28, COLOR_PALETTE.yellow);
      drawText("SELECT A GAME", 44, 48, COLOR_PALETTE.white);
      this.roms.forEach((rom, index) => {
        const y = 80 + index * 20;
        const prefix = index === this.selectorIndex ? ">" : " ";
        const label = `${prefix} ${rom.name}`;
        const color = index === this.selectorIndex ? COLOR_PALETTE.cyan : COLOR_PALETTE.white;
        drawText(label, 24, y, color);
      });
      const activeRom = this.roms[this.selectorIndex];
      if (activeRom) {
        drawText(activeRom.description.toUpperCase(), 20, 190, COLOR_PALETTE.green);
      }
      drawText("ENTER TO PLAY", 60, 214, COLOR_PALETTE.orange);
      return;
    }

    if (this.state === "running" && this.currentRom) {
      ctx.fillStyle = this.currentRom.rom?.background || COLOR_PALETTE.black;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const romState = this.currentRom.rom;
      if (romState?.entities) {
        romState.entities.forEach((entity) => {
          ctx.fillStyle = entity.color || COLOR_PALETTE.white;
          ctx.fillRect(entity.x, entity.y, entity.w, entity.h);
        });
      }
      drawText(this.currentRom.name, 8, 8, COLOR_PALETTE.white);
      if (romState?.message) {
        drawText(romState.message.toUpperCase(), 12, 222, COLOR_PALETTE.yellow);
      }
      return;
    }
  }
}

const emulator = new Emulator();

function drawText(text, x, y, color = COLOR_PALETTE.white) {
  const chars = text.toUpperCase().split("");
  let offsetX = x;
  chars.forEach((char) => {
    drawChar(char, offsetX, y, color);
    offsetX += CHAR_WIDTH;
  });
}

function drawChar(char, x, y, color) {
  const glyph = FONT_5X7[char] || FONT_5X7["?"];
  ctx.fillStyle = color;
  const rowOffset = 1;
  const colOffset = 1;
  glyph.forEach((row, rowIndex) => {
    row.split("").forEach((pixel, colIndex) => {
      if (pixel === "#") {
        const px = x + colOffset + colIndex;
        const py = y + (rowOffset + rowIndex) * 2;
        ctx.fillRect(px, py, 1, 2);
      }
    });
  });
}

function updateDemoCode() {
  const demoRom = {
    name: "LUMA CHIP",
    description: "SWAP COLORS AND BEEP.",
    rom: {
      background: "#0b0f16",
      entities: [
        { id: "player", x: 120, y: 110, w: 12, h: 12, color: "#b04cff", vx: 0, vy: 0 },
      ],
      message: "SPACE TO BEEP",
    },
  };
  const encoded = btoa(JSON.stringify(demoRom));
  demoRomCode.textContent = encoded;
  demoRomBtn.dataset.rom = encoded;
}

function decodeRom(base64) {
  const decoded = atob(base64.trim());
  return JSON.parse(decoded);
}

function safeLoadRom(base64) {
  try {
    const rom = decodeRom(base64);
    if (!rom?.name || !rom?.rom) {
      throw new Error("Missing name or rom payload.");
    }
    emulator.addRom({
      name: rom.name.toUpperCase(),
      description: (rom.description || "CUSTOM ROM").toUpperCase(),
      rom: rom.rom,
    });
    emulator.state = "selector";
  } catch (error) {
    alert(`ROM load failed: ${error.message}`);
  }
}

powerBtn.addEventListener("click", () => {
  emulator.power();
  emulator.updateStatus();
});

resetBtn.addEventListener("click", () => {
  emulator.reset();
  emulator.state = emulator.state === "off" ? "off" : "bios";
  emulator.bootIndex = 0;
  emulator.bootTimer = performance.now();
  emulator.updateStatus();
});

audioBtn.addEventListener("click", () => {
  const enabled = emulator.apu.toggle();
  audioBtn.textContent = `Audio: ${enabled ? "On" : "Off"}`;
  if (enabled) {
    emulator.apu.beep(660, 0.12);
  }
});

loadRomBtn.addEventListener("click", () => {
  if (!romInput.value.trim()) return;
  safeLoadRom(romInput.value);
});

demoRomBtn.addEventListener("click", () => {
  if (demoRomBtn.dataset.rom) {
    romInput.value = demoRomBtn.dataset.rom;
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") emulator.input.up = true;
  if (event.key === "ArrowDown") emulator.input.down = true;
  if (event.key === "ArrowLeft") emulator.input.left = true;
  if (event.key === "ArrowRight") emulator.input.right = true;
  if (event.key === "Enter") emulator.input.confirm = true;
  if (event.key === "Escape") emulator.input.back = true;
  if (event.key === " ") emulator.input.action = true;
});

window.addEventListener("keyup", (event) => {
  if (event.key === "ArrowUp") emulator.input.up = false;
  if (event.key === "ArrowDown") emulator.input.down = false;
  if (event.key === "ArrowLeft") emulator.input.left = false;
  if (event.key === "ArrowRight") emulator.input.right = false;
  if (event.key === "Enter") emulator.input.confirm = false;
  if (event.key === "Escape") emulator.input.back = false;
  if (event.key === " ") emulator.input.action = false;
});

function handleInputs() {
  if (emulator.state === "selector") {
    if (emulator.input.up) {
      emulator.selectRom(emulator.selectorIndex - 1);
      emulator.input.up = false;
      emulator.apu.beep(520, 0.06);
    }
    if (emulator.input.down) {
      emulator.selectRom(emulator.selectorIndex + 1);
      emulator.input.down = false;
      emulator.apu.beep(520, 0.06);
    }
    if (emulator.input.confirm) {
      emulator.input.confirm = false;
      emulator.apu.beep(720, 0.12);
      emulator.startRom();
    }
  } else if (emulator.state === "running") {
    if (emulator.input.back) {
      emulator.state = "selector";
      emulator.input.back = false;
    }
    if (emulator.input.action) {
      emulator.apu.beep(880, 0.08);
      emulator.input.action = false;
    }
  }
}

function loop(now) {
  const delta = now - emulator.lastFrame;
  emulator.lastFrame = now;
  handleInputs();
  emulator.tick(delta);
  emulator.render();
  emulator.updateStatus();
  requestAnimationFrame(loop);
}

updateDemoCode();
requestAnimationFrame(loop);
