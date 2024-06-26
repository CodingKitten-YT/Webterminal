export default function({ log, clear, logError, logSuccess, fileSystem, currentDir, parsePath }, args) {
    if (args.length === 0) {
        logError('Usage: mkdir <directory_name>');
        return;
    }

    const dirName = args[0];
    const path = currentDir.split('/').filter(part => part.length > 0);
    let current = fileSystem;

    for (const part of path) {
        current = current[part];
    }

    if (dirName in current) {
        logError(`Directory "${dirName}" already exists.`);
    } else {
        current[dirName] = {};
        logSuccess(`Directory "${dirName}" created.`);
    }
}
