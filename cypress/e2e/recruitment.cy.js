import recruitmentActions from '../support/actions/recruitmentActions';
import recruitmentAssertions from '../support/assertions/recruitmentAssertions';
import recruitmentIntercept from '../support/intercepts/recruitmentIntercept';
import recruitmentData from '../data/recruitmentData.json';

describe('Menu Recruitment - OrangeHRM', () => {
  beforeEach(() => {
    cy.login();
    recruitmentIntercept.watchCandidates();
    recruitmentIntercept.watchVacancies();
    recruitmentIntercept.watchAddCandidate();
    recruitmentIntercept.watchDeleteCandidate();
  });

  it('TC_REC_001 - Membuka menu Recruitment dari sidebar', () => {
    cy.visit('/web/index.php/dashboard/index');
    
    // Pasang ulang intercept tepat sebelum klik sidebar agar ter-catch dengan sempurna
    recruitmentIntercept.watchCandidates();
    recruitmentActions.openFromSidebar();

    recruitmentIntercept.waitCandidates().then(recruitmentAssertions.statusCodeOk);
    recruitmentAssertions.candidatesPageDisplayed();
  });

  it('TC_REC_002 - Berpindah ke tab Vacancies', () => {
    recruitmentActions.visitCandidates();
    recruitmentIntercept.waitCandidates();

    recruitmentActions.openTab('Vacancies');

    recruitmentIntercept.waitVacancies().then(recruitmentAssertions.statusCodeOk);
    recruitmentAssertions.vacanciesPageDisplayed();
  });

  it('TC_REC_003 - Tombol Add menampilkan form Add Candidate', () => {
    recruitmentActions.visitCandidates();
    recruitmentIntercept.waitCandidates();

    recruitmentActions.clickAdd();

    recruitmentAssertions.addCandidateFormDisplayed();
  });

  it('TC_REC_004 - Gagal menyimpan kandidat saat field wajib kosong', () => {
    recruitmentActions.visitAddCandidate();
    recruitmentAssertions.addCandidateFormDisplayed();

    recruitmentActions.clickSave();

    // First Name, Last Name, Email
    recruitmentAssertions.requiredMessageShown(3, recruitmentData.messages.required);
  });

  it('TC_REC_005 - Gagal menyimpan kandidat dengan format email salah', () => {
    const candidate = recruitmentActions.generateCandidate(recruitmentData.candidate);
    recruitmentActions.visitAddCandidate();

    recruitmentActions.fillCandidateForm({
      ...candidate,
      email: recruitmentData.invalidEmail,
    });
    recruitmentActions.clickSave();

    recruitmentAssertions.invalidEmailMessageShown(recruitmentData.messages.invalidEmail);
  });

  it('TC_REC_006 - Berhasil menambahkan kandidat baru', () => {
    const candidate = recruitmentActions.generateCandidate(recruitmentData.candidate);
    recruitmentActions.visitAddCandidate();

    recruitmentActions.fillCandidateForm(candidate);
    recruitmentActions.clickSave();

    recruitmentIntercept.waitAddCandidate().then((i) => {
      recruitmentAssertions.addCandidateResponseMatches(i, candidate.firstName, candidate.lastName);
    });
    recruitmentAssertions.candidateSavedSuccessfully(recruitmentData.messages.saved);
  });

  it('TC_REC_007 - Pencarian dengan keyword yang tidak ada menampilkan No Records Found', () => {
    recruitmentActions.visitCandidates();
    recruitmentIntercept.waitCandidates();

    recruitmentActions.searchByKeyword(recruitmentData.nonExistentKeyword);

    recruitmentIntercept.waitCandidates().then(recruitmentAssertions.statusCodeOk);
    recruitmentAssertions.noRecordsFound(recruitmentData.messages.noRecords);
  });

  it('TC_REC_008 - Berhasil menghapus kandidat yang baru dibuat', () => {
    const candidate = recruitmentActions.generateCandidate(recruitmentData.candidate);
    const fullName = `${candidate.firstName} ${candidate.lastName}`;

    // Siapkan data dulu
    recruitmentActions.visitAddCandidate();
    recruitmentActions.fillCandidateForm(candidate);
    recruitmentActions.clickSave();
    recruitmentIntercept.waitAddCandidate().then(recruitmentAssertions.statusCodeOk);

    // Cari lalu hapus
    recruitmentActions.visitCandidates();
    recruitmentIntercept.waitCandidates();
    recruitmentAssertions.candidateInList(fullName);

    recruitmentActions.deleteCandidate(fullName);

    recruitmentIntercept.waitDeleteCandidate().then(recruitmentAssertions.statusCodeOk);
    recruitmentAssertions.candidateNotInList(fullName);
  });
});