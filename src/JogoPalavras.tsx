import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import vetorpalavras from "./palavras";


export default function JogoPalavras() {
  console.log("criou a function JogoPalavras");
  const navigate = useNavigate();
  const [palavra, setPalavra] = useState("");
  const [botao, setBotao] = useState("Começar!");
  const [media, setMedia] = useState("");
  const [cronometro, setCronometro] = useState(0);
  const [intervalID, setIntervalID] = useState(0);
  //as próximas variáveis são candidatas a useRef
  var ultimomilestone = useRef(0);
  var vetorParciais = useRef<number[]>([0]);
  var indice = useRef(0);
  var valendo = useRef<boolean>(false);

  function shuffle(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function iniciarCronometro() {
    ultimomilestone.current = 0;
    vetorParciais.current = [0];
    var contador = 0;
    let id = setInterval(() => {
      contador = contador + 1;
      setCronometro(contador);
    }, 1000);
    setIntervalID(id);
  }

  function pararCronometro() {
    clearInterval(intervalID);
    setCronometro(0);
  }

  function marcarParcial() {
    let parcial = cronometro - ultimomilestone.current;
    ultimomilestone.current = cronometro;
    let tbody: HTMLTableElement | null = document.getElementById("tbody") as HTMLTableElement;
    let row = tbody.insertRow();
    let cell0 = row.insertCell(0);
    cell0.innerText = (row.rowIndex + 1).toString();
    let cell1 = row.insertCell(1);
    cell1.innerText = palavra;
    let cell2 = row.insertCell(2);
    cell2.innerText = parcial.toString() + " segundos";
    if (vetorParciais.current[0] === 0) {
      let vetorinicial = [parcial];
      vetorParciais.current = vetorinicial;
      setMedia(parcial.toString());
    } else {
      let novoVetor = [...vetorParciais.current, parcial];
      let total = 0;
      novoVetor.forEach((value) => {
        total = total + value;
      });
      let media = total / novoVetor.length;
      setMedia(media.toFixed(2));
      vetorParciais.current = novoVetor;
    }
  }

  function proximaPalavra(i: number) {
    setPalavra(vetorpalavras[indice.current]);
    if (indice.current === vetorpalavras.length - 1) {
      indice.current = 0;
    } else {
      console.log("entrou no else")
      indice.current = indice.current + 1;
    }
    console.log("indice agora: " + indice)
  }

  async function handleBotao() {
    if (valendo.current) {
      marcarParcial();
      proximaPalavra(indice.current);
    } else {
      //Só entra nesse else a primeira vez, quando o botão tá escrito começar
      valendo.current = true;
      setBotao("Próxima!");
      proximaPalavra(indice.current);
      iniciarCronometro();
      setMedia("");
      let tbody: HTMLTableElement | null = document.getElementById("tbody") as HTMLTableElement;
      tbody.replaceChildren();
    }
  }

  function pararDitado() {
    valendo.current = false;
    setBotao("Começar!");
    pararCronometro();
    setPalavra("");
  }
  useEffect(() => {
    shuffle(vetorpalavras);
    console.log("vetor palavras shuffleado: " + vetorpalavras.toString())
  }, [])

  return (
    <div className="bloco">
      <div className="container">
        <div className="titulo">LEITURA DE PALAVRAS</div>
        <div className="subtitulo">
          Voltar{" "}
          <button
            id="botaovoltar"
            onClick={() => {
              navigate("/");
            }}
          >
            ⮐
          </button>
        </div>
        <div className="palavra">{palavra}</div>
        <br />
        <div className="divdosbotoes">
          <button onClick={handleBotao}>{botao}</button>
          <button onClick={pararDitado}>Parar!</button>
        </div>
        <br />
        <br />
        <span className="subtitulo">Tempo decorrido: {cronometro}</span>
      </div>
      <div className="divparciais">
        <div className="subtitulo">Tempos por palavra</div>
        <br />
        <div className="divdatable">
          <table id="tabela">
            <tbody id="tbody"></tbody>
          </table>
        </div>
        <span className="subtitulo">Média de tempo: {media}</span>
      </div>
    </div>
  );
}
/**
 * sempre que for fazer deploy
 * 1) faça git add . e commit na branch master
 * 2) faça git push -u origin master
 * 3) rode npm run build
 * 4) corrija o problema no HTML buildado na pasta dist, o caminho para os assets tem que ser sem barra /
 * 5) faça git add dist -f
 * 6) faça git commit -m "Adding dist"
 * 7) faça git subtree push --prefix dist origin gh-pages
 */
