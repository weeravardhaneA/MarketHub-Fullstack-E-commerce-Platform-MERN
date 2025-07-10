import { toast } from "sonner";

const ErrorToast = (message = "Something went wrong!", onRetry) => {
  toast.error(message, {
    style: {
      backgroundColor: "#dc2626",
      color: "#fff",
      fontWeight: "600",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      borderRadius: "0.375rem",
      padding: "0.5rem 1rem",
      fontSize: "1rem",
    },
    duration: 4000,
    action: onRetry
      ? {
          label: "Retry",
          onClick: onRetry,
          style: {
            color: "#fff",
            fontWeight: "700",
            marginLeft: "1rem",
            cursor: "pointer",
            textDecoration: "underline",
          },
        }
      : undefined,
  });
};

export default ErrorToast;