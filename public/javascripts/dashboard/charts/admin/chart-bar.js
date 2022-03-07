var json;
var myLineChart;
function graph(){
var input = document.getElementById("inputQuery2").value;
console.log(input)
var url = 'https://statisticstrigger.azurewebsites.net/api/FunctionApp?user=user&name='+input;

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
  return json;
})(); 
console.log(json.x)

Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Bar Chart Example
var ctx = document.getElementById("myBarChart");
myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: json.x2,
    datasets: [{
      label: "Acquistati",
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
          max: 20,
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

}