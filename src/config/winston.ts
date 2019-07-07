import winston from 'winston';

const options = {
  level: 'info',
  filename: `logs/log.json`,
  handleExceptions: true,
  json: true,
  prettyPrint: true,
  maxsize: 10485760, // 10MB
  maxFiles: 100,
  colorize: false,
};

export const loggerOptions = {
  transports: [
    new winston.transports.File(options)
  ],
  format: winston.format.combine(
    winston.format.json()
  ),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "{{new Date()}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false,
  ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
};

export const errorLoggerOptions = {
  transports: [
    new winston.transports.File(options)
  ],
  format: winston.format.combine(
    winston.format.json()
  )
};