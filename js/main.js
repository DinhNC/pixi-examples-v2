import 'fetch';

import Handlebars 	from 'handlebars';
import Prism 		from './prism'
import ExampleList 	from './ExampleList';


import source from './menu.hbs!text';

fetch('./examples.json')
	.then(response => response.json())
	.then(function(json) {

		var examples = json.examples;

		var files = examples.reduce(function(result,item){
			return result.concat(item.files);
		},[]);

		var content = examples
					    .map(function(folder){
					    	var template = Handlebars.compile(source);
					    	return template(folder);
					    });

	    content = content.join('');

	  	var nav = document.querySelector('.example-nav');

	  	nav.innerHTML = `<ul>${content}</ul>`;

	  	var titles = document.querySelectorAll('.category-id');

	  	var allUls = Array.from( document.querySelectorAll('.list-within-category') );
	  	var iframe = document.querySelector('iframe');

	  	var lists = [];

	  	for (var i = 0; i < allUls.length; i++) {
	  		var list = new ExampleList(allUls[i]);
	  		lists.push(list);
	  	}

	  	for (var i = 0; i < titles.length; i++) {
	  		titles[i].addEventListener('click',clickedTitle)
	  	};

	  	var links = Array.from( document.querySelectorAll('.example-link') );

	  	for (var i = 0; i < links.length; i++) {
	  		links[i].addEventListener('click',showExample)
	  	};

	  	function showExample (evt) {
	  		evt.preventDefault();
	  		evt.stopPropagation();
	  		var link = evt.target;

	  		var filtered = files.filter( (item) => {
	  			return item.slug === link.dataset.slug;
	  		});

	  		var file = filtered[0];

	  		if(file)
	  		{
	  			iframe.src = file.file;

	  			var textarea = document.querySelector('code');
	  			var code = "";
	  			code += " var sprite = new PIXI.Sprite() ";
	  			textarea.innerHTML = code;

	  			setTimeout(function  () {
		  			Prism.highlightAll(true,function(){
		  				alert('h')
		  			});
	  			},50)
	  			

	  		}
	  		else{
	  			alert('problem');
	  		}

	  		return false;
	  	}

	  	function clickedTitle (evt) {

	  		var curr = evt.target;


	  		for (var i = 0; i < lists.length; i++) {
	  			lists[i].hide();
	  		};


	  		var ul = lists.filter(function (list) {
	  			return list.category === curr.dataset.category;
	  		});

	  		ul[0].toggleVisibility();




	  	}


	});
