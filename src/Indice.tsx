import { useNavigate } from "react-router-dom";

export default function Indice() {
  const navigate = useNavigate();
  return (
    <div>
      <span id="mensageminicial">Escolha o treinamento de hoje</span>
      <div className="escolha">
        <button
          onClick={() => {
            navigate("/palavras");
          }}
        >
          Treinar palavras
        </button>
        <button
          onClick={() => {
            navigate("/fonemas");
          }}
        >
          Treinar fonemas
        </button>
        <button
          onClick={() => {
            navigate("/relogio");
          }}
        >
          Treinar relógio
        </button>
      </div>
    </div>
  );
}
