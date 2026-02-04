import React from "react";
import StatusMessage from "../../StatusMessage";

function ErrorStatus({ error }: { error: string }) {
  return <StatusMessage type="error" message={error} />;
}

export default ErrorStatus;
