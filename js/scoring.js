const categoryWeights = {
  "Core Data & Business Continuity": 2.5,
  "Access Control & Authentication": 2.0,
  "Threat Monitoring & Detection": 2.0,
  "Security Awareness & Training": 1.5,
  "Incident Response & Recovery": 2.0,
  "Infrastructure & Automation": 1.5,
  "Compliance & Risk Management": 1.0
};

function calculateScores(answers) {
  let totalWeightedScore = 0;
  let maxPossibleScore = 0;
  const categoryScores = {};

  questions.forEach(q => {
      const weight = categoryWeights[q.category];
      const answer = answers[q.id];
      const questionScore = answer ? answer.points : 0;

      totalWeightedScore += questionScore * weight;
      maxPossibleScore += 2 * weight; // Max points is 2

      if (!categoryScores[q.category]) {
          categoryScores[q.category] = { score: 0, maxScore: 0, count: 0 };
      }
      categoryScores[q.category].score += questionScore * weight;
      categoryScores[q.category].maxScore += 2 * weight;
      categoryScores[q.category].count++;
  });

  const percentage = maxPossibleScore > 0 ? (totalWeightedScore / maxPossibleScore) * 100 : 0;

  return { weightedScore: totalWeightedScore, percentage: percentage, categoryScores };
}

function calculateLayer(scoreData) {
  const { percentage } = scoreData;
  if (percentage < 35) {
    return {
      layer: "Heart Layer - Survival",
      risk: "High Risk",
      description: "Organization lacks basic cybersecurity measures and is at high risk.",
      color: "var(--heart-color)",
      priority: "Immediate action required",
      threats: [
        "Data Loss & Integrity: Accidental deletions, ransomware, insider threats",
        "Communication Security: Unencrypted emails, insecure messaging apps",
        "Access & Authentication: Shared passwords, no MFA, weak passwords",
        "Lack of Incident Response: No plan for handling cyberattacks",
        "Regulatory and Compliance Risks: No adherence to data protection laws"
      ]
    };
  } else if (percentage < 70) {
    return {
      layer: "Safety Layer - Stability & Protection",
      risk: "Medium Risk",
      description: "Organization has foundational security but remains vulnerable to sophisticated threats.",
      color: "var(--safety-color)",
      priority: "Continued improvement needed",
      threats: [
        "Phishing & Social Engineering: Spear phishing, business email compromise",
        "Malware & Ransomware: Drive-by downloads, malicious email attachments",
        "Insider Threats: Employees leaking data, disgruntled staff causing damage",
        "Shadow IT: Staff using unauthorized tools & services",
        "Lack of Threat Monitoring: No logging or anomaly detection"
      ]
    };
  } else {
    return {
      layer: "Resilience Layer - Automation & Future-Proofing",
      risk: "Low Risk",
      description: "Organization has achieved mature cybersecurity posture with automation and resilience strategies.",
      color: "var(--resilience-color)",
      priority: "Maintain and enhance current posture",
      threats: [
        "Advanced Persistent Threats (APTs): Surveillance, spyware, long-term espionage",
        "Zero-Day Vulnerabilities: Exploits with no known fixes",
        "Denial-of-Service (DoS/DDoS): Targeted attacks against infrastructure",
        "AI-Powered Threats: Deepfake scams, AI-generated phishing",
        "Cloud & SaaS Vulnerabilities: API abuse, misconfigurations"
      ]
    };
  }
}

function applyContextualRisk(layerResult, organizationContext) {
  let adjustedResult = { ...layerResult, contextualNote: '' };
  const isHighRiskContext = highRiskContexts.some(context => organizationContext.includes(context));

  if (isHighRiskContext) {
    if (layerResult.layer === "Heart Layer - Survival") {
        adjustedResult.risk = "Critical Risk";
        adjustedResult.contextualNote = "Risk elevated to Critical due to high-risk operational context.";
    } else if (layerResult.layer === "Safety Layer - Stability & Protection") {
        adjustedResult.risk = "High Risk";
        adjustedResult.contextualNote = "Risk elevated to High due to high-risk operational context.";
    } else {
        adjustedResult.contextualNote = "Note: Operating in a high-risk context requires constant vigilance.";
    }
  }
  return adjustedResult;
}
