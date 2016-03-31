var fs 		= require('fs');
var path 	= require('path');

var json    = { examples : [] };

var examplesDir = './examples';

fs.readdir(examplesDir, function (err, folders) {
    if (err) {
        throw err;
    }

    // exclude the assets folder
    folders.splice(folders.indexOf('_assets'),1);

    for (var i = 0; i < folders.length; i++) {
		var folder = folders[i];
		var files = fs.readdirSync(path.join(examplesDir,folder));

		files = files.map(function (file) {
			var newpath = path.join(folder,file);
			return newpath.replace(new RegExp('\\' + path.sep, 'g'), '/');
		})

		// convert each file to an object
		files = files.map(function(file){
			return {
				title : '',
				file : file
			}
		});

		// first filter out non html files (.DS_Store files in particular!)
		// parse the <title> tag and create a title and a slug
		files = files.filter(function(file){
			return (file.file.indexOf(".html") !== -1);
		})
        .map(function (file) {


			var buff = fs.readFileSync(path.join(examplesDir,file.file),'utf8');
			var str = buff.toString()
			var startIndex = str.indexOf("<title>") + 7;
		    var endIndex = str.indexOf("</title>");
		    var title = str.substr(startIndex, endIndex - startIndex);

			file.title = title;
			file.slug = toSlug(title);
			file.file = path.join(examplesDir,file.file);
			file.file = file.file.replace(/\\+/g, '/');
			return file;
		})

	    json.examples.push({
	    	category : folder,
	    	files : files
	    });
	}


	fs.writeFile('examples.json', JSON.stringify(json, null, 4),function () {
		console.log('examples generated mate')
	});

    // files.map(function (file) {
    //     return path.join(p, file);
    // }).filter(function (file) {
    //     return fs.statSync(file).isFile();
    // }).forEach(function (file) {
    //     console.log("%s (%s)", file, path.extname(file));
    // });
});

function toSlug (str) {

  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes
	return str;
}
