const input = document.getElementById("command-input");
const output = document.getElementById("output");

output.innerHTML = "Welcome to Caitlyn's terminal.<br>Type 'help' to see available commands.<br><br>";

const commands = {
  help: () => "Available commands: help, about, contact, music, art, marathon, heartbreak chronicles, clear",
  
  about: () => "Hi, I'm Caitlyn! Welcome to my site. When I'm not working as an AI Engineer, you can find me making music, creating art, and running marathons.<br>Type 'help' to see more.",

  clear: () => { output.innerHTML = ""; return ""; },

  // Redirect commands to separate pages
  music: () => { window.location.href = "music.html"; },
  art: () => { window.location.href = "art.html"; },
  marathon: () => { window.location.href = "marathon.html"; },
  heartbreakchronicles: () => { window.location.href = "heartbreak.html"; },
  "heartbreak chronicles": () => { window.location.href = "heartbreak.html"; },
  contact: () => {
    appendLine(
      "Contact me:<br>" +
      "- Spotify: <a href='https://open.spotify.com/artist/2wFm0fgJmoLkVg5HCKz33A?si=t44Ky_pcRme0nXAzLPXYtQ' target='_blank'>Spotify Artist Page</a><br>" +
      "- LinkedIn: <a href='https://www.linkedin.com/in/caitlyn-yee/' target='_blank'>LinkedIn</a><br>" +
      "- Email: <a href='mailto:caitlynyee4@gmail.com'>caitlynyee4@gmail.com</a>"
    );
    return null; // important: prevents 'undefined' from being appended
  },
  ls: () => commands.help(),
  cd: () => appendLine("Home page"),
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
    
    const navCommands = ["music", "art", "marathon", "heartbreakchronicles", "heartbreak chronicles"];
    if (!navCommands.includes(cmd.toLowerCase())) {
      appendLine(`<span class="prompt">caitlyn@home:~$</span> ${cmd}`);
    }

    runCommand(cmd);  // handles output internally
    input.value = "";
    window.scrollTo(0, document.body.scrollHeight);
  }
});
