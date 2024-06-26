export default function({ log, clear, logError, logSuccess, fileSystem, currentDir, parsePath, setCurrentDir }, args) {
    if (args.length === 0) {
        logError('Usage: cd <directory>');
        return;
    }

    let newPath = args[0];

    if (newPath === '..') {
        const parts = currentDir.split('/').filter(part => part.length > 0);
        parts.pop(); // Remove the last directory
        newPath = '/' + parts.join('/'); // Construct the new path
    } else if (!newPath.startsWith('/')) {
        newPath = currentDir + '/' + newPath;
    }

    newPath = newPath.replace(/\/+/g, '/');  // Normalize the path

    const targetDir = parsePath(newPath);
    if (targetDir && typeof targetDir === 'object') {
        setCurrentDir(newPath);
        logSuccess(`Changed directory to ${newPath}`);
    } else {
        logError(`Directory "${newPath}" does not exist.`);
    }
}
