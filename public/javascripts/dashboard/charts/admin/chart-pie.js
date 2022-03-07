var url = 'https://statisticstrigger.azurewebsites.net/api/FunctionApp?user=admin';

var json = (function () {
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


var ctx = document.getElementById("extraPopularity");
var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: json.x4,
    datasets: [{
      data: json.y4,
      backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
    }],
  },
});
