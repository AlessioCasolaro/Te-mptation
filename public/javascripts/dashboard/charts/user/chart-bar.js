var url = 'https://statisticstrigger.azurewebsites.net/api/FunctionApp?user=user';

json = (function () {
  var json = null;
  $.ajax({
      'async': false,
      'global': false,
      'url': url,
      'dataType': "json",
      'success': function (data) {
          json = data;
      }
  });
  console.log(json.x2,json.y2)
  return json;
})(); 



Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Bar Chart Example
var ctx = document.getElementById("myBarChart");
myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: json.x2,
    datasets: [{
      label: "Guadagno in EURO",
      backgroundColor: "rgba(2,117,216,1)",
      borderColor: "rgba(2,117,216,1)",
      data: json.y2,
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 6
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 150,
          maxTicksLimit: 5
        },
        gridLines: {
          display: true
        }
      }],
    },
    legend: {
      display: false
    }
  }
});

