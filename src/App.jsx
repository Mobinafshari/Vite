import { lazy } from "react";

const Main = lazy(() => import("./page/Main"));
export default function App() {
  return <Main />;
}
