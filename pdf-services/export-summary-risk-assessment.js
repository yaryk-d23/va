function generateSummaryRiskAssessmentPdf(data, internalControls) {
    var doc = new jsPDF({
        orientation: "p",
        unit: "pt",
    });
    doc.setFont("helvetica");
    doc.setFontSize(12);
    // add pdf header
    doc.setFontSize(16);
    doc.setFontStyle("bold");
    doc.text(205, 45, "Summary of Risk Assessment");
    doc.setFontSize(10);
    doc.text(20, 65, "Purpose:");
    doc.setFontStyle("normal");
    doc.text(
        70,
        65,
        "To summarize the level of risk for each business process area (BPA), the number of unique risks each BPA is ",
        {
            maxWidth: 515,
        }
    );
    doc.text(20, 77, "facing, the number of internal controls present in each BPA, and the average internal control effectiveness rating of all internal controls each BPA. " +
        "This analysis assists leadership in understanding the level of program risk, which BPA's are facing higher risks in rating and number, and the number and " +
        "effectiveness of internal controls that have been deployed to reduce the risk so leadership can easily identify priority areas, take necessary action, and " +
        "monitor progress. Risk Rating Column - The risk rating is on a scale of 1-3. Low risk is 1 - 1.49, Medium risk is 1.5 - 2.49, High risk is 2.5 - 3." +
        "Internal Control Effectivess Column - The IC effectiveness is on a scal of 1-3. High Effectiveness is 1 - 1.49, Medium Effectiveness is 1.5 - 2.49, " +
        "Low Effectiveness is 2.5 - 3.", {
        maxWidth: 550,
    });

    let highRiskItems = [];
    let mediumRiskItems = [];
    let lowRiskItems = [];
    $.each(data, function (key, val) {
        let riskVal = getRiskValueForArea(val);
        if (riskVal > 2.49) {
            highRiskItems.push(data[key]);
        }
        else if (riskVal > 1.49 && riskVal <= 2.49) {
            mediumRiskItems.push(data[key]);
        }
        else if (riskVal <= 1.49) {
            lowRiskItems.push(data[key]);
        }
    });

    let cols = [];
    let table = [];
    let createdCell;
    let style;
    if (highRiskItems.length) {
        cols = [
            {
                title: "",
                dataKey: "fullColl",
            },
        ];
        table = [
            { fullColl: "High Risk" }
        ];
        style = getMaterialityPdfStyles(170);
        createdCell = function (data) {
            if (data.section == "body" && data.column.dataKey === 'fullColl') {
                data.cell.styles.fillColor = [255, 0, 0];
                data.cell.styles.textColor = [255];
                data.cell.styles.halign = "center";
                data.cell.styles.fontStyle = "bold";
            }
        };
        style.didParseCell = createdCell;
        doc.autoTable(cols, table, style);

        cols = [
            {
                title: "",
                dataKey: "col1",
            }, {
                title: "",
                dataKey: "col2",
            }, {
                title: "",
                dataKey: "col3",
            }, {
                title: "",
                dataKey: "col4",
            }, {
                title: "",
                dataKey: "col5",
            },
        ];
        table = [
            {
                col1: "Business Process Area",
                col2: "Risk Rating",
                col3: "Number of Risks",
                col4: "Internal Control Effectiveness Rating",
                col5: "Number of Internal Controls",
            }
        ];
        $.each(highRiskItems, function (key, val) {
            table.push({
                col1: (val[0].Business_Process_Area ? val[0].Business_Process_Area.Title : 'Unassigned'),
                col2: getRiskValueForArea(val),
                col3: val.length,
                col4: getInternalControlEffectForArea(val),
                col5: internalControls[val[0].Business_Process_AreaId] ? internalControls[val[0].Business_Process_AreaId].length : 0,
            });
        });
        style = getMaterialityPdfStyles(doc.previousAutoTable.finalY);
        createdCell = function (data) { };
        style.didParseCell = createdCell;
        doc.autoTable(cols, table, style);
    }
    if (mediumRiskItems.length) {
        cols = [
            {
                title: "",
                dataKey: "fullColl",
            },
        ];
        table = [
            { fullColl: "Medium Risk" }
        ];
        style = getMaterialityPdfStyles(doc.previousAutoTable.finalY ? (doc.previousAutoTable.finalY + 10) : 170);
        createdCell = function (data) {
            if (data.section == "body" && data.column.dataKey === 'fullColl') {
                data.cell.styles.fillColor = [255, 192, 0];
                data.cell.styles.textColor = [255];
                data.cell.styles.halign = "center";
                data.cell.styles.fontStyle = "bold";
            }
        };
        style.didParseCell = createdCell;
        doc.autoTable(cols, table, style);

        cols = [
            {
                title: "",
                dataKey: "col1",
            }, {
                title: "",
                dataKey: "col2",
            }, {
                title: "",
                dataKey: "col3",
            }, {
                title: "",
                dataKey: "col4",
            }, {
                title: "",
                dataKey: "col5",
            },
        ];
        table = [
            {
                col1: "Business Process Area",
                col2: "Risk Rating",
                col3: "Number of Risks",
                col4: "Internal Control Effectiveness Rating",
                col5: "Number of Internal Controls",
            }
        ];
        $.each(mediumRiskItems, function (key, val) {
            table.push({
                col1: (val[0].Business_Process_Area ? val[0].Business_Process_Area.Title : 'Unassigned'),
                col2: getRiskValueForArea(val),
                col3: val.length,
                col4: getInternalControlEffectForArea(val),
                col5: internalControls[val[0].Business_Process_AreaId] ? internalControls[val[0].Business_Process_AreaId].length : 0,
            });
        });
        style = getMaterialityPdfStyles(doc.previousAutoTable.finalY);
        createdCell = function (data) { };
        style.didParseCell = createdCell;
        doc.autoTable(cols, table, style);
    }
    if (lowRiskItems.length) {
        cols = [
            {
                title: "",
                dataKey: "fullColl",
            },
        ];
        table = [
            { fullColl: "Low Risk" }
        ];
        style = getMaterialityPdfStyles(doc.previousAutoTable.finalY ? (doc.previousAutoTable.finalY + 10) : 170);
        createdCell = function (data) {
            if (data.section == "body" && data.column.dataKey === 'fullColl') {
                data.cell.styles.fillColor = [146, 208, 80];
                data.cell.styles.textColor = [255];
                data.cell.styles.halign = "center";
                data.cell.styles.fontStyle = "bold";
            }
        };
        style.didParseCell = createdCell;
        doc.autoTable(cols, table, style);

        cols = [
            {
                title: "",
                dataKey: "col1",
            }, {
                title: "",
                dataKey: "col2",
            }, {
                title: "",
                dataKey: "col3",
            }, {
                title: "",
                dataKey: "col4",
            }, {
                title: "",
                dataKey: "col5",
            },
        ];
        table = [
            {
                col1: "Business Process Area",
                col2: "Risk Rating",
                col3: "Number of Risks",
                col4: "Internal Control Effectiveness Rating",
                col5: "Number of Internal Controls",
            }
        ];
        $.each(lowRiskItems, function (key, val) {
            table.push({
                col1: (val[0].Business_Process_Area ? val[0].Business_Process_Area.Title : 'Unassigned'),
                col2: getRiskValueForArea(val),
                col3: val.length,
                col4: getInternalControlEffectForArea(val),
                col5: internalControls[val[0].Business_Process_AreaId] ? internalControls[val[0].Business_Process_AreaId].length : 0,
            });
        });
        style = getMaterialityPdfStyles(doc.previousAutoTable.finalY);
        createdCell = function (data) { };
        style.didParseCell = createdCell;
        doc.autoTable(cols, table, style);
    }

    cols = [
        {
            title: "",
            dataKey: "fullColl",
        },
    ];
    table = [
        {
            fullColl: "Comments:"
        },
        {
            fullColl: "All risk ratings and internal control ratings under each business process area were averaged to attain the overall business process area risk rating and overall internal control effectiveness rating.\n" +
                "The analysis above is utilized during the internal control test of design and effectiveness planning.\n" +
                "The data above was populated from the A-123 Program Office SharePoint tool."
        }
    ];
    style = getMaterialityPdfStyles(doc.previousAutoTable.finalY ? (doc.previousAutoTable.finalY + 20) : 170);
    createdCell = function (data) {
        if (data.section == "body" && data.column.dataKey === 'fullColl' && data.row.index === 0) {
            data.cell.styles.fillColor = [255];
            // data.cell.styles.textColor = [255];
            data.cell.styles.halign = "left";
            data.cell.styles.fontStyle = "bold";
        }
        if (data.section == "body" && data.column.dataKey === 'fullColl') {
            data.cell.styles.fontSize = 10;
            data.cell.styles.cellPadding = 0;
            data.cell.styles.valign = "top";
        }
    };
    style.didParseCell = createdCell;
    doc.autoTable(cols, table, style);
    return doc;
}

function getInternalControlEffectForArea(items) {
    let riskSum = 0;
    items.forEach(function (item) {
        riskSum += parseInt(item.CumulativeInternalControlEffecti ? item.CumulativeInternalControlEffecti[0] : 0);
    });
    return (riskSum / items.length).toFixed(2);
}

function getRiskValueForArea(items) {
    let riskSum = 0;
    items.forEach(function (item) {
        riskSum += parseFloat(item.Overall_Inherent_Risk);
    });
    return (riskSum / items.length).toFixed(2);
}

function getSummaryRiskAssessmentPdfStyles(startY) {
    return {
        startY: startY,
        columnStyles: {
            fullColl: {
                halign: "center",
                fontStyle: "bold",
                fontSize: 12,
            },

        },
        margin: {
            top: 20,
            left: 20,
            right: 20,
            bottom: 40,
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

function getSummaryRiskAssessmentListData() {
    return $.ajax({
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Accept", "application/json");
        },
        type: "GET",
        url: window.SITE_LOCATION_URL + "/SiteAssets/app/risk-assessment.txt",
        // url: window.SITE_LOCATION_URL + "/_api/web/lists/getbytitle('Risk Assessment')/items?$top=50000&$select=*,Business_Process_Area/Title,Business_Process_Area/Id&$expand=Business_Process_Area",
        dataType: "json",
    }).then(function (res) {
        return res.value;
    });
}

function getInternalControlsRiskAssessmentListData() {
    return $.ajax({
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Accept", "application/json");
        },
        type: "GET",
        url: window.SITE_LOCATION_URL + "/SiteAssets/app/internal_controls.txt",
        // url: window.SITE_LOCATION_URL + "/_api/web/lists/getbytitle('Internal Controls and Evaluations')/items?$top=50000",
        dataType: "json",
    }).then(function (res) {
        return res.value;
    });
}