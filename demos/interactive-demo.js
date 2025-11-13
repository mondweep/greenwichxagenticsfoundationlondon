#!/usr/bin/env node

/**
 * Interactive TIPS Framework Demonstration
 *
 * A comprehensive demonstration of the TIPS framework for training individuals
 * on responsible use of Agentic/Generative AI in higher education contexts
 *
 * Novel Features:
 * 1. Hierarchical learning pathway (Security → Identity → Privacy → Trust)
 * 2. Context-aware scenarios for higher education CISOs
 * 3. Real-time competency tracking with AgentDB
 * 4. Multi-agent research integration for continuous improvement
 * 5. Cyber resilience focus aligned with CISO responsibilities
 */

import { TIPSFramework } from '../src/framework/tips-framework.js';
import { InteractiveAssessment } from '../src/assessment/interactive-assessment.js';
import * as readline from 'readline';

class TIPSDemo {
  constructor() {
    this.framework = new TIPSFramework();
    this.assessment = new InteractiveAssessment();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async start() {
    console.log('\n' + '='.repeat(80));
    console.log('🎓 TIPS FRAMEWORK FOR RESPONSIBLE AGENTIC AI TRAINING');
    console.log('   Trust • Identity • Privacy • Security');
    console.log('='.repeat(80));
    console.log('\n📚 A Novel Approach to AI Literacy for Higher Education\n');

    await this.showIntroduction();
    await this.collectUserProfile();
    await this.demonstrateFramework();
    await this.runInteractiveScenarios();
    await this.showResults();
    await this.generateLearningPath();

    this.rl.close();
  }

  async showIntroduction() {
    console.log('🌟 INTRODUCTION\n');
    console.log('This demonstration showcases a novel training framework combining:');
    console.log('  • TIPS Framework (Trust, Identity, Privacy, Security)');
    console.log('  • Cyber Resilience for Higher Education');
    console.log('  • Practical CISO-focused scenarios');
    console.log('  • Hierarchical competency development\n');

    console.log('📊 NOVEL CONTRIBUTIONS:\n');
    console.log('1. HIERARCHICAL IMPLEMENTATION');
    console.log('   Following research findings, we establish Security as the foundation,');
    console.log('   then build Identity, Privacy, and Trust capabilities on top.\n');

    console.log('2. IMPLICIT vs EXPLICIT DATA AWARENESS');
    console.log('   Critical for AI: Understanding not just what data AI collects,');
    console.log('   but what it infers from interaction patterns.\n');

    console.log('3. AGENTIC AI-SPECIFIC THREATS');
    console.log('   Beyond traditional cybersecurity: prompt injection, model inversion,');
    console.log('   autonomous agent risks, and multi-agent coordination challenges.\n');

    console.log('4. CONTEXT-AWARE ASSESSMENT');
    console.log('   Scenarios tailored to higher education, considering FERPA compliance,');
    console.log('   academic integrity, and research data protection.\n');

    console.log('5. CONTINUOUS LEARNING INTEGRATION');
    console.log('   Using AgentDB and research-swarm for evolving threat landscape.\n');

    await this.pause();
  }

  async collectUserProfile() {
    console.log('\n📝 USER PROFILE\n');

    const name = await this.ask('Enter your name: ');
    const role = await this.ask('Your role (CISO/Faculty/Administrator/Student): ');
    const institution = await this.ask('Institution type (University/College/Research): ');
    const experience = await this.ask('AI experience level (novice/intermediate/advanced/expert): ');

    this.userProfile = {
      id: `user-${Date.now()}`,
      name,
      role: role.toLowerCase(),
      institution: institution.toLowerCase(),
      experience: experience.toLowerCase() || 'intermediate',
      focus_areas: this.determineFocusAreas(role)
    };

    console.log(`\n✅ Profile created for ${name}`);
    console.log(`   Focus areas: ${this.userProfile.focus_areas.join(', ')}\n`);
  }

  determineFocusAreas(role) {
    const roleMapping = {
      'ciso': ['security', 'identity', 'privacy', 'compliance'],
      'faculty': ['trust', 'privacy', 'academic_integrity'],
      'administrator': ['privacy', 'compliance', 'governance'],
      'student': ['trust', 'privacy', 'responsible_use']
    };

    const normalizedRole = role.toLowerCase();
    return roleMapping[normalizedRole] || ['trust', 'security', 'privacy'];
  }

  async demonstrateFramework() {
    console.log('\n' + '='.repeat(80));
    console.log('🏗️  TIPS FRAMEWORK ARCHITECTURE');
    console.log('='.repeat(80) + '\n');

    console.log('The framework follows a hierarchical implementation approach:\n');

    const hierarchy = [
      {
        level: 1,
        dimension: 'SECURITY',
        icon: '🔒',
        description: 'Foundation - Secure infrastructure and threat protection',
        competencies: [
          'Threat awareness (prompt injection, data poisoning, model attacks)',
          'Secure interaction patterns with AI systems',
          'Incident response for AI-specific incidents',
          'Security-by-design principles',
          'Data protection mechanisms'
        ]
      },
      {
        level: 2,
        dimension: 'IDENTITY',
        icon: '👤',
        description: 'Built on Security - Authentication and authorization',
        competencies: [
          'Multi-factor authentication for AI access',
          'Role-based and attribute-based access control',
          'Identity verification in AI-mediated interactions',
          'Multi-persona management (student/faculty/admin roles)',
          'Comprehensive audit trails'
        ]
      },
      {
        level: 3,
        dimension: 'PRIVACY',
        icon: '🔐',
        description: 'Built on Security + Identity - Data protection and consent',
        competencies: [
          'Data minimization strategies',
          'Explicit vs implicit data collection awareness',
          'Granular consent management',
          'Privacy-by-design implementation',
          'Regulatory compliance (GDPR, FERPA, CCPA)'
        ]
      },
      {
        level: 4,
        dimension: 'TRUST',
        icon: '🤝',
        description: 'Built on all others - Confidence and accountability',
        competencies: [
          'Critical output validation',
          'Source verification and fact-checking',
          'Bias detection and mitigation',
          'Transparency and explainability',
          'Accountability frameworks'
        ]
      }
    ];

    for (const level of hierarchy) {
      console.log(`${level.icon} LEVEL ${level.level}: ${level.dimension}`);
      console.log(`   ${level.description}\n`);
      console.log('   Key Competencies:');
      level.competencies.forEach(comp => {
        console.log(`   • ${comp}`);
      });
      console.log('');
    }

    console.log('⚡ WHY HIERARCHICAL?\n');
    console.log('Research shows that security forms the foundation for all other dimensions.');
    console.log('Without secure infrastructure, identity management is vulnerable.');
    console.log('Without proper identity and security, privacy cannot be guaranteed.');
    console.log('Without security, identity, and privacy, trust cannot be established.\n');

    await this.pause();
  }

  async runInteractiveScenarios() {
    console.log('\n' + '='.repeat(80));
    console.log('🎯 INTERACTIVE SCENARIO ASSESSMENT');
    console.log('='.repeat(80) + '\n');

    console.log('You will be presented with realistic scenarios from higher education.');
    console.log('Each scenario tests your understanding of TIPS principles.\n');

    const assessmentObj = this.assessment.generateAssessment(this.userProfile);
    this.currentAssessment = assessmentObj;
    this.userAnswers = [];

    for (let i = 0; i < assessmentObj.scenarios.length; i++) {
      const scenario = assessmentObj.scenarios[i];
      await this.presentScenario(scenario, i + 1);
    }
  }

  async presentScenario(scenario, number) {
    console.log('\n' + '-'.repeat(80));
    console.log(`📋 SCENARIO ${number}: ${scenario.title}`);
    console.log(`   Dimension: ${scenario.id.split('-')[0].toUpperCase()}`);
    console.log(`   Difficulty: ${scenario.difficulty}`);
    console.log(`   Context: ${scenario.context}`);
    console.log('-'.repeat(80) + '\n');

    console.log('SITUATION:');
    console.log(this.wrapText(scenario.scenario, 75) + '\n');

    console.log('QUESTION:');
    console.log(this.wrapText(scenario.question, 75) + '\n');

    console.log('OPTIONS (select all that apply, enter letters separated by commas):\n');
    scenario.options.forEach(option => {
      console.log(`  ${option.id.toUpperCase()}) ${this.wrapText(option.text, 70, '     ')}`);
    });

    const answer = await this.ask('\nYour answer (e.g., a,b,c): ');
    const selectedIds = answer.toLowerCase().split(',').map(s => s.trim());

    this.userAnswers.push({ selectedIds });

    // Show immediate feedback
    const result = this.assessment.scoreScenario(scenario, { selectedIds });
    console.log(`\n📊 Score: ${result.score.toFixed(1)}/100`);

    if (result.score >= 80) {
      console.log('✅ Excellent! You demonstrated strong understanding.');
    } else if (result.score >= 60) {
      console.log('👍 Good effort. Review the explanation for improvement areas.');
    } else {
      console.log('⚠️  This scenario revealed knowledge gaps. Study the explanation carefully.');
    }

    console.log('\n💡 EXPLANATION:');
    console.log(this.wrapText(scenario.explanation, 75) + '\n');

    await this.pause();
  }

  async showResults() {
    console.log('\n' + '='.repeat(80));
    console.log('📊 ASSESSMENT RESULTS');
    console.log('='.repeat(80) + '\n');

    const results = this.assessment.scoreAssessment(this.currentAssessment, this.userAnswers);
    this.assessmentResults = results;

    console.log(`Overall Score: ${results.overall.toFixed(1)}/100\n`);

    // Show readiness level
    const level = this.framework.determineReadiness(results.overall);
    console.log(`Current Readiness Level: ${level.toUpperCase()}\n`);

    // Show competency breakdown
    console.log('COMPETENCY SCORES:\n');
    Object.entries(results.competencies)
      .sort((a, b) => a[1].average - b[1].average)
      .forEach(([competency, data]) => {
        const bar = this.createProgressBar(data.average);
        const status = data.average >= 70 ? '✅' : '⚠️';
        console.log(`${status} ${competency.padEnd(25)} ${bar} ${data.average.toFixed(1)}%`);
      });

    console.log('\n' + '='.repeat(80) + '\n');

    // Show recommendations
    if (results.recommendations.length > 0) {
      console.log('📌 RECOMMENDATIONS:\n');
      results.recommendations.forEach((rec, idx) => {
        console.log(`${idx + 1}. ${rec.type.replace(/_/g, ' ').toUpperCase()}`);
        if (rec.competency) {
          console.log(`   Competency: ${rec.competency}`);
          console.log(`   Current: ${rec.currentLevel.toFixed(1)}% → Target: ${rec.targetLevel}%`);
          console.log(`   Priority: ${rec.priority.toUpperCase()}`);
        }
        if (rec.message) {
          console.log(`   ${rec.message}`);
        }
        console.log('');
      });
    }

    await this.pause();
  }

  async generateLearningPath() {
    console.log('\n' + '='.repeat(80));
    console.log('🎓 PERSONALIZED LEARNING PATH');
    console.log('='.repeat(80) + '\n');

    const learningPath = this.assessment.generateLearningPath(
      this.assessmentResults,
      this.userProfile
    );

    console.log(`Current Level: ${learningPath.currentLevel}`);
    console.log(`Target Level: ${learningPath.targetLevel}`);
    console.log(`Estimated Duration: ${learningPath.estimatedDuration}\n`);

    console.log('RECOMMENDED MODULES (in hierarchical order):\n');

    learningPath.modules.forEach((module, idx) => {
      console.log(`${idx + 1}. ${module.title}`);
      console.log(`   Dimension: ${module.dimension.toUpperCase()}`);
      console.log(`   Current Proficiency: ${module.currentProficiency.toFixed(1)}%`);
      console.log(`   Target: ${module.targetProficiency}%`);
      console.log(`   Duration: ${module.estimatedWeeks} weeks`);

      if (module.prerequisites.length > 0) {
        console.log(`   Prerequisites: ${module.prerequisites.join(', ')}`);
      }

      console.log(`\n   Key Topics:`);
      module.topics.slice(0, 3).forEach(topic => {
        console.log(`   • ${topic}`);
      });

      console.log(`\n   Practical Exercises:`);
      module.practicalExercises.slice(0, 2).forEach(exercise => {
        console.log(`   • ${exercise}`);
      });

      console.log('');
    });

    console.log('='.repeat(80) + '\n');
    console.log('🚀 NEXT STEPS:\n');
    console.log('1. Review scenarios where you scored below 70%');
    console.log('2. Complete the recommended modules in hierarchical order');
    console.log('3. Practice with real-world scenarios in your institution');
    console.log('4. Retake assessment after completing each module');
    console.log('5. Share learnings with colleagues and build institutional capacity\n');

    console.log('📧 Export your learning path and results for your records.\n');

    // Save results
    await this.saveResults();
  }

  async saveResults() {
    const results = {
      userProfile: this.userProfile,
      assessment: this.currentAssessment,
      answers: this.userAnswers,
      results: this.assessmentResults,
      learningPath: this.assessment.generateLearningPath(
        this.assessmentResults,
        this.userProfile
      ),
      timestamp: new Date().toISOString()
    };

    const filename = `./data/results-${this.userProfile.id}.json`;

    try {
      const fs = await import('fs/promises');
      await fs.writeFile(filename, JSON.stringify(results, null, 2));
      console.log(`✅ Results saved to: ${filename}\n`);
    } catch (error) {
      console.log(`⚠️  Could not save results: ${error.message}\n`);
    }
  }

  createProgressBar(percentage, width = 30) {
    const filled = Math.round((percentage / 100) * width);
    const empty = width - filled;
    return '[' + '█'.repeat(filled) + '░'.repeat(empty) + ']';
  }

  wrapText(text, width, indent = '') {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
      if ((currentLine + word).length <= width) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines.map((line, idx) => (idx > 0 ? indent : '') + line).join('\n');
  }

  ask(question) {
    return new Promise((resolve) => {
      this.rl.question(question, resolve);
    });
  }

  async pause() {
    await this.ask('\nPress ENTER to continue...');
  }
}

// Run the demonstration
const demo = new TIPSDemo();
demo.start().catch(console.error);
