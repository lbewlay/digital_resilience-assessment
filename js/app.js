document.addEventListener('DOMContentLoaded', () => {
    // State
    let currentQuestionIndex = 0;
    let answers = {};
    let organizationContext = [];

    // DOM Elements
    const views = {
        landing: document.getElementById('landing-page'),
        assessment: document.getElementById('assessment-page'),
        results: document.getElementById('results-page')
    };
    const mainTitle = document.querySelector('.main-title');
    const startBtn = document.getElementById('start-assessment-btn');
    const resumeBtn = document.getElementById('resume-assessment-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const finishBtn = document.getElementById('finish-btn');
    const saveBtn = document.getElementById('save-continue-btn');
    const retakeBtn = document.getElementById('retake-assessment-btn');
    const exportBtn = document.getElementById('export-pdf-btn');
    const homeBtn = document.getElementById('home-btn');
    const progressBar = document.getElementById('progress-bar');
    const questionCategoryEl = document.getElementById('question-category');
    const questionExplainerEl = document.getElementById('question-explainer');
    const questionTextEl = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const contextSection = document.getElementById('context-section');
    const contextOptionsContainer = document.getElementById('context-options-container');
    const errorMessageEl = document.getElementById('error-message');

    // --- Initialization ---
    function init() {
        const savedData = loadData();
        if (savedData && savedData.answers && Object.keys(savedData.answers).length > 0 && !savedData.completed) {
            resumeBtn.style.display = 'inline-block';
        }

        startBtn.addEventListener('click', startNewAssessment);
        resumeBtn.addEventListener('click', resumeAssessment);
        prevBtn.addEventListener('click', showPreviousQuestion);
        nextBtn.addEventListener('click', showNextQuestion);
        finishBtn.addEventListener('click', finishAssessment);
        saveBtn.addEventListener('click', saveAndExit);
        retakeBtn.addEventListener('click', startNewAssessment);
        exportBtn.addEventListener('click', exportToPDF);
        homeBtn.addEventListener('click', () => showView('landing'));

        populateContextOptions();
        showView('landing'); // Start on landing page
    }

    // --- Navigation ---
    function showView(viewName) {
        Object.values(views).forEach(view => view.classList.remove('active'));
        views[viewName].classList.add('active');
        mainTitle.style.display = 'block';
    }

    // --- Assessment Logic ---
    function startNewAssessment() {
        currentQuestionIndex = 0;
        answers = {};
        organizationContext = [];
        clearData();
        showQuestion();
        showView('assessment');
    }

    function resumeAssessment() {
        const savedData = loadData();
        if (savedData) {
            currentQuestionIndex = savedData.currentQuestion;
            answers = savedData.answers;
            organizationContext = savedData.organizationContext || [];
            showQuestion();
            showView('assessment');
        }
    }

    function populateContextOptions() {
        contextOptionsContainer.innerHTML = '';
        highRiskContexts.forEach(context => {
            const label = document.createElement('label');
            label.className = 'context-option';
            label.textContent = context.charAt(0).toUpperCase() + context.slice(1);

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = context;
            checkbox.addEventListener('change', () => {
                label.classList.toggle('selected', checkbox.checked);
                updateOrganizationContext();
            });

            label.prepend(checkbox);
            contextOptionsContainer.appendChild(label);
        });
    }

    function updateOrganizationContext() {
        organizationContext = Array.from(contextOptionsContainer.querySelectorAll('input:checked')).map(cb => cb.value);
    }

    function showQuestion() {
        errorMessageEl.style.display = 'none';
        const question = questions[currentQuestionIndex];
        questionCategoryEl.textContent = question.category;
        questionExplainerEl.innerHTML = question.explainer;
        questionTextEl.textContent = question.question;

        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionId = `q${question.id}_o${index}`;
            const optionEl = document.createElement('div');
            optionEl.className = 'option';

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `q_${question.id}`;
            radio.id = optionId;
            radio.value = index;

            const label = document.createElement('label');
            label.htmlFor = optionId;
            label.textContent = option.text;

            optionEl.appendChild(radio);
            optionEl.appendChild(label);
            optionsContainer.appendChild(optionEl);

            radio.addEventListener('change', () => {
                handleOptionSelect(question.id, option);
            });
        });

        contextSection.style.display = currentQuestionIndex === 0 ? 'block' : 'none';
        if(currentQuestionIndex === 0) {
            contextOptionsContainer.querySelectorAll('input').forEach(cb => {
                cb.checked = organizationContext.includes(cb.value);
                cb.parentElement.classList.toggle('selected', cb.checked);
            });
        }

        updateProgress();
        updateNavigation();
        highlightSelectedOption();
    }

    function handleOptionSelect(questionId, optionData) {
        errorMessageEl.style.display = 'none';
        answers[questionId] = optionData;
        highlightSelectedOption();
    }

    function highlightSelectedOption() {
        const question = questions[currentQuestionIndex];
        const selectedAnswer = answers[question.id];

        document.querySelectorAll('.option').forEach((optionEl, index) => {
            const isSelected = selectedAnswer && selectedAnswer.text === question.options[index].text;
            optionEl.classList.toggle('selected', isSelected);
            optionEl.querySelector('input').checked = isSelected;
        });
    }

    function showNextQuestion() {
        const currentQuestionId = questions[currentQuestionIndex].id;
        if (!answers[currentQuestionId]) {
            errorMessageEl.style.display = 'block';
            return;
        }

        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        }
    }

    function showPreviousQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion();
        }
    }

    function saveAndExit() {
        const dataToSave = {
            userId: 'user-' + Date.now(),
            startDate: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            currentQuestion: currentQuestionIndex,
            answers: answers,
            organizationContext: organizationContext,
            completed: false,
        };
        saveData(dataToSave);
        const saveBtnRef = document.getElementById('save-continue-btn');
        const originalText = saveBtnRef.textContent;
        saveBtnRef.textContent = 'Progress Saved!';
        setTimeout(() => {
            saveBtnRef.textContent = originalText;
            const savedData = loadData();
             if (savedData && savedData.answers && Object.keys(savedData.answers).length > 0 && !savedData.completed) {
                resumeBtn.style.display = 'inline-block';
            }
            showView('landing');
        }, 1500);
    }

    function finishAssessment() {
        const currentQuestionId = questions[currentQuestionIndex].id;
        if (!answers[currentQuestionId]) {
            errorMessageEl.style.display = 'block';
            return;
        }

        const scoreData = calculateScores(answers);
        let layerResult = calculateLayer(scoreData);
        layerResult = applyContextualRisk(layerResult, organizationContext);

        const recommendations = generateRecommendations(answers);

        const results = {
            ...scoreData,
            layer: layerResult,
            recommendations,
        };

        const dataToSave = {
            ...loadData(),
            lastUpdated: new Date().toISOString(),
            currentQuestion: currentQuestionIndex,
            answers: answers,
            organizationContext: organizationContext,
            completed: true,
            results: results
        };

        saveData(dataToSave);
        displayResults(results);
        showView('results');
    }

    // --- UI Updates ---
    function updateProgress() {
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressBar.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    }

    function updateNavigation() {
        prevBtn.style.display = currentQuestionIndex > 0 ? 'inline-block' : 'none';
        nextBtn.style.display = currentQuestionIndex < questions.length - 1 ? 'inline-block' : 'none';
        finishBtn.style.display = currentQuestionIndex === questions.length - 1 ? 'inline-block' : 'none';
    }

    // --- Results Display ---
    function displayResults(results) {
        const { layer, categoryScores, recommendations } = results;

        // Summary
        const summaryEl = document.querySelector('.results-summary');
        summaryEl.style.backgroundColor = layer.color.replace('var(','').replace(')','');
        summaryEl.style.color = 'var(--dark-color)';
        document.getElementById('results-layer').textContent = layer.layer;
        const riskEl = document.getElementById('results-risk');
        riskEl.textContent = layer.risk;
        riskEl.style.backgroundColor = 'rgba(0,0,0,0.2)';
        riskEl.style.color = '#fff';
        document.getElementById('results-description').textContent = layer.description;

        const contextualNoteEl = document.getElementById('contextual-note');
        if (layer.contextualNote) {
            contextualNoteEl.textContent = layer.contextualNote;
            contextualNoteEl.style.display = 'block';
        } else {
            contextualNoteEl.style.display = 'none';
        }


        // Category Scores
        const categoryContainer = document.getElementById('category-scores-container');
        categoryContainer.innerHTML = '';
        for (const category in categoryScores) {
            const scoreData = categoryScores[category];
            const percentage = scoreData.maxScore > 0 ? (scoreData.score / scoreData.maxScore) * 100 : 0;

            const scoreEl = document.createElement('div');
            scoreEl.className = 'category-score';
            scoreEl.innerHTML = `
                <span>${category}</span>
                <div class="category-score-bar-container">
                    <div class="category-score-bar" style="width: ${percentage}%;"></div>
                </div>
                <span>${Math.round(percentage)}%</span>
            `;
            categoryContainer.appendChild(scoreEl);
        }

        // Threats
        const threatsList = document.getElementById('threats-list');
        threatsList.innerHTML = '';
        layer.threats.forEach(threat => {
            const li = document.createElement('li');
            li.textContent = threat;
            threatsList.appendChild(li);
        });

        // Recommendations
        const recContainer = document.getElementById('recommendations-container');
        recContainer.innerHTML = '';

        const recSections = {
            "Immediate Actions (0-30 days)": recommendations.immediate,
            "Short-term Goals (1-3 months)": recommendations.shortTerm,
            "Long-term Objectives (3-12 months)": recommendations.longTerm
        };

        for (const title in recSections) {
            if (recSections[title].length > 0) {
                const sectionEl = document.createElement('div');
                sectionEl.innerHTML = `<h3>${title}</h3>`;
                const listEl = document.createElement('ul');
                listEl.className = 'recommendations-list';

                recSections[title].forEach(rec => {
                    const li = document.createElement('li');
                    li.className = 'recommendation-item';
                    li.innerHTML = `
                        <strong>${rec.question}</strong>
                        ${rec.action}
                        <div style="font-size: 0.8rem; color: #6c757d; margin-top: 0.5rem;">Category: ${rec.category}</div>
                    `;
                    listEl.appendChild(li);
                });

                sectionEl.appendChild(listEl);
                recContainer.appendChild(sectionEl);
            }
        }
    }

    // --- Start the app ---
    init();
});
