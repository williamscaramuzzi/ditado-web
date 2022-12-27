import { useState } from "react";
import vetorpalavras from "./palavras";
import "./estilo.css";

export default function App() {
  const [palavra, setPalavra] = useState("");
  const [botao, setBotao] = useState("Começar!");
  const [valendo, setValendo] = useState(false);
  const [cronometro, setCronometro] = useState(0);
  const [intervalID, setIntervalID] = useState(0);
  const [ultimomilestone, setUltimomilestone] = useState(0);
  const [vetorParciais, setVetorParciais] = useState<number[]>([0]);
  const [media, setMedia] = useState("");

  function iniciarCronometro() {
    setUltimomilestone(0);
    var contador = 0;
    let id = setInterval(() => {
      contador = contador + 1;
      setCronometro(contador)
    }, 1000);
    setIntervalID(id);
  }

  function pararCronometro() {
    console.log("parando o cronometro de id: " + intervalID)
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
    cell1.innerText = palavra;
    let cell2 = row.insertCell(2);
    cell2.innerText = parcial.toString() + " segundos";
    if (vetorParciais[0] === 0) {
      let vetorinicial = [parcial];
      setVetorParciais(vetorinicial)
      setMedia(parcial.toString())
    } else {
      setVetorParciais(oldValue => {
        let novoVetor = [...oldValue, parcial];
        let total = 0;
        novoVetor.forEach((value) => {
          total = total + value;
        })
        let media = total / (novoVetor.length);
        setMedia(media.toFixed(2));
        return novoVetor;
      })

    }

  }

  function proximaPalavra() {
    let i = Math.floor(Math.random() * vetorpalavras.length);
    setPalavra(vetorpalavras[i])
  }

  async function handleBotao() {
    if (valendo) {
      marcarParcial();
      proximaPalavra();
    } else {
      //Só entra nesse else a primeira vez, quando o botão tá escrito começar
      setValendo(true);
      setBotao("Próxima!");
      proximaPalavra();
      iniciarCronometro();
      setMedia("");
      let tbody: HTMLTableElement | null = document.getElementById("tbody") as HTMLTableElement;
      tbody.replaceChildren();
    }
  }

  function pararDitado() {
    setValendo(false);
    setBotao("Começar!")
    pararCronometro();
    setPalavra("");
  }

  return (
    <div className="bloco">
      <div className="container">
        <div className="titulo">DITADO</div>
        <div className="subtitulo">Leia as palavras</div>
        <div className="palavra">{palavra}</div>
        <br />
        <div className="divdosbotoes">
          <button onClick={handleBotao}>{botao}</button>
          <button onClick={pararDitado}>Parar!</button>
        </div>
        <br /><br />
        <span className="subtitulo">Tempo decorrido: {cronometro}</span>
      </div>
      <div className="divparciais">
        <div className="subtitulo">
          Tempos por palavra
        </div>
        <br />
        <div className="divdatable">
          <table id="tabela">
            <tbody id="tbody">
            </tbody>
          </table>
        </div>
        <span className="subtitulo">
          Média de tempo: {media}
        </span>
      </div>
    </div>
  )
}


