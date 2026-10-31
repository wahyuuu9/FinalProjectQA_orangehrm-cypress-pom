import recruitmentActions from '../actions/recruitmentActions';

const el = recruitmentActions.elements;

class RecruitmentAssertions {
  candidatesPageDisplayed() {
    cy.url().should('include', '/recruitment/viewCandidates');
    cy.get(el.pageTitle).should('contain.text', 'Recruitment');
    cy.contains('h5', 'Candidates').should('be.visible');
  }

  vacanciesPageDisplayed() {
    cy.url().should('include', '/recruitment/viewJobVacancy');
    cy.contains('h5', 'Vacancies').should('be.visible');
  }

  addCandidateFormDisplayed() {
    cy.url().should('include', '/recruitment/addCandidate');
    cy.contains('h6', 'Add Candidate').should('be.visible');
    cy.get(el.firstName).should('be.visible');
    cy.get(el.lastName).should('be.visible');
  }

  requiredMessageShown(total, message) {
    cy.get(el.fieldError)
      .should('have.length', total)
      .each(($err) => expect($err.text()).to.equal(message));
  }

  invalidEmailMessageShown(message) {
    cy.get(el.fieldError).should('be.visible').and('contain.text', message);
  }

  candidateSavedSuccessfully(message) {
    cy.get(el.toast).should('contain.text', message);
    cy.url().should('match', /\/recruitment\/addCandidate\/\d+/);
  }

  noRecordsFound(message) {
    cy.contains(message).should('be.visible');
  }

  candidateInList(fullName) {
    cy.contains(el.tableRow, fullName).should('be.visible');
  }

  candidateNotInList(fullName) {
    cy.contains(el.tableRow, fullName).should('not.exist');
  }

  // Assertion hasil intercept
  statusCodeOk(interception) {
    expect(interception.response.statusCode).to.equal(200);
  }

  addCandidateResponseMatches(interception, firstName, lastName) {
    expect(interception.response.statusCode).to.equal(200);
    expect(interception.response.body.data.firstName).to.equal(firstName);
    expect(interception.response.body.data.lastName).to.equal(lastName);
  }
}

export default new RecruitmentAssertions();