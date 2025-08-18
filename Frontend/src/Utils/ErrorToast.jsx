import { toast } from "sonner";

const ShowToast = (message = "Something went wrong!", type = "error", onRetry) => {
  
  const toastOptions = {

    style: {
      fontWeight: "600",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      borderRadius: "0.375rem",
      padding: "0.5rem 1rem",
      fontSize: "1rem",
      color: "#fff",
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
  };

  if(type === "success")
  {
    toastOptions.style.backgroundColor = "#16a34a";
  }
  else if(type === "warning")
  {
    toastOptions.style.backgroundColor = "#f59e0b";
  }
  else if(type === "info")
  {
    toastOptions.style.backgroundColor = "#3b82f6";
  }
  else
  {
    toastOptions.style.backgroundColor = "#dc2626";
  }

  if(toast[type])
  {
    toast[type](message, toastOptions);
  }
  else
  {
    toast(message, toastOptions);
  }
};

export default ShowToast;