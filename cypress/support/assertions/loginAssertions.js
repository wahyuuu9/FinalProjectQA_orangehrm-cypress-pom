import loginActions from '../actions/loginActions';

const el = loginActions.elements;

class LoginAssertions {
  loginPageDisplayed() {
    cy.url().should('include', '/auth/login');
    cy.get(el.usernameInput).should('be.visible');
    cy.get(el.passwordInput).should('be.visible');
    cy.get(el.loginButton).should('be.visible').and('contain.text', 'Login');
  }

  dashboardDisplayed() {
    cy.url().should('include', '/dashboard/index');
    cy.get(el.pageTitle).should('be.visible').and('contain.text', 'Dashboard');
  }

  invalidCredentialsShown(message) {
    cy.get(el.alertError).should('be.visible').and('contain.text', message);
  }

  requiredMessageShown(total, message) {
    cy.get(el.fieldError)
      .should('have.length', total)
      .each(($err) => expect($err.text()).to.equal(message));
  }

  passwordIsMasked() {
    cy.get(el.passwordInput).should('have.attr', 'type', 'password');
  }

  // Assertion terhadap hasil intercept
  loginRequestOk(interception) {
    expect(interception.response.statusCode).to.be.oneOf([200, 302]);
  }

  loginRequestContains(interception, username) {
    expect(interception.request.body).to.include(`username=${username}`);
  }
}

export default new LoginAssertions();