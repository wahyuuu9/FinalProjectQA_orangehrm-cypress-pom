import recruitmentData from '../../data/recruitmentData.json';

class RecruitmentIntercept {
  watchCandidates() {
    cy.intercept('GET', '**/api/v2/recruitment/candidates*').as('getCandidates');
  }

  watchVacancies() {
    cy.intercept('GET', '**/api/v2/recruitment/vacancies*').as('getVacancies');
  }

  watchAddCandidate() {
    cy.intercept('POST', '**/api/v2/recruitment/candidates*').as('addCandidate');
  }

  watchDeleteCandidate() {
    cy.intercept('DELETE', '**/api/v2/recruitment/candidates*').as('deleteCandidate');
  }

  waitCandidates() {
    return cy.wait('@getCandidates');
  }

  waitVacancies() {
    return cy.wait('@getVacancies');
  }

  waitAddCandidate() {
    return cy.wait('@addCandidate');
  }

  waitDeleteCandidate() {
    return cy.wait('@deleteCandidate');
  }
}

export default new RecruitmentIntercept();