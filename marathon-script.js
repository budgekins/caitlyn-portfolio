const input = document.getElementById("command-input");
const output = document.getElementById("output");
const marathonDate = new Date("2026-04-26T00:00:00"); // target date

function updateCountdown() {
  const now = new Date();
  const diff = marathonDate - now;

  if (diff <= 0) {
    countdownDiv.innerHTML = "🏁 The London Marathon 2026 has started!";
    clearInterval(countdownInterval);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownDiv.innerHTML = `⏳ Time until London Marathon 2026: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Create a div for countdown at the top
const countdownDiv = document.createElement("div");
countdownDiv.style.marginBottom = "10px";
output.appendChild(countdownDiv);
updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

// Commands
const commands = {
  help: () => appendLine("Available commands: help, london, boston, back"),
  
  london: () => appendLine(
    "🏅 Support my dad and I in the 2026 London Marathon for JRS UK!<br>" +
    "<a href='https://www.justgiving.com/team/caitlyn-rick-london-2026' target='_blank'>" +
    "https://www.justgiving.com/team/caitlyn-rick-london-2026</a>"
  ),

  boston: () => appendLine(
    "🎉 THANK YOU BOSTON! 129th Boston Marathon Finisher 🏅<br>" +
    "<a href='https://www.givengain.com/project/caitlyn-raising-funds-for-lingzi-foundation-inc-86133' target='_blank'>" +
    "https://www.givengain.com/project/caitlyn-raising-funds-for-lingzi-foundation-inc-86133</a>"
  ),

  back: () => { 
    window.location.href = "index.html"; 
    return null; // prevent undefined
  },
  ls: () => commands.help(),
  cd: () => appendLine("Marathon Terminal"),
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
