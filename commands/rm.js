export default function({ log, logError, logSuccess, fileSystem, currentDir, parsePath }, args) {
    if (args.length === 0) {
        logError('Usage: rm <filename>');
        return;
    }

    const fileName = args[0];
    const path = currentDir.split('/').filter(part => part.length > 0);
    let current = fileSystem;

    for (const part of path) {
        current = current[part];
    }

    if (!(fileName in current)) {
        logError(`File "${fileName}" not found.`);
    } else {
        delete current[fileName];
        logSuccess(`File "${fileName}" deleted.`);
    }
}
