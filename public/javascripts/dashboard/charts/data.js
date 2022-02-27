window.onload = function() {

    var dataPoints = [];
    
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Daily Sales Data"
        },
        axisY: {
            title: "Units",
            titleFontSize: 24,
            includeZero: true
        },
        data: [{
            type: "column",
            yValueFormatString: "#,### Units",
            dataPoints: dataPoints
        }]
    });
    
    function addData(data) {
        for (var i = 0; i < data.length; i++) {
            dataPoints.push({
                x: data[i].name,
                y: data[i].age
            });
        }
        chart.render();
    
    }
    
    $.getJSON("../javascripts/dashboard/charts/test.json", addData);
    
    }
    