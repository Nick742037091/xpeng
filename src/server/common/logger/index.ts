import pino from 'pino'

export default pino({
  formatters: {
    level: (label) => {
      return { level: label }
    }
  }
})
