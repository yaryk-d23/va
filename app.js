$(document).ready(function () {
  $("#export-risks").on("click", exportRisks);
});

function exportRisks() {
  getRisksListData().then((res) => {
    generateRisksPdf(res);
  });
}
