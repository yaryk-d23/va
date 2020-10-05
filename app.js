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
});


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
            getMaterialityAppListData(fy).then( materialityRes => {

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
              Promise.all(arrayBufferReq).then(buffRes => {
                buffRes.forEach(i => {
                  arrayBuffer.push(i);
                });

<<<<<<< HEAD
                mergedPdf = await mergePDF(arrayBuffer);
                var pdfUrl = URL.createObjectURL(
                  new Blob([mergedPdf], { type: 'application/pdf' }),
                );
=======
                mergePDF(arrayBuffer).then(mergedPdf => {
                  download(mergedPdf, "Risk Assessment Package.pdf", "application/pdf");
                 });
>>>>>>> 799717c963ba2a2661812486dc0414ce2c0620a5
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
  pdfsToMerges.forEach(pdfBuffer => {
<<<<<<< HEAD
    req.push(copyPage(pdfBuffer));
  });
  await Promise.all(req).then(res => {
    res.forEach((page) => {
      // console.log('page', page.getWidth(), page.getHeight());
      //page.setWidth(210);
      mergedPdf.addPage(page);
=======
    req.push(copyPage(mergedPdf, pdfBuffer));
  });
  await Promise.all(req).then(res => {
    res.forEach((pages) => {
      pages.forEach((page) => {
        // console.log('page', page.getWidth(), page.getHeight());
        page.setWidth(page.getWidth());
        mergedPdf.addPage(page);
      });
>>>>>>> 799717c963ba2a2661812486dc0414ce2c0620a5
    });
  });
  mergedPdfFile = await mergedPdf.save();
  return mergedPdfFile;
}

<<<<<<< HEAD
async function copyPage(pdfBuffer) {
=======
async function copyPage(mergedPdf, pdfBuffer) {
>>>>>>> 799717c963ba2a2661812486dc0414ce2c0620a5
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
