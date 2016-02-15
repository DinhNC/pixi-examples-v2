import 'fetch';

import Handlebars 	from 'handlebars';
import hljs 		from './highlight.pack';
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
	  		links[i].addEventListener('click',findExample)
	  	};

	  	function findExample (evt) {
	  		evt.preventDefault();
	  		evt.stopPropagation();
	  		var link = evt.target;

	  		var filtered = files.filter( (item) => {
	  			return item.slug === link.dataset.slug;
	  		});

	  		var fileObj = filtered[0];

	  		if(fileObj)
	  		{

	  			showExample(fileObj);

	  		}
	  		else{
	  			alert('problem');
	  		}

	  		return false;
	  	}

	  	function showExample(fileObj) {
	  		iframe.src = fileObj.file;

	  		fetch(fileObj.file)
	  			.then((response) => {
	  				return response.text();
	  			})
	  			.then(function (text) {

		  			var textarea = document.querySelector('pre code');

			  		var parser = new DOMParser();
					var doc = parser.parseFromString(text, "text/html");

					var code = doc.querySelector('script.example-code').innerHTML;

					//console.log('code ',code)

			  		textarea.innerHTML = code;

			  		var hOne = document.querySelector('h1');
			  		hOne.innerHTML = fileObj.title;


			  		setTimeout(function () {

			  			console.log('high')
				  		hljs.initHighlighting();

			  		},50);
	  			})
	  	}

	  	function clickedTitle (evt) {

	  		var curr = evt.target;

	  		evt.stopPropagation();


	  		for (var i = 0; i < lists.length; i++) {
	  			lists[i].hide();
	  		};


	  		var ul = lists.filter(function (list) {
	  			return list.category === curr.dataset.category;
	  		});

	  		ul[0].toggleVisibility();


	  	}


	});
