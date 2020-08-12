$(document).ready(function () {
  $("#export-risks").on("click", exportRisks);
  $("#export-materiality").on("click", exportMateriality);
  $("#export-risk-factor").on("click", exportRiskFactor);
  $("#export-findings-summary").on("click", exportFindingsSummary);
});

function exportRisks() {
  getRisksListData().then(function (res) {
    generateRisksPdf(res);
  });
}

function exportMateriality() {
  getMaterialityListData().then(function (res) {
    res.forEach(function (item) {
      var o = new Option(item.FY, item.FY);
      $(o).html(item.FY);
      $("#materiality-fy").append(o);
    });
    $("#dialog").dialog({
      buttons: [
        {
          text: "OK",
          click: function () {
            $(this).dialog("close");
            let fy = $("#materiality-fy").val();
            let item = res.filter(function (i) {
              return i.FY == fy;
            })[0];
            generateMaterialityPdf(item);
          },
        },
      ],
    });
  });
}

function exportRiskFactor() {
  getRiskFactorListData().then(function (res) {
    generateRiskFactorPdf(res);
  });
}

function exportFindingsSummary() {
  getFindingsSummaryListData().then(function (res) {
    generateFindingsSummaryPdf(groupBy(res, "Title"));
  });
}

function groupBy(xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

function chunkArray(array, chunk) {
  var i,
    j,
    temparray,
    newArray = [];
  for (i = 0, j = array.length; i < j; i += chunk) {
    temparray = array.slice(i, i + chunk);
    newArray.push(temparray);
  }
  return newArray;
}

// Materiality Base - Title
// Materiality % - Materiality_x0020_Percentage
// Planning Materiality - Planning_x0020_Materiality
// Performance Materiality % - Performance_x0020_Materiality
// Performance Materiality - Performance_x0020_Materiality0
// Management Materiality - Management_x0020_Materiality
// Tolerable Misstatement - Tolerable_x0020_Misstatement
// FY - FY

// Risk Factor Name - Title
// Risk Factor Description - Risk_x0020_Factor_x0020_Descript
// Display - Display
