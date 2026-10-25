import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface PartialTime {
    index: number;
    expression: string;
    time: number;
}

type Digitos = 1 | 2;

// Converte segundos totais para o formato mm:ss.
// Os minutos são completados a cada 60 segundos (divisão inteira)
// e os segundos são o resto da divisão por 60.
function formatTime(totalSeconds: number): string {
    const minutos = Math.floor(totalSeconds / 60);
    const segundos = totalSeconds % 60;
    return `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
}

export default function JogoSoma() {
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    // Quantidade de algarismos escolhida: 1 (ex.: 8 + 9) ou 2 (ex.: 45 + 8)
    const [digitos, setDigitos] = useState<Digitos>(1);

    const [resultado, setResultado] = useState<number | "">("");
    const [expressions, setExpressions] = useState<string[]>([]);
    const [currentExpression, setCurrentExpression] = useState("");
    const [buttonText, setButtonText] = useState("Começar!");
    const [averageTime, setAverageTime] = useState("");
    const [cronometro, setCronometro] = useState(0);
    const [intervalID, setIntervalID] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [lastMilestone, setLastMilestone] = useState(0);
    const [partialTimes, setPartialTimes] = useState<PartialTime[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isActive, setIsActive] = useState(false);

    // Fisher-Yates shuffle algorithm
    const shuffleArray = useCallback(<T,>(array: T[]): T[] => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }, []);

    const generateExpressions = useCallback(() => {
        const combinations: string[] = [];

        if (digitos === 1) {
            // Dois números de 1 algarismo (1 a 9): 81 combinações
            for (let a = 1; a <= 9; a++) {
                for (let b = 1; b <= 9; b++) {
                    combinations.push(`${a} + ${b}`);
                }
            }
        } else {
            // Um número de 2 algarismos (10 a 99) + um de 1 algarismo (1 a 9): 810 combinações
            for (let a = 10; a <= 99; a++) {
                for (let b = 1; b <= 9; b++) {
                    combinations.push(`${a} + ${b}`);
                }
            }
        }

        // Fill 100 exercises, reshuffling the combinations each round.
        const exercises: string[] = [];
        while (exercises.length < 100) {
            const shuffled = shuffleArray(combinations);
            exercises.push(...shuffled.slice(0, 100 - exercises.length));
        }
        return exercises;
    }, [digitos, shuffleArray]);

    const startTimer = useCallback(() => {
        setLastMilestone(0);
        setPartialTimes([]);
        setCronometro(0);

        const id = setInterval(() => {
            setCronometro(prev => prev + 1);
        }, 1000);

        setIntervalID(id);
    }, []);

    const stopTimer = useCallback(() => {
        if (intervalID) {
            clearInterval(intervalID);
            setIntervalID(null);
        }
        // O cronômetro NÃO é zerado aqui: ele fica congelado até uma nova sessão começar
        // (o startTimer já faz setCronometro(0)).
    }, [intervalID]);

    const calculateAverage = useCallback((times: PartialTime[]): string => {
        if (times.length === 0) return "";

        const total = times.reduce((sum, item) => sum + item.time, 0);
        const average = total / times.length;
        return average.toFixed(2);
    }, []);

    const recordPartialTime = useCallback(() => {
        const partialTime = cronometro - lastMilestone;
        const newPartial: PartialTime = {
            index: partialTimes.length + 1,
            expression: currentExpression,
            time: partialTime
        };

        const updatedPartialTimes = [...partialTimes, newPartial];
        setPartialTimes(updatedPartialTimes);
        setLastMilestone(cronometro);
        setAverageTime(calculateAverage(updatedPartialTimes));
    }, [cronometro, lastMilestone, partialTimes, currentExpression, calculateAverage]);

    const moveToNextExpression = useCallback(() => {
        if (expressions.length === 0) return;

        const nextIndex = currentIndex >= expressions.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(nextIndex);
        setCurrentExpression(expressions[nextIndex]);
    }, [expressions, currentIndex]);

    const handleStart = useCallback(() => {
        if (isActive) {
            if (!currentExpression) return; // proteção

            // Extrair as parcelas da expressão, que tem o formato "45 + 8"
            const [parcela1Str, , parcela2Str] = currentExpression.split(" ");
            const parcela1 = parseInt(parcela1Str, 10);
            const parcela2 = parseInt(parcela2Str, 10);
            const resultadoEsperado = parcela1 + parcela2;

            // Verificar se a resposta do usuário é igual ao resultado esperado
            if (parseInt(String(resultado), 10) !== resultadoEsperado) {
                setErrorMessage("Resposta errada! Tente de novo");
                inputRef.current?.focus();
                return; // sai sem mudar nada
            }

            // Se resposta certa:
            setErrorMessage("");
            recordPartialTime();
            moveToNextExpression();
            setResultado("");
            inputRef.current?.focus();
        } else {
            // Start the game
            const newExpressions = generateExpressions();
            if (newExpressions.length === 0) return;

            setExpressions(newExpressions);
            setCurrentIndex(0);
            setCurrentExpression(newExpressions[0]);
            setIsActive(true);
            setButtonText("Próxima!");
            setPartialTimes([]);
            setAverageTime("");
            setResultado("");
            setErrorMessage("");
            startTimer();
            inputRef.current?.focus();
        }
    }, [
        isActive,
        currentExpression,
        resultado,
        recordPartialTime,
        moveToNextExpression,
        generateExpressions,
        startTimer,
    ]);

    const handleStop = useCallback(() => {
        setIsActive(false);
        setButtonText("Começar!");
        setCurrentExpression("");
        stopTimer();
    }, [stopTimer]);

    // Cleanup interval on unmount
    useEffect(() => {
        return () => {
            if (intervalID) {
                clearInterval(intervalID);
            }
        };
    }, [intervalID]);

    return (
        <div className="bloco">
            <div className="container">
                <h1 className="titulo">SOMA</h1>
                <div className="subtitulo">
                    Voltar{" "}
                    <button
                        id="botaovoltar" aria-label="Voltar ao início"
                        onClick={() => navigate("/")}
                    >
                        ⮐
                    </button>
                </div>
                <div className="soma-options">
                    <span className="subtitulo">Escolha a quantidade de algarismos:</span>
                    {([1, 2] as const).map((qtd) => (
                        <span key={qtd}>
                            <input
                                type="radio"
                                name="algarismos"
                                id={`alg${qtd}`}
                                checked={digitos === qtd}
                                onChange={() => setDigitos(qtd)}
                            />
                            <label className="subtitulo" htmlFor={`alg${qtd}`}>
                                {qtd} algarismo{qtd > 1 ? "s" : ""}
                            </label>
                        </span>
                    ))}
                </div>
                <div className="palavra">{currentExpression}</div>
                <br />
                <div className="divdosbotoes">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleStart();
                        }}
                    >
                        <input
                            ref={inputRef}
                            aria-label="Resultado da soma" type="number"
                            step="1"
                            pattern="\d*"
                            value={resultado}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val === "") {
                                    setResultado("");
                                } else if (/^\d+$/.test(val)) {
                                    setResultado(parseInt(val, 10));
                                }
                            }}
                            placeholder="Digite o resultado da soma"
                        />
                        <div className="botoes-linha">
                            <input className="botaocomecar" type="submit" value={buttonText} />
                            <button type="button" onClick={handleStop}>Parar!</button>
                        </div>
                    </form>
                </div>
                <span className="error-message" role="alert">{errorMessage}</span>

                <br />
                <br />
                <span className="subtitulo">Tempo decorrido: {formatTime(cronometro)}</span>
            </div>
            <div className="divparciais">
                <div className="subtitulo">Tempos por resposta</div>
                <br />
                <div className="divdatable">
                    <table id="tabela">
                        <tbody id="tbody">
                            {partialTimes.map((partial) => (
                                <tr key={partial.index}>
                                    <td>{partial.index}</td>
                                    <td>{partial.expression}</td>
                                    <td>{partial.time} segundos</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <span className="subtitulo">Média de tempo: {averageTime}</span>
            </div>
        </div>
    );
}
