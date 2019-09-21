const API = {

	btnSearchFull: document.getElementById("btn-search-full"),
	btnSearchId: document.getElementById("btn-search-id"),
	divEstate: document.getElementById("estate"),

	showResult: function(res) {

		function viewHelp(data) {
			console.log(data);
			console.log(data.id);
			console.log(data.city);
			
		}

		for (let i = 0; i < res.data.length; i++) {
			viewHelp(res.data[i]);
		}
	},

	setUrl: {
		getAll: 'https://alfa.propertygrouppoland.pl/q/przemyslawgrochal/getAll',
		getId:  'https://alfa.propertygrouppoland.pl/q/przemyslawgrochal/',
		create: 'https://alfa.propertygrouppoland.pl/q/przemyslawgrochal/create',
		update: 'https://alfa.propertygrouppoland.pl/q/przemyslawgrochal/update',
		delete: 'https://alfa.propertygrouppoland.pl/q/przemyslawgrochal/delete'
	},

	ajax: function(url, method) {
		var xhttp = new XMLHttpRequest();
		xhttp.open(method, url, true);

		//xhttp.setRequestHeader('Content-Type', 'application/json')
		xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {

		        let res = JSON.parse(this.response);
		        API.showResult(res);
		    }
		};

		xhttp.send();
	},

	checkAction: function(e) {
		e.preventDefault();
		
		if(e.target.id === "btn-search-full") {
			API.ajax(API.setUrl.getAll, 'GET');
		}

		if(e.target.id === "btn-search-id") {
			API.ajax(API.setUrl.getId, 'GET');
		}
	},

	initEvents: function() {
		this.btnSearchFull.addEventListener("click", this.checkAction, false);
		this.btnSearchId.addEventListener("click", this.checkAction, false);
	}
}

document.addEventListener("DOMContentLoaded", function() {
   API.initEvents();
});