function generateRecommendations(answers) {
    const recommendations = {
        immediate: [],
        shortTerm: [],
        longTerm: []
    };

    questions.forEach(q => {
        const answer = answers[q.id];
        const questionScore = answer ? answer.points : 0;
        const weight = categoryWeights[q.category];
        const recommendationText = getRecommendationForQuestion(q.id, questionScore);

        if (questionScore < 2 && recommendationText) {
            const recommendation = {
                category: q.category,
                action: recommendationText,
                question: q.question
            };

            if (weight >= 2.0) {
                recommendations.immediate.push({ ...recommendation, priority: "Critical", timeframe: "0-30 days" });
            } else if (weight >= 1.5) {
                recommendations.shortTerm.push({ ...recommendation, priority: "Important", timeframe: "1-3 months" });
            } else {
                recommendations.longTerm.push({ ...recommendation, priority: "Beneficial", timeframe: "3-12 months" });
            }
        }
    });
    return recommendations;
}

function getRecommendationForQuestion(questionId, currentScore) {
  const recommendationMap = {
    1: { 0: "Implement an immediate data backup solution using cloud storage (e.g., Google Drive, Dropbox) and test recovery.", 1: "Automate your backup processes to run daily or weekly and establish a formal, quarterly testing procedure." },
    2: { 0: "Develop a basic incident response plan (IRP) that defines roles, responsibilities, and key contacts.", 1: "Conduct quarterly tests of your IRP (tabletop exercises) and update the plan based on lessons learned." },
    3: { 0: "Conduct an initial business impact analysis (BIA) to identify your most critical processes and data.", 1: "Update your BIA annually and integrate its findings into your overall security strategy and IRP." },
    4: { 0: "Create a disaster recovery (DR) plan with clear, step-by-step procedures for critical system recovery.", 1: "Implement regular (at least bi-annual) DR testing and ensure all documentation is kept up-to-date." },
    5: { 0: "Implement a strong password policy (length, complexity) and enforce multi-factor authentication (MFA) for all critical services.", 1: "Deploy password vaults for all employees and begin implementing zero-trust access principles." },
    6: { 0: "Establish basic access controls by reviewing who has access to what and removing unnecessary permissions.", 1: "Implement a formal Role-Based Access Control (RBAC) policy based on the principle of least privilege." },
    7: { 0: "Begin monitoring and logging activities of all privileged accounts (e.g., administrator accounts).", 1: "Deploy an automated monitoring solution with real-time alerts for anomalous privileged account behavior." },
    8: { 0: "Implement basic logging for critical systems (servers, firewalls) and start monitoring for obvious threats.", 1: "Deploy a SIEM or XDR solution to centralize logs and enable proactive, real-time threat monitoring." },
    9: { 0: "Establish a formal process for collecting logs and assign responsibility for a basic weekly review.", 1: "Implement AI-driven log analysis and integrate external threat intelligence feeds for better detection." },
    10: { 0: "Install a reputable endpoint protection solution that goes beyond basic signature-based antivirus.", 1: "Deploy a full Endpoint Detection and Response (EDR) solution with behavioral detection and automated response." },
    11: { 0: "Initiate a mandatory, annual cybersecurity awareness training program for all staff.", 1: "Implement a continuous training program that includes regular updates and simulated attack exercises." },
    12: { 0: "Begin conducting quarterly phishing simulation tests for all employees to build awareness.", 1: "Establish a regular phishing testing program with the goal of decreasing failure rates over time." },
    13: { 0: "Develop and deliver role-specific security training for high-risk positions (e.g., finance, IT).", 1: "Expand tailored security training to cover all significant organizational roles and their specific risks." },
    14: { 0: "Schedule and conduct your first incident response drill (tabletop exercise) within the next quarter.", 1: "Implement a program of regular tabletop exercises and consider annual penetration testing." },
    15: { 0: "Develop a crisis communication plan that includes templates and contact lists for key stakeholders.", 1: "Fully integrate your communication strategy with your incident response procedures and test it during drills." },
    16: { 0: "Establish a formal patch management process with a regular schedule for applying security updates.", 1: "Deploy an automated patch management system to ensure critical updates are applied across all systems promptly." },
    17: { 0: "Implement basic backup and failover capabilities for your most critical server or application.", 1: "Establish a full redundancy and failover architecture, potentially with geo-distributed backup systems." },
    18: { 0: "Begin a compliance assessment against a relevant cybersecurity standard (like NIST CSF or CIS Controls).", 1: "Work towards full compliance with your chosen standard and establish regular internal or external audits." },
    19: { 0: "Conduct your first comprehensive organizational risk assessment to identify key security risks.", 1: "Implement a continuous risk management program with predictive analysis to stay ahead of new threats." },
    20: { 0: "Establish a basic security evaluation process for all new third-party vendors and software.", 1: "Deploy a comprehensive third-party vendor risk management program with ongoing monitoring." }
  };
  return recommendationMap[questionId] ? recommendationMap[questionId][currentScore] : null;
}
