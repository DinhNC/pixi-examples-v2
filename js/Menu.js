import source 		from './menu.hbs!text';
import Handlebars 	from 'handlebars';
import ExampleList 	from './ExampleList';
import Signal       from 'signals';

export default class Menu {
	constructor(examples){

		this.lists = [];
        this.itemClicked = new Signal();

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

		for (var i = 0; i < allUls.length; i++) {
			var list = new ExampleList(allUls[i]);
			this.lists.push(list);
		}

		for (var i = 0; i < titles.length; i++) {
			titles[i].addEventListener('click',this.updateMenuCategory.bind(this))
		};

		var links = Array.from( document.querySelectorAll('.example-link') );

		for (var i = 0; i < links.length; i++) {
			links[i].addEventListener('click',this.onLinkClicked.bind(this));
		};
	}

    onLinkClicked (evt){
        this.itemClicked.dispatch(evt)
    }

	// changes which category is currently visible, and collapses the others
	updateMenuCategory (evt) {

		var curr = evt.target;

		evt.stopPropagation();

		for (var i = 0; i < this.lists.length; i++) {
			this.lists[i].hide();
		};


		var ul = this.lists.filter(function (list) {
			return list.category === curr.dataset.category;
		});

		ul[0].toggleVisibility();


	}
}
