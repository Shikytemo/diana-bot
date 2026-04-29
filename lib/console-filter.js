const originalInfo = console.info.bind(console)
const originalWarn = console.warn.bind(console)

const noisyPrefixes = ['Closing session:', 'Opening session:']

const isNoisySignalLog = args => typeof args[0] === 'string' && noisyPrefixes.some(prefix => args[0].startsWith(prefix))

console.info = (...args) => {
	if (isNoisySignalLog(args)) return
	originalInfo(...args)
}

console.warn = (...args) => {
	if (isNoisySignalLog(args)) return
	originalWarn(...args)
}
