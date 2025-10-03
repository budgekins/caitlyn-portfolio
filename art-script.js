const input = document.getElementById("command-input");
const output = document.getElementById("output");

// Commands
const commands = {
  help: () => "Available commands: help, back",
  back: () => { 
    window.location.href = "index.html"; 
    return null; // prevent undefined
  },
  ls: () => commands.help(),
  cd: () => appendLine("Art Terminal"),
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

