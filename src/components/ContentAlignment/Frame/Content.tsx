import { useState } from "react";
import Alert from "@/components/Alert";
import { AlertContext } from "@/lib/AlertContext";

export default function Content({ children }) {
  const [alert, setAlert] = useState("");
  console.log(alert);

  return (
    <AlertContext.Provider
      value={{
        alert,
        setAlert,
      }}
    >
      {alert ? <Alert color="warning" heading={alert} /> : null}
      <div className="flex h-full flex-col justify-center" id="content">
        {children}
      </div>
    </AlertContext.Provider>
  );
}
