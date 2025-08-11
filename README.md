Digital Resilience Assessment Tool
This is a web-based Digital Resilience Assessment application that implements the Resilience Maturity Model. It's a single-page application designed to help civil society organizations (CSOs) and other at-risk groups understand their digital security posture and receive personalized, actionable recommendations for improvement.

The entire application is self-contained in a single index.html file and runs entirely in the browser, requiring no backend or server-side processing.

Live Demo: https://lbewlay.github.io/digital_resilience-assessment/

✨ Features
- 20-Question Assessment: A comprehensive questionnaire organized into 7 key cybersecurity categories.

- Expert Explainers: Each question includes a non-technical explanation to help users understand its importance.

- Weighted Scoring System: Implements a weighted scoring algorithm to accurately calculate a resilience score based on category importance.

- 3-Layer Classification: Classifies the organization's posture into Heart (Survival), Safety (Stability), or Resilience (Automation) layers.

- Contextual Risk Adjustment: Automatically elevates risk levels for organizations operating in high-risk contexts.

- Personalized Recommendations: Generates immediate, short-term, and long-term action items based on assessment results.

- Progress Persistence: Automatically saves progress to the browser's local storage, allowing users to "Save & Continue Later".

- PDF Export: Users can export their complete results, including scores and recommendations, to a professionally formatted PDF report.

🚀 How to Use
There are two ways to run this application:

1. Via the Live Demo Link

The easiest way is to use the live version hosted on GitHub Pages:
https://lbewlay.github.io/digital_resilience-assessment/

2. Running Locally

Since this is a self-contained application, you can also run it directly from your computer.

Download the file:

- Click the green <> Code button on this repository page.

- Select Download ZIP.

- Unzip the folder.

Open in Browser:

- Navigate to the downloaded folder and simply double-click the index.html file. It will open and run in your default web browser.

🛠️ Technology Stack
Frontend: HTML5, CSS3, Vanilla JavaScript (ES6+)

PDF Generation: jsPDF & html2canvas libraries

Storage: Browser localStorage

Hosting: GitHub Pages
