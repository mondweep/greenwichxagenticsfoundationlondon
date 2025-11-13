/**
 * TIPS Framework for Responsible Agentic AI Training
 *
 * Based on research: "Mapping the metaverse minefield: A TIPS framework
 * for security-conscious business adoption" (Computers & Security, 2026)
 *
 * Implements hierarchical approach: Security → Identity → Privacy → Trust
 */

export class TIPSFramework {
  constructor() {
    this.dimensions = {
      trust: new TrustDimension(),
      identity: new IdentityDimension(),
      privacy: new PrivacyDimension(),
      security: new SecurityDimension()
    };

    // Hierarchical implementation order based on research
    this.implementationOrder = ['security', 'identity', 'privacy', 'trust'];
  }

  /**
   * Assess user's understanding across all TIPS dimensions
   */
  async assessUser(userResponses) {
    const assessment = {
      overall: 0,
      dimensions: {},
      recommendations: [],
      readinessLevel: 'novice'
    };

    for (const dimension of this.implementationOrder) {
      const result = await this.dimensions[dimension].assess(userResponses[dimension]);
      assessment.dimensions[dimension] = result;
      assessment.overall += result.score;
    }

    assessment.overall = assessment.overall / 4;
    assessment.readinessLevel = this.determineReadiness(assessment.overall);
    assessment.recommendations = this.generateRecommendations(assessment);

    return assessment;
  }

  determineReadiness(score) {
    if (score >= 90) return 'expert';
    if (score >= 75) return 'advanced';
    if (score >= 60) return 'intermediate';
    if (score >= 40) return 'developing';
    return 'novice';
  }

  generateRecommendations(assessment) {
    const recommendations = [];

    // Follow hierarchical order for recommendations
    for (const dimension of this.implementationOrder) {
      const dimResult = assessment.dimensions[dimension];
      if (dimResult.score < 70) {
        recommendations.push({
          dimension,
          priority: this.getPriority(dimension),
          action: dimResult.recommendation,
          resources: dimResult.resources
        });
      }
    }

    return recommendations;
  }

  getPriority(dimension) {
    const priorities = {
      security: 'critical',
      identity: 'high',
      privacy: 'high',
      trust: 'medium'
    };
    return priorities[dimension];
  }
}

/**
 * Security Dimension - Foundation of TIPS Framework
 */
class SecurityDimension {
  constructor() {
    this.competencies = [
      'threat_awareness',
      'secure_interaction',
      'incident_response',
      'security_by_design',
      'data_protection'
    ];
  }

  async assess(responses) {
    const scores = {};
    let totalScore = 0;

    // Assess threat awareness
    scores.threat_awareness = this.assessThreatAwareness(responses);
    scores.secure_interaction = this.assessSecureInteraction(responses);
    scores.incident_response = this.assessIncidentResponse(responses);
    scores.security_by_design = this.assessSecurityByDesign(responses);
    scores.data_protection = this.assessDataProtection(responses);

    totalScore = Object.values(scores).reduce((a, b) => a + b, 0) / this.competencies.length;

    return {
      score: totalScore,
      competencyScores: scores,
      weaknesses: this.identifyWeaknesses(scores),
      recommendation: this.getRecommendation(totalScore),
      resources: this.getResources(scores)
    };
  }

  assessThreatAwareness(responses) {
    // Evaluate understanding of AI-specific threats
    const threats = [
      'prompt_injection',
      'data_poisoning',
      'model_inversion',
      'adversarial_attacks',
      'data_leakage'
    ];

    let identified = 0;
    if (responses.threats) {
      threats.forEach(threat => {
        if (responses.threats.includes(threat)) identified++;
      });
    }

    return (identified / threats.length) * 100;
  }

  assessSecureInteraction(responses) {
    // Evaluate secure practices when interacting with AI
    const practices = responses.practices || [];
    const expectedPractices = [
      'validate_outputs',
      'avoid_sensitive_data',
      'use_secure_channels',
      'verify_sources',
      'monitor_behavior'
    ];

    let score = 0;
    expectedPractices.forEach(practice => {
      if (practices.includes(practice)) score += 20;
    });

    return score;
  }

  assessIncidentResponse(responses) {
    // Evaluate incident response knowledge
    const knowledge = responses.incident_response || {};
    let score = 0;

    if (knowledge.reporting) score += 25;
    if (knowledge.containment) score += 25;
    if (knowledge.documentation) score += 25;
    if (knowledge.escalation) score += 25;

    return score;
  }

  assessSecurityByDesign(responses) {
    // Evaluate understanding of security-by-design principles
    const principles = responses.design_principles || [];
    const expected = [
      'least_privilege',
      'defense_in_depth',
      'fail_secure',
      'separation_of_duties',
      'minimize_attack_surface'
    ];

    return (principles.filter(p => expected.includes(p)).length / expected.length) * 100;
  }

  assessDataProtection(responses) {
    // Evaluate data protection practices
    const protections = responses.data_protection || {};
    let score = 0;

    if (protections.encryption) score += 20;
    if (protections.access_control) score += 20;
    if (protections.data_minimization) score += 20;
    if (protections.secure_deletion) score += 20;
    if (protections.backup_recovery) score += 20;

    return score;
  }

  identifyWeaknesses(scores) {
    return Object.entries(scores)
      .filter(([_, score]) => score < 70)
      .map(([competency, score]) => ({ competency, score }));
  }

  getRecommendation(score) {
    if (score < 50) {
      return "Complete foundational security training for AI systems immediately. Focus on threat awareness and secure interaction patterns.";
    } else if (score < 70) {
      return "Strengthen security competencies through practical exercises and case studies of AI security incidents.";
    } else if (score < 90) {
      return "Advance to expert-level security topics including security architecture and advanced threat modeling.";
    }
    return "Maintain current security knowledge through continuous learning and participation in security communities.";
  }

  getResources(scores) {
    const resources = [];

    if (scores.threat_awareness < 70) {
      resources.push({
        title: "OWASP Top 10 for LLM Applications",
        type: "guide",
        url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/"
      });
    }

    if (scores.secure_interaction < 70) {
      resources.push({
        title: "Secure AI Interaction Patterns",
        type: "tutorial",
        description: "Best practices for secure interaction with AI systems"
      });
    }

    return resources;
  }
}

/**
 * Identity Dimension - Built on Security Foundation
 */
class IdentityDimension {
  constructor() {
    this.competencies = [
      'authentication',
      'authorization',
      'identity_verification',
      'persona_management',
      'audit_trails'
    ];
  }

  async assess(responses) {
    const scores = {};

    scores.authentication = this.assessAuthentication(responses);
    scores.authorization = this.assessAuthorization(responses);
    scores.identity_verification = this.assessIdentityVerification(responses);
    scores.persona_management = this.assessPersonaManagement(responses);
    scores.audit_trails = this.assessAuditTrails(responses);

    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0) / this.competencies.length;

    return {
      score: totalScore,
      competencyScores: scores,
      weaknesses: this.identifyWeaknesses(scores),
      recommendation: this.getRecommendation(totalScore),
      resources: this.getResources(scores)
    };
  }

  assessAuthentication(responses) {
    const methods = responses.auth_methods || [];
    const strongMethods = ['mfa', 'biometric', 'certificate', 'sso'];
    return (methods.filter(m => strongMethods.includes(m)).length / strongMethods.length) * 100;
  }

  assessAuthorization(responses) {
    const understanding = responses.authorization || {};
    let score = 0;

    if (understanding.rbac) score += 25;
    if (understanding.abac) score += 25;
    if (understanding.least_privilege) score += 25;
    if (understanding.segregation) score += 25;

    return score;
  }

  assessIdentityVerification(responses) {
    const practices = responses.verification || [];
    const expected = ['verify_credentials', 'validate_permissions', 'check_context', 'monitor_anomalies'];
    return (practices.filter(p => expected.includes(p)).length / expected.length) * 100;
  }

  assessPersonaManagement(responses) {
    const understanding = responses.persona || {};
    let score = 0;

    if (understanding.separation) score += 33;
    if (understanding.consistency) score += 33;
    if (understanding.privacy_preservation) score += 34;

    return score;
  }

  assessAuditTrails(responses) {
    const practices = responses.audit || {};
    let score = 0;

    if (practices.logging) score += 20;
    if (practices.monitoring) score += 20;
    if (practices.retention) score += 20;
    if (practices.analysis) score += 20;
    if (practices.compliance) score += 20;

    return score;
  }

  identifyWeaknesses(scores) {
    return Object.entries(scores)
      .filter(([_, score]) => score < 70)
      .map(([competency, score]) => ({ competency, score }));
  }

  getRecommendation(score) {
    if (score < 50) {
      return "Build foundational identity management knowledge for AI systems. Focus on authentication and authorization mechanisms.";
    } else if (score < 70) {
      return "Develop advanced identity management skills including persona management and audit trail implementation.";
    } else if (score < 90) {
      return "Master complex identity scenarios including federated identity and zero-trust architectures.";
    }
    return "Lead identity management initiatives and mentor others in AI identity best practices.";
  }

  getResources(scores) {
    return [{
      title: "Identity Management in AI Systems",
      type: "course",
      description: "Comprehensive guide to managing identities in AI-enhanced environments"
    }];
  }
}

/**
 * Privacy Dimension - Builds on Security and Identity
 */
class PrivacyDimension {
  constructor() {
    this.competencies = [
      'data_minimization',
      'explicit_implicit_data',
      'consent_management',
      'privacy_by_design',
      'regulatory_compliance'
    ];
  }

  async assess(responses) {
    const scores = {};

    scores.data_minimization = this.assessDataMinimization(responses);
    scores.explicit_implicit_data = this.assessDataTypes(responses);
    scores.consent_management = this.assessConsent(responses);
    scores.privacy_by_design = this.assessPrivacyByDesign(responses);
    scores.regulatory_compliance = this.assessCompliance(responses);

    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0) / this.competencies.length;

    return {
      score: totalScore,
      competencyScores: scores,
      weaknesses: this.identifyWeaknesses(scores),
      recommendation: this.getRecommendation(totalScore),
      resources: this.getResources(scores)
    };
  }

  assessDataMinimization(responses) {
    const practices = responses.minimization || [];
    const expected = ['collect_only_needed', 'regular_purging', 'anonymization', 'pseudonymization'];
    return (practices.filter(p => expected.includes(p)).length / expected.length) * 100;
  }

  assessDataTypes(responses) {
    // Critical for AI: understanding explicit vs implicit data collection
    const understanding = responses.data_types || {};
    let score = 0;

    if (understanding.explicit_awareness) score += 25;
    if (understanding.implicit_awareness) score += 25;
    if (understanding.metadata_awareness) score += 25;
    if (understanding.inference_awareness) score += 25;

    return score;
  }

  assessConsent(responses) {
    const practices = responses.consent || {};
    let score = 0;

    if (practices.informed_consent) score += 20;
    if (practices.granular_control) score += 20;
    if (practices.withdrawal_mechanism) score += 20;
    if (practices.transparency) score += 20;
    if (practices.documentation) score += 20;

    return score;
  }

  assessPrivacyByDesign(responses) {
    const principles = responses.privacy_design || [];
    const expected = [
      'proactive_not_reactive',
      'privacy_default',
      'embedded_design',
      'full_functionality',
      'end_to_end_security',
      'visibility_transparency',
      'user_centric'
    ];
    return (principles.filter(p => expected.includes(p)).length / expected.length) * 100;
  }

  assessCompliance(responses) {
    const knowledge = responses.compliance || {};
    let score = 0;

    if (knowledge.gdpr) score += 20;
    if (knowledge.ccpa) score += 20;
    if (knowledge.ferpa) score += 20; // Important for higher education
    if (knowledge.ai_regulations) score += 20;
    if (knowledge.data_protection_laws) score += 20;

    return score;
  }

  identifyWeaknesses(scores) {
    return Object.entries(scores)
      .filter(([_, score]) => score < 70)
      .map(([competency, score]) => ({ competency, score }));
  }

  getRecommendation(score) {
    if (score < 50) {
      return "Develop fundamental privacy knowledge for AI systems. Focus on data minimization and understanding explicit vs implicit data collection.";
    } else if (score < 70) {
      return "Strengthen privacy practices through privacy-by-design principles and regulatory compliance training.";
    } else if (score < 90) {
      return "Advance to privacy leadership including privacy impact assessments and complex consent management.";
    }
    return "Champion privacy initiatives and guide organizational privacy strategy for AI systems.";
  }

  getResources(scores) {
    return [{
      title: "Privacy in AI Systems: From Theory to Practice",
      type: "workshop",
      description: "Hands-on workshop covering privacy challenges in AI deployments"
    }];
  }
}

/**
 * Trust Dimension - Highest Level, Built on All Others
 */
class TrustDimension {
  constructor() {
    this.competencies = [
      'output_validation',
      'source_verification',
      'bias_awareness',
      'transparency',
      'accountability'
    ];
  }

  async assess(responses) {
    const scores = {};

    scores.output_validation = this.assessOutputValidation(responses);
    scores.source_verification = this.assessSourceVerification(responses);
    scores.bias_awareness = this.assessBiasAwareness(responses);
    scores.transparency = this.assessTransparency(responses);
    scores.accountability = this.assessAccountability(responses);

    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0) / this.competencies.length;

    return {
      score: totalScore,
      competencyScores: scores,
      weaknesses: this.identifyWeaknesses(scores),
      recommendation: this.getRecommendation(totalScore),
      resources: this.getResources(scores)
    };
  }

  assessOutputValidation(responses) {
    const practices = responses.validation || [];
    const expected = [
      'cross_reference',
      'expert_review',
      'automated_checks',
      'consistency_verification',
      'fact_checking'
    ];
    return (practices.filter(p => expected.includes(p)).length / expected.length) * 100;
  }

  assessSourceVerification(responses) {
    const practices = responses.source_verification || {};
    let score = 0;

    if (practices.verify_citations) score += 25;
    if (practices.check_provenance) score += 25;
    if (practices.assess_reliability) score += 25;
    if (practices.track_lineage) score += 25;

    return score;
  }

  assessBiasAwareness(responses) {
    const understanding = responses.bias || {};
    let score = 0;

    if (understanding.detection) score += 20;
    if (understanding.types) score += 20;
    if (understanding.mitigation) score += 20;
    if (understanding.impact) score += 20;
    if (understanding.monitoring) score += 20;

    return score;
  }

  assessTransparency(responses) {
    const practices = responses.transparency || [];
    const expected = [
      'explain_decisions',
      'document_assumptions',
      'disclose_limitations',
      'share_methodology',
      'communicate_uncertainty'
    ];
    return (practices.filter(p => expected.includes(p)).length / expected.length) * 100;
  }

  assessAccountability(responses) {
    const understanding = responses.accountability || {};
    let score = 0;

    if (understanding.ownership) score += 20;
    if (understanding.responsibility) score += 20;
    if (understanding.oversight) score += 20;
    if (understanding.remediation) score += 20;
    if (understanding.governance) score += 20;

    return score;
  }

  identifyWeaknesses(scores) {
    return Object.entries(scores)
      .filter(([_, score]) => score < 70)
      .map(([competency, score]) => ({ competency, score }));
  }

  getRecommendation(score) {
    if (score < 50) {
      return "Build trust fundamentals: learn to critically evaluate AI outputs and verify sources systematically.";
    } else if (score < 70) {
      return "Develop advanced trust competencies including bias detection and transparency practices.";
    } else if (score < 90) {
      return "Master trust leadership including accountability frameworks and governance structures.";
    }
    return "Establish organizational trust frameworks and lead responsible AI initiatives.";
  }

  getResources(scores) {
    return [{
      title: "Building Trust in AI Systems",
      type: "certification",
      description: "Professional certification in responsible AI use and trust building"
    }];
  }
}

export { TrustDimension, IdentityDimension, PrivacyDimension, SecurityDimension };
