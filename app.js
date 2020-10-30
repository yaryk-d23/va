$(document).ready(function () {
  //fixLayOut();
  window.parent.addEventListener('resize', fixLayOut);
  let resizeEvent = new Event('resize');
  window.parent.dispatchEvent(resizeEvent);
  $("#export-risks").on("click", exportRisks);
  $("#export-materiality").on("click", exportMateriality);
  $("#export-risk-factor").on("click", exportRiskFactor);
  $("#export-findings-summary").on("click", exportFindingsSummary);
  $("#export-findings-analysis").on("click", exportFindingsAnalysis);
  $("#export-key-systems").on("click", exportKeySystems);
  $("#export-all").on("click", exportAll);
  $("#export-summary-risk-assessment").on("click", exportSummaryRiskAssessment);
  $("#export-bpa-risk-assessment").on("click", exportBPARiskAssessment);
});

function exportBPARiskAssessment() {
  Promise.all([
    getBpaProcessAreasListData(),
    getBpaRiskAssessmentListData(),
    getBpaFindingsListData(),
    getBpaFinancialListData()
  ]).then(function (res) {
    var doc = generateBPARiskAssessmentPdf(res[0], res[1], res[2], res[3]);
    doc.save("BPA Risk Assessment.pdf");
  })
}

function exportSummaryRiskAssessment() {
  Promise.all([
    getSummaryProcessAreasListData(),
    getSummaryRiskAssessmentListData(),
    getInternalControlsRiskAssessmentListData()
  ]).then(function (res) {
    let groupedData = groupBy(res[1], 'Business_Process_AreaId');
    let groupedInternalControls = groupBy(res[2], 'Business_Process_AreaId');
    var doc = generateSummaryRiskAssessmentPdf(res[0], groupedData, groupedInternalControls);
    doc.save("Summary Risk Assessment.pdf");
  });
}

function exportAll() {
  var reqs = [
    getRiskFactorListData(),
    getFindingsSummaryListData(),
    getFindingsAnalysisListData(),
    getMaterialityListData(),
    getKeySystemsListData(),
    getRisksListData(),
  ];
  Promise.all(reqs).then(function (res) {
    $("#materiality-fy").html('');
    res[3].forEach(function (item) {
      var o = new Option(item.FY, item.FY);
      $(o).html(item.FY);
      $("#materiality-fy").append(o);
    });
    $("#dialog").dialog({
      position: {
        my: "center top",
        at: "center top",
        of: "body"
      },
      buttons: [
        {
          text: "OK",
          click: function () {
            $(this).dialog("close");
            let fy = $("#materiality-fy").val();
            let item = res[3].filter(function (i) {
              return i.FY == fy;
            })[0];
            getMaterialityAppListData(fy).then(function (materialityRes) {

              //......//
              var arrayBuffer = [];
              var arrayBufferReq = [];
              var doc = generateRiskFactorPdf(res[0]);
              arrayBufferReq.push(doc.output("arraybuffer"));
              doc = generateFindingsSummaryPdf(groupBy(res[1], "Business_x0020_Process_x0020_AreId"));
              arrayBufferReq.push(doc.output("arraybuffer"));
              doc = generateFindingsAnalysisPdf(res[2]);
              arrayBufferReq.push(doc.output("arraybuffer"));
              doc = generateMaterialityPdf(item, materialityRes);
              arrayBufferReq.push(doc.output("arraybuffer"));
              doc = generateKeySystemsPdf(res[4]);
              arrayBufferReq.push(doc.output("arraybuffer"));
              doc = generateRisksPdf(res[5]);
              arrayBufferReq.push(doc.output("arraybuffer"));
              Promise.all(arrayBufferReq).then(function (buffRes) {
                buffRes.forEach(function (i) {
                  arrayBuffer.push(i);
                });
                mergePDF(arrayBuffer).then(function (mergedPdf) {
                  download(mergedPdf, "Risk Assessment Package.pdf", "application/pdf");
                });
              });
            });
          },
        },
      ],
    });
  });
}

async function mergePDF(pdfsToMerges) {
  var mergedPdf = await PDFLib.PDFDocument.create();
  var req = [];
  pdfsToMerges.forEach(function (pdfBuffer) {
    req.push(copyPage(mergedPdf, pdfBuffer));
  });
  await Promise.all(req).then(function (res) {
    res.forEach(function (pages) {
      pages.forEach(function (page) {
        // console.log('page', page.getWidth(), page.getHeight());
        page.setWidth(page.getWidth());
        mergedPdf.addPage(page);
      });
    });
  });
  mergedPdfFile = await mergedPdf.save();
  return mergedPdfFile;
}

async function copyPage(mergedPdf, pdfBuffer) {
  var pdf = await PDFLib.PDFDocument.load(pdfBuffer);
  var copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
  return copiedPages;

}

function fixLayOut() {
  $(window.parent.document).find('.b_a_ck').css({
    'height': $('html').height() + 'px',
    'padding-bottom': '0'
  });
}

function exportRisks() {
  getRisksListData().then(function (res) {
    var doc = generateRisksPdf(res);
    doc.save("Risks Assesments.pdf");

  });
}

function exportMateriality() {
  getMaterialityListData().then(function (res) {
    $("#materiality-fy").html('');
    res.forEach(function (item) {
      var o = new Option(item.FY, item.FY);
      $(o).html(item.FY);
      $("#materiality-fy").append(o);
    });
    $("#dialog").dialog({
      position: {
        my: "center top",
        at: "center top",
        of: "body"
      },
      buttons: [
        {
          text: "OK",
          click: function () {
            $(this).dialog("close");
            let fy = $("#materiality-fy").val();
            let item = res.filter(function (i) {
              return i.FY == fy;
            })[0];
            getMaterialityAppListData(fy).then(function (res) {
              var doc = generateMaterialityPdf(item, res);
              doc.save("Materiality.pdf");
            });
          },
        },
      ],
    });
  });
}

function exportRiskFactor() {
  getRiskFactorListData().then(function (res) {
    var doc = generateRiskFactorPdf(res);
    doc.save("Risk Factor Criteria.pdf");
  });
}

function exportFindingsSummary() {
  getFindingsSummaryListData().then(function (res) {
    var doc = generateFindingsSummaryPdf(groupBy(res, "Business_x0020_Process_x0020_AreId"));
    doc.save("Findings Summary.pdf");
  });
}

function exportFindingsAnalysis() {
  getFindingsAnalysisListData().then(function (res) {
    var doc = generateFindingsAnalysisPdf(res);
    doc.save("Findings Analysis.pdf");
  });
}

function exportKeySystems() {
  getKeySystemsListData().then(function (res) {
    var doc = generateKeySystemsPdf(res);
    doc.save("Key Systems.pdf");
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
