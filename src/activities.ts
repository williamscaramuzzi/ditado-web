export type ActivityKind = "palavras" | "fonemas" | "letraminuscula" | "letras" | "relogio" | "tabuada" | "soma";

export const activities: {
  path: string;
  kind: ActivityKind;
  name: string;
  detail: string;
  label: string;
}[] = [
  { path: "/soma", kind: "soma", name: "Soma", detail: "Brinque de somar e resolva novos desafios.", label: "Vamos calcular" },
  { path: "/tabuada", kind: "tabuada", name: "Tabuada", detail: "Brinque de multiplicar e resolva novos desafios.", label: "Vamos calcular" },
  { path: "/relogio", kind: "relogio", name: "Relógio", detail: "Siga os ponteiros e descubra que horas são.", label: "Aprender as horas" },
  { path: "/letrasminusculas", kind: "letraminuscula", name: "Letras minúsculas", detail: "Conheça as letras de forma e suas amigas cursivas.", label: "Conhecer as letras" },
  { path: "/fonemas", kind: "fonemas", name: "Fonemas", detail: "Descubra os sons e brinque com as sílabas.", label: "Explorar os sons" },
  { path: "/palavras", kind: "palavras", name: "Palavras", detail: "Abra um mundo de histórias, uma palavra de cada vez.", label: "Vamos ler" },
  { path: "/letras", kind: "letras", name: "Letras e números", detail: "Uma aventura pelo alfabeto e pelos números.", label: "Vamos descobrir" },
];

