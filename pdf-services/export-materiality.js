function generateMaterialityPdf(data) {
  var doc = new jsPDF({
    orientation: "p",
    unit: "pt",
  });
  doc.setFont("helvetica");
  doc.setFontSize(12);

  // add pdf header
  doc.setFontSize(16);
  doc.setFontStyle("bold");
  doc.text(255, 45, "Materiality");
  doc.setFontSize(10);
  doc.text(20, 65, "Purpose:");
  doc.setFontStyle("normal");
  doc.text(
    70,
    65,
    "To calculate materiality to be applied to VA financial statements to determine material line items for the A-123,"
  );
  doc.text(20, 80, "Appendix A Risk Assessment.");

  // add content
  let cols = [
    {
      title: "Materiality Calculations",
      dataKey: "fullColl",
    },
  ];
  let table = [
    {
      fullColl:
        "Selected Materiality Base: Statement of Net Costs - Total Program Costs (Gross Cost)",
    },
  ];
  let createdCell = function (data) {
    if (data.section == "head" && data.column.dataKey == "fullColl") {
      data.cell.styles.lineWidth = 1;
      data.cell.styles.lineColor = [0, 0, 0];
      data.cell.styles.halign = "left";
      data.cell.styles.fillColor = [132, 151, 176];
      data.cell.styles.fontSize = 12;
      data.cell.styles.cellPadding = 5;
    }
    if (data.section == "body" && data.column.dataKey == "fullColl") {
      data.cell.styles.lineWidth = 1;
      data.cell.styles.lineColor = [0, 0, 0];
      data.cell.styles.halign = "left";
      data.cell.styles.fillColor = [255, 255, 255];
      data.cell.styles.fontSize = 10;
      data.cell.styles.cellPadding = 5;
    }
  };
  let style = getMaterialityPdfStyles(95);
  style.didParseCell = createdCell;
  doc.autoTable(cols, table, style);

  cols = [
    {
      title: "",
      dataKey: "col1",
    },
    {
      title: "",
      dataKey: "col2",
    },
  ];
  table = [
    {
      col1: "Reporting Materiality",
      col2: "Calculation",
    },
    {
      col1: "$XXXXX",
      col2: "Total Program Costs (Gross Cost) - Net Adjustments",
    },
    {
      col1: "Planning Materiality",
    },
    {
      col1: "$XXXXX",
      col2: "Materiality Base * 3%",
    },
    {
      col1: "Performance Materiality",
    },
    {
      col1: "$XXXXX",
      col2: "Planning Materiality * 33%",
    },
    {
      col1: "Tolerable Misstatement",
    },
    {
      col1: "$XXXXX",
      col2: "Performance Materialtiy * Management Materiality Percentage",
    },
    {
      col1: "Comments",
    },
    {
      col1:
        "Materiality Base was calculated as Total Program Costs (Gross Cost) from the Statement of Net Costs less net adjustments. Net adjustments are comprised of intergovernmental costs, Actuarial costs (estimates), and earned revenue.",
    },
  ];
  createdCell = function (data) {
    // if (data.section == "head") {
    //   data.cell.styles.lineWidth = 1;
    //   data.cell.styles.lineColor = [0, 0, 0];
    //   data.cell.styles.halign =
    //     data.column.dataKey == "col2" ? "center" : "left";
    //   data.cell.styles.fillColor = [180, 198, 231];
    //   data.cell.styles.fontSize = 10;
    //   data.cell.styles.cellPadding = 5;
    // }
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
      data.cell.styles.fillColor = [180, 198, 231];
    }
    if (
      data.section == "body" &&
      data.row.index !== 0 &&
      data.row.index % 2 == 0
    ) {
      data.cell.colSpan = 2;
    }
    if (data.section == "body" && data.row.index == 9) {
      data.cell.colSpan = 2;
    }
  };
  style = getMaterialityPdfStyles(doc.previousAutoTable.finalY - 5);
  style.didParseCell = createdCell;
  doc.autoTable(cols, table, style);
  // save file
  doc.save("Materiality.pdf");
}

function getMaterialityPdfStyles(startY) {
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
function getMaterialityListData() {
  var siteUrl = _spPageContextInfo
    ? _spPageContextInfo.webAbsoluteUrl
    : "https://dvagov.sharepoint.com/sites/VACOOMOBO/FROS/a123";
  // return $.ajax({
  //   beforeSend: function (xhrObj) {
  //     xhrObj.setRequestHeader("Content-Type", "application/json");
  //     xhrObj.setRequestHeader("Accept", "application/json");
  //   },
  //   type: "GET",
  //   url: siteUrl + "/SiteAssets/app/data.txt",
  //   dataType: "json",
  // }).then(function (res) {
  //   return res.value;
  // });
  return $.ajax({
    beforeSend: function (xhrObj) {
      xhrObj.setRequestHeader("Content-Type", "application/json");
      xhrObj.setRequestHeader("Accept", "application/json");
    },
    type: "GET",
    url:
      siteUrl +
      "/_api/web/lists/getbytitle('Materiality List')/items?$orderby=FY",
    dataType: "json",
  }).then(function (res) {
    return res.value;
  });
}
