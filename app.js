$(document).ready(function () {
  $("#export-risks").on("click", exportRisks);
  $("#export-materiality").on("click", exportMateriality);
});

function exportRisks() {
  getRisksListData().then(function (res) {
    generateRisksPdf(res);
  });
}

function exportMateriality() {
  getMaterialityListData().then(function (res) {
    generateMaterialityPdf(res);
  });
}

// Materiality Base - Title
// Materiality % - Materiality_x0020_Percentage
// Planning Materiality - Planning_x0020_Materiality
// Performance Materiality % - Performance_x0020_Materiality
// Performance Materiality - Performance_x0020_Materiality0
// Management Materiality - Management_x0020_Materiality
// Tolerable Misstatement - Tolerable_x0020_Misstatement
// FY - FY
