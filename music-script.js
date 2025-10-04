const input = document.getElementById("command-input");
const output = document.getElementById("output");

const promptText = "caitlyn@music:~$";  // page-specific prompt

const players = {
  play1: `<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/6QOwxKohXnHv2iWHR4yGWI?utm_source=generator" width="100%" height="175" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
  play2: `<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/2O2PfOygBSRLX6ft6aMmNx?utm_source=generator" width="100%" height="175" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
};

let currentPlayerLine = null; // keeps track of the existing player

const commands = {
  help: () => appendLine("Available commands: help, play1, play2, back"),
  play1: () => playSong("play1"),
  play2: () => playSong("play2"),
  back: () => { window.location.href = "index.html"; return null; },
  ls: () => commands.help(),
  cd: () => appendLine("Music Terminal"),
  "cd ..": () => { window.location.href = "index.html"; return null; },
};

function playSong(song) {
  if (currentPlayerLine) output.removeChild(currentPlayerLine);

  const line = document.createElement("div");
  line.style.marginTop = "8px";
  line.style.marginBottom = "8px";
  line.innerHTML = players[song];
  output.appendChild(line);
  currentPlayerLine = line;

  output.scrollTop = output.scrollHeight;
}

// Append a line of text to output
function appendLine(text) {
  const line = document.createElement("div");
  line.innerHTML = text;
  line.style.marginTop = "10px";
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

// Run a command
function runCommand(cmd) {
  const key = cmd.trim().toLowerCase();
  if (commands[key]) {
    const result = commands[key](); // execute command
    if (result) appendLine(result); // only append if text returned
  } else {
    appendLine(`Command not found: ${cmd}\nType 'help' to see available commands.`);
  }
}

// Input listener
input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    const cmd = input.value.trim();
    if (!cmd) return;

    const navCommands = ["back", "cd .."];
    if (!navCommands.includes(cmd.toLowerCase())) {
      appendLine(`caitlyn@music:~$ ${cmd}`);
    }

    runCommand(cmd);
    input.value = "";
    window.scrollTo(0, document.body.scrollHeight);
  }
});
