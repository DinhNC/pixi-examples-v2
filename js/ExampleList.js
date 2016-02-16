import TweenMax from './vendor/TweenMax.min'

export default class ExampleList {

	constructor(element){

		this.element = element;
		this.category = element.dataset.category;
		this.originalHeight = element.getBoundingClientRect().height;

		// hide the element on creation
		this.element.style.display = "none";
		this.element.style.height = "0px"
		this.visible = false;
		this.animating = false;
	}

	toggleVisibility(){

		if(this.animating) return;

		if(!this.visible)
		{
			this.show();
		}
		else{
			this.hide();
		}
	}

	show(){
		console.log('show');

		this.element.style.display = "block";

		TweenLite.to(this.element, 0.5,
		{	css:{
				height : this.originalHeight+"px"
			},
			ease:Expo.easeOut,
			onComplete : ()=>{
				this.visible = true;
				this.animating = false;
			}
		});
	}

	hide(){

		TweenLite.to(this.element, 0.5,
		{	css:{
				height : 0
			},
			ease:Expo.easeOut,
			onComplete : ()=>{
				this.visible = false;
				this.animating = false;
				this.element.style.display = "none";
			}
		});

	}

}
