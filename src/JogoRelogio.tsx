import { useState } from "react";
import { useNavigate } from "react-router-dom";

var mapa_angulo_hora = new Map<number, string>();
mapa_angulo_hora.set(0, "12");
mapa_angulo_hora.set(30, "01");
mapa_angulo_hora.set(60, "02");
mapa_angulo_hora.set(90, "03");
mapa_angulo_hora.set(120, "04");
mapa_angulo_hora.set(150, "05");
mapa_angulo_hora.set(180, "06");
mapa_angulo_hora.set(210, "07");
mapa_angulo_hora.set(240, "08");
mapa_angulo_hora.set(270, "09");
mapa_angulo_hora.set(300, "10");
mapa_angulo_hora.set(330, "11");
var mapa_angulo_minuto = new Map<number, string>();
mapa_angulo_minuto.set(0, "00");
mapa_angulo_minuto.set(30, "05");
mapa_angulo_minuto.set(60, "10");
mapa_angulo_minuto.set(90, "15");
mapa_angulo_minuto.set(120, "20");
mapa_angulo_minuto.set(150, "25");
mapa_angulo_minuto.set(180, "30");
mapa_angulo_minuto.set(210, "35");
mapa_angulo_minuto.set(240, "40");
mapa_angulo_minuto.set(270, "45");
mapa_angulo_minuto.set(300, "50");
mapa_angulo_minuto.set(330, "55");
const listaangulos = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

export default function JogoRelogio() {
  const [hora, setHora] = useState("");
  const [minuto, setMinuto] = useState("");
  const [x2hora, setx2hora] = useState(400);
  const [y2hora, sety2hora] = useState(170);
  const [x2minuto, setx2minuto] = useState(400);
  const [y2minuto, sety2minuto] = useState(70);
  const [botao, setBotao] = useState("Começar!");
  const [valendo, setValendo] = useState(false);
  const [cronometro, setCronometro] = useState(0);
  const [intervalID, setIntervalID] = useState(0);
  const [ultimomilestone, setUltimomilestone] = useState(0);
  const [vetorParciais, setVetorParciais] = useState<number[]>([0]);
  const [media, setMedia] = useState("");
  const navigate = useNavigate();

  function degrees_to_radians(degrees: number): number {
    var pi = Math.PI;
    return degrees * (pi / 180);
  }

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
    cell1.innerText = hora.toString() + ":" + minuto.toString();
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

  function proximaHora() {
    let angulo1 = listaangulos[Math.floor(Math.random() * listaangulos.length)];
    let minuto_randomico = mapa_angulo_minuto.get(angulo1)!;
    setMinuto(minuto_randomico);
    setx2minuto((v) => {
      return 400 + 330 * Math.sin(degrees_to_radians(angulo1));
    });
    sety2minuto((v) => {
      return 400 - 330 * Math.cos(degrees_to_radians(angulo1));
    });
    let angulo2 = listaangulos[Math.floor(Math.random() * listaangulos.length)];
    let hora_randomica = mapa_angulo_hora.get(angulo2)!;
    //temperar o angulo2 pro ponteiro das horas ficar no meio do caminho conforme os minutos
    //minutos sobre sessenta me dá uma porcentagem... multiplico essa porcentagem por 30 graus, me da uma fração desses 30 graus
    let tempero = (parseInt(minuto_randomico) / 60) * 30;
    angulo2 = angulo2 + tempero;
    setHora(hora_randomica);
    setx2hora((v) => {
      return 400 + 236 * Math.sin(degrees_to_radians(angulo2));
    });
    sety2hora((v) => {
      return 400 - 236 * Math.cos(degrees_to_radians(angulo2));
    });
  }

  async function handleBotao() {
    if (valendo) {
      marcarParcial();
      proximaHora();
    } else {
      //Só entra nesse else a primeira vez, quando o botão tá escrito começar
      setValendo(true);
      setBotao("Próxima!");
      proximaHora();
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
    setHora("0");
    setMinuto("0");
  }

  return (
    <div className="bloco">
      <div className="containerdorelogio">
        <div className="titulodorelogio">
          <h1>RELÓGIO DE PONTEIRO</h1>
          Voltar
          <button
            id="botaovoltar"
            onClick={() => {
              navigate("/");
            }}
          >
            ⮐
          </button>
        </div>
        <div className="divdosbotoesdorelogio">
          <button onClick={handleBotao}>{botao}</button>
          <button onClick={pararDitado}>Parar!</button>
          Tempo decorrido: {cronometro}
        </div>
        <svg className="divdorelogio">
          <line
            x1="400"
            y1="400"
            x2={x2hora}
            y2={y2hora}
            style={{ stroke: "rgba(52,52,80,0.5)", strokeWidth: 20 }}
          />
          <line
            x1="400"
            y1="400"
            x2={x2minuto}
            y2={y2minuto}
            style={{ stroke: "rgba(240,33,33,0.7)", strokeWidth: 20 }}
          />
        </svg>
        <div className="divparciaisdorelogio">
          <div className="subtitulo">Tempos por hora</div>
          <br />
          <div className="divdatable">
            <table id="tabela">
              <tbody id="tbody"></tbody>
            </table>
          </div>
          <span>Média de tempo: {media}</span>
        </div>
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
