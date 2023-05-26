const { createLogger, format, transports } = require('winston')
const { combine, timestamp, errors, colorize, prettyPrint } = format
const DailyRotateFile = require('winston-daily-rotate-file')

const errorLogTransport = new DailyRotateFile({
  filename: 'Logs/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  handleExceptions: true,
  level: 'error'
})

const combinedLogTransport = new DailyRotateFile({
  filename: 'Logs/combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  level: 'info'
})

const alignColorsAndTime = format.combine(
  format.colorize({
    all: true
  }),
  format.label({
    label: '[LOGGER]'
  }),
  format.timestamp({
    format: 'YYYY-MM-DD HH:MM:SS'
  }),
  format.printf(
    info => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
  )
)

const logger = createLogger({
  level: 'info',
  format: combine(
    errors({ stack: true }),
    colorize(),
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new transports.Console(alignColorsAndTime),
    errorLogTransport,
    combinedLogTransport
  ]
})

module.exports = {
  logger
}
