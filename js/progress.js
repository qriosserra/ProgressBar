document.addEventListener("DOMContentLoaded", function () {
    var container = document.querySelector(".progress-container");
    var stepList = document.querySelector(".step-list");
    var progressSteps = document.querySelectorAll(".progress-step");
    var lineContainer = document.createElement("div");
    var lineWrapper = document.createElement("div");
    var lineProgress = document.createElement("div");
    var pointList = document.createElement("ul");
    lineContainer.classList.add("line-container");
    container.prepend(lineContainer);
    lineWrapper.classList.add("line-wrapper");
    lineContainer.append(lineWrapper);
    lineProgress.classList.add("progress-line");
    lineWrapper.append(lineProgress);
    pointList.classList.add("progress-points");
    progressSteps.forEach(function (step) {
        var point;
        point = document.createElement("span");
        point.classList.add("progress-point");
        step.addEventListener("click", function () { return updateStep(step); });
        point.addEventListener("click", function () { return updateStep(step); });
        pointList.append(point);
        lineContainer.append(pointList);
    });
    var points = document.querySelectorAll(".progress-point");
    points[0].classList.add("active");
    function updateStep(element) {
        var index = getIndexFromArray(element);
        setClasses(index);
        setProgress(index);
        setDescription(index + 1);
    }
    function setClasses(index) {
        var previousStep = document.querySelector(".progress-step.active");
        var previousPoint = document.querySelector(".progress-point.active");
        var leftPoints = document.querySelectorAll(".progress-point:nth-child(-n+".concat(index + 1, ")"));
        var step = document.querySelector(".progress-step:nth-child(".concat(index + 1, ")"));
        var point = document.querySelector(".progress-point:nth-child(".concat(index + 1, ")"));
        previousStep.classList.remove("active");
        previousPoint.classList.remove("active");
        step.classList.add("active");
        point.classList.add("active");
        points.forEach(function (point) {
            point.classList.remove("glow");
        });
        leftPoints.forEach(function (point) {
            point.classList.add("glow");
        });
    }
    function setProgress(index) {
        var percentage = index * (100 / (progressSteps.length - 1)) + 1;
        lineProgress.style.width = "".concat(percentage, "%");
        lineProgress.style.height = "".concat(percentage, "%");
    }
    function setDescription(number) {
        var previous = document.querySelector(".progress-description.active");
        var description = document.querySelector(".progress-description:nth-child(".concat(number, ")"));
        previous.classList.remove("active");
        description.classList.add("active");
    }
    function getIndexFromArray(element) {
        var parent = element.parentElement;
        // @ts-ignore
        var index = Array.from(parent.children).indexOf(element);
        return index;
    }
});
