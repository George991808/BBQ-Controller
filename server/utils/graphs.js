const Dygraph = require("dygraphs");
const dygraph = new Dygraph(
  "graph",
  `Date,A,B
2016/01/01,10,20
2016/07/01,20,10
2016/12/31,40,30
`,
  {
    fillGraph: true,
  }
);
module.exports = {
  dygraph,
};
