import dateFormat from "dateformat";

class Logger {
  public now(): string {
    const now = Date.now();
    return dateFormat(now, "HH:MM:ss");
  }

  public log(type: string, message: string) {
    return console.log(`[${type.toUpperCase()}][${this.now()}]: ${message}`);
  }

  public error(type: string, error: { stack: string }) {
    return console.log(
      `[${type.toUpperCase()}][${this.now()}]: ${error.stack}`
    );
  }
}

export default new Logger();
