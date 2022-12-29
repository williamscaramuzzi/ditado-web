import React from "react";
import ReactDOM from "react-dom/client";
import JogoPalavras from "./JogoPalavras";
import Indice from "./Indice";
import JogoFonemas from "./JogoFonemas";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./estilo.css";

const router = createHashRouter([
  {
    path: "/",
    element: <Indice />,
  },
  {
    path: "/fonemas",
    element: <JogoFonemas />,
  },
  {
    path: "/palavras",
    element: <JogoPalavras />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
