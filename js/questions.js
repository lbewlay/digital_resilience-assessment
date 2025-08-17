const questions = [
  // Core Data & Business Continuity
  {
    id: 1,
    category: "Core Data & Business Continuity",
    explainer: "Backups are simply copies of your important information. If the original files are lost or destroyed (e.g., by a ransomware attack or hardware failure), you can use the backup to restore them. An 'offsite' backup is crucial because it's stored in a different physical location, like the cloud, so a local disaster like a fire or theft won't also destroy your only copy. <br><br><b>Example:</b> Think of it like having a spare key to your house that you keep at a trusted friend's place instead of under your own doormat.",
    question: "Do you have a secure, offsite backup strategy for critical data?",
    options: [
      { text: "No backups", points: 0, layer: "Heart" },
      { text: "Backups exist but not automated or regularly tested", points: 1, layer: "Safety" },
      { text: "Automated, tested backups with redundancy", points: 2, layer: "Resilience" }
    ]
  },
  {
    id: 2,
    category: "Core Data & Business Continuity",
    explainer: "An Incident Response Plan (IRP) is a pre-written guide for what to do when a security problem, like a data breach or hack, occurs. It outlines who to call, what steps to take, and who is responsible for each task. Having a plan means you can act quickly and effectively during a crisis, rather than panicking and trying to figure things out on the fly. <br><br><b>Example:</b> An IRP is like a fire escape plan for your office, but for a cyberattack.",
    question: "Is there an incident response plan (IRP) in place?",
    options: [
      { text: "No IRP", points: 0, layer: "Heart" },
      { text: "Exists but rarely tested", points: 1, layer: "Safety" },
      { text: "Well-documented, tested regularly, and updated", points: 2, layer: "Resilience" }
    ]
  },
  {
    id: 3,
    category: "Core Data & Business Continuity",
    explainer: "A Business Impact Analysis (BIA) is a process to figure out which parts of your organization are the most essential. It helps you answer the question: 'If this system or process stops working, how badly does it hurt our mission?' This allows you to prioritize your security efforts on protecting what matters most. <br><br><b>Example:</b> A BIA might reveal that your donor database is your most critical asset, meaning it should have stronger protections than your internal staff directory.",
    question: "Have you conducted a business impact analysis (BIA)?",
    options: [
      { text: "No BIA", points: 0, layer: "Heart" },
      { text: "Performed but not recently updated", points: 1, layer: "Safety" },
      { text: "Performed regularly and integrated into security strategy", points: 2, layer: "Resilience" }
    ]
  },
  {
    id: 4,
    category: "Core Data & Business Continuity",
    explainer: "A Disaster Recovery (DR) plan contains the specific, technical instructions for getting your systems and services back online after a major disruption. While an Incident Response Plan is about managing the crisis itself, the DR plan is the step-by-step 'how-to' guide for your technical team to actually rebuild and restore everything. <br><br><b>Example:</b> If a critical server fails, the DR plan would have the detailed instructions for setting up a new one and restoring its data from your backups.",
    question: "Do you have a disaster recovery (DR) plan?",
    options: [
      { text: "No DR plan", points: 0, layer: "Heart" },
      { text: "Exists but not regularly tested", points: 1, layer: "Safety" },
      { text: "Regularly tested, documented, and integrated into business operations", points: 2, layer: "Resilience" }
    ]
  },
  // Access Control & Authentication
  {
    id: 5,
    category: "Access Control & Authentication",
    explainer: "This question is about how you protect access to accounts. Password policies prevent easily guessed passwords (like 'Password123'). Multi-Factor Authentication (MFA) adds a vital second layer of security, such as a code sent to your phone. This means that even if an attacker steals a password, they still can't get in. <br><br><b>Example:</b> Using MFA is like needing both a key and a secret PIN to open a safe, not just the key.",
    question: "How are user passwords managed?",
    options: [
      { text: "Weak passwords, no policies", points: 0, layer: "Heart" },
      { text: "Password policies in place, MFA optional", points: 1, layer: "Safety" },
      { text: "Enforced MFA, password vaults, zero-trust principles", points: 2, layer: "Resilience" }
    ]
  },
  {
    id: 6,
    category: "Access Control & Authentication",
    explainer: "Role-Based Access Control (RBAC) is the practice of giving people access only to the information and systems they absolutely need to do their jobs. This is also known as the 'principle of least privilege.' It significantly limits the potential damage if one person's account is compromised by an attacker. <br><br><b>Example:</b> A member of the communications team should not have access to sensitive financial records, and RBAC is the system that enforces this separation.",
    question: "Do employees have role-based access control (RBAC)?",
    options: [
      { text: "No restrictions on access", points: 0, layer: "Heart" },
      { text: "Some access restrictions, but no formal policy", points: 1, layer: "Safety" },
      { text: "Well-defined RBAC, least privilege model enforced", points: 2, layer: "Resilience" }
    ]
  },
  {
    id: 7,
    category: "Access Control & Authentication",
    explainer: "Privileged accounts, often called 'admin' or 'super-user' accounts, have powerful permissions that allow them to make major changes to systems. Because they are so powerful, it's critical to monitor their use very closely to ensure they are only being used for legitimate purposes and to immediately detect any suspicious activity. <br><br><b>Example:</b> Monitoring these accounts is like having extra security cameras and guards focused on the room where the master keys to the entire building are kept.",
    question: "Are privileged accounts monitored and audited?",
    options: [
      { text: "No monitoring or auditing", points: 0, layer: "Heart" },
      { text: "Some monitoring but inconsistently applied", points: 1, layer: "Safety" },
      { text: "Fully audited and monitored with alerts for anomalies", points: 2, layer: "Resilience" }
    ]
  },
  // Threat Monitoring & Detection
  {
    id: 8,
    category: "Threat Monitoring & Detection",
    explainer: "This is about having security systems that actively watch your network and computers for signs of an attack *as it is happening*. Instead of discovering a breach weeks or months after the fact, real-time monitoring can provide an immediate alert, giving you a chance to stop the attack before major damage is done. <br><br><b>Example:</b> This is like a burglar alarm that goes off the moment someone breaks a window, rather than just reviewing security camera footage the next morning.",
    question: "Do you have real-time monitoring for cybersecurity threats?",
    options: [
      { text: "No monitoring or logging", points: 0, layer: "Heart" },
      { text: "Basic logging but no real-time detection", points: 1, layer: "Safety" },
      { text: "SIEM/XDR deployed with proactive monitoring", points: 2, layer: "Resilience" }
    ]
  },
  {
    id: 9,
    category: "Threat Monitoring & Detection",
    explainer: "Your computers, servers, and network devices all create 'logs,' which are detailed records of all the activity that occurs. Storing and reviewing these logs is essential for investigating what happened after a security incident. It can also help you spot unusual patterns that might indicate a hidden or ongoing threat. <br><br><b>Example:</b> Reviewing logs is like a detective examining security footage and footprints to piece together how a crime occurred.",
    question: "Are logs stored and reviewed periodically?",
    options: [
      { text: "No logging or review process", points: 0, layer: "Heart" },
      { text: "Logs stored but only reviewed manually", points: 1, layer: "Safety" },
      { text: "Logs analyzed using AI-driven threat intelligence", points: 2, layer: "Resilience" }
    ]
  },
  {
    id: 10,
    category: "Threat Monitoring & Detection",
    explainer: "Endpoint Detection and Response (EDR) is like an advanced, smarter version of antivirus software. It doesn't just look for known viruses; it actively monitors the *behavior* of programs on your computers (the 'endpoints'). If a program starts acting suspiciously, like trying to encrypt files like ransomware would, the EDR can block it automatically, even if it's a brand-new threat. <br><br><b>Example:</b> An EDR is like a security guard who is trained to recognize suspicious behavior, not just identify known criminals from a photo.",
    question: "Do you have endpoint detection and response (EDR) solutions?",
    options: [
      { text: "No EDR", points: 0, layer: "Heart" },
      { text: "Basic antivirus installed, but lacks behavioral detection", points: 1, layer: "Safety" },
      { text: "Fully deployed EDR with threat intelligence and automated responses", points: 2, layer: "Resilience" }
    ]
  },
  // Security Awareness & Training
  {
    id: 11,
    category: "Security Awareness & Training",
    explainer: "Your people are one of your most important lines of defense against cyberattacks. Regular security awareness training helps ensure that all staff members can recognize current threats (like phishing scams), know what suspicious activity to look for, and understand their personal responsibility in keeping the organization's data safe. <br><br><b>Example:</b> Just as you would train staff on physical safety procedures like what to do in a fire, you must also train them on digital safety.",
    question: "Do employees receive regular cybersecurity awareness training?",
    options: [
      { text: "No training", points: 0, layer: "Heart" },
      { text: "Occasional training, not mandatory", points: 1, layer: "Safety" },
      { text: "Mandatory, continuous, and simulated attack exercises", points: 2, layer: "Resilience" }
    ]
  },
  {
    id: 12,
    category: "Security Awareness & Training",
    explainer: "'Phishing' is a type of attack where a criminal sends a fake email that looks legitimate, trying to trick someone into revealing their password or clicking a malicious link. Phishing simulations are controlled, safe tests where you send harmless, fake phishing emails to your own staff. This helps you see who might be vulnerable and provides a practical learning experience. <br><br><b>Example:</b> A phishing simulation is a practical test that helps reinforce training and measure how well your staff can spot a fake.",
    question: "Has the organization conducted phishing simulations?",
    options: [
      { text: "No phishing tests", points: 0, layer: "Heart" },
      { text: "Occasionally, but employees still fall for attacks", points: 1, layer: "Safety" },
      { text: "Regular testing with decreasing failure rates", points: 2, layer: "Resilience" }
    ]
  },
  {
    id: 13,
    category: "Security Awareness & Training",
    explainer: "Different roles within your organization face different types of security risks. For instance, staff in your finance department who can authorize payments need different, more specific training than general staff. This question asks if your training is tailored to address the unique risks associated with different jobs. <br><br><b>Example:</b> A pilot and a flight attendant both receive safety training, but the pilot's training is far more technical and specific to their high-risk role.",
    question: "Do employees undergo role-specific security training?",
    options: [
      { text: "No role-specific training", points: 0, layer: "Heart" },
      { text: "General training but not role-based", points: 1, layer: "Safety" },
      { text: "Tailored security training for high-risk roles", points: 2, layer: "Resilience" }
    ]
  },
  // Incident Response & Recovery
  {
    id: 14,
    category: "Incident Response & Recovery",
    explainer: "This is about actively practicing your response to a cyberattack before a real one happens. 'Tabletop exercises' are guided discussions where your team walks through a simulated incident to test your response plan. 'Penetration tests' are when you hire ethical hackers to actively try to break into your systems. Both help you find and fix weaknesses in a safe environment. <br><br><b>Example:</b> A recovery drill is the cybersecurity equivalent of a full-scale fire drill, complete with simulated emergencies.",
    question: "Do you have cyber incident recovery drills?",
    options: [
      { text: "No formal drills", points: 0, layer: "Heart" },
      { text: "Drills exist but only done after an incident", points: 1, layer: "Safety" },
      { text: "Regular tabletop exercises and penetration tests", points: 2, layer: "Resilience" }
    ]
  },
  {
    id: 15,
    category: "Incident Response & Recovery",
    explainer: "If your organization suffers a major data breach or outage, how will you communicate with your staff, clients, donors, partners, and the public? A crisis communication strategy is a pre-approved plan that details what to say, who should say it, and when. This ensures you communicate clearly, consistently, and responsibly during a high-stress event. <br><br><b>Example:</b> This plan prevents a chaotic, contradictory public response and helps maintain trust even during a crisis.",
    question: "Is there a crisis communication strategy?",
    options: [
      { text: "No formalized plan", points: 0, layer: "Heart" },
      { text: "Exists but not well-integrated", points: 1, layer: "Safety" },
      { text: "Fully defined strategy with stakeholder engagement", points: 2, layer: "Resilience" }
    ]
  },
  // Infrastructure & Automation
  {
    id: 16,
    category: "Infrastructure & Automation",
    explainer: "All software has flaws, and some of these can be security vulnerabilities that attackers can exploit. 'Patching' is the critical process of applying the updates that software vendors release to fix these security holes. Automating this process ensures that your systems are protected against the latest known threats as quickly as possible. <br><br><b>Example:</b> Failing to patch your software is like hearing about a faulty lock on your model of door and choosing not to replace it.",
    question: "Do you have automated security patches and updates?",
    options: [
      { text: "No formal update process", points: 0, layer: "Heart" },
      { text: "Manual updates, some automation", points: 1, layer: "Safety" },
      { text: "Fully automated patch management", points: 2, layer: "Resilience" }
    ]
  },
  {
    id: 17,
    category: "Infrastructure & Automation",
    explainer: "This is about designing your technical systems to withstand the failure of a single component. 'Redundancy' means having duplicate or backup components (like two power supplies in a server). 'Failover' means that if one system fails, a backup system automatically takes over with little to no disruption to your services. <br><br><b>Example:</b> A large airplane has multiple engines; this is redundancy, so that if one fails, the plane can still fly safely.",
    question: "Is your infrastructure designed with failover and redundancy mechanisms?",
    options: [
      { text: "No redundancy", points: 0, layer: "Heart" },
      { text: "Basic failover in place", points: 1, layer: "Safety" },
      { text: "Full redundancy with geo-distributed backups", points: 2, layer: "Resilience" }
    ]
  },
  // Compliance & Risk Management
  {
    id: 18,
    category: "Compliance & Risk Management",
    explainer: "This question asks if you follow an established, expert-created set of cybersecurity best practices, often called a framework or standard (e.g., NIST Cybersecurity Framework, ISO 27001). Aligning with a standard demonstrates that you are taking a structured, comprehensive, and recognized approach to managing your security. <br><br><b>Example:</b> In construction, builders must follow specific building codes for safety; in cybersecurity, organizations can follow standards like NIST.",
    question: "Are you aligned with cybersecurity standards (e.g., ISO 27001, NIST, GDPR)?",
    options: [
      { text: "No compliance efforts", points: 0, layer: "Heart" },
      { text: "Partial compliance, work in progress", points: 1, layer: "Safety" },
      { text: "Fully compliant with periodic audits", points: 2, layer: "Resilience" }
    ]
  },
  {
    id: 19,
    category: "Compliance & Risk Management",
    explainer: "A risk assessment is a formal process where you identify, analyze, and evaluate potential security risks to your organization. It helps you understand your biggest threats (e.g., data theft, ransomware, service outages) so you can make intelligent, prioritized decisions about where to invest your limited security time and budget. <br><br><b>Example:</b> A homeowner might assess the risk of a flood and decide to buy flood insurance; a cyber risk assessment helps you decide which security 'insurance' you need most.",
    question: "Do you perform regular risk assessments?",
    options: [
      { text: "No risk assessments", points: 0, layer: "Heart" },
      { text: "Conducted annually", points: 1, layer: "Safety" },
      { text: "Continuous risk management with predictive analysis", points: 2, layer: "Resilience" }
    ]
  },
  {
    id: 20,
    category: "Compliance & Risk Management",
    explainer: "When you use a third-party service or software (like a cloud email provider, a payment processor, or a donor management platform), you are trusting that vendor with your organization's data. This question asks if you evaluate the security practices of these vendors *before* you start using them, to ensure they aren't a weak link in your security. <br><br><b>Example:</b> Before hiring a company to transport money, you would check their security, insurance, and reputation. You should do the same for your data.",
    question: "Do you have third-party vendor security assessments?",
    options: [
      { text: "No vendor security checks", points: 0, layer: "Heart" },
      { text: "Basic due diligence but not a formal process", points: 1, layer: "Safety" },
      { text: "Full vendor risk management program", points: 2, layer: "Resilience" }
    ]
  }
];

const highRiskContexts = [
    'works with vulnerable populations',
    'operates in conflict zones',
    'handles sensitive political data',
    'investigative journalism',
    'human rights activism',
    'election monitoring'
];
