export default function({ log, clear, logError, logSuccess, fileSystem, currentDir, parsePath }, args) {
    const path = currentDir.split('/').filter(part => part.length > 0);
    let current = fileSystem;

    for (const part of path) {
        current = current[part];
    }

    const entries = Object.keys(current);
    if (entries.length === 0) {
        log('Directory is empty.');
    } else {
        log(entries.join('\n'));
    }
}
