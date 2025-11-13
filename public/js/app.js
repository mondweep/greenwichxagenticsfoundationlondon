/**
 * TIPS Framework Web Application
 * Main application logic
 */

import { TIPSFramework } from './tips-framework.js';

// Global state
let framework;
let currentAssessment;
let userAnswers = [];
let currentScenarioIndex = 0;
let assessmentResults;

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    framework = new TIPSFramework();
    initializeNavigation();
    initializeProfileForm();
    setupScrollAnimations();
});

// Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll on nav click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Mobile nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

// Profile form handling
function initializeProfileForm() {
    const form = document.getElementById('profile-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const userProfile = {
            id: `user-${Date.now()}`,
            name: formData.get('name'),
            role: formData.get('role'),
            institution: formData.get('institution'),
            experience: formData.get('experience')
        };

        startAssessment(userProfile);
    });
}

// Start assessment
function startAssessment(userProfile) {
    currentAssessment = framework.generateAssessment(userProfile);
    userAnswers = [];
    currentScenarioIndex = 0;

    // Hide profile form, show scenario display
    document.getElementById('profile-setup').style.display = 'none';
    document.getElementById('scenario-display').style.display = 'block';
    document.getElementById('progress-indicator').style.display = 'block';

    // Display first scenario
    displayScenario(currentScenarioIndex);
    updateProgress();
}

// Display scenario
function displayScenario(index) {
    const scenario = currentAssessment.scenarios[index];
    const dimensionColors = {
        'sec': { bg: '#fee2e2', text: '#991b1b', name: 'Security' },
        'id': { bg: '#fef3c7', text: '#92400e', name: 'Identity' },
        'priv': { bg: '#d1fae5', text: '#065f46', name: 'Privacy' },
        'trust': { bg: '#dbeafe', text: '#1e40af', name: 'Trust' }
    };

    const dimKey = scenario.id.split('-')[0];
    const dimColor = dimensionColors[dimKey] || dimensionColors['sec'];

    // Update header
    document.getElementById('scenario-current').textContent = index + 1;
    document.getElementById('scenario-total').textContent = currentAssessment.scenarios.length;

    const dimensionBadge = document.getElementById('scenario-dimension');
    dimensionBadge.textContent = dimColor.name;
    dimensionBadge.style.backgroundColor = dimColor.bg;
    dimensionBadge.style.color = dimColor.text;

    // Update content
    document.getElementById('scenario-title').textContent = scenario.title;
    document.getElementById('scenario-difficulty').textContent = scenario.difficulty.charAt(0).toUpperCase() + scenario.difficulty.slice(1);
    document.getElementById('scenario-context').textContent = scenario.context.replace('_', ' ');
    document.getElementById('scenario-situation').textContent = scenario.scenario;
    document.getElementById('scenario-question').textContent = scenario.question;

    // Render options
    const optionsContainer = document.getElementById('scenario-options');
    optionsContainer.innerHTML = '';

    scenario.options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option-item';
        optionDiv.innerHTML = `
            <input type="checkbox"
                   class="option-checkbox"
                   id="option-${option.id}"
                   value="${option.id}">
            <label for="option-${option.id}" class="option-label">
                <span class="option-id">${option.id.toUpperCase()})</span>
                ${option.text}
            </label>
        `;

        optionDiv.addEventListener('click', (e) => {
            if (e.target.type !== 'checkbox') {
                const checkbox = optionDiv.querySelector('.option-checkbox');
                checkbox.checked = !checkbox.checked;
            }
            optionDiv.classList.toggle('selected');
        });

        optionsContainer.appendChild(optionDiv);
    });

    // Update button states
    document.getElementById('prev-btn').disabled = index === 0;
    document.getElementById('submit-btn').textContent =
        index === currentAssessment.scenarios.length - 1 ? 'Finish Assessment' : 'Submit Answer';

    // Hide feedback
    document.getElementById('scenario-feedback').style.display = 'none';
}

// Submit answer
window.submitAnswer = function() {
    const selectedCheckboxes = document.querySelectorAll('.option-checkbox:checked');
    const selectedIds = Array.from(selectedCheckboxes).map(cb => cb.value);

    if (selectedIds.length === 0) {
        alert('Please select at least one option');
        return;
    }

    userAnswers[currentScenarioIndex] = { selectedIds };

    // Show feedback
    const scenario = currentAssessment.scenarios[currentScenarioIndex];
    const result = framework.scoreScenario(scenario, userAnswers[currentScenarioIndex]);
    showFeedback(result, scenario);

    // Update submit button
    const submitBtn = document.getElementById('submit-btn');
    if (currentScenarioIndex < currentAssessment.scenarios.length - 1) {
        submitBtn.textContent = 'Next Scenario';
        submitBtn.onclick = nextScenario;
    } else {
        submitBtn.textContent = 'View Results';
        submitBtn.onclick = showResults;
    }
}

// Show feedback
function showFeedback(result, scenario) {
    const feedbackDiv = document.getElementById('scenario-feedback');
    let status = '';
    let statusClass = '';

    if (result.score >= 80) {
        status = '✅ Excellent!';
        statusClass = 'success';
    } else if (result.score >= 60) {
        status = '👍 Good';
        statusClass = 'good';
    } else {
        status = '⚠️ Needs Improvement';
        statusClass = 'warning';
    }

    feedbackDiv.innerHTML = `
        <div class="feedback-score ${statusClass}">
            ${status} Score: ${result.score.toFixed(1)}/100
        </div>
        <div class="feedback-explanation">
            <strong>Explanation:</strong><br>
            ${scenario.explanation}
        </div>
    `;
    feedbackDiv.style.display = 'block';

    // Scroll to feedback
    feedbackDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Next scenario
window.nextScenario = function() {
    if (currentScenarioIndex < currentAssessment.scenarios.length - 1) {
        currentScenarioIndex++;
        displayScenario(currentScenarioIndex);
        updateProgress();

        // Reset submit button
        const submitBtn = document.getElementById('submit-btn');
        submitBtn.textContent = 'Submit Answer';
        submitBtn.onclick = submitAnswer;

        // Scroll to top of scenario
        document.getElementById('scenario-display').scrollIntoView({ behavior: 'smooth' });
    }
}

// Previous scenario
window.previousScenario = function() {
    if (currentScenarioIndex > 0) {
        currentScenarioIndex--;
        displayScenario(currentScenarioIndex);
        updateProgress();

        // If we already answered this, pre-select options
        if (userAnswers[currentScenarioIndex]) {
            const selectedIds = userAnswers[currentScenarioIndex].selectedIds;
            selectedIds.forEach(id => {
                const checkbox = document.getElementById(`option-${id}`);
                if (checkbox) {
                    checkbox.checked = true;
                    checkbox.closest('.option-item').classList.add('selected');
                }
            });
        }
    }
}

// Update progress
function updateProgress() {
    const progress = ((currentScenarioIndex + 1) / currentAssessment.scenarios.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `${Math.round(progress)}% Complete`;
}

// Show results
window.showResults = function() {
    assessmentResults = framework.scoreAssessment(currentAssessment, userAnswers);

    // Hide scenario, show results
    document.getElementById('scenario-display').style.display = 'none';
    document.getElementById('results-display').style.display = 'block';
    document.getElementById('progress-indicator').style.display = 'none';

    // Animate overall score
    const overallScore = Math.round(assessmentResults.overall);
    document.getElementById('overall-score').textContent = overallScore;

    const readinessLevel = framework.determineReadiness(overallScore);
    document.getElementById('readiness-level').textContent = readinessLevel;

    // Animate score circle
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (overallScore / 100) * circumference;
    const progressCircle = document.getElementById('score-progress');
    setTimeout(() => {
        progressCircle.style.strokeDashoffset = offset;
    }, 100);

    // Display competency scores
    displayCompetencyScores(assessmentResults.competencies);

    // Display learning path
    const learningPath = framework.generateLearningPath(assessmentResults);
    displayLearningPath(learningPath);

    // Scroll to results
    document.getElementById('results-display').scrollIntoView({ behavior: 'smooth' });
}

// Display competency scores
function displayCompetencyScores(competencies) {
    const container = document.getElementById('competency-list');
    container.innerHTML = '';

    const sortedCompetencies = Object.entries(competencies)
        .sort((a, b) => a[1].average - b[1].average);

    sortedCompetencies.forEach(([name, data]) => {
        const score = Math.round(data.average);
        const status = score >= 70 ? '✅' : '⚠️';

        const div = document.createElement('div');
        div.className = 'competency-item';
        div.innerHTML = `
            <span class="competency-name">${status} ${name.replace(/_/g, ' ')}</span>
            <div class="competency-bar">
                <div class="competency-fill" style="width: 0%"></div>
            </div>
            <span class="competency-score">${score}%</span>
        `;

        container.appendChild(div);

        // Animate bar
        setTimeout(() => {
            div.querySelector('.competency-fill').style.width = `${score}%`;
        }, 100);
    });
}

// Display learning path
function displayLearningPath(learningPath) {
    const container = document.getElementById('learning-path-modules');
    container.innerHTML = '';

    if (learningPath.modules.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">🎉 Excellent! You\'ve demonstrated strong competencies across all dimensions.</p>';
        return;
    }

    learningPath.modules.forEach((module, index) => {
        const div = document.createElement('div');
        div.className = 'module-item';
        div.innerHTML = `
            <h5>${index + 1}. ${module.title}</h5>
            <div class="module-meta">
                <span>📊 Current: ${Math.round(module.currentProficiency)}%</span>
                <span>🎯 Target: ${module.targetProficiency}%</span>
                <span>⏱️ Duration: ${module.estimatedWeeks} weeks</span>
            </div>
            <div class="module-topics">
                Focus on strengthening your ${module.dimension} competencies through targeted training and practical exercises.
            </div>
        `;
        container.appendChild(div);
    });
}

// Download results
window.downloadResults = function() {
    const results = {
        userProfile: currentAssessment.userProfile,
        assessment: currentAssessment,
        answers: userAnswers,
        results: assessmentResults,
        timestamp: new Date().toISOString()
    };

    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `tips-assessment-${currentAssessment.userProfile.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Restart assessment
window.restartAssessment = function() {
    currentAssessment = null;
    userAnswers = [];
    currentScenarioIndex = 0;
    assessmentResults = null;

    document.getElementById('results-display').style.display = 'none';
    document.getElementById('profile-setup').style.display = 'block';
    document.getElementById('profile-form').reset();

    // Scroll to demo section
    document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
}

// Scroll helpers
window.scrollToDemo = function() {
    document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
}

window.scrollToFramework = function() {
    document.getElementById('framework').scrollIntoView({ behavior: 'smooth' });
}

// Resource modal
window.openResource = function(resourceType) {
    const modal = document.getElementById('resource-modal');
    const content = document.getElementById('resource-content');

    const resources = {
        'quick-start': {
            title: '🚀 Quick Start Guide',
            content: `
                <h2>Quick Start Guide</h2>
                <p>Get started with the TIPS Framework in minutes:</p>
                <ol>
                    <li><strong>Create your profile</strong> - Tell us about your role and experience</li>
                    <li><strong>Complete the assessment</strong> - Work through 4 realistic scenarios</li>
                    <li><strong>Review your results</strong> - See your competency scores and recommendations</li>
                    <li><strong>Follow your learning path</strong> - Get personalized training modules</li>
                </ol>
                <p>The complete assessment takes approximately 15-20 minutes.</p>
                <a href="#demo" onclick="closeResourceModal(); scrollToDemo();" class="btn btn-primary" style="margin-top: 1rem;">Start Now</a>
            `
        },
        'discoveries': {
            title: '💡 Novel Discoveries',
            content: `
                <h2>Novel Research Contributions</h2>
                <ol>
                    <li><strong>Hierarchical Implementation</strong> - Security → Identity → Privacy → Trust</li>
                    <li><strong>Implicit Data Awareness</strong> - Understanding what AI infers vs. collects</li>
                    <li><strong>Agentic AI Threat Taxonomy</strong> - Comprehensive classification of threats</li>
                    <li><strong>Context-Aware Assessment</strong> - Higher education specific scenarios</li>
                    <li><strong>Continuous Learning Architecture</strong> - Self-updating training system</li>
                </ol>
                <p>These contributions represent significant advances in responsible AI training methodology.</p>
            `
        },
        'presentation': {
            title: '📊 Presentation Guide',
            content: `
                <h2>Share with Your Colleagues</h2>
                <p>A 45-minute presentation guide is available for introducing the TIPS Framework to your institution.</p>
                <h3>Includes:</h3>
                <ul>
                    <li>Problem statement and research foundation</li>
                    <li>Framework explanation with visual aids</li>
                    <li>Live demonstration walkthrough</li>
                    <li>Implementation roadmap</li>
                    <li>Q&A preparation</li>
                </ul>
                <p>Perfect for CISOs, faculty meetings, and administrative presentations.</p>
            `
        },
        'github': {
            title: '💻 GitHub Repository',
            content: `
                <h2>Source Code & Customization</h2>
                <p>The complete source code is available on GitHub for customization and deployment at your institution.</p>
                <h3>Features:</h3>
                <ul>
                    <li>Full framework implementation</li>
                    <li>20+ realistic scenarios</li>
                    <li>Comprehensive documentation</li>
                    <li>Customization guides</li>
                    <li>Deployment instructions</li>
                </ul>
                <p><strong>Repository:</strong> github.com/mondweep/greenwichxagenticsfoundationlondon</p>
            `
        }
    };

    const resource = resources[resourceType];
    if (resource) {
        content.innerHTML = resource.content;
        modal.classList.add('active');
    }
}

window.closeResourceModal = function() {
    const modal = document.getElementById('resource-modal');
    modal.classList.remove('active');
}

// Close modal on background click
document.getElementById('resource-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'resource-modal') {
        closeResourceModal();
    }
});

// Scroll animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.feature-card, .resource-card, .pyramid-layer').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}
