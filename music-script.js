const input = document.getElementById("command-input");
const output = document.getElementById("output");
const players = {
  "play1": '<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/6QOwxKohXnHv2iWHR4yGWI?utm_source=generator" width="100%" height="175" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
  "play2": '<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/2O2PfOygBSRLX6ft6aMmNx?utm_source=generator" width="100%" height="175" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>'
};

let currentPlayerLine = null; // keeps track of the existing player

const commands = {
  help: () => appendLine("Available commands: help, play1, play2, back"),
  play1: () => {
    // Remove previous player if exists
    if (currentPlayerLine) output.removeChild(currentPlayerLine);

    // Append new player
    const line = document.createElement("div");
    line.style.marginTop = "8px";
    line.style.marginBottom = "8px";
    line.innerHTML = players["play1"];
    output.appendChild(line);
    currentPlayerLine = line; // save reference

    output.scrollTop = output.scrollHeight; // keep prompt in view
  },
  play2: () => {
    if (currentPlayerLine) output.removeChild(currentPlayerLine);
    const line = document.createElement("div");
    line.style.marginTop = "8px";
    line.style.marginBottom = "8px";
    line.innerHTML = players["play2"];
    output.appendChild(line);
    currentPlayerLine = line;
    output.scrollTop = output.scrollHeight;
  },
  back: () => { 
    window.location.href = "index.html"; 
    return null; // prevent undefined
  },
  ls: () => commands.help(),
  cd: () => appendLine("Music Terminal"),
};

function appendLine(text) {
  const line = document.createElement("div");
  line.innerHTML = text;
  line.style.marginTop = "10px";
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function runCommand(cmd) {
  const key = cmd.trim().toLowerCase();
  if (commands[key]) {
    const result = commands[key](); // run command
    if (result) appendLine(result); // append only if real text
  } else {
    appendLine(`Command not found: ${cmd}\nType 'help' to see available commands.`);
  }
}

// input listener
input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    const cmd = input.value.trim();
    if (!cmd) return;
    appendLine(`<span class="prompt">caitlyn@portfolio:~$</span> ${cmd}`);
    runCommand(cmd);  // handles output internally
    input.value = "";
    window.scrollTo(0, document.body.scrollHeight);
  }
});

