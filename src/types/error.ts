export type ErrorDetail = {
  property: string;
  value: string;
  messages: string[];
};

export type ValidationError = {
  errorType: string;
  message: string;
  details: ErrorDetail[];
};
