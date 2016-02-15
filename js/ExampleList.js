import TweenMax from './TweenMax.min'


export default class ExampleList {

	constructor(element){

		this.element = element;

		this.shown = false;
		this.category = element.dataset.category;
	}

	toggleVisibility(){

		this.shown = !this.shown;

		if(this.shown)
		{
			var rect = this.element.getBoundingClientRect();
			console.log('show',rect.height)
			TweenLite.to(this.element, 1.5,
			{	css:{
					maxHeight : "160px"
				},
				ease:Expo.easeOut
			});
		}
		else{
			this.hide();
		}

	}

	hide(){

		console.log('hide');

		this.shown = false;


		TweenLite.to(this.element, 1,
		{	css:{
				backgroundColor:"transparent",
				maxHeight : "0"
			},
			ease:Expo.easeOut
		});

	}

}
