// using d3 for convenience
const body = d3.select('body');
const main = d3.select("main");
const scrollyBG = main.select("#scrollyBG");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure");
var article = scrolly.select("article");
var step = article.selectAll(".step");

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
    // 1. update height of step elements
    var stepH = Math.floor(window.innerHeight * 0.60);
    step.style("height", stepH + "px");

    var figureHeight = window.innerHeight/1.5;
    var figureMarginTop = (window.innerHeight - figureHeight) / 2;

    figure
        .style("height", figureHeight + "px")
        .style("top", figureMarginTop + "px");

    // 3. tell scrollama to update new element dimensions
    scroller.resize();
}

function displayImage(url) {
    figure.select("#scrollImg")
    .attr('src', url);
    
    figure.select("#scrollImgCrop")
        .style('display', 'block')

    figure.select("#blockQuote")
        .style('display', 'none');
}

function displayQuote(quote) {
    figure.select("#scrollImgCrop")
    .style('display', 'none');
    
    figure.select("#blockQuote")
        .style('display', 'block')
        .text(quote);
}

function changeBackground(color) {
    scrollyBG.transition().duration(1000).style('background-color', color)
}

// scrollama event handlers
function handleStepEnter(response) {
    console.log(response);
    // response = { element, direction, index }

    // add color to current step only
    step.classed("is-active", function (d, i) {
        return i === response.index;
    });

    caseStudyImgUrl = ["./images/gsv_house1-2_2014_crop.jpg", //0. Image (Taney 2014)
    "./images/gsv_house1-2_2019_crop.jpg", //1. Image (Taney 2017)
    "./images/gsv_house1-2_2018_crop.jpg", //2. Image (Taney 2018)
    "./images/gsv_neighbors_2019.jpg", //3. Image (Other places on the street)
    "./images/gsv_house1_front.jpg", //4. Image (Taney 2019)
    "./images/gsv_house2_2019.jpg", //5. Image (Taney Neighbor 2019)
    "./images/zillow_House1_Front_upres.jpg", //6. Image (Taney Current (from zillow))
    "./images/zillow_House1-2_front_2022_crop.jpg" //6. Image (Taney Current (from zillow))
    ]

    /*
    0. Image (Taney 2014)
    1. Image (Taney 2017)
    2. Image (Taney 2018)
    3. Image (Other places on the street)
    4. Quote
    5. Image (Taney 2019)
    6. Image (Taney neighbor 2019)
    7. Quote
    8. Image (Taney Current (from zillow))
    9. Image (Taney Neighbor (from zillow))
    9. Quote ()
    */ 

    if (response.index == 0) {
        //Case Study Intro

        displayImage(caseStudyImgUrl[0]);
        changeBackground('#F0EBDE');

    } else if (response.index == 1) {
        //Vacancy # 1
        displayImage(caseStudyImgUrl[1]);
        //need to find some way to fade it.
        changeBackground('#3A352F');

    } else if (response.index == 2) {
        //Vacancy # 2
        displayImage(caseStudyImgUrl[2]);
        changeBackground('#3A352F');

    } else if (response.index == 3) {
        //Vacancy # 3
        displayImage(caseStudyImgUrl[3]);
        changeBackground('#3A352F');

    } else if (response.index == 4) {
        //Vacancy # 4
        let quote = "“Never get a landlord that lives in New York”";
        displayQuote(quote);
        changeBackground('#3A352F');

    }   else if (response.index == 5) {
        //Sales #1
        displayImage(caseStudyImgUrl[4]);
        changeBackground('#1B3350');

    }   else if (response.index == 6) {
        //Sales #2
        displayImage(caseStudyImgUrl[5]);
        changeBackground('#1B3350');

    }   else if (response.index == 7) {
        //Sales #3
        let quote = "“Biggest issue that we come across is that [owners] dont have homeowner insurance”";
        displayQuote(quote);
        changeBackground('#1B3350');

    }   else if (response.index == 8) {
        //Permits #1
        displayImage(caseStudyImgUrl[6]);
        changeBackground('#2D4A2A');
        
    }   else if (response.index == 9) {
        //Permits #2
        displayImage(caseStudyImgUrl[7]);
        changeBackground('#2D4A2A');
    }  else if (response.index == 10) {
        //Permits #3
        let quote = "“Fires occur in the places where they are waiting to happen”";
        displayQuote(quote);
        changeBackground('#2D4A2A');
    }  
}

function init() {

    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();

    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller
        .setup({
            step: "#scrolly article .step",
            offset: 0.33,
            debug: false
        })
        .onStepEnter(handleStepEnter);
}

// kick things off
init();