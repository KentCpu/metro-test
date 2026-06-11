import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

async function bootstrap() {
  const shouldMock =
    import.meta.env.DEV || import.meta.env.VITE_ENABLE_MSW === "true";

  if (shouldMock) {
    const { worker } = await import("./msw/browser");
    await worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
      },
    });
  }

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

bootstrap();
