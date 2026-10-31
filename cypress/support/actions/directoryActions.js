class DirectoryActions {
  elements = {
    pageTitle: '.oxd-topbar-header-breadcrumb-module',
    employeeNameInput: 'input[placeholder="Type for hints..."]',
    autocompleteOption: '.oxd-autocomplete-option',
    fieldError: '.oxd-input-field-error-message',
    card: '.orangehrm-directory-card',
    selectText: '.oxd-select-text',
    selectTextInput: '.oxd-select-text-input',
  };

  visit() {
    cy.visit('/web/index.php/directory/viewDirectory');
  }

  openFromSidebar() {
    cy.contains('.oxd-main-menu-item', 'Directory').click();
  }

  typeEmployeeName(name) {
    cy.get(this.elements.employeeNameInput).clear().type(name);
  }

  selectDropdown(label, option) {
    cy.contains('.oxd-input-group', label).find('.oxd-select-text').click();
    cy.contains('.oxd-select-option', option).click();
  }

  clickSearch() {
    cy.contains('button', 'Search').click();
  }

  clickReset() {
    cy.contains('button', 'Reset').click();
  }
}

export default new DirectoryActions();