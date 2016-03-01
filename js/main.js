import hljs 		from './vendor/highlight.pack';
import ExampleModel from './ExampleModel';
import Menu 		from './Menu';


// var router = new Grapnel({ pushState : true });
//
// router.get('/products/:category/:id?', function(req){
//     var id = req.params.id,
//         category = req.params.category
//
//     console.log(category, id);
// });
//
// router.navigate('/products/widgets/134');

var model = new ExampleModel();
var menu;
var githubUrl = 'https://github.com/pixijs/pixi-examples-v2/tree/master/';

model.init(createMenu);

function createMenu() {

	menu = new Menu(model.examples);
	menu.itemClicked.add(findExample);

}


function findExample (evt) {
	evt.preventDefault();
	evt.stopPropagation();
	var link = evt.target;

	var filtered = model.files.filter( (item) => {
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

	var iframe = document.querySelector('iframe');
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

			textarea.innerHTML = code;

			var hOne = document.querySelector('h1');
			hOne.innerHTML = fileObj.title;

			var githubLink = document.querySelector('.view-on-github');
			githubLink.setAttribute('href',githubUrl + fileObj.file)

			setTimeout(function () {
				console.log('highlight')
				hljs.highlightBlock(textarea);

			},50);
		})
}
