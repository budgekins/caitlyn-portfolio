const input = document.getElementById("command-input");
const output = document.getElementById("output");
const galleryView = document.getElementById("gallery-view");
const galleryImg = document.getElementById("gallery-img");
const galleryCaption = document.getElementById("gallery-caption");

const artworks = [
  { src: "art/last-unknown.jpg", caption: "The Last Unknown — charcoal and pencil" },
  { src: "art/goddess-2.jpg", caption: "ink and pastel composition" },
  // { type: "text", caption: "--- archetype studies ---" },
  { src: "art/goddess.jpg", caption: "The Goddess — ink" },
  { src: "art/heros-journey1.jpg", caption: "The Hero's Journey — mixed media" },
  { src: "art/heros-journey2.jpg", caption: "The Hero's Journey" },
  { src: "art/heros-journey3.jpg", caption: "The Hero's Journey" },
  { src: "art/shadow.jpg", caption: "The Shadow — pastel, acrylic, charcoal, light" },
  { src: "art/trickster1.jpg", caption: "The Trickster — pastel, watercolor, charcoal, thread" },
  { src: "art/trickster2.jpg", caption: "The Trickster" }
];

let galleryOpen = false;
let currentArt = 0;

const commands = {
  help: () => appendLine("Available commands: help, gallery, back, ls, cd"),
  ls: () => commands.help(),
  cd: () => appendLine("Art Terminal"),

  gallery: () => {
    appendLine("turning on the lights...");
    document.body.style.transition = "background-color 3s ease";
    document.body.style.backgroundColor = "#f9f6f1";
    document.body.style.color = "#222";
    input.classList.add("gallery-mode");
    document.getElementById("input-line").classList.add("gallery-mode");

    // Fade in gallery after lights fully warm up
    setTimeout(() => {
      galleryView.classList.add("active");
      galleryOpen = true;
      showArt(currentArt);
    }, 3000);
  },

  back: () => {
    window.location.href = "index.html";
    return null;
  },

  "cd ..": () => {
    window.location.href = "index.html";
    return null;
  }
};

function appendLine(text) {
  const line = document.createElement("div");
  line.textContent = text;
  line.style.marginTop = "10px";
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function showArt(index) {
  const art = artworks[index];

  // TEXT-ONLY ENTRY
  if (!art.src || art.type === "text") {
    galleryImg.style.display = "none";
    galleryCaption.textContent = art.caption;
    return;
  }

  // IMAGE ENTRY
  galleryImg.style.display = "block";

  const tempImg = new Image();
  tempImg.onload = () => {
    galleryImg.src = art.src;
    galleryCaption.textContent = art.caption;
  };
  tempImg.src = art.src;
}

// Key listener for command input
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const cmd = input.value.trim().toLowerCase();
    if (!cmd) return;

    const navCommands = ["back", "cd .."];
    if (!navCommands.includes(cmd.toLowerCase())) {
      appendLine(`caitlyn@art:~$ ${cmd}`);
    }

    runCommand(cmd);
    input.value = "";
  }
});

// Keyboard navigation in gallery
document.addEventListener("keydown", (event) => {
  if (!galleryOpen) return;

  if (event.key === "ArrowRight") {
    currentArt = (currentArt + 1) % artworks.length;
    showArt(currentArt);
  } else if (event.key === "ArrowLeft") {
    currentArt = (currentArt - 1 + artworks.length) % artworks.length;
    showArt(currentArt);
  } else if (event.key === "Escape") {
    // Exit gallery and return to terminal
    galleryView.classList.remove("active");
    galleryOpen = false;
    document.body.style.transition = "background-color 3s ease, color 3s ease";
    document.body.style.backgroundColor = "#000";
    document.body.style.color = "#33ff33";
    input.classList.remove("gallery-mode");
    document.getElementById("input-line").classList.remove("gallery-mode");
    appendLine("lights off, returning to terminal...");
  }
});

function runCommand(cmd) {
  if (commands[cmd]) {
    const result = commands[cmd]();
    if (result) appendLine(result);
  } else {
    appendLine(`Command not found: ${cmd}\nType 'help' to see available commands.`);
  }
}
