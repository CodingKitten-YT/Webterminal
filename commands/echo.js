export default function({ log, clear, logError, logSuccess }, args) {
    if (args.length === 0) {
        logError('No input provided to echo.');
    } else {
        log(args.join(' '));
    }
}
