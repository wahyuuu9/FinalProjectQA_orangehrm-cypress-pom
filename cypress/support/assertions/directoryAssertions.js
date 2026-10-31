import directoryActions from '../actions/directoryActions';

const el = directoryActions.elements;

class DirectoryAssertions {
  directoryPageDisplayed() {
    cy.url().should('include', '/directory/viewDirectory');
    cy.get(el.pageTitle).should('contain.text', 'Directory');
  }

  filterFormDisplayed() {
    ['Employee Name', 'Job Title', 'Location'].forEach((label) => {
      cy.contains('label', label).should('be.visible');
    });
    cy.contains('button', 'Search').should('be.visible');
    cy.contains('button', 'Reset').should('be.visible');
  }

  dropdownValue(label, value) {
    cy.contains('.oxd-input-group', label)
      .find(el.selectTextInput)
      .should('have.text', value);
  }

  noRecordsFound(message) {
    cy.contains(message).should('be.visible');
  }

  autocompleteShown() {
    cy.get(el.autocompleteOption).should('have.length.greaterThan', 0);
  }

  invalidFieldMessage(message) {
    cy.get(el.fieldError).should('be.visible').and('contain.text', message);
  }

  employeeNameEmpty() {
    cy.get(el.employeeNameInput).should('have.value', '');
  }

  // Assertion hasil intercept
  statusCodeOk(interception) {
    expect(interception.response.statusCode).to.equal(200);
  }

  requestUrlContains(interception, param) {
    expect(interception.request.url).to.include(param);
  }

  responseTotalIsZero(interception) {
    expect(interception.response.body.meta.total).to.equal(0);
  }
}

export default new DirectoryAssertions();