/**
 * TIPS Framework - Browser Version
 * Trust, Identity, Privacy, Security
 */

export const SCENARIOS = {
    security: [
        {
            id: 'sec-001',
            title: 'Prompt Injection Attack',
            context: 'higher_education',
            difficulty: 'intermediate',
            scenario: `You're a CISO at a university that has deployed an AI chatbot to help students with course registration. A security researcher reports they can trick the chatbot into revealing other students' registration data by using specific prompts.`,
            question: 'What immediate actions should you take? (Select all that apply)',
            options: [
                { id: 'a', text: 'Immediately disable the chatbot', value: 'containment', points: 20 },
                { id: 'b', text: 'Document the specific prompts used', value: 'documentation', points: 20 },
                { id: 'c', text: 'Notify affected students', value: 'notification', points: 15 },
                { id: 'd', text: 'Implement input validation and sanitization', value: 'mitigation', points: 25 },
                { id: 'e', text: 'Review audit logs for similar attempts', value: 'investigation', points: 20 },
                { id: 'f', text: 'Wait for the vendor to release a patch', value: 'wait', points: 0 }
            ],
            correctIds: ['a', 'b', 'c', 'd', 'e'],
            explanation: `This is a critical prompt injection vulnerability. Immediate containment is essential, followed by thorough investigation, documentation, and notification. Waiting for a vendor patch without taking action could result in continued data exposure.`,
            competencies: ['threat_awareness', 'incident_response', 'data_protection']
        },
        {
            id: 'sec-002',
            title: 'AI Model Data Leakage',
            context: 'higher_education',
            difficulty: 'advanced',
            scenario: `Your institution uses an AI assistant that was fine-tuned on internal research data. Faculty members report that the AI sometimes reveals details about unpublished research when answering unrelated questions.`,
            question: 'What is the root cause and how should you address it?',
            options: [
                {
                    id: 'a',
                    text: 'Model memorization - retrain with differential privacy techniques',
                    value: 'correct_diagnosis',
                    points: 50
                },
                {
                    id: 'b',
                    text: 'User error - provide better training to faculty',
                    value: 'wrong_diagnosis',
                    points: 10
                },
                {
                    id: 'c',
                    text: 'Network issue - check firewall settings',
                    value: 'irrelevant',
                    points: 0
                },
                {
                    id: 'd',
                    text: 'Normal AI behavior - no action needed',
                    value: 'dangerous',
                    points: -25
                }
            ],
            correctIds: ['a'],
            explanation: `This is model memorization/overfitting on training data. The model has memorized sensitive research data and can leak it through various prompts. Solutions include retraining with differential privacy, using federated learning, or implementing stronger data sanitization before training.`,
            competencies: ['threat_awareness', 'data_protection', 'security_by_design']
        }
    ],
    identity: [
        {
            id: 'id-001',
            title: 'Multi-Role Identity Management',
            context: 'higher_education',
            difficulty: 'intermediate',
            scenario: `A professor at your university is also a part-time student and serves on the board of trustees. They need to interact with different AI systems in each role, with different data access requirements for each.`,
            question: 'How should you architect identity management for this scenario?',
            options: [
                {
                    id: 'a',
                    text: 'Use a single account with combined permissions from all roles',
                    value: 'bad_practice',
                    points: 0
                },
                {
                    id: 'b',
                    text: 'Create separate identities for each role with role-based access control',
                    value: 'best_practice',
                    points: 50
                },
                {
                    id: 'c',
                    text: 'Grant maximum permissions and rely on the user to self-regulate',
                    value: 'security_risk',
                    points: -10
                },
                {
                    id: 'd',
                    text: 'Use separate identities with context-aware authentication',
                    value: 'advanced_practice',
                    points: 60
                }
            ],
            correctIds: ['b', 'd'],
            explanation: `Proper role separation requires separate identities or personas for each role. Context-aware authentication adds an extra layer by considering the access context (time, location, resource type) to ensure the right identity is being used for the right purpose.`,
            competencies: ['authorization', 'persona_management', 'audit_trails']
        }
    ],
    privacy: [
        {
            id: 'priv-001',
            title: 'Implicit Data Collection in AI',
            context: 'higher_education',
            difficulty: 'intermediate',
            scenario: `Your university's AI learning assistant tracks student interactions to improve recommendations. Students explicitly consent to "usage data collection" but are unaware that the system also infers learning difficulties, mental health indicators, and socioeconomic status from interaction patterns.`,
            question: 'What privacy issues exist and how should they be addressed?',
            options: [
                {
                    id: 'a',
                    text: 'No issue - students consented to data collection',
                    value: 'wrong',
                    points: 0
                },
                {
                    id: 'b',
                    text: 'Implicit data collection requires separate, specific consent',
                    value: 'correct',
                    points: 30
                },
                {
                    id: 'c',
                    text: 'Inferred sensitive categories should not be collected without explicit consent',
                    value: 'correct',
                    points: 35
                },
                {
                    id: 'd',
                    text: 'Implement transparency mechanisms to show what data is inferred',
                    value: 'correct',
                    points: 35
                }
            ],
            correctIds: ['b', 'c', 'd'],
            explanation: `This scenario highlights the critical distinction between explicit and implicit data collection in AI systems. Inferred sensitive data (health, socioeconomic status) requires explicit consent and transparency. GDPR Article 22 and FERPA (for US education) have specific requirements for automated decision-making and sensitive data.`,
            competencies: ['explicit_implicit_data', 'consent_management', 'regulatory_compliance']
        }
    ],
    trust: [
        {
            id: 'trust-001',
            title: 'AI Output Validation',
            context: 'higher_education',
            difficulty: 'intermediate',
            scenario: `A researcher uses an AI assistant to help write a grant proposal. The AI provides several citations to support key arguments. The researcher is on a tight deadline.`,
            question: 'What validation steps are essential before submission?',
            options: [
                {
                    id: 'a',
                    text: 'Verify all citations actually exist and are correctly attributed',
                    value: 'essential',
                    points: 30
                },
                {
                    id: 'b',
                    text: 'Check that cited works actually support the claims made',
                    value: 'essential',
                    points: 30
                },
                {
                    id: 'c',
                    text: 'Review for potential bias in source selection',
                    value: 'important',
                    points: 20
                },
                {
                    id: 'd',
                    text: 'None - AI is reliable for academic work',
                    value: 'dangerous',
                    points: -50
                },
                {
                    id: 'e',
                    text: 'Have a colleague review the AI-generated content',
                    value: 'important',
                    points: 20
                }
            ],
            correctIds: ['a', 'b', 'c', 'e'],
            explanation: `AI systems can "hallucinate" citations - generating plausible but non-existent references. Every citation must be verified. This is critical for academic integrity and research credibility. Time pressure is never an excuse for bypassing validation.`,
            competencies: ['output_validation', 'source_verification', 'bias_awareness']
        },
        {
            id: 'trust-002',
            title: 'Bias in AI Decision Systems',
            context: 'higher_education',
            difficulty: 'advanced',
            scenario: `Your university implements an AI system to help review graduate school applications. After one semester, analysis shows that the AI consistently ranks applicants from certain demographic groups lower, even when qualifications are similar.`,
            question: 'What is your response strategy?',
            options: [
                {
                    id: 'a',
                    text: 'Immediately suspend the system pending full audit',
                    value: 'correct',
                    points: 25
                },
                {
                    id: 'b',
                    text: 'Conduct algorithmic bias audit with diverse stakeholders',
                    value: 'correct',
                    points: 25
                },
                {
                    id: 'c',
                    text: 'Review training data for historical bias patterns',
                    value: 'correct',
                    points: 20
                },
                {
                    id: 'd',
                    text: 'Implement ongoing bias monitoring and fairness metrics',
                    value: 'correct',
                    points: 20
                },
                {
                    id: 'e',
                    text: 'Continue using - the AI is just being objective',
                    value: 'unacceptable',
                    points: -100
                },
                {
                    id: 'f',
                    text: 'Establish human oversight and appeal process',
                    value: 'correct',
                    points: 10
                }
            ],
            correctIds: ['a', 'b', 'c', 'd', 'f'],
            explanation: `Algorithmic bias in consequential decisions (admissions, hiring, lending) is a critical issue. Historical bias in training data perpetuates discrimination. Response requires immediate action, thorough investigation, technical remediation, and ongoing monitoring. Most importantly, establish human oversight - AI should assist, not replace, human judgment in high-stakes decisions.`,
            competencies: ['bias_awareness', 'accountability', 'transparency']
        }
    ]
};

export class TIPSFramework {
    constructor() {
        this.dimensions = ['security', 'identity', 'privacy', 'trust'];
    }

    generateAssessment(userProfile) {
        const scenarios = [];
        const difficultyLevel = this.mapExperienceToDifficulty(userProfile.experience);

        this.dimensions.forEach(dimension => {
            const dimensionScenarios = SCENARIOS[dimension].filter(s =>
                s.difficulty === difficultyLevel || difficultyLevel === 'all'
            );

            if (dimensionScenarios.length > 0) {
                scenarios.push(dimensionScenarios[0]);
            }
        });

        return {
            id: this.generateAssessmentId(),
            userProfile,
            scenarios,
            startTime: new Date().toISOString(),
            status: 'in_progress'
        };
    }

    mapExperienceToDifficulty(experience) {
        const mapping = {
            'novice': 'intermediate',
            'intermediate': 'intermediate',
            'advanced': 'advanced',
            'expert': 'all'
        };
        return mapping[experience] || 'intermediate';
    }

    scoreScenario(scenario, userAnswer) {
        let score = 0;
        const selectedIds = userAnswer.selectedIds || [];
        const correctIds = scenario.correctIds;

        selectedIds.forEach(id => {
            const option = scenario.options.find(o => o.id === id);
            if (option) {
                score += option.points;
            }
        });

        const maxScore = scenario.options
            .filter(o => correctIds.includes(o.id))
            .reduce((sum, o) => sum + o.points, 0);

        const normalizedScore = Math.max(0, Math.min(100, (score / maxScore) * 100));

        return {
            scenarioId: scenario.id,
            score: normalizedScore,
            rawScore: score,
            maxScore,
            correctIds,
            selectedIds,
            explanation: scenario.explanation,
            competenciesTested: scenario.competencies
        };
    }

    scoreAssessment(assessment, userAnswers) {
        const results = {
            overall: 0,
            scenarios: [],
            competencies: {}
        };

        assessment.scenarios.forEach((scenario, index) => {
            const userAnswer = userAnswers[index];
            const scenarioResult = this.scoreScenario(scenario, userAnswer);

            results.scenarios.push(scenarioResult);
            results.overall += scenarioResult.score;

            scenario.competencies.forEach(competency => {
                if (!results.competencies[competency]) {
                    results.competencies[competency] = { total: 0, count: 0 };
                }
                results.competencies[competency].total += scenarioResult.score;
                results.competencies[competency].count += 1;
            });
        });

        results.overall = results.overall / assessment.scenarios.length;

        Object.keys(results.competencies).forEach(competency => {
            const comp = results.competencies[competency];
            results.competencies[competency].average = comp.total / comp.count;
        });

        return results;
    }

    determineReadiness(score) {
        if (score >= 90) return 'Expert';
        if (score >= 75) return 'Advanced';
        if (score >= 60) return 'Intermediate';
        if (score >= 40) return 'Developing';
        return 'Novice';
    }

    generateLearningPath(assessmentResults) {
        const modules = [];
        const hierarchy = ['security', 'identity', 'privacy', 'trust'];

        hierarchy.forEach((dimension, index) => {
            const dimensionScore = this.getDimensionScore(assessmentResults, dimension);

            if (dimensionScore < 80) {
                modules.push({
                    order: index + 1,
                    dimension,
                    title: this.getModuleTitle(dimension),
                    currentProficiency: dimensionScore,
                    targetProficiency: 85,
                    estimatedWeeks: 3
                });
            }
        });

        return { modules };
    }

    getDimensionScore(results, dimension) {
        const dimensionCompetencies = {
            'security': ['threat_awareness', 'incident_response', 'data_protection', 'security_by_design'],
            'identity': ['authentication', 'authorization', 'persona_management', 'audit_trails'],
            'privacy': ['data_minimization', 'explicit_implicit_data', 'consent_management', 'privacy_by_design'],
            'trust': ['output_validation', 'source_verification', 'bias_awareness', 'transparency', 'accountability']
        };

        const relevantComps = dimensionCompetencies[dimension] || [];
        let total = 0;
        let count = 0;

        relevantComps.forEach(comp => {
            if (results.competencies[comp]) {
                total += results.competencies[comp].average;
                count += 1;
            }
        });

        return count > 0 ? total / count : 50;
    }

    getModuleTitle(dimension) {
        const titles = {
            'security': 'Security Foundations for Agentic AI',
            'identity': 'Identity Management in AI Systems',
            'privacy': 'Privacy-Preserving AI Practices',
            'trust': 'Building Trust in AI Systems'
        };
        return titles[dimension];
    }

    generateAssessmentId() {
        return `assess-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
}
