(function() {
    const Answers = {
        answers: null,
        test: null,
        userData: null,
        answersElement: null,
        userResult: null,
        init() {
            // const url = new URL(location.href);
            // const testId = url.searchParams.get('id');
            const testId = sessionStorage.getItem('testId');
            this.getCorrectAnswers(testId);
            this.getQuestions(testId);
            this.userData = document.getElementById('completed-by');
            // this.userData.innerText = url.searchParams.get('name') + ' ' + url.searchParams.get('lastName') + ', ' +
            // url.searchParams.get('email');
            this.userData.innerText = sessionStorage.getItem('name') + ' ' + sessionStorage.getItem('lastName') + ', ' +
            sessionStorage.getItem('email');
            try {
                this.userResult = JSON.parse(sessionStorage.getItem('userResult'));
            } catch(e) {
                this.userResult = null;
            }
            this.showQuestions();

            document.getElementById('to-result').onclick = function() {
                // location.href = 'result.html' + location.search;
                location.href = 'result.html';
            }
        },
        getCorrectAnswers(testId) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://testologia.ru/get-quiz-right?id=' + testId, false);
            xhr.send();
            if (xhr.status === 200 && xhr.responseText) {
                try {
                    this.answers = JSON.parse(xhr.responseText);
                } catch(e) {
                    location.href = 'index.html';
                }
                console.log(this.answers)
            }
        },
        getQuestions(testId) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://testologia.ru/get-quiz?id=' + testId, false);
            xhr.send();
            if (xhr.status === 200 && xhr.responseText) {
                try {
                    this.test = JSON.parse(xhr.responseText)
                } catch(e) {
                    location.href = 'index.html';
                }
                console.log(this.test);
            }
        },
        showQuestions() {
            this.answersElement = document.getElementById('answers-content');
            this.test.questions.forEach((question, index) => {
                const answer = document.createElement('div');
                answer.className = 'answer';
                const answerQuestion = document.createElement('div');
                answerQuestion.className = 'answer-question common-title';
                answerQuestion.innerHTML = `<span>Вопрос ${index+1}:</span> ${question.question}`;
                const answerOptions = document.createElement('div');
                answerOptions.className = 'answer-options';
                question.answers.forEach(option => {
                    const answerOption = document.createElement('div');
                    if (this.answers[index] === this.userResult[index].chosenAnswerId &&
                        this.userResult[index].chosenAnswerId === option.id) {
                        answerOption.className = 'answer-option correct';
                    } else if (this.answers[index] !== this.userResult[index].chosenAnswerId &&
                        this.userResult[index].chosenAnswerId === option.id) {
                        answerOption.className = 'answer-option wrong';
                    } else {
                        answerOption.className = 'answer-option';
                    }
                    answerOption.innerText = option.answer;
                    answerOptions.appendChild(answerOption);
                });
                answer.appendChild(answerQuestion);
                answer.appendChild(answerOptions);
                this.answersElement.appendChild(answer);
            });
            console.log(JSON.parse(sessionStorage.getItem('userResult')));
        }
    };

    Answers.init();
})();