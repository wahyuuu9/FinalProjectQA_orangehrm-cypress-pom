import directoryActions from '../support/actions/directoryActions';
import directoryAssertions from '../support/assertions/directoryAssertions';
import directoryIntercept from '../support/intercepts/directoryIntercept';
import directoryData from '../data/directoryData.json';

describe('Menu Directory - OrangeHRM', () => {
  beforeEach(() => {
    cy.login();
    directoryIntercept.watchDirectory();
    directoryIntercept.watchAutocomplete();
  });

  it('TC_DIR_001 - Membuka menu Directory dari sidebar', () => {
    cy.visit('/web/index.php/dashboard/index');
    
    // Memastikan watchDirectory aktif kembali sebelum klik sidebar
    directoryIntercept.watchDirectory();
    directoryActions.openFromSidebar();

    directoryIntercept.waitDirectory().then(directoryAssertions.statusCodeOk);
    directoryAssertions.directoryPageDisplayed();
  });

  it('TC_DIR_002 - Form filter (Employee Name, Job Title, Location) tampil lengkap', () => {
    directoryActions.visit();
    directoryIntercept.waitDirectory();

    directoryAssertions.directoryPageDisplayed();
    directoryAssertions.filterFormDisplayed();
  });

  it('TC_DIR_003 - Filter berdasarkan Job Title', () => {
    directoryActions.visit();
    directoryIntercept.waitDirectory();

    directoryActions.selectDropdown('Job Title', directoryData.jobTitle);
    directoryActions.clickSearch();

    directoryIntercept.waitDirectory().then((i) => {
      directoryAssertions.statusCodeOk(i);
      directoryAssertions.requestUrlContains(i, 'jobTitleId');
    });
    directoryAssertions.dropdownValue('Job Title', directoryData.jobTitle);
  });

  it('TC_DIR_004 - Filter berdasarkan Location', () => {
    directoryActions.visit();
    directoryIntercept.waitDirectory();

    directoryActions.selectDropdown('Location', directoryData.location);
    directoryActions.clickSearch();

    directoryIntercept.waitDirectory().then((i) => {
      directoryAssertions.statusCodeOk(i);
      directoryAssertions.requestUrlContains(i, 'locationId');
    });
    directoryAssertions.dropdownValue('Location', directoryData.location);
  });

  it('TC_DIR_005 - Menampilkan "No Records Found" saat API mengembalikan data kosong (stub)', () => {
    directoryIntercept.stubEmptyDirectory();
    directoryActions.visit();

    directoryIntercept.waitEmptyDirectory().then(directoryAssertions.responseTotalIsZero);
    directoryAssertions.noRecordsFound(directoryData.messages.noRecords);
  });

  it('TC_DIR_006 - Autocomplete Employee Name menampilkan saran', () => {
    directoryActions.visit();
    directoryIntercept.waitDirectory();

    directoryActions.typeEmployeeName(directoryData.autocompleteKeyword);

    directoryIntercept.waitAutocomplete().then(directoryAssertions.statusCodeOk);
    directoryAssertions.autocompleteShown();
  });

  it('TC_DIR_007 - Nama karyawan yang tidak valid menampilkan pesan Invalid', () => {
    directoryActions.visit();
    directoryIntercept.waitDirectory();

    directoryActions.typeEmployeeName(directoryData.invalidEmployeeName);
    directoryActions.clickSearch();

    directoryAssertions.invalidFieldMessage(directoryData.messages.invalid);
  });

  it('TC_DIR_008 - Tombol Reset mengembalikan filter ke kondisi awal', () => {
    directoryActions.visit();
    directoryIntercept.waitDirectory();

    directoryActions.selectDropdown('Job Title', directoryData.jobTitle);
    directoryActions.selectDropdown('Location', directoryData.location);
    directoryActions.clickReset();

    directoryAssertions.dropdownValue('Job Title', directoryData.defaultDropdown);
    directoryAssertions.dropdownValue('Location', directoryData.defaultDropdown);
    directoryAssertions.employeeNameEmpty();
  });
});