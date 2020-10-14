(function () {
    $(document).ready(function () {
        getRiskFactorCriteriaListItems().then(function (res) {
            res.forEach(function (item) {
                let html = '<div class="criteria-row">' +
                    '<div class="criteria-title">' + item.Title + '</div>' +
                    '<div class="criteria-description">' +
                    '<p>' + (item.Risk_x0020_Factor_x0020_Descript ? item.Risk_x0020_Factor_x0020_Descript : '') + '</p>' +
                    '</div>' +
                    '</div>';
                $('.form-body').append(html);
            });
        });

    });
    function getRiskFactorCriteriaListItems() {
        return $.ajax({
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Accept", "application/json");
            },
            type: "GET",
            url:
                window.SITE_LOCATION_URL +
                "/_api/web/lists/getbytitle('Risk Factor Criterias')/items?$filter=Display eq 1",
            dataType: "json",
        }).then(function (res) {
            return res.value;
        });
    }
})($);