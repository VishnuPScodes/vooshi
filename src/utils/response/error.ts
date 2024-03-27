class BadRequestError extends Error {
  constructor(message: any) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

class NotFoundError extends Error {
  constructor(message: any) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export { BadRequestError, NotFoundError };
