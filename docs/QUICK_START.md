# Quick Start Guide: TIPS Framework for Agentic AI Training

## Overview

Get up and running with the TIPS (Trust, Identity, Privacy, Security) Framework for training responsible agentic AI use in under 10 minutes.

## Prerequisites

- Node.js 18+ (check: `node --version`)
- npm 8+ (check: `npm --version`)
- 15 minutes of uninterrupted time

## Installation

```bash
# Clone or navigate to the project directory
cd greenwichxagenticsfoundationlondon

# Install dependencies (if any)
npm install

# Verify installation
npm run --help
```

## Running the Interactive Demo

### Option 1: Full Interactive Experience

```bash
npm run demo
```

This launches the complete interactive demonstration including:
- User profile creation
- Framework explanation
- Realistic scenarios
- Assessment and scoring
- Personalized learning path generation

**Time required**: ~15 minutes

### Option 2: Quick Assessment Only

```bash
node src/assessment/run-assessment.js
```

Skip the introduction and go straight to assessment scenarios.

**Time required**: ~10 minutes

## What to Expect

### 1. Introduction Phase
- Overview of TIPS framework
- Explanation of hierarchical approach
- Novel contributions highlighted

### 2. Profile Creation
You'll be asked:
- Your name
- Role (CISO, Faculty, Administrator, Student)
- Institution type
- Experience level with AI

### 3. Interactive Scenarios
Based on your role, you'll encounter 4 scenarios testing:
- **Security**: Threat awareness and incident response
- **Identity**: Authentication and access control
- **Privacy**: Data protection and consent
- **Trust**: Output validation and bias awareness

### 4. Results & Recommendations
- Overall score (0-100)
- Competency breakdown
- Personalized recommendations
- Learning path generation

### 5. Export
Results saved to `data/results-[your-id].json`

## Example Walkthrough

### Sample Interaction

```
🎓 TIPS FRAMEWORK FOR RESPONSIBLE AGENTIC AI TRAINING
   Trust • Identity • Privacy • Security

📝 USER PROFILE

Enter your name: Alex Chen
Your role (CISO/Faculty/Administrator/Student): CISO
Institution type (University/College/Research): University
AI experience level (novice/intermediate/advanced/expert): intermediate

✅ Profile created for Alex Chen
   Focus areas: security, identity, privacy, compliance

[Press ENTER to continue]

📋 SCENARIO 1: Prompt Injection Attack
   Dimension: SECURITY
   Difficulty: intermediate
   Context: higher_education

SITUATION:
You're a CISO at a university that has deployed an AI chatbot to help students
with course registration. A security researcher reports they can trick the chatbot
into revealing other students' registration data by using specific prompts.

QUESTION:
What immediate actions should you take? (Select all that apply)

OPTIONS (select all that apply, enter letters separated by commas):

  A) Immediately disable the chatbot
  B) Document the specific prompts used
  C) Notify affected students
  D) Implement input validation and sanitization
  E) Review audit logs for similar attempts
  F) Wait for the vendor to release a patch

Your answer (e.g., a,b,c): a,b,c,d,e

📊 Score: 100.0/100
✅ Excellent! You demonstrated strong understanding.

💡 EXPLANATION:
This is a critical prompt injection vulnerability. Immediate containment is essential,
followed by thorough investigation, documentation, and notification. Waiting for a
vendor patch without taking action could result in continued data exposure.

[Press ENTER to continue]
```

## Understanding Your Results

### Score Ranges

- **90-100**: Expert level - Ready to lead AI governance initiatives
- **75-89**: Advanced - Can handle complex scenarios independently
- **60-74**: Intermediate - Solid foundation, some gaps to address
- **40-59**: Developing - Fundamental understanding, needs structured training
- **0-39**: Novice - Comprehensive training recommended

### Competency Scores

Each competency is scored individually:
- **Threat Awareness**: Understanding AI-specific threats
- **Incident Response**: Handling AI security incidents
- **Authentication**: Managing AI system access
- **Privacy Design**: Implementing privacy-by-design
- **Output Validation**: Critically evaluating AI outputs
- **Bias Awareness**: Detecting and mitigating bias

### Learning Path

Based on your results, you'll receive:
1. **Prioritized modules** following hierarchical order
2. **Estimated time** for each module
3. **Prerequisites** showing dependencies
4. **Practical exercises** to build skills
5. **Resources** for deeper learning

## Next Steps

### For Individuals

1. **Review Results**: Study scenarios where you scored < 70%
2. **Follow Learning Path**: Complete modules in recommended order
3. **Practice**: Apply concepts in your daily work
4. **Reassess**: Retake assessment after 4 weeks

### For Institutions

1. **Pilot Program**: Start with 10-15 diverse participants
2. **Customize Scenarios**: Adapt to your context and policies
3. **Track Progress**: Monitor institutional competency growth
4. **Expand**: Roll out to broader community

### For CISOs

1. **Baseline Assessment**: Evaluate current team competencies
2. **Gap Analysis**: Identify institutional vulnerabilities
3. **Training Plan**: Develop role-specific learning paths
4. **Policy Updates**: Align policies with TIPS framework

## Customization

### Adding Your Own Scenarios

Edit `src/assessment/interactive-assessment.js`:

```javascript
// Add to the appropriate dimension array
security: [
  {
    id: 'sec-custom-001',
    title: 'Your Scenario Title',
    context: 'higher_education',
    difficulty: 'intermediate',
    scenario: `Description of the situation...`,
    question: 'What should you do?',
    options: [
      { id: 'a', text: 'Option 1', value: 'tag', points: 25 },
      // ... more options
    ],
    correctIds: ['a', 'b'],
    explanation: `Why this is correct...`,
    competencies: ['threat_awareness', 'incident_response']
  }
]
```

### Adjusting Difficulty

Modify `mapExperienceToDifficulty()` in `InteractiveAssessment` class:

```javascript
mapExperienceToDifficulty(experience) {
  const mapping = {
    'novice': 'beginner',        // Add beginner scenarios
    'intermediate': 'intermediate',
    'advanced': 'advanced',
    'expert': 'all'
  };
  return mapping[experience] || 'intermediate';
}
```

### Customizing for Your Institution

1. **Update Context**: Change `context: 'higher_education'` to your sector
2. **Add Policies**: Reference your institutional policies in scenarios
3. **Localize Regulations**: Update privacy scenarios for your jurisdiction
4. **Brand**: Customize output messages and formatting

## Advanced Features

### Using AgentDB for Memory

Store and retrieve successful intervention patterns:

```bash
# Initialize AgentDB (already done if you followed setup)
npx agentdb init ./data/agentdb.db --dimension 1536

# Add successful interventions
npx agentdb reflexion add \
  --episode "Prompt injection incident response" \
  --outcome "Successfully contained and remediated" \
  --learning "Immediate containment prevents data exposure"
```

### Using Research Swarm

Keep scenarios up-to-date with emerging threats:

```bash
# Research new threats (requires API key)
npx research-swarm research comprehensive \
  "Latest agentic AI security threats in higher education 2025"

# Review findings
npx research-swarm list
npx research-swarm view <job-id>
```

### Using Claude Flow

Orchestrate complex assessment workflows:

```bash
# Initialize Claude Flow
npx claude-flow init

# Create custom assessment flow
npx claude-flow run custom-assessment-flow
```

## Troubleshooting

### Demo Won't Start

```bash
# Check Node version (need 18+)
node --version

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try running directly
node demos/interactive-demo.js
```

### Scenarios Not Loading

```bash
# Verify file structure
ls -la src/assessment/

# Check for syntax errors
node --check src/assessment/interactive-assessment.js
node --check demos/interactive-demo.js
```

### Results Not Saving

```bash
# Ensure data directory exists
mkdir -p data

# Check permissions
ls -la data/

# Manually specify output path
node demos/interactive-demo.js --output ./custom-path/results.json
```

## FAQ

### Q: How long does the full demo take?
**A**: 15-20 minutes for complete experience, 10 minutes for assessment only.

### Q: Can I pause and resume?
**A**: Not currently, but results are saved at the end. Plan for uninterrupted time.

### Q: Is my data shared externally?
**A**: No. All data stays local unless you explicitly configure external storage.

### Q: Can I use this for compliance training?
**A**: Yes! Map TIPS competencies to your compliance requirements (FERPA, GDPR, etc.)

### Q: How often should I reassess?
**A**: Quarterly for high-risk roles (CISOs, admins), annually for others.

### Q: Can I integrate with our LMS?
**A**: Not out-of-box, but the framework can be adapted. Contact for integration support.

## Support & Community

### Getting Help
- **Documentation**: See `docs/` directory for comprehensive guides
- **Issues**: Report bugs or request features on GitHub
- **Questions**: Join community forum (link in README)

### Contributing
- **Scenarios**: Submit your own scenarios for review
- **Translations**: Help localize for different languages
- **Integrations**: Share integrations with other platforms

### Staying Updated
- **Newsletter**: Subscribe for monthly updates
- **Releases**: Watch GitHub for new versions
- **Blog**: Read case studies and best practices

## Resources

### Essential Reading
- `docs/NOVEL_DISCOVERIES.md` - Research foundations
- `docs/PRESENTATION_GUIDE.md` - For sharing with colleagues
- `README.md` - Project overview

### Technical Documentation
- `src/framework/tips-framework.js` - Core framework code
- `src/assessment/interactive-assessment.js` - Assessment logic
- `demos/interactive-demo.js` - Demo implementation

### External Resources
- OWASP Top 10 for LLM Applications
- NIST AI Risk Management Framework
- EU AI Act compliance guides
- GDPR guidelines for AI systems

---

**Ready to start?** Run `npm run demo` and begin your journey to responsible agentic AI use!

**Questions?** Check `docs/PRESENTATION_GUIDE.md` for detailed Q&A or open an issue on GitHub.

**Want to customize?** See customization section above or contact for consultation.
