let questions = []

let chosenAnswers = []
let chosenSetting = []
let finalQuestions = {
    setting: {},
    questions: []
}
let historyQuizzes = []

let correct = 0

let answers

let stage = 0
let mode = 0

let timer

let canNextStage = false
let dontStop = 1

// SETTING FUNCTIONS

function startSettings(stage) {
    let divSetting, title

    document.querySelector("body").style.overflow = 'hidden'
    document.querySelector("#nextButton").style.display = 'flex'
    document.querySelector("#finalButtons").style.display = 'none'
    document.querySelector(".allConfigArea").style.display = 'flex'

    if(!document.querySelector("body").classList.contains("purple")) {
        document.querySelector("body").classList.add("purple")
        document.querySelector("#logoAreaConfig").style.display = 'flex'
        document.querySelector("#logoAreaQuestion").style.display = 'none'
    }

    document.querySelectorAll(".configArea").forEach(el => {
        el.style.display = 'none'
    })

    switch(stage) {
        case 0: 
            divSetting = document.querySelector("#configCat")
            title = "Choose a category"
            break
        case 1: 
            divSetting = document.querySelector("#configDiff")
            title = "Choose Difficulty"
            break
        case 2: 
            divSetting = document.querySelector("#configTime")
            title = "Set the Time"
            break
    }

    divSetting.querySelector(".configButArea").innerHTML = ''
    divSetting.style.display = 'flex'

    let buttonArea = divSetting.querySelector(".configButArea")
    divSetting.querySelector("h2").innerHTML = title

    settings[stage].map( el => {   
        const button = divSetting.querySelector(".configButton").cloneNode(true)

        button.classList.remove("invisible")
        button.classList.add("newConfigButton")
        button.addEventListener("click", el => clickButton(el.target, '.configButton', 'active'))


        button.setAttribute("key-id", el.id)
        button.innerHTML = el.name

        buttonArea.appendChild(button)
    })
}

document.querySelector("#inputText").addEventListener("input", e => {
    let item = e.target.value

    document.querySelectorAll(".newConfigButton").forEach( el => {
        if(item.toLowerCase() != el.innerHTML.slice(0, item.length).toLowerCase()) {
            el.style.display = 'none'
        } else {
            el.style.display = 'block'
        }

        
    })
})
















// QUIZ FUNCTIONS

async function generateQuiz() {

    // Tela de Load
    const load = document.querySelector(".loadArea")

    load.style.opacity = 0
    load.style.display = 'flex'

    setTimeout( () => {
        load.style.opacity = 1
    }, 500)
    
    // Requisição
    const apiURL = "https://opentdb.com/api.php"
    const category = chosenSetting[0].id
    const difficulty = chosenSetting[1].id

    const params = new URLSearchParams({
        amount: 10,
        ...(category !== 0 && { category }),
        ...(difficulty !== 0 && { difficulty })
    })

    try{
        const response = await fetch(`${apiURL}?${params.toString()}`)
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json();

        // Verifica se as questões foram retornadas
        if (data.response_code !== 0) {
            throw new Error("Nenhuma questão encontrada ou erro nos parâmetros.");
        }

        questions = data.results
    } catch (error) {
        console.error("Erro ao buscar as perguntas:", error.message);
    }

    document.querySelector(".loadArea").style.display = 'none'

    if(chosenSetting[2].id != 0) {
        let timeBar = document.querySelector(".timeBar")
        timeBar.style.display = 'block'
    }

    renderQuiz(stage=0)
}

function renderQuiz(index) {

    let question = questions[index]
    answers = [...question.incorrect_answers,question.correct_answer]
    let questionArea = document.querySelector(".divQuestionArea")


    questionArea.style.display = 'flex'
    document.querySelector("#answerArea").innerHTML = ''
    
    // Embaralhar as Respostas
    for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
    }

    questionArea.querySelector(".numQuest").innerHTML = index+1
    questionArea.querySelector(".questionText").innerHTML = question.question

    answers.map( el => {
        let answer = document.querySelector(".answer").cloneNode(true)

        answer.classList.remove("invisible")
        answer.innerHTML = el

        document.querySelector("#answerArea").appendChild(answer)
        answer.addEventListener("click", el => clickButton(el.target, '.answer', 'answerActive'))
    })

    
    if(+chosenSetting[2].id > 0) {
        dontStop = 1
        resetTimer()
    }
}

function startTimer() {
    let timeLeft = chosenSetting[2].id
    let currentTimeBar

    const timeBar = document.querySelector(".currentTimeBar")

    timer = setInterval(() => {
        timeLeft--
        currentTimeBar = timeLeft-1

        const timePercentage = Math.max((currentTimeBar / chosenSetting[2].id) * 100, 0);
        timeBar.style.transition = `width 1s linear`; // Transição suave
        timeBar.style.width = `${timePercentage}%`;

        
        if(timeLeft<=0 && dontStop==1) {
            resetTimer() // Se para de funcionar colocar clearInterval(timer)
            canNextStage = true
            document.querySelector("#nextButton")?.click()
            canNextStage = false
        }
    }, 1000)
}

function resetTimer() {
    document.querySelector(".currentTimeBar").style.transition = 'none'
    document.querySelector(".currentTimeBar").style.width = '100%'
    clearInterval(timer)
    startTimer()
}

function correctAnswer(index, answer) {
    let response

    if(questions[index].correct_answer == answer) {
        response='correct'
        correct++
    } else {
        response='wrong'
    }

    chosenAnswers.push(
        {
            text: answer,
            response: response,
        }         
    )
}

function addInfo() {
    finalQuestions.questions.push(
        {
            category: questions[stage].category, 
            difficulty: questions[stage].difficulty,
            
            question: questions[stage].question,
            
            correct_answer: questions[stage].correct_answer,
            chosen_answer: chosenAnswers[stage],
            all_answers: answers
        }
    )
}










// REPORT FUNCTIONS

function generateReport() {
    dontStop = 0

    document.querySelector(".divQuestionArea").style.display = 'none'
    document.querySelector(".divReportArea").style.display = 'flex'
    document.querySelector("body").style.overflowY = 'auto'
    document.querySelector("#abstractForm02").style.display = 'none'
    document.querySelector("#nextButton").style.display = 'none'
    document.querySelector("#finalButtons").style.display = 'flex'

    document.querySelector(".bigPct").innerHTML = `${(correct*100)/questions.length}%`
    document.querySelector(".textReport").innerHTML = `You got ${correct} questions out of ${questions.length} correct`

    document.querySelector("#reportDiff").innerHTML = chosenSetting[0].name
    document.querySelector("#reportCat").innerHTML = chosenSetting[1].name
    document.querySelector("#reportTime").innerHTML = chosenSetting[2].name

    renderReportQuiz()
}

function renderReportQuiz() {
    document.querySelector(".allQuestionArea").innerHTML = ''


    finalQuestions.questions.map( (el, index) => {
        let questionArea = document.querySelector(".questionArea").cloneNode(true)

        questionArea.classList.remove("invisible")
        questionArea.querySelector(".answerArea").innerHTML = ''

        questionArea.querySelector(".numQuest").innerHTML = index+1
        questionArea.querySelector(".questionText").innerHTML = el.question

        if(el.chosen_answer.response == 'correct') {            
            questionArea.querySelector(".numQuest").style.backgroundColor = 'var(--greenColor)'
            questionArea.querySelector(".reportQuestionText").style.backgroundColor = 'var(--greenColor)'

        } else if(el.chosen_answer.response == 'wrong'){
            questionArea.querySelector(".numQuest").style.backgroundColor = 'var(--redColor)'
            questionArea.querySelector(".reportQuestionText").style.backgroundColor = 'var(--redColor)'

        } else {
            questionArea.querySelector(".numQuest").style.backgroundColor = 'var(--grayColor)'
            questionArea.querySelector(".reportQuestionText").style.backgroundColor = 'var(--grayColor)'
        }

        for(let i in el.all_answers) {
            let answer = document.querySelector(".answerReport").cloneNode(true)
            let item = el.all_answers[i]

            answer.classList.remove("invisible")
            answer.innerHTML = item

            if(item == el.chosen_answer.text) {
                
                if(item == el.correct_answer) {
                    answer.style.backgroundColor = 'var(--greenColor)'
                    answer.style.color = 'white'
                } else {
                    answer.style.backgroundColor = 'var(--redColor)' 
                    answer.style.color = 'white'
                }
            } else if(item == el.correct_answer) {
                answer.style.backgroundColor = 'var(--greenColor)'
                answer.style.color = 'white'
            }

            questionArea.querySelector(".answerArea").appendChild(answer)
        }
        
        document.querySelector(".allQuestionArea").appendChild(questionArea)
    })
}











// BUTTONS FUNCTIONS

document.querySelector("#tryAgainButton").addEventListener("click", () => {
    stage=0, mode=0, chosenAnswers=[], correct=0
    
    finalQuestions = {
        setting: {},
        questions: []
    }

    document.querySelector(".divReportArea").style.display = 'none'
    startSettings(stage)
})

document.querySelector("#saveButton").addEventListener("click", () => {
    finalQuestions.setting = chosenSetting

    const finalQuestionsCopy = {...finalQuestions}
    historyQuizzes.push(finalQuestionsCopy)

    localStorage.setItem("historyQuizzes", JSON.stringify(historyQuizzes))
})

function clickButton(el, buttons, className) {
    document.querySelectorAll(`${buttons}`).forEach( e => {
        e.classList.remove(`${className}`)
    })
    el.classList.add(`${className}`)

    canNextStage = true
}

document.querySelector("#nextButton").addEventListener("click", () => {
    let info = 0
    let finalInfo = {}

        if(canNextStage){
            if(mode==0) {
                info = document.querySelector(".active").getAttribute("key-id")
                for(let i in settings[stage]){
                    let setting = settings[stage]

                    if(setting[i].id == info) {
                        finalInfo = {
                            name: setting[i].name,
                            id: setting[i].id
                        }
                    }
                }

                nextStage(finalInfo)
            } else {
                correctAnswer(stage, document.querySelector(".answerActive")?.innerHTML || " " )
                nextStage()
            }
        }
        canNextStage = false
    }
)


function nextStage(info) {
    if(info) {
        chosenSetting[stage] = info
    }
    
    if(mode==0) {
        if(stage+1 < settings.length) {
            stage++
            startSettings(stage)
        } else {
            document.querySelector("body").classList.remove("purple")
            document.querySelector("#logoAreaConfig").style.display = 'none'
            document.querySelector("#logoAreaQuestion").style.display = 'flex'
            document.querySelector(".allConfigArea").style.display = 'none'

            generateQuiz()
            mode=1
        }
    }  else {
        if(stage+1 < questions.length) {
            addInfo()
            stage++
            renderQuiz(stage)
            if(+chosenSetting[2].id > 0) resetTimer()
        } else {
            addInfo()
            generateReport()
        }
    }

}

startSettings(stage)