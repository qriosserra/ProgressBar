document.addEventListener("DOMContentLoaded", () => {

    const container = document.querySelector(".progress-container");
    const stepList = document.querySelector(".step-list");
    const progressSteps = document.querySelectorAll(".progress-step");
    const lineContainer = document.createElement("div");
    const lineWrapper = document.createElement("div");
    const lineProgress = document.createElement("div");
    const pointList = document.createElement("ul");

    lineContainer.classList.add("line-container");
    container.prepend(lineContainer);

    lineWrapper.classList.add("line-wrapper");
    lineContainer.append(lineWrapper);

    lineProgress.classList.add("progress-line");
    lineWrapper.append(lineProgress);

    pointList.classList.add("progress-points");

    progressSteps.forEach((step) => {
        let point : Element;
        point = document.createElement("span");
        point.classList.add("progress-point");

        step.addEventListener("click", () => updateStep(step))
        point.addEventListener("click", () => updateStep(step))

        pointList.append(point);
        lineContainer.append(pointList);
    });

    const points = document.querySelectorAll(".progress-point");
    points[0].classList.add("active");

    function updateStep(element: Element) {
        let index = getIndexFromArray(element);
        setClasses(index);
        setProgress(index);
        setDescription(index + 1);
    }

    function setClasses(index: number) {
        let previousStep = document.querySelector(".progress-step.active");
        let previousPoint = document.querySelector(".progress-point.active")
        let leftPoints = document.querySelectorAll(`.progress-point:nth-child(-n+${index + 1})`);
        let step = document.querySelector(`.progress-step:nth-child(${index + 1})`);
        let point = document.querySelector(`.progress-point:nth-child(${index + 1})`);

        previousStep.classList.remove("active");
        previousPoint.classList.remove("active");
        step.classList.add("active");
        point.classList.add("active");

        points.forEach((point) => {
            point.classList.remove("glow")
        });
        leftPoints.forEach((point) => {
            point.classList.add("glow")
        });
    }

    function setProgress(index : number) {
        let percentage = index * (100 / (progressSteps.length - 1)) + 1;
        lineProgress.style.width = `${percentage}%`;
        lineProgress.style.height = `${percentage}%`;
    }

    function setDescription(number : number) {
        let previous = document.querySelector(".progress-description.active");
        let description = document.querySelector(`.progress-description:nth-child(${number})`);

        previous.classList.remove("active");
        description.classList.add("active");
    }

    function getIndexFromArray(element: Element) {
        let parent = element.parentElement;
        // @ts-ignore
        let index = Array.from(parent.children).indexOf(element);
        return index;
    }
})

