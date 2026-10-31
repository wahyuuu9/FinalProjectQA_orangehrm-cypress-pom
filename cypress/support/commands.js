import loginData from '../data/loginData.json';

Cypress.Commands.add('login', () => {
  cy.session('admin-session', () => {
    cy.visit('/web/index.php/auth/login');
    cy.get('input[name="username"]').type(loginData.valid.username);
    cy.get('input[name="password"]').type(loginData.valid.password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard/index');
  }, {
    validate() {
      // Memastikan cookie autentikasi 'orangehrm' masih ada dan valid
      cy.getCookie('orangehrm').should('exist');
    }
  });
});