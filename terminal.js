document.addEventListener('DOMContentLoaded', function () {
  const terminalDiv = document.querySelector('.terminal');
  const outputDiv = document.querySelector('.output');
  const inputField = document.getElementById('command-input');

  document.addEventListener('click', function () {
    inputField.focus();
  });

  const commands = {
    help: function () {
      const allCommands = Object.keys(commands).join(', ');
      consolelog(`Available commands: ${allCommands}`);
    },
    clear: function () {
      clearOutput();
    },
    aboutblank: function (parameters) {
      if (parameters.length === 0) {
        consolelog(`Usage: aboutblank [url]`);
      } else {
        const url = parameters[0];
        const win = window.open('about:blank');
        const iframe = win.document.createElement('iframe');
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";
        iframe.src = url;
        win.document.body.appendChild(iframe);
      }
    },
    cloak: function (parameters) {
      if (parameters.length !== 2) {
        consolelog(`Usage: cloak [image url] [new-tab-name]`);
      } else {
        const url = parameters[0];
        const name = parameters[1].replace(/-/g, ' ');
        const script = document.createElement('script');
        script.textContent = `
          (function() {
            var l = document.querySelector("link[rel*='icon']") || document.createElement('link');
            l.type = 'image/x-icon';
            l.rel = 'shortcut icon';
            l.href = '${url}';
            document.getElementsByTagName('head')[0].appendChild(l);
            document.title = '${name}';
          })();
        `;
        document.body.appendChild(script);
      }
    },
    devtools: function () {
      consolelog("Click the bottom right corner to open developer tools.");
      const script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/npm/eruda";
      document.body.appendChild(script);
      script.onload = function () {
        eruda.init();
      };
    }
  };


  function processCommand(command) {
    const parts = command.split(' ');
    const commandName = parts[0];
    const parameters = parts.slice(1);

    if (commands.hasOwnProperty(commandName)) {
      commands[commandName](parameters);
    } else {
      consolelog(`Command not recognized: ${command}`);
    }
  }

  function consolelog(text) {
    outputDiv.innerHTML += `<div>${text}</div>`;
    scrollToBottom();
  }

  function clearOutput() {
    outputDiv.innerHTML = '';
  }

  function scrollToBottom() {
    outputDiv.scrollTop = outputDiv.scrollHeight;
  }

  function showError(message) {
    consolelog(`<span style="color: red;">Error: ${message}</span>`);
  }

  function showInfo(message) {
    consolelog(`<span style="color: blue;">Info: ${message}</span>`);
  }

  terminalDiv.style.display = 'block';
  inputField.disabled = false;
  consolelog(`Type "help" for available commands.`);

  inputField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      const command = inputField.value;
      inputField.value = '';
      outputDiv.innerHTML += `<div>$ ${command}</div>`;
      processCommand(command);
    }
  });
});
