import { ErrorBoundary } from "./ErrorBoundary";
import { Outlet } from "react-router";

export function Layout() {
  return (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  );
}
