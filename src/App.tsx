import { Routes, Route } from "react-router-dom";
import "./App.css";
import "antd/dist/reset.css";
import Application from "./pages/Application/Application";
import ErrorPage from "./pages/error-page";

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          key={"application-page-key"}
          element={<Application />}
        />
        <Route
          path="*"
          action={() => {
            throw new Response("Bad Request", { status: 400 });
          }}
          element={<ErrorPage />}
        />
      </Routes>
    </>
  );
}

export default App;
