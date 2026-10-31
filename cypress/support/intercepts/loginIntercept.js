class LoginIntercept {
  // Memantau request submit form login
  watchLogin() {
    cy.intercept('POST', '**/auth/validate').as('loginRequest');
  }

  waitLogin() {
    return cy.wait('@loginRequest');
  }
}

export default new LoginIntercept();