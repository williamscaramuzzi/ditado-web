import React from "react";
import ReactDOM from "react-dom/client";
import JogoPalavras from "./JogoPalavras";
import Indice from "./Indice";
import JogoFonemas from "./JogoFonemas";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./estilo.css";
import JogoRelogio from "./JogoRelogio";
import JogoLetras from "./JogoLetras";
import JogoLetrasMinusculas from "./JogoLetrasMinusculas";
import JogoTabuada from "./JogoTabuada";

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
    path: "/letras",
    element: <JogoLetras />,
  },
  {
    path: "/letrasminusculas",
    element: <JogoLetrasMinusculas />,
  },
  {
    path: "/palavras",
    element: <JogoPalavras />,
  },
  {
    path: "/relogio",
    element: <JogoRelogio />,
  },
  {
    path: "/tabuada",
    element: <JogoTabuada />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
