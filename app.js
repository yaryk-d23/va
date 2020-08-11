$(document).ready(function () {
  $("#export-risks").on("click", exportRisks);
});

function exportRisks() {
  getRisksListData().then(function (res) {
    generateRisksPdf(res);
  });
}
