function generateMaterialityPdf(materialityData, materialityApplicationData) {
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
      title: "",
      dataKey: "col1",
    },
    {
      title: "",
      dataKey: "col2",
    },
  ];
  let table = [
    {
      col1: "Materiality Base",
      col2: "Calculation",
    },
    {
      col1: "$" + parceToCurrency(materialityData.Title),
      col2: "Total Program Costs (Gross Cost) - Net Adjustments",
    },
    {
      col1: "Planning Materiality",
    },
    {
      col1: materialityData.Planning_x0020_Materiality,
      col2: materialityData.Materiality_x0020_Percentage,
    },
    {
      col1: "Performance Materiality",
    },
    {
      col1: materialityData.Performance_x0020_Materiality0,
      col2: materialityData.Performance_x0020_Materiality,
    },
    {
      col1: "Tolerable Misstatement",
    },
    {
      col1: materialityData.Tolerable_x0020_Misstatement,
      col2: materialityData.Management_x0020_Materiality,
    },
    {
      col1: "Comments",
    },
    {
      col1:
        "Materiality Base was calculated as Total Program Costs (Gross Cost) from the Statement of Net Costs less net adjustments. Net adjustments are comprised of intergovernmental costs, Actuarial costs (estimates), and earned revenue.",
    },
  ];
  let createdCell = function (data) {
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
  let style = getMaterialityPdfStyles(100);
  style.didParseCell = createdCell;
  doc.autoTable(cols, table, style);

  // add table below
  doc.setFontSize(12);
  doc.setFontStyle("bold");
  doc.text(40, doc.previousAutoTable.finalY + 35, "Materiality Application");

  cols = [
    {
      title: "Financial Statement Line Item",
      dataKey: "column1",
    },
    {
      title: "CY Dollar Amount",
      dataKey: "column2",
    },
    {
      title: "Threshold",
      dataKey: "column3",
    },
    {
      title: "Material",
      dataKey: "column4",
    },
    {
      title: "Comments",
      dataKey: "column5",
    },
  ];
  table = [];
  materialityApplicationData.forEach(function (item) {
    table.push({
      column1: item.Title,
      column2: item.Current_FY_Dollar_Value ? ("$" + item.Current_FY_Dollar_Value) : '',
      column3: materialityData.Planning_x0020_Materiality,
      column4: item.Materiality,
      column5: item.Comments,
    });
  });
  createdCell = function (data) {
    if (data.section == "head") {
      data.cell.styles.lineWidth = 1;
      data.cell.styles.lineColor = [0, 0, 0];
      data.cell.styles.halign = "center";
      data.cell.styles.fillColor = [132, 151, 176];
      data.cell.styles.fontSize = 10;
      data.cell.styles.cellPadding = 5;
    }
    if (data.section == "body") {
      data.cell.styles.lineWidth = 1;
      data.cell.styles.lineColor = [0, 0, 0];
      data.cell.styles.halign = "left";
      data.cell.styles.fillColor = [255, 255, 255];
      data.cell.styles.fontSize = 10;
      data.cell.styles.cellPadding = 5;
    }
  };
  style = getMaterialityPdfStyles(doc.previousAutoTable.finalY + 45);
  style.didParseCell = createdCell;
  doc.autoTable(cols, table, style);
  // save file
  //doc.save("Materiality.pdf");
  return doc;
}

function parceToCurrency(n) {
  let val = (1 * n).toFixed(2);
  let parts = val.toString().split(".");
  let num = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
  return num;
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
      column1: {
        fontSize: 10,
        halign: "left",
        fontStyle: "normal",
        cellWidth: 130,
      },
      column2: {
        fontSize: 10,
        halign: "left",
        fontStyle: "normal",
        cellWidth: 105,
      },
      column3: {
        fontSize: 10,
        halign: "left",
        fontStyle: "normal",
        cellWidth: 100,
      },
      column4: {
        fontSize: 10,
        halign: "left",
        fontStyle: "normal",
        cellWidth: 60,
      },
      column5: {
        fontSize: 10,
        halign: "left",
        fontStyle: "normal",
        cellWidth: 120,
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
  return $.ajax({
    beforeSend: function (xhrObj) {
      xhrObj.setRequestHeader("Content-Type", "application/json");
      xhrObj.setRequestHeader("Accept", "application/json");
    },
    type: "GET",
    url:
      window.SITE_LOCATION_URL +
      "/_api/web/lists/getbytitle('Materiality List')/items?$orderby=FY",
    dataType: "json",
  }).then(function (res) {
    return res.value;
  });
}
function getMaterialityAppListData(fy) {
  return $.ajax({
    beforeSend: function (xhrObj) {
      xhrObj.setRequestHeader("Content-Type", "application/json");
      xhrObj.setRequestHeader("Accept", "application/json");
    },
    type: "GET",
    url:
      window.SITE_LOCATION_URL +
      "/_api/web/lists/getbytitle('AFR Line Items')/items?$filter=FY eq '" + fy + "'",
    dataType: "json",
  }).then(function (res) {
    return res.value;
  });
}
