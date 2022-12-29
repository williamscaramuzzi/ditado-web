import { useState } from "react";
import { useNavigate } from "react-router-dom";
import vetorfonemas from "./fonemas";

export default function JogoFonemas() {
  const [fonema, setFonema] = useState("");
  const [botao, setBotao] = useState("Começar!");
  const [valendo, setValendo] = useState(false);
  const [cronometro, setCronometro] = useState(0);
  const [intervalID, setIntervalID] = useState(0);
  const [ultimomilestone, setUltimomilestone] = useState(0);
  const [vetorParciais, setVetorParciais] = useState<number[]>([0]);
  const [media, setMedia] = useState("");
  const navigate = useNavigate();

  function iniciarCronometro() {
    setUltimomilestone(0);
    setVetorParciais([0]);
    var contador = 0;
    let id = setInterval(() => {
      contador = contador + 1;
      setCronometro(contador);
    }, 1000);
    setIntervalID(id);
  }

  function pararCronometro() {
    console.log("parando o cronometro de id: " + intervalID);
    clearInterval(intervalID);
    setCronometro(0);
  }

  function marcarParcial() {
    let parcial = cronometro - ultimomilestone;
    setUltimomilestone(cronometro);
    let tbody: HTMLTableElement | null = document.getElementById("tbody") as HTMLTableElement;
    let row = tbody.insertRow();
    let cell0 = row.insertCell(0);
    cell0.innerText = (row.rowIndex + 1).toString();
    let cell1 = row.insertCell(1);
    cell1.innerText = fonema;
    let cell2 = row.insertCell(2);
    cell2.innerText = parcial.toString() + " segundos";
    if (vetorParciais[0] === 0) {
      let vetorinicial = [parcial];
      setVetorParciais(vetorinicial);
      setMedia(parcial.toString());
    } else {
      setVetorParciais((oldValue) => {
        let novoVetor = [...oldValue, parcial];
        let total = 0;
        novoVetor.forEach((value) => {
          total = total + value;
        });
        let media = total / novoVetor.length;
        setMedia(media.toFixed(2));
        return novoVetor;
      });
    }
  }

  function proximoFonema() {
    let i = Math.floor(Math.random() * vetorfonemas.length);
    setFonema(vetorfonemas[i]);
    let divdofonema = document.getElementById("divdofonema") as HTMLDivElement;
    console.log(divdofonema.clientWidth);
  }

  async function handleBotao() {
    if (valendo) {
      marcarParcial();
      proximoFonema();
    } else {
      //Só entra nesse else a primeira vez, quando o botão tá escrito começar
      setValendo(true);
      setBotao("Próxima!");
      proximoFonema();
      iniciarCronometro();
      setMedia("");
      let tbody: HTMLTableElement | null = document.getElementById("tbody") as HTMLTableElement;
      tbody.replaceChildren();
    }
  }

  function pararDitado() {
    setValendo(false);
    setBotao("Começar!");
    pararCronometro();
    setFonema("");
  }

  return (
    <div className="bloco">
      <div className="container">
        <div className="titulo">FONEMAS</div>
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
        <div id="divdofonema" className="fonema">
          {fonema}
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
        <div className="subtitulo">Tempos por fonema</div>
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
