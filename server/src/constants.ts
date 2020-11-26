export const allowedMethods = ["GET", "POST", "PUT", "DELETE", "OPTIONS"];

export function errorObj(err: string): { error: typeof err; status: "error" } {
  return {
    error: err,
    status: "error",
  };
}
