let historyQuizzes = JSON.parse(localStorage.getItem("historyQuizzes"))

function startHistory() {
    if(historyQuizzes.length != 0) {
        document.querySelector(".historyContent").innerHTML = ''

        historyQuizzes.map( (el, index) => {
            let element = document.querySelector(".historyItem").cloneNode(true)

            console.log(el.setting[0].name)

            element.classList.remove('invisible')
            
            element.querySelector(".historyCat").innerHTML = el.setting[0].name
            element.querySelector(".historyDiff").innerHTML = el.setting[1].name
            element.querySelector(".historyTime").innerHTML = el.setting[2].name
            
            document.querySelector(".historyContent").appendChild(element)

            element.addEventListener("click", () => {
                document.querySelector(".backgroundModal").style.display = 'flex'
    
                setTimeout(() => {
                    document.querySelector(".backgroundModal").style.opacity = 1
                }, 100)

                document.querySelector(".allQuestionArea").innerHTML = ''
                renderQuiz(index)
            })
        })

    } else {

    }
}

function renderQuiz(index) {

    let question = historyQuizzes[index].questions
    let setting = historyQuizzes[index].setting


    //document.querySelector(".bigPct").innerHTML = `${(correct*100)/questions.length}%`
    //document.querySelector(".textReport").innerHTML = `You got ${correct} questions out of ${questions.length} correct`

    document.querySelector("#reportDiff").innerHTML = setting[0].name
    document.querySelector("#reportCat").innerHTML = setting[1].name
    document.querySelector("#reportTime").innerHTML = setting[2].name

    question.map( (el, index) => {
        let questionArea = document.querySelector(".questionArea").cloneNode(true)

        questionArea.classList.remove("invisible")
        questionArea.querySelector(".answerArea").innerHTML = ''

        questionArea.querySelector(".numQuest").innerHTML = index+1
        questionArea.querySelector(".questionText").innerHTML = el.question

        // 
        if(el.response == 'correct') {            
            questionArea.querySelector(".numQuest").style.backgroundColor = 'var(--greenColor)'
            questionArea.querySelector(".reportQuestionText").style.backgroundColor = 'var(--greenColor)'

        } else if(el.response == 'wrong'){
            questionArea.querySelector(".numQuest").style.backgroundColor = 'var(--redColor)'
            questionArea.querySelector(".reportQuestionText").style.backgroundColor = 'var(--redColor)'

        } else {
            questionArea.querySelector(".numQuest").style.backgroundColor = 'var(--grayColor)'
            questionArea.querySelector(".reportQuestionText").style.backgroundColor = 'var(--grayColor)'
        }

        // 
        for(let i in el.all_answers) {
            let answer = document.querySelector(".answerReport").cloneNode(true)
            let item = el.all_answers[i]

            answer.classList.remove("invisible")
            answer.innerHTML = item

            if(item == el.chosen_answer) {
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



document.querySelector(".closeModal").addEventListener( "click", () => {
    let backModal = document.querySelector(".backgroundModal")

    backModal.style.opacity = 0
    
    setTimeout(() => {
        backModal.style.display = 'none'
    }, 500)
})

startHistory()