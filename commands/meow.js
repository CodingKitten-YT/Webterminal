export default function({ log, logError, logSuccess, fileSystem, currentDir, parsePath }, args) {
    if (args.length === 0) {
        logError('Usage: meow <filename>');
        return;
    }

    let fileName = args[0];
    if (!fileName.includes('.')) {
        fileName += '.txt';
    }

    const path = currentDir.split('/').filter(part => part.length > 0);
    let current = fileSystem;

    for (const part of path) {
        current = current[part];
    }

    if (!(fileName in current)) {
        current[fileName] = '';
    }

    const initialContent = current[fileName];
    const editor = document.createElement('textarea');
    editor.value = initialContent;
    editor.style.width = '100%';
    editor.style.height = '100%';
    editor.style.background = 'black';
    editor.style.color = 'lime';
    editor.style.border = 'none';
    editor.style.outline = 'none';
    editor.style.padding = '10px';

    const terminal = document.getElementById('terminal');
    terminal.appendChild(editor);

    const saveFile = () => {
        current[fileName] = editor.value;
        terminal.removeChild(editor);
        logSuccess(`File "${fileName}" saved.`);
    };

    editor.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            saveFile();
        }
    });

    editor.focus();
}
