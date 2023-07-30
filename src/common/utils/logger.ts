import log4js from 'log4js';

const configLogger = {
  appenders: {
    out: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '%[[%d{dd/MM/yy hh:mm:ss}] [%p]%] %m'
      }
    }
  },
  categories: { default: { appenders: ['out'], level: 'info' } }
};

export class Logger {
  private static createLogger() {
    log4js.configure(configLogger);
    return log4js.getLogger();
  }

  public static getLogger() {
    return this.createLogger();
  }
}
