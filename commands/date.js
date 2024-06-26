export default function({ log, clear, logError, logSuccess }, args) {
    const now = new Date();
    log(`Current date and time: ${now.toString()}`);
}
