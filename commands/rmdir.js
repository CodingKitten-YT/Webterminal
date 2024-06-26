export default function({ log, logError, logSuccess, fileSystem, currentDir, parsePath }, args) {
    if (args.length === 0) {
        logError('Usage: rmdir <directory_name>');
        return;
    }

    const dirName = args[0];
    const path = currentDir.split('/').filter(part => part.length > 0);
    let current = fileSystem;

    for (const part of path) {
        current = current[part];
    }

    if (!(dirName in current)) {
        logError(`Directory "${dirName}" not found.`);
    } else if (Object.keys(current[dirName]).length > 0) {
        logError(`Directory "${dirName}" is not empty.`);
    } else {
        delete current[dirName];
        logSuccess(`Directory "${dirName}" deleted.`);
    }
}
