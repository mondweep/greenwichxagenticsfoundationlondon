#!/usr/bin/env node

/**
 * TIPS Framework for Responsible Agentic AI Training
 * Main entry point
 */

import { TIPSFramework } from './framework/tips-framework.js';
import { InteractiveAssessment } from './assessment/interactive-assessment.js';

console.log('\n🎓 TIPS Framework - Main Module\n');
console.log('Available exports:');
console.log('  • TIPSFramework - Core framework implementation');
console.log('  • InteractiveAssessment - Assessment and learning path generation\n');

console.log('To run the interactive demo:');
console.log('  npm run demo\n');

console.log('To use programmatically:');
console.log('  import { TIPSFramework } from "./src/framework/tips-framework.js";\n');

export { TIPSFramework, InteractiveAssessment };
