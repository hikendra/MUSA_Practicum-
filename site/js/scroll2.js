var container = d3.select("#scroll");
var text = container.select(".scroll__text");
var step = text.selectAll(".step");

var container2 = d3.select("#scroll2");
var text2 = container2.select(".scroll__text");
var step2 = text2.selectAll(".step");

var scroller = scrollama();
var scroller2 = scrollama();

function handleResize() {
  // var h = Math.floor(window.innerHeight * 0.75) + 'px'
  step.each(function() {
    var ran = 0.1 + Math.random();
    var h = Math.floor(window.innerHeight * ran) + "px";
    d3.select(this).style("height", h);
  });

  scroller.resize();
}

function handleStepEnter(resp) {
  console.log("enter", resp);
  step.classed("is-active", function(d, i) {
    return i === resp.index;
  });
  var val = d3.select(resp.element).attr("data-step");
}

function handleStepExit(resp) {
  console.log("exit", resp);
  d3.select(resp.element).classed("is-active", false);
}

function handleProgress(resp) {
  console.log("progress", resp);
}

function handleResize2() {
  // var h = Math.floor(window.innerHeight * 0.75) + 'px'
  step2.each(function() {
    var ran = 0.1 + Math.random();
    var h = Math.floor(window.innerHeight * ran) + "px";
    d3.select(this).style("height", h);
  });

  scroller2.resize();
}

function handleStepEnter2(resp) {
  console.log("enter", resp);
  step2.classed("is-active", function(d, i) {
    return i === resp.index;
  });
  var val = d3.select(resp.element).attr("data-step");
}

function handleStepExit2(resp) {
  console.log("exit", resp);
  d3.select(resp.element).classed("is-active", false);
}

function handleProgress2(resp) {
  console.log("progress", resp);
}

function init() {
  handleResize();
  handleResize2();

  scroller
    .setup({
      step: "#scroll .step",
      offset: 0.33,
      debug: true,
      progress: true
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit)
    .onStepProgress(handleProgress);

  scroller2
    .setup({
      step: "#scroll2 .step",
      offset: 0.67,
      debug: true,
      progress: true
    })
    .onStepEnter(handleStepEnter2)
    .onStepExit(handleStepExit2)
    .onStepProgress(handleProgress2);

  console.log(scroller.getOffset());
  console.log(scroller2.getOffset());
  // window.addEventListener('resize', handleResize)
}

init();