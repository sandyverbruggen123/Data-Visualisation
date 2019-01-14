// source https://www.amcharts.com/demos/3d-pie-chart/
// Themes begin
am4core.useTheme(am4themes_dark);
// Themes end

// create charts
var chartStays = am4core.create("divStays", am4charts.PieChart3D);
var chartTransport = am4core.create("divTransport", am4charts.PieChart3D);

// this creates initial fade-in
chartStays.hiddenState.properties.opacity = 0;
chartTransport.hiddenState.properties.opacity = 0;

// add data to chart
chartStays.data = [
  {
    sort: "Hotel or motel",
    number: 4509
      },
  {
    sort: "Camping",
    number: 725
      },
  {
    sort: "Other rented accommodation type",
    number: 3827
      },
  {
    sort: "Second stay",
    number: 468
      },
  {
    sort: "Free stay offered by friends and family",
    number: 1901
      },
  {
    sort: "Other non-rented accommodation type",
    number: 123
      }
    ];

// add data to chart
chartTransport.data = [
  {
    sort: "Car, motorbike, camper",
    number: 6218
      },
  {
    sort: "Plane",
    number: 4262
      },
  {
    sort: "Other transport",
    number: 1072
      }
    ];

// specify innerRadius and depth for the chart
chartStays.innerRadius = am4core.percent(50);
chartTransport.innerRadius = am4core.percent(50);
chartStays.depth = 20;
chartTransport.depth = 20;

// define value, dephtValue, category, cornerRadius and color for the chart
var seriesStays = chartStays.series.push(new am4charts.PieSeries3D());
seriesStays.dataFields.value = "number";
seriesStays.dataFields.depthValue = "number";
seriesStays.dataFields.category = "sort";
seriesStays.slices.template.cornerRadius = 5;
seriesStays.colors.step = 3;

// define value, dephtValue, category, cornerRadius and color for the chart
var seriesTransport = chartTransport.series.push(new am4charts.PieSeries3D());
seriesTransport.dataFields.value = "number";
seriesTransport.dataFields.depthValue = "number";
seriesTransport.dataFields.category = "sort";
seriesTransport.slices.template.cornerRadius = 5;
seriesTransport.colors.step = 10;