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

			console.log('show')
			TweenLite.to(this.element, 3,
			{	css:{
					backgroundColor:"#FF0000", 
					maxHeight : "100px"
				}, 
				ease:Expo.easeOut
			});
		}
		else{
			this.hide();
		}
		
	}

	hide(){
		TweenLite.to(this.element, 1,
			{	css:{
					backgroundColor:"transparent", 
					maxHeight : "0"
				}, 
				ease:Expo.easeOut
			});

	}
	
}