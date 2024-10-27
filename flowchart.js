let state = 'start';
let path = [];
let quizEnded = false;

function nextQuestion(answer) {
    if (quizEnded) return;

    switch(state) {
        case 'start':
            path.push(answer === 'ja' ? 'mit Reihenfolge' : 'ohne Reihenfolge');
            if(answer === 'ja') {
                updateQuestion('Sind Wiederholungen erlaubt?', 'Können Elemente mehrfach vorkommen oder werden sie nur einmal verwendet?');
                updateButtons('Ja, mit Wiederholung', 'Nein, ohne Wiederholung');
                state = 'wiederholungJa';
            } else {
                updateQuestion('Sind Wiederholungen erlaubt?', 'Können Elemente mehrfach vorkommen oder werden sie nur einmal verwendet?');
                updateButtons('Ja, mit Wiederholung', 'Nein, ohne Wiederholung');
                state = 'wiederholungNein';
            }
            break;
        case 'wiederholungJa':
            path.push(answer === 'ja' ? 'mit Wiederholung' : 'ohne Wiederholung');
            if(answer === 'ja') {
                showResult('Variation mit Wiederholung', '\\[ n^k \\]', 'Bei einer Variation mit Wiederholung wählst du k Elemente aus n Möglichkeiten aus. Die Reihenfolge ist wichtig, und du darfst Elemente mehrfach verwenden. Es ist wie ein Passwort mit k Stellen, wobei du für jede Stelle n Möglichkeiten hast.', 'variationMitWdh');
                quizEnded = true;
            } else {
                updateQuestion('Werden alle Elemente verwendet?', 'Verwendest du in deiner Auswahl alle verfügbaren Elemente oder nur einen Teil davon?');
                updateButtons('Ja, alle Elemente', 'Nein, nur ein Teil');
                state = 'alleElemente';
            }
            break;
        case 'wiederholungNein':
            path.push(answer === 'ja' ? 'mit Wiederholung' : 'ohne Wiederholung');
            if(answer === 'ja') {
                showResult('Kombination mit Wiederholung', '\\[ \\binom{n+k-1}{k} \\]', 'Bei einer Kombination mit Wiederholung wählst du k Elemente aus n Möglichkeiten aus. Die Reihenfolge ist egal, aber du darfst Elemente mehrfach verwenden. Stell dir vor, du hast n Sorten Eis und willst k Kugeln in deinem Becher haben.', 'kombinationMitWdh');
                quizEnded = true;
            } else {
                showResult('Kombination ohne Wiederholung', '\\[ \\binom{n}{k} \\]', 'Bei einer Kombination ohne Wiederholung wählst du k Elemente aus n Möglichkeiten aus. Die Reihenfolge ist egal, und jedes Element darf nur einmal vorkommen. Es ist wie wenn du aus n Freunden k für eine Party einlädst.', 'kombinationOhneWdh');
                quizEnded = true;
            }
            break;
        case 'alleElemente':
            path.push(answer === 'ja' ? 'alle Elemente' : 'Teil der Elemente');
            if(answer === 'ja') {
                showResult('Permutation ohne Wiederholung', '\\[ n! \\]', 'Eine Permutation ohne Wiederholung ordnet alle n Elemente an, wobei jedes Element genau einmal vorkommt. Es ist wie wenn du n Personen in einer Reihe aufstellst - jede mögliche Reihenfolge ist eine Permutation.', 'permutation');
                quizEnded = true;
            } else {
                showResult('Variation ohne Wiederholung', '\\[ \\frac{n!}{(n-k)!} \\]', 'Bei einer Variation ohne Wiederholung wählst du k Elemente aus n Möglichkeiten aus. Die Reihenfolge ist wichtig, und jedes Element darf nur einmal vorkommen. Stell dir vor, du wählst aus n Läufern die ersten k Plätze eines Rennens.', 'variationOhneWdh');
                quizEnded = true;
            }
            break;
    }

    updatePath();
    if (quizEnded) {
        showFinalResult();
    }
}

function updateQuestion(text, description) {
    document.getElementById('questionText').innerText = text;
    document.getElementById('questionDescription').innerText = description;
    document.getElementById('btnYes').style.display = 'inline-block';
    document.getElementById('btnNo').style.display = 'inline-block';
    document.getElementById('result').style.display = 'none';
    document.getElementById('resetBtn').style.display = 'none';
}

function updateButtons(yesText, noText) {
    document.getElementById('btnYes').innerText = yesText;
    document.getElementById('btnNo').innerText = noText;
}

function showResult(text, formula, explanation, calculatorType) {
    document.getElementById('resultText').innerText = text;
    document.getElementById('formula').innerHTML = formula;
    document.getElementById('explanation').innerText = explanation;
    if (typeof MathJax !== 'undefined') {
        MathJax.typeset();
    }
    createCalculator(calculatorType);
}

function showFinalResult() {
    document.getElementById('questionText').style.display = 'none';
    document.getElementById('questionDescription').style.display = 'none';
    document.getElementById('btnYes').style.display = 'none';
    document.getElementById('btnNo').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('resetBtn').style.display = 'inline-block';
}

function updatePath() {
    document.getElementById('path').innerText = 'Dein kombinatorischer Weg: ' + (path.length > 0 ? path.join(' → ') : 'Beginn');
}

function resetQuiz() {
    state = 'start';
    path = [];
    quizEnded = false;
    updatePath();
    updateQuestion('Ist die Reihenfolge relevant?', 'Entscheide, ob die Reihenfolge der Elemente in deinem Problem eine Rolle spielt.');
    updateButtons('Ja, mit Reihenfolge', 'Nein, ohne Reihenfolge');
    
    document.getElementById('questionText').style.display = 'block';
    document.getElementById('questionDescription').style.display = 'block';
    document.getElementById('btnYes').style.display = 'inline-block';
    document.getElementById('btnNo').style.display = 'inline-block';
    document.getElementById('result').style.display = 'none';
    document.getElementById('resetBtn').style.display = 'none';
    
    document.getElementById('formula').innerHTML = '';
    document.getElementById('calculator').innerHTML = '';
    document.getElementById('explanation').innerText = '';
    document.getElementById('resultText').innerText = '';
}

function createCalculator(type) {
    let calculatorHtml = '';
    switch(type) {
        case 'variationMitWdh':
        case 'kombinationMitWdh':
        case 'kombinationOhneWdh':
        case 'variationOhneWdh':
            calculatorHtml = `
                <h3>Rechner: ${type}</h3>
                <div>
                    <input type="number" id="n-input" placeholder="n">
                    <input type="number" id="k-input" placeholder="k">
                    <button onclick="calculate('${type}')">Berechnen</button>
                </div>
                <p id="calc-result"></p>
            `;
            break;
        case 'permutation':
            calculatorHtml = `
                <h3>Rechner: Permutation</h3>
                <div>
                    <input type="number" id="n-input" placeholder="n">
                    <button onclick="calculate('permutation')">Berechnen</button>
                </div>
                <p id="calc-result"></p>
            `;
            break;
    }
    document.getElementById('calculator').innerHTML = calculatorHtml;
}

function calculate(type) {
    let n = parseInt(document.getElementById('n-input').value);
    let k = type !== 'permutation' ? parseInt(document.getElementById('k-input').value) : null;
    let result;

    if (isNaN(n) || (k !== null && isNaN(k)) || n < 0 || (k !== null && k < 0)) {
        document.getElementById('calc-result').innerText = "Bitte geben Sie gültige positive Zahlen ein.";
        return;
    }

    try {
        switch(type) {
            case 'variationMitWdh':
                result = Math.pow(n, k);
                break;
            case 'kombinationMitWdh':
                result = binomialCoeff(n + k - 1, k);
                break;
            case 'kombinationOhneWdh':
                result = binomialCoeff(n, k);
                break;
            case 'permutation':
                result = factorial(n);
                break;
            case 'variationOhneWdh':
                result = factorial(n) / factorial(n - k);
                break;
        }
        let formattedResult = result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        document.getElementById('calc-result').innerText = `Ergebnis: ${result}`;
    } catch (error) {
        document.getElementById('calc-result').innerText = "Fehler bei der Berechnung. Bitte überprüfen Sie Ihre Eingaben.";
    }
}

function factorial(n) {
    if (n > 170) throw new Error("Zahl zu groß für Fakultätsberechnung");
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function binomialCoeff(n, k) {
    if (k > n) return 0;
    if (k === 0 || k === n) return 1;
    let result = 1;
    k = Math.min(k, n - k); // Optimierung: benutze kleineres k
    
    for (let i = 1; i <= k; i++) {
        result *= (n - (k - i));
        result /= i;
    }
    
    return Math.round(result); // Runde um Ungenauigkeiten zu vermeiden
}

document.addEventListener('DOMContentLoaded', function() {
    resetQuiz();

    // Event-Listener für Ja/Nein Buttons
    document.getElementById('btnYes').addEventListener('click', function() {
        nextQuestion('ja');
    });

    document.getElementById('btnNo').addEventListener('click', function() {
        nextQuestion('nein');
    });

    // Event-Listener für Reset-Button
    document.getElementById('resetBtn').addEventListener('click', resetQuiz);
});
