export class UserError extends Error {
  public readonly message: string;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.message = message;

    Error.captureStackTrace(this);
  }

  static sendMessage(message: string) {
    return new UserError(message);
  }
}
