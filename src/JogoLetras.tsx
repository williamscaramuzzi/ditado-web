import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import vetorletras from "./letras";

export default function JogoLetras() {
  const navigate = useNavigate();
  const [letra, setLetra] = useState("");
  const [botao, setBotao] = useState("Começar!");
  const [media, setMedia] = useState("");
  const [cronometro, setCronometro] = useState(0);
  const [intervalID, setIntervalID] = useState(0);
  //as próximas variáveis são useref
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
    cell1.innerText = letra;
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
      return vetorParciais.current
    }
  }

  function proximaLetra() {
    setLetra(vetorletras[indice.current]);
    if (indice.current === vetorletras.length - 1) {
      indice.current = 0;
    } else {
      indice.current = indice.current + 1;
    }
  }

  async function handleBotao() {
    if (valendo.current) {
      marcarParcial();
      proximaLetra();
    } else {
      //Só entra nesse else a primeira vez, quando o botão tá escrito começar
      valendo.current = true;
      setBotao("Próxima!");
      proximaLetra();
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
    setLetra("");
  }

  useEffect(() => {
    shuffle(vetorletras);
  }, [])

  return (
    <div className="bloco">
      <div className="container">
        <div className="titulo">LETRAS E NÚMEROS</div>
        <div className="subtitulo">
          Voltar{" "}
          <button
            id="botaovoltar"
            onClick={() => {
              navigate("/");
            }}
          >
            &#x2190;
          </button>
        </div>
        <div id="divdaletra" className="letra">
          {letra}
        </div>
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
        <div className="subtitulo">Tempos por letra</div>
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
