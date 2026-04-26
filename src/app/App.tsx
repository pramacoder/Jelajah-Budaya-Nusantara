import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./components/auth/AuthContext";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster theme="dark" position="top-center" toastOptions={{ style: { zIndex: 99999 } }} />
    </AuthProvider>
  );
}
