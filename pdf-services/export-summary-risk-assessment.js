function generateSummaryRiskAssessmentPdf(areas, data, internalControls) {
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
        "monitor progress.", {
        maxWidth: 550,
    });

    let highRiskItems = [];
    let mediumRiskItems = [];
    let lowRiskItems = [];
    $.each(areas, function (key, val) {
        let riskVal = getSummaryRiskValueForArea(data[val.Id]);
        if (riskVal > 2.49) {
            highRiskItems.push(val);
        }
        else if (riskVal > 1.49 && riskVal <= 2.49) {
            mediumRiskItems.push(val);
        }
        else if (riskVal <= 1.49) {
            lowRiskItems.push(val);
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
        style = getSummaryRiskAssessmentPdfStyles(120);
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
                col1: (val.Title),
                col2: getSummaryRiskValueForArea(data[val.Id]),
                col3: data[val.Id] ? data[val.Id].length : 0,
                col4: getInternalControlEffectForArea(data[val.Id]),
                col5: internalControls[val.Id] ? internalControls[val.Id].length : 0,
            });
        });
        style = getSummaryRiskAssessmentPdfStyles(doc.previousAutoTable.finalY);
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
        style = getSummaryRiskAssessmentPdfStyles(doc.previousAutoTable.finalY ? (doc.previousAutoTable.finalY + 10) : 120);
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
                col1: (val.Title),
                col2: getSummaryRiskValueForArea(data[val.Id]),
                col3: data[val.Id] ? data[val.Id].length : 0,
                col4: getInternalControlEffectForArea(data[val.Id]),
                col5: internalControls[val.Id] ? internalControls[val.Id].length : 0,
            });
        });
        style = getSummaryRiskAssessmentPdfStyles(doc.previousAutoTable.finalY);
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
        style = getSummaryRiskAssessmentPdfStyles(doc.previousAutoTable.finalY ? (doc.previousAutoTable.finalY + 10) : 120);
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
                col1: (val.Title),
                col2: getSummaryRiskValueForArea(data[val.Id]),
                col3: data[val.Id] ? data[val.Id].length : 0,
                col4: getInternalControlEffectForArea(data[val.Id]),
                col5: internalControls[val.Id] ? internalControls[val.Id].length : 0,
            });
        });
        style = getSummaryRiskAssessmentPdfStyles(doc.previousAutoTable.finalY);
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
    style = getSummaryRiskAssessmentPdfStyles(doc.previousAutoTable.finalY ? (doc.previousAutoTable.finalY + 20) : 120);
    createdCell = function (data) {
        if (data.section == "body" && data.column.dataKey === 'fullColl' && data.row.index === 0) {
            data.cell.styles.fillColor = [255];
            // data.cell.styles.textColor = [255];
            data.cell.styles.halign = "left";
            data.cell.styles.fontStyle = "bold";
            data.cell.styles.valign = "top";
            data.cell.styles.fontSize = 10;
            data.cell.styles.cellPadding = 0;
        }
        if (data.section == "body" && data.column.dataKey === 'fullColl' && data.row.index !== 0) {
            data.cell.styles.fontSize = 10;
            data.cell.styles.cellPadding = 0;
            data.cell.styles.valign = "top";
            data.cell.styles.fontStyle = "normal";
        }
    };
    style.didParseCell = createdCell;
    doc.autoTable(cols, table, style);

    cols = [
        {
            title: "",
            dataKey: "col01",
        }, {
            title: "",
            dataKey: "col02",
        }, {
            title: "",
            dataKey: "col03",
        },
    ];
    table = [
        {
            col01: "Risk Rating Keys - The risk rating is on a scale of 1-3"
        }, {
            col01: "Low risk is 1 - 1.49",
            col02: "Medium risk is 1.5 - 2.49",
            col03: "High risk is 2.5 - 3",
        }
    ];
    style = getSummaryRiskAssessmentPdfStyles(doc.previousAutoTable.finalY + 20);
    createdCell = function (data) {
        if (data.section == "body" && data.column.dataKey === 'col01' && data.row.index === 0) {
            data.cell.styles.fillColor = [243];
            // data.cell.styles.textColor = [255];
            data.cell.styles.halign = "left";
            // data.cell.styles.fontStyle = "bold";
            data.cell.colSpan = 3;
            // data.cell.styles.cellPadding = 0;
        }
        if (data.section == "body" && data.column.dataKey === 'col01' && data.row.index !== 0) {
            data.cell.styles.fillColor = [146, 208, 80];
            data.cell.styles.textColor = [255];
        }
        if (data.section == "body" && data.column.dataKey === 'col02' && data.row.index !== 0) {
            data.cell.styles.fillColor = [255, 192, 0];
            data.cell.styles.textColor = [255];
        }
        if (data.section == "body" && data.column.dataKey === 'col03' && data.row.index !== 0) {
            data.cell.styles.fillColor = [255, 0, 0];
            data.cell.styles.textColor = [255];
        }
    };
    style.didParseCell = createdCell;
    doc.autoTable(cols, table, style);

    cols = [
        {
            title: "",
            dataKey: "col01",
        }, {
            title: "",
            dataKey: "col02",
        }, {
            title: "",
            dataKey: "col03",
        },
    ];
    table = [
        {
            col01: "Internal Control Effectivess Keys - The IC effectiveness is on a scal of 1-3"
        }, {
            col01: "High Effectiveness is 1 - 1.49",
            col02: "Medium Effectiveness is 1.5 - 2.49",
            col03: " Low Effectiveness is 2.5 - 3",
        }
    ];
    style = getSummaryRiskAssessmentPdfStyles(doc.previousAutoTable.finalY + 20);
    createdCell = function (data) {
        if (data.section == "body" && data.column.dataKey === 'col01' && data.row.index === 0) {
            data.cell.styles.fillColor = [243];
            // data.cell.styles.textColor = [255];
            data.cell.styles.halign = "left";
            // data.cell.styles.fontStyle = "bold";
            data.cell.colSpan = 3;
            // data.cell.styles.cellPadding = 0;
        }
        if (data.section == "body" && data.column.dataKey === 'col01' && data.row.index !== 0) {
            data.cell.styles.fillColor = [146, 208, 80];
            data.cell.styles.textColor = [255];
        }
        if (data.section == "body" && data.column.dataKey === 'col02' && data.row.index !== 0) {
            data.cell.styles.fillColor = [255, 192, 0];
            data.cell.styles.textColor = [255];
        }
        if (data.section == "body" && data.column.dataKey === 'col03' && data.row.index !== 0) {
            data.cell.styles.fillColor = [255, 0, 0];
            data.cell.styles.textColor = [255];
        }
    };
    style.didParseCell = createdCell;
    doc.autoTable(cols, table, style);
    return doc;
}

function getInternalControlEffectForArea(items) {
    let riskSum = 0;
    if (!items || items.length === 0) return 0;
    items.forEach(function (item) {
        riskSum += parseInt(item.CumulativeInternalControlEffecti ? item.CumulativeInternalControlEffecti[0] : 0);
    });
    return Math.round((riskSum / items.length) * 100) / 100;
}

function getSummaryRiskValueForArea(items) {
    let riskSum = 0;
    if (!items || items.length === 0) return 0;
    items.forEach(function (item) {
        riskSum += parseFloat(item.Overall_Residual_Risk ? item.Overall_Residual_Risk : 0);
    });
    return Math.round((riskSum / items.length) * 100) / 100;
}

function getSummaryRiskAssessmentPdfStyles(startY) {
    return {
        startY: startY,
        columnStyles: {
            fullColl: {
                halign: "left",
                fontStyle: "bold",
                fontSize: 12,
            },
            col1: {
                halign: "left",
                minCellWidth: 200,
            },
            col01: {
                fontStyle: "bold",
                halign: "center",
                // minCellWidth: 250,
            },
            col02: {
                fontStyle: "bold",
                halign: "center",
                // minCellWidth: 250,
            },
            col03: {
                fontStyle: "bold",
                halign: "center",
                // minCellWidth: 250,
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


function getSummaryProcessAreasListData() {
    return $.ajax({
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Accept", "application/json");
        },
        type: "GET",
        // url: window.SITE_LOCATION_URL + "/SiteAssets/app/process_areas.txt",
        url: window.SITE_LOCATION_URL + "/_api/web/lists/getbytitle('Business Process Areas')/items?$top=50000",
        dataType: "json",
    }).then(function (res) {
        return res.value;
    });
}

function getSummaryRiskAssessmentListData() {
    return $.ajax({
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Accept", "application/json");
        },
        type: "GET",
        // url: window.SITE_LOCATION_URL + "/SiteAssets/app/risk-assessment.txt",
        url: window.SITE_LOCATION_URL + "/_api/web/lists/getbytitle('Risk Assessment')/items?$top=50000&$select=*,Business_Process_Area/Title,Business_Process_Area/Id&$expand=Business_Process_Area",
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
        // url: window.SITE_LOCATION_URL + "/SiteAssets/app/internal_controls.txt",
        url: window.SITE_LOCATION_URL + "/_api/web/lists/getbytitle('Internal Controls and Evaluations')/items?$top=50000",
        dataType: "json",
    }).then(function (res) {
        return res.value;
    });
}
