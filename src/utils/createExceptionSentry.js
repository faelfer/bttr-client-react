import * as Sentry from "@sentry/react";

export default async function createExceptionSentry(
  err,
  method = "",
  path = "",
  context = "",
) {
  try {
    Sentry.withScope((scope) => {
      if (method !== "") {
        scope.setFingerprint([method, path, String(err.statusCode)]);
      }
      if (context !== "") {
        scope.setContext("context", context);
      }
      Sentry.captureException(err);
    });
  } catch (error) {
    // console.log('createExceptionSentry | error: ', error);
  }
}
