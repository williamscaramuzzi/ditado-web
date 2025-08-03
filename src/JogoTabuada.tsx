import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface PartialTime {
    index: number;
    expression: string;
    time: number;
}

interface TabuadaStates {
    [key: number]: boolean;
}

export default function JogoTabuada() {
    const navigate = useNavigate();

    // Consolidate multiple boolean states into a single object
    const [selectedTabuadas, setSelectedTabuadas] = useState<TabuadaStates>({
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
    });

    const [resultado, setResultado] = useState<number | "">("");
    const [expressions, setExpressions] = useState<string[]>([]);
    const [currentExpression, setCurrentExpression] = useState("");
    const [buttonText, setButtonText] = useState("Começar!");
    const [averageTime, setAverageTime] = useState("");
    const [cronometro, setCronometro] = useState(0);
    const [intervalID, setIntervalID] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("")

    // Replace useRef with proper state management
    const [lastMilestone, setLastMilestone] = useState(0);
    const [partialTimes, setPartialTimes] = useState<PartialTime[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isActive, setIsActive] = useState(false);

    // Helper function to toggle tabuada selection
    const toggleTabuada = useCallback((number: number) => {
        setSelectedTabuadas(prev => ({
            ...prev,
            [number]: !prev[number]
        }));
    }, []);

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
        const selectedNumbers = Object.entries(selectedTabuadas)
            .filter(([_, isSelected]) => isSelected)
            .map(([number]) => parseInt(number));

        if (selectedNumbers.length === 0) {
            alert("Selecione pelo menos uma tabuada.");
            return [];
        }

        const combinations: string[] = [];

        // Generate all possible combinations
        for (const fator1 of selectedNumbers) {
            for (let fator2 = 0; fator2 <= 12; fator2++) {
                combinations.push(`${fator1} x ${fator2}`);
            }
        }

        // Shuffle and select up to 30 expressions
        const shuffled = shuffleArray(combinations);
        return shuffled.slice(0, 30);
    }, [selectedTabuadas, shuffleArray]);

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
        setCronometro(0);
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

    function clearInputProduto() {
        setResultado("")
    }

    const handleStart = useCallback(() => {
        if (isActive) {
            // calcular se a resposta foi certa
            // Supondo que currentExpression é algo do tipo "2 x 5"
            // e resultado é o valor digitado pelo usuário (number ou string)

            if (!currentExpression) return; // proteção

            // Extrair os fatores da expressão
            const [fator1Str, , fator2Str] = currentExpression.split(" ");
            const fator1 = parseInt(fator1Str, 10);
            const fator2 = parseInt(fator2Str, 10);
            const resultadoEsperado = fator1 * fator2;

            // Verificar se a resposta do usuário é igual ao resultado esperado
            if (parseInt(String(resultado), 10) !== resultadoEsperado) {
                setErrorMessage(`Resposta errada! Tente de novo`);
                return; // sai sem mudar nada
            }

            // Se resposta certa:
            setErrorMessage(""); // limpar mensagem de erro
            recordPartialTime();
            moveToNextExpression();
            clearInputProduto();
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
            setErrorMessage(""); // limpar mensagem de erro no início
            startTimer();
        }
    }, [
        isActive,
        currentExpression,
        resultado,
        setErrorMessage,
        recordPartialTime,
        moveToNextExpression,
        clearInputProduto,
        generateExpressions,
        setExpressions,
        setCurrentIndex,
        setCurrentExpression,
        setIsActive,
        setButtonText,
        setPartialTimes,
        setAverageTime,
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
                <div className="titulo">TABUADA</div>
                <div className="subtitulo">
                    Voltar{" "}
                    <button
                        id="botaovoltar"
                        onClick={() => navigate("/")}
                    >
                        ⮐
                    </button>
                </div>
                <div>
                    <span className="subtitulo">Escolha quais tabuadas serão sorteadas:</span>
                    {Object.entries(selectedTabuadas).map(([number, isSelected]) => (
                        <span key={number}>
                            <input
                                type="checkbox"
                                id={`num${number}`}
                                checked={isSelected}
                                onChange={() => toggleTabuada(parseInt(number))}
                            />
                            <label className="subtitulo" htmlFor={`num${number}`}>
                                {number}
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
                            type="number"
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
                            placeholder="Digite o resultado da tabuada"
                        />
                        <div className="botoes-linha">
                            <input className="botaocomecar" type="submit" value={buttonText} />
                            <button onClick={handleStop}>Parar!</button>
                        </div>
                    </form>
                </div>
                <span style={{color: "red", fontSize: '2rem'}}>{errorMessage}</span>

                <br />
                <br />
                <span className="subtitulo">Tempo decorrido: {cronometro}</span>
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