import directoryData from '../../data/directoryData.json';

class DirectoryIntercept {
  // Spy: pantau request API daftar karyawan utama
  watchDirectory() {
    cy.intercept('GET', '**/api/v2/directory/employees*').as('getDirectory');
  }

  // Spy: pantau request API autocomplete nama karyawan
  watchAutocomplete() {
    cy.intercept('GET', '**/api/v2/directory/employees*nameOrId=*').as('getAutocomplete');
  }

  // Stub: simulasi respons data kosong dari API
  stubEmptyDirectory() {
    cy.intercept('GET', '**/api/v2/directory/employees*', {
      statusCode: 200,
      body: directoryData.emptyResponse,
    }).as('getEmptyDirectory');
  }

  waitDirectory() {
    return cy.wait('@getDirectory');
  }

  waitAutocomplete() {
    return cy.wait('@getAutocomplete');
  }

  waitEmptyDirectory() {
    return cy.wait('@getEmptyDirectory');
  }
}

export default new DirectoryIntercept();