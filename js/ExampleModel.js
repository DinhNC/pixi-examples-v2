import 'fetch';

export default class ExampleModel{

	constructor(){

		this.examples = [];
		this.files = [];
	}

	init(readyCallback = null){

		this.readyCallback = readyCallback;

		fetch('./examples.json')
			.then(response => response.json())
			.then(this.onLoaded.bind(this));
	}

	onLoaded (json) {

		var examples = json.examples;
		this.examples = json.examples;

		this.files = examples.reduce(function(result,item){
			return result.concat(item.files);
		},[]);

		if(this.readyCallback)
		{
			this.readyCallback();
		}

	}
}
