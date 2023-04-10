<template>
  <krwidget
    widget-name="gchart603f37b367f091"
    widget-type="koolreport/widgets/google/ColumnChart"
    class="bs4"
  >
    <div id="gchart603f37b367f091" style="width: 100%; height: 400px;"></div>
  </krwidget>
</template>

<script type="text/javascript" src="./src/242373325/KoolReport.js"></script>

<script type="text/javascript">
KoolReport.widget.init(
  {
    js: ["src\/3921322505\/jquery.min.js", ["src\/989733105\/googlechart.js"]],
    css: []
  },
  function() {
    gchart603f37b367f091 = new KoolReport.google.chart(
      "ColumnChart",
      "gchart603f37b367f091",
      ["category", "sale", "cost", "profit"],
      [
        ["category", "Sale", "Cost", "Profit"],
        [
          "Test1",
          { v: 111, f: "$111" },
          { v: 222, f: "$222" },
          { v: 1112, f: "$1,112" }
        ],
        [
          "Test2",
          { v: 111, f: "$111" },
          { v: 221, f: "$221" },
          { v: 121, f: "$121" }
        ],
        ["Test3", { v: 1, f: "$1" }, { v: 2, f: "$2" }, { v: 11, f: "$11" }],
        [
          "Test4",
          { v: 1, f: "$1" },
          { v: 11, f: "$11" },
          { v: 111, f: "$111" }
        ],
        [
          "Test with a long text",
          { v: 2221, f: "$2,221" },
          { v: 1122, f: "$1,122" },
          { v: 344, f: "$344" }
        ]
      ],
      { title: "Sale Report" },
      { package: "corechart", stability: "current", mapsApiKey: "" }
    );
  }
);
</script>

<script type="text/javascript">
KoolReport.load.resources({
  js: [
    "src\/3921322505\/jquery.min.js",
    ["src\/2201091223\/js\/bootstrap.bundle.min.js"]
  ],
  css: ["src\/2201091223\/css\/bootstrap.min.css"]
});
</script>

<style>
.export {
  margin: 5px;
}
</style>
