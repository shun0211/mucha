import { ErrorMessage, ErrorMessages } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isErrorMessage(value: any): value is ErrorMessage {
  // NOTE: プロパティがアクセスできない可能性を排除
  if (value == null) return false;

  return (
    typeof value.message == "string" &&
    typeof value.forDeveloperMessage == "string"
  );
}

export function isErrorMessages(value: any): value is ErrorMessages {
  return (
    Array.isArray(value.errorMessages) &&
    typeof value.forDeveloperMessage == "string"
  )
}

export class UnauthorizedError extends Error {
  errorMessage: string;

  constructor(errorMessage: string) {
    super()
    this.name = "UnauthorizedError"
    this.errorMessage = errorMessage
  }
}

export class NotFoundError extends Error {
  errorMessage: string;

  constructor(errorMessage: string) {
    super()
    this.name = "NotFoundError"
    this.errorMessage = errorMessage
  }
}

export class NotAcceptableError extends Error {
  errorMessages: string[];

  constructor(errorMessages: string[]) {
    super()
    this.name = "NotAcceptableError"
    this.errorMessages = errorMessages
  }
}
