/**
 * This alias is used to pare down the Plotly lib
 */
import Plotly from "plotly.js/src/core";
import createPlotlyComponent from "react-plotly.js/factory";

Plotly.register([require("plotly.js/lib/scatter")]);
export default createPlotlyComponent(Plotly);
