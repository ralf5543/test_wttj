//browser width (to play with the 3 behaviours : mobile, tablet, desktop);
let resolution = '';

if (window.innerWidth <= 768) {
	resolution = 'mobile';
} else if (window.innerWidth > 768 && window.innerWidth < 1024) {
	resolution = 'tablet';
} else {
	resolution = 'desktop';
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
const elemNumber = widget.children.length;

// the numbers of slides navigated
let navStep = 0;

//Progress bar
const progressBar = document.querySelector('.js-progress');
let progress = 0;

//adds margin left and right to the contenair
function moveWidget() {
	widget.style.marginLeft= `-${widgetElemWidth * navStep}px`;
	widget.style.marginRight= `${widgetElemWidth * navStep}px`;

	progress = 100 - ((elemNumber - navStep)*10);
	progressBar.style.width = `${progress}%`;
}

console.log('pourcentage', progress);


prevBtn.addEventListener('click', function () {
	if (navStep > 0) {
		navStep --;
		moveWidget();
	}
}
);

nextBtn.addEventListener('click', function () {
	if (resolution === 'mobile') {
		if (navStep < elemNumber) {
			navStep ++;
			moveWidget();
		}
	} else {

		if (navStep < elemNumber / 2) {
			navStep ++;
			moveWidget();
		}

	}
	
});
