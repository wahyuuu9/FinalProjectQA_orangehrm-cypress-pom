import loginActions from '../support/actions/loginActions';
import loginAssertions from '../support/assertions/loginAssertions';
import loginIntercept from '../support/intercepts/loginIntercept';
import loginData from '../data/loginData.json';

describe('Fitur Login - OrangeHRM', () => {
  beforeEach(() => {
    loginIntercept.watchLogin();
    loginActions.visit();
    loginAssertions.loginPageDisplayed();
  });

  it('TC_LOGIN_001 - Login berhasil dengan username dan password valid', () => {
    loginActions.login(loginData.valid.username, loginData.valid.password);

    loginIntercept.waitLogin().then((i) => {
      loginAssertions.loginRequestOk(i);
      loginAssertions.loginRequestContains(i, loginData.valid.username);
    });
    loginAssertions.dashboardDisplayed();
  });

  it('TC_LOGIN_002 - Login gagal dengan username salah', () => {
    loginActions.login(loginData.wrongUsername.username, loginData.wrongUsername.password);

    loginIntercept.waitLogin().then(loginAssertions.loginRequestOk);
    loginAssertions.invalidCredentialsShown(loginData.messages.invalidCredentials);
  });

  it('TC_LOGIN_003 - Login gagal dengan password salah', () => {
    loginActions.login(loginData.wrongPassword.username, loginData.wrongPassword.password);

    loginIntercept.waitLogin().then(loginAssertions.loginRequestOk);
    loginAssertions.invalidCredentialsShown(loginData.messages.invalidCredentials);
  });

  it('TC_LOGIN_004 - Login gagal dengan username dan password sama-sama salah', () => {
    loginActions.login(loginData.bothWrong.username, loginData.bothWrong.password);

    loginIntercept.waitLogin().then(loginAssertions.loginRequestOk);
    loginAssertions.invalidCredentialsShown(loginData.messages.invalidCredentials);
  });

  it('TC_LOGIN_005 - Login gagal saat username dan password dikosongkan', () => {
    loginActions.clickLogin();

    loginAssertions.requiredMessageShown(2, loginData.messages.required);
    cy.url().should('include', loginData.urls.login);
  });

  it('TC_LOGIN_006 - Login gagal saat username kosong', () => {
    loginActions.login('', loginData.valid.password);

    loginAssertions.requiredMessageShown(1, loginData.messages.required);
  });

  it('TC_LOGIN_007 - Login gagal saat password kosong', () => {
    loginActions.login(loginData.valid.username, '');

    loginAssertions.requiredMessageShown(1, loginData.messages.required);
  });

  it('TC_LOGIN_008 - Password tersamarkan dan user bisa logout setelah login', () => {
    loginAssertions.passwordIsMasked();
    loginActions.login(loginData.valid.username, loginData.valid.password);
    loginAssertions.dashboardDisplayed();

    loginActions.logout();
    loginAssertions.loginPageDisplayed();
  });
});