class RecruitmentActions {
  elements = {
    pageTitle: '.oxd-topbar-header-breadcrumb-module',
    firstName: 'input[name="firstName"]',
    middleName: 'input[name="middleName"]',
    lastName: 'input[name="lastName"]',
    fieldError: '.oxd-input-field-error-message',
    tableRow: '.oxd-table-card',
    toast: '.oxd-toast',
  };

  visitCandidates() {
    cy.visit('/web/index.php/recruitment/viewCandidates');
  }

  visitAddCandidate() {
    cy.visit('/web/index.php/recruitment/addCandidate');
  }

  openFromSidebar() {
    cy.contains('.oxd-main-menu-item', 'Recruitment').click();
  }

  openTab(tabName) {
    cy.contains('.oxd-topbar-body-nav-tab', tabName).click();
  }

  clickAdd() {
    cy.contains('button', 'Add').click();
  }

  // Membuat nama belakang unik supaya mudah dicari dan tidak bentrok
  generateCandidate(base) {
    return {
      ...base,
      lastName: `${base.lastNamePrefix}${Date.now().toString().slice(-6)}`,
    };
  }

  fillCandidateForm({ firstName, lastName, email, contact }) {
    if (firstName) cy.get(this.elements.firstName).clear().type(firstName);
    if (lastName) cy.get(this.elements.lastName).clear().type(lastName);
    if (email) {
      cy.contains('.oxd-input-group', 'Email').find('input').clear().type(email);
    }
    if (contact) {
      cy.contains('.oxd-input-group', 'Contact Number').find('input').clear().type(contact);
    }
  }

  clickSave() {
    cy.get('button[type="submit"]').click();
  }

  searchByKeyword(keyword) {
    // Mencari input berdasarkan container label Keywords agar tidak bergantung pada placeholder persis
    cy.contains('.oxd-input-group', 'Keywords')
      .find('input')
      .clear()
      .type(keyword);

    cy.contains('button', 'Search').click();
  }

  deleteCandidate(fullName) {
    cy.contains(this.elements.tableRow, fullName)
      .find('button .bi-trash')
      .click();
    cy.contains('button', 'Yes, Delete').click();
  }
}

export default new RecruitmentActions();