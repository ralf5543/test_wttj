//browser width (to play with the 3 behaviours : mobile, tablet, desktop);
let resolution = '';

let lineNumbers = 0;

/*the numbers of widget elements visible (not out of sceen) in a single line
(whatever the number of lines and the number of elements)*/
let visibleElemsByLine = 0;

if (window.innerWidth <= 768) {
	resolution = 'mobile';
	lineNumbers = 1;
	visibleElemsByLine = 1;
} else if (window.innerWidth > 768 && window.innerWidth < 1024) {
	resolution = 'tablet';
	lineNumbers = 2;
	visibleElemsByLine = 2;
} else {
	resolution = 'desktop';
	lineNumbers = 2;
	visibleElemsByLine = 3;
}

//carrousel
const widget = document.querySelector('.js-widgetList');

//nav buttons
const prevBtn = document.querySelector('.js-widgetPrevBtn');
const nextBtn = document.querySelector('.js-widgetNextBtn');

//store list element width
const widgetElem = document.querySelector('.js-widgetElement');
let widgetElemWidth = widgetElem.clientWidth;

//Number of widget elements
const elemsNumber = widget.children.length;

//number of elements by line, hidden or not
const elemsByLine = elemsNumber / lineNumbers;

// the numbers of slides navigated
let navStep = 0;

//Progress bar
const progressBar = document.querySelector('.js-progress');

//we need to store the original amount of elements visible in %
const originalProgress = (visibleElemsByLine * 100) / elemsByLine;

//The dynamic progression in %
let progress = (visibleElemsByLine * 100) / elemsByLine;

//the amount of progression in %, after each clic navigation
const progressFraction = progress / visibleElemsByLine;

progressBar.style.width = `${progress}%`;

//adds margin left and right to the contenair
function moveWidget() {
	widget.style.marginLeft= `-${widgetElemWidth * navStep}px`;
	widget.style.marginRight= `${widgetElemWidth * navStep}px`;

	progress = originalProgress + (progressFraction * navStep);
	progressBar.style.width = `${progress}%`;
}

console.log('original pourcentage', originalProgress);
console.log('pourcentage', progress);
console.log('fraction', progressFraction);


prevBtn.addEventListener('click', function () {
	if (navStep > 0) {
		navStep --;
		moveWidget();
	}
}
);

nextBtn.addEventListener('click', function () {
	if (resolution === 'mobile') {
		if (navStep < elemsNumber) {
			navStep ++;
			moveWidget();
		}
	} else {

		if (navStep < (elemsNumber / 2) - visibleElemsByLine) {
			navStep ++;
			moveWidget();
		}

	}

	console.log('pourcentage', progress);
	console.log('fraction', progressFraction);
});
