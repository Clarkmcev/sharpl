import StatusMessage from "../../StatusMessage";

function SuccessStatus({ message }: { message?: string }) {
  return (
    <StatusMessage
      type="success"
      message={message || "Operation completed successfully!"}
    />
  );
}

export default SuccessStatus;
