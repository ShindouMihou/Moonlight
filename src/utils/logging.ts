const format = (context: string) => new Date() + ' [moonlight] ' + context

const info = (message: string, ...data: any[]) => console.info(format(message), ...data)
const debug = (message: string, ...data: any[]) => console.debug(format(message), ...data)
const warn = (message: string, ...data: any[]) => console.warn(format(message), ...data)

export const Logger = { info, debug, warn }