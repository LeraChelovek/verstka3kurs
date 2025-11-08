// Массив вопросов и ответов
const questions = [
  {
    question:
      "А голос у него был не такой, как у почтальона Печкина, дохленький. У Гаврюши голосище был, как у электрички. Он _____ _____ на ноги поднимал.",
    answers: [
      { text: "Пол деревни, за раз", correct: false },
      {
        text: "Полдеревни, зараз",
        correct: true,
        explanation:
          "Правильно! Раздельно существительное будет писаться в случае наличия дополнительного слова между существительным и частицей. Правильный ответ: полдеревни пишется слитно. Зараз (ударение на второй слог) — это обстоятельственное наречие, пишется слитно. Означает быстро, одним махом.",
      },
      { text: "Пол-деревни, за раз", correct: false },
    ],
  },
  {
    question: "А эти слова как пишутся?",
    answers: [
      { text: "Капуччино и эспрессо", correct: false },
      { text: "Каппуччино и экспресо", correct: false },
      {
        text: "Капучино и эспрессо",
        correct: true,
        explanation:
          "Конечно! По орфографическим нормам русского языка единственно верным написанием будут «капучино» и «эспрессо».",
      },
    ],
  },
  {
    question: "Как нужно писать?",
    answers: [
      { text: "Черезчур", correct: false },
      { text: "Черес-чур", correct: false },
      {
        text: "Чересчур",
        correct: true,
        explanation:
          "Да! Это слово появилось от соединения предлога «через» и древнего слова «чур», которое означает «граница», «край». Но слово претерпело изменения, так что правильное написание учим наизусть — «чересчур».",
      },
    ],
  },
  {
    question: "Где допущена ошибка?",
    answers: [
      { text: "Аккордеон", correct: false },
      { text: "Белиберда", correct: false },
      {
        text: "Эпелепсия",
        correct: true,
        explanation: "Верно! Это слово пишется так: «эпИлепсия».",
      },
    ],
  },
];

class Quiz {
  constructor() {
    this.questions = [...questions];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.answeredQuestions = new Set();
    this.answeredCorrectly = new Set();
    this.shuffledQuestions = [];
    this.isAnswering = false;

    this.questionsArea = document.getElementById("questionsArea");
    this.endMessage = document.getElementById("endMessage");
    this.stats = document.getElementById("stats");
    this.progress = document.getElementById("progress");
    this.scoreElement = document.getElementById("score");

    this.init();
  }

  init() {
    this.shuffleQuestions();
    this.displayCurrentQuestion();
    this.updateProgress();
  }

  shuffleQuestions() {
    // Создаем копию вопросов и перемешиваем
    this.shuffledQuestions = [...this.questions];
    for (let i = this.shuffledQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shuffledQuestions[i], this.shuffledQuestions[j]] = [
        this.shuffledQuestions[j],
        this.shuffledQuestions[i],
      ];
    }

    // Перемешиваем ответы в каждом вопросе
    this.shuffledQuestions.forEach((question) => {
      for (let i = question.answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [question.answers[i], question.answers[j]] = [
          question.answers[j],
          question.answers[i],
        ];
      }
    });
  }

  displayCurrentQuestion() {
    if (this.currentQuestionIndex >= this.shuffledQuestions.length) {
      this.showEndMessage();
      return;
    }

    const question = this.shuffledQuestions[this.currentQuestionIndex];
    this.questionsArea.innerHTML = "";

    const questionBlock = document.createElement("div");
    questionBlock.className = "question-block";
    questionBlock.innerHTML = `
            <div class="question-number">${this.currentQuestionIndex + 1}</div>
            <div class="question-text">${question.question}</div>
            <div class="answers-container" id="answersContainer"></div>
        `;

    this.questionsArea.appendChild(questionBlock);

    const answersContainer = document.getElementById("answersContainer");
    question.answers.forEach((answer, index) => {
      const answerElement = document.createElement("div");
      answerElement.className = "answer-option";
      answerElement.innerHTML = `
                ${answer.text}
                <span class="marker">${answer.correct ? "✅" : "❌"}</span>
            `;

      answerElement.addEventListener("click", () =>
        this.handleAnswer(answer, answerElement, index)
      );
      answersContainer.appendChild(answerElement);
    });
  }

  handleAnswer(selectedAnswer, answerElement, answerIndex) {
    if (
      this.isAnswering ||
      this.answeredQuestions.has(this.currentQuestionIndex)
    ) {
      return;
    }

    this.isAnswering = true;
    this.answeredQuestions.add(this.currentQuestionIndex);

    const question = this.shuffledQuestions[this.currentQuestionIndex];
    const correctAnswer = question.answers.find((answer) => answer.correct);
    const isCorrect = selectedAnswer.correct;

    if (isCorrect) {
      this.score++;
      this.answeredCorrectly.add(this.currentQuestionIndex);
      this.handleCorrectAnswer(answerElement, correctAnswer);
    } else {
      this.handleIncorrectAnswer(answerElement, correctAnswer);
    }

    setTimeout(() => {
      this.moveToNextQuestion();
    }, 3000);
  }

  handleCorrectAnswer(correctElement, correctAnswer) {
    // Увеличиваем правильный ответ
    correctElement.classList.add("correct");

    // Показываем пояснение
    if (correctAnswer.explanation) {
      const explanation = document.createElement("div");
      explanation.className = "explanation show";
      explanation.textContent = correctAnswer.explanation;
      correctElement.appendChild(explanation);
    }

    // Перемещаем неправильные ответы вниз
    const allAnswers = document.querySelectorAll(".answer-option");
    allAnswers.forEach((answer, index) => {
      if (!answer.classList.contains("correct")) {
        setTimeout(() => {
          answer.classList.add("moving-down");
        }, index * 200);
      }
    });

    // Показываем маркер
    const marker = correctElement.querySelector(".marker");
    marker.classList.add("correct");
  }

  handleIncorrectAnswer(incorrectElement, correctAnswer) {
    // Помечаем неправильный ответ
    incorrectElement.classList.add("incorrect");

    // Находим и помечаем правильный ответ
    const allAnswers = document.querySelectorAll(".answer-option");
    allAnswers.forEach((answer) => {
      const answerText = answer.textContent.trim();
      if (answerText === correctAnswer.text) {
        answer.classList.add("correct");
        const marker = answer.querySelector(".marker");
        marker.classList.add("correct");

        // Показываем пояснение для правильного ответа
        if (correctAnswer.explanation) {
          const explanation = document.createElement("div");
          explanation.className = "explanation show";
          explanation.textContent = correctAnswer.explanation;
          answer.appendChild(explanation);
        }
      }
    });

    // Перемещаем все ответы вниз
    allAnswers.forEach((answer, index) => {
      setTimeout(() => {
        answer.classList.add("moving-down");
      }, index * 200);
    });

    // Показываем маркер неправильного ответа
    const marker = incorrectElement.querySelector(".marker");
    marker.classList.add("incorrect");
  }

  moveToNextQuestion() {
    this.currentQuestionIndex++;
    this.isAnswering = false;
    this.updateProgress();

    if (this.currentQuestionIndex < this.shuffledQuestions.length) {
      this.displayCurrentQuestion();
    } else {
      this.showEndMessage();
    }
  }

  addRestartButton() {
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Пройти тест заново';
    restartButton.className = 'restart-button';
    
    restartButton.addEventListener('click', () => {
        this.restartQuiz();
    });

    // Добавляем кнопку в блок статистики (this.stats)
    this.stats.appendChild(restartButton);
}

  showEndMessage() {
    this.questionsArea.style.display = "none";
    this.endMessage.classList.add("show");
    this.stats.classList.add("show");
    this.scoreElement.textContent = `${this.score}/${this.shuffledQuestions.length}`;

    this.endMessage.innerHTML =` 
        <h2 class="title">Вопросы закончились!</h2>
        <p class="result-text">Спасибо за прохождение теста!</p>
    `;

    this.addReviewFeature();

    this.addRestartButton();
  }

  addReviewFeature() {
    const reviewContainer = document.createElement("div");
    reviewContainer.className = "review-container";

    reviewContainer.innerHTML = `
        <h3 class="title2">Обзор вопросов</h3>
        <div id="reviewQuestions"></div>
    `;

    this.endMessage.appendChild(reviewContainer);

    const reviewQuestions = document.getElementById("reviewQuestions");
    this.shuffledQuestions.forEach((question, index) => {
      const questionReview = document.createElement("div");
      const isCorrect = this.answeredCorrectly.has(index);
      const correctAnswer = question.answers.find((answer) => answer.correct);

      questionReview.className = `answer-option ${
        isCorrect ? "correct" : "incorrect"
      }`;

      questionReview.innerHTML = `
            <div class="question-number">${index + 1}</div>
            <div class="question-text">${question.question}</div>
            <div class="review-marker ${isCorrect ? "correct" : "incorrect"}">
                ${isCorrect ? "✅" : "❌"}
            </div>
            <div class="answer-review hidden">
                <strong>Правильный ответ:</strong> ${correctAnswer.text}
                ${
                  correctAnswer.explanation
                    ? `<br><em>${correctAnswer.explanation}</em>`
                    : ""
                }
            </div>
        `;

      questionReview.addEventListener("click", () => {
        const answerReview = questionReview.querySelector(".answer-review");
        answerReview.classList.toggle("hidden");
      });

      reviewQuestions.appendChild(questionReview);
    });
  }

  restartQuiz() {
    // Сбрасываем все состояния
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.answeredQuestions.clear();
    this.answeredCorrectly.clear();
    this.shuffledQuestions = [];
    this.isAnswering = false;

    // Скрываем сообщения о завершении
    this.endMessage.classList.remove("show");
    this.stats.classList.remove("show");
    this.questionsArea.style.display = "block";

    // Очищаем контейнеры
    this.questionsArea.innerHTML = "";
    this.endMessage.innerHTML = "Вопросы закончились!";
    this.stats.innerHTML = `
            <h2>Результаты теста</h2>
            <div class="stats-number" id="score">0/0</div>
            <p>Правильных ответов</p>
        `;

    // Обновляем ссылки на элементы
    this.scoreElement = document.getElementById("score");
    this.progress.style.width = "0%";

    // Переинициализируем тест
    this.init();
  }

  updateProgress() {
    const progress =
      (this.currentQuestionIndex / this.shuffledQuestions.length) * 100;
    this.progress.style.width = `${progress}%`;
  }
}

// Инициализация теста при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  new Quiz();
});
