document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const terminal = document.getElementById('terminal');

    const fileSystem = {
        '/': {}
    };

    let currentDir = '/';

    const commands = {
        help: 'help',
        echo: 'echo',
        clear: 'clear',
        date: 'date',
        mkdir: 'mkdir',
        ls: 'ls',
        meow: 'meow',
        cd: 'cd',
        rm: 'rm',
        rmdir: 'rmdir'
    };

    const scrollToBottom = () => {
        output.scrollTop = output.scrollHeight;
    };

    const log = (text) => {
        const p = document.createElement('p');
        p.textContent = text;
        output.appendChild(p);
        scrollToBottom();
    };

    const clear = () => {
        output.innerHTML = '';
        scrollToBottom();
    };

    const logError = (text) => {
        const p = document.createElement('p');
        p.textContent = text;
        p.style.color = 'red';
        output.appendChild(p);
        scrollToBottom();
    };

    const logSuccess = (text) => {
        const p = document.createElement('p');
        p.textContent = text;
        p.style.color = 'green';
        output.appendChild(p);
        scrollToBottom();
    };

    const parsePath = (path) => {
        const parts = path.split('/').filter(part => part.length > 0);
        return parts.reduce((acc, part) => {
            if (acc === null) return null;
            if (part in acc) return acc[part];
            return null;
        }, fileSystem);
    };

    const setCurrentDir = (path) => {
        currentDir = path;
    };

    input.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            const value = input.value.trim();
            input.value = '';

            if (value) {
                log(`> ${value}`);

                const [command, ...args] = value.split(' ');
                if (command in commands) {
                    try {
                        const module = await import(`./commands/${commands[command]}.js`);
                        await module.default({ log, clear, logError, logSuccess, fileSystem, currentDir, parsePath, setCurrentDir }, args);
                    } catch (e) {
                        console.error(e);
                        logError(`Command "${command}" not found.`);
                    }
                } else {
                    logError(`Unknown command: "${command}"`);
                }
                output.style.display = 'block'; // Show terminal output again after executing any command
            }
        }
    });

    terminal.addEventListener('click', () => {
        input.focus();
    });

    input.focus();

    log('Web Terminal');
    log('Type "help" for a list of commands.');
});
