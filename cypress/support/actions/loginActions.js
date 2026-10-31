class LoginActions {
  elements = {
    usernameInput: 'input[name="username"]',
    passwordInput: 'input[name="password"]',
    loginButton: 'button[type="submit"]',
    alertError: '.oxd-alert-content-text',
    fieldError: '.oxd-input-field-error-message',
    userDropdown: '.oxd-userdropdown-tab',
    pageTitle: '.oxd-topbar-header-breadcrumb-module',
  };

  visit() {
    cy.visit('/web/index.php/auth/login');
  }

  typeUsername(username) {
    if (username) cy.get(this.elements.usernameInput).clear().type(username);
  }

  typePassword(password) {
    if (password) cy.get(this.elements.passwordInput).clear().type(password);
  }

  clickLogin() {
    cy.get(this.elements.loginButton).click();
  }

  login(username, password) {
    this.typeUsername(username);
    this.typePassword(password);
    this.clickLogin();
  }

  logout() {
    cy.get(this.elements.userDropdown).click();
    cy.contains('a', 'Logout').click();
  }
}

export default new LoginActions();