import './commands';

// Website demo kadang melempar error JS yang tidak berpengaruh ke test
Cypress.on('uncaught:exception', () => false);