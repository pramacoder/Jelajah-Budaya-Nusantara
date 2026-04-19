import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { IndonesiaMap } from "./components/IndonesiaMap";
import { IslandDetail } from "./components/IslandDetail";
import { NotFound } from "./components/NotFound";
import { QuizPage } from "./QuizPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "indonesia", Component: IndonesiaMap },
      { path: "indonesia/:islandId", Component: IslandDetail },
      { path: "quiz", element: <ProtectedRoute><QuizPage /></ProtectedRoute> },
      { path: "*", Component: NotFound },
    ],
  },
]);
