function generateRiskFactorPdf(data) {
  var doc = new jsPDF({
    orientation: "p",
    unit: "pt",
  });
  doc.setFont("helvetica");
  doc.setFontSize(12);

  // add pdf header
  doc.setFontSize(16);
  doc.setFontStyle("bold");
  doc.text(235, 45, "Risk Factor Criteria");
  doc.setFontSize(10);
  doc.text(40, 65, "Purpose:");
  doc.setFontStyle("normal");
  let text = doc.text(
    40,
    65,
    "                 To define the qualitative and quantitative risk factors evaluated in the assessment of risk for each significant business process and identify the relative weighting for each risk factor.",
    {
      maxWidth: 530,
    }
  );
  // add content
  let cols = [
    {
      title: "",
      dataKey: "fullColl",
    },
  ];
  let table = [];
  data.forEach(function (item) {
    table.push({
      fullColl: item.Title,
    });
    table.push({
      fullColl: item.Risk_x0020_Factor_x0020_Descript,
    });
  });
  createdCell = function (data) {
    if (data.section == "body") {
      data.cell.styles.lineWidth = 1;
      data.cell.styles.lineColor = [0, 0, 0];
      data.cell.styles.halign =
        data.column.dataKey == "col2" ? "center" : "left";
      data.cell.styles.fillColor = [255, 255, 255];
      data.cell.styles.fontSize = 10;
      data.cell.styles.cellPadding = 5;
    }
    if (data.section == "body" && data.row.index % 2 == 0) {
      data.cell.styles.fillColor = [132, 151, 176];
    }
  };
  style = getMaterialityPdfStyles(80);
  style.didParseCell = createdCell;
  doc.autoTable(cols, table, style);

  // save file
  // doc.save("Risk Factor Criteria.pdf");
  return doc;
}
function getRiskFactorPdfStyles(startY) {
  return {
    startY: startY + 5,
    columnStyles: {
      col1: {
        fontSize: 10,
        halign: "left",
        fontStyle: "normal",
        minCellWidth: 200,
      },
      col2: {
        fontSize: 10,
        halign: "left",
        fontStyle: "normal",
      },
      fullColl: {
        halign: "left",
        fontStyle: "normal",
        fontSize: 12,
      },
    },
    margin: {
      top: 20,
      left: 40,
      right: 40,
      bottom: 20,
    },
    styles: {
      font: "helvetica",
      overflow: "linebreak",
      fillColor: false,
      textColor: [25, 25, 25],
      fontSize: 10,
      fontStyle: "normal",
      valign: "middle",
      halign: "center",
    },
    headStyles: {
      fontSize: 12,
      fillColor: [132, 151, 176],
      textColor: [0],
      lineWidth: 1,
      lineColor: [0],
      halign: "center",
      overflow: "linebreak",
      minCellWidth: 54,
    },
    bodyStyles: {
      owerflow: "linebreak",
    },
    pageBreak: "auto",
  };
}
function getRiskFactorListData() {
  return $.ajax({
    beforeSend: function (xhrObj) {
      xhrObj.setRequestHeader("Content-Type", "application/json");
      xhrObj.setRequestHeader("Accept", "application/json");
    },
    type: "GET",
    url:
      window.SITE_LOCATION_URL +
      "/_api/web/lists/getbytitle('Risk Factor Criteria')/items?$top=50000&$filter=Display eq 1",
    dataType: "json",
  }).then(function (res) {
    return res.value;
  });
}
