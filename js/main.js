const API = {

	btnSearchFull: document.getElementById("btn-search-full"),
	btnSearchId: document.getElementById("btn-search-id"),
	// inputSearchSynch: document.getElementById("city​-synch"),

	selectSynch:document.getElementById("select-synch"),

	divEstate: document.getElementById("estate"),

	completeSelect: function(res) {
		// for (let i = 0; i < res.data.length; i++) {
		// 	let option = document.createElement("option");
		// 	option.text = res.data[i].city;
		// 	API.selectSynch.add(option);
		// }

		let id = 0;
		for (let i = 0; i < res.data.length; i++) {
			let option = document.createElement("option");
			++id;
			option.id = id;
			option.text = res.data[i].city;

			if(!document.getElementById(id)) {
				API.selectSynch.add(option);	
			}
		}
	},

	showResult: function(res) {		
		let html = '';
		function buildHTML(data) {
			html += `
				<div class="estate-wrapper">
					<div>${data.city}</div>
					<div>${data.apartment}</div>
					<div>${data.price}</div>
					<div>${data.street}</div>
				</div>
			`;
			return html;
		}

		for (let i = 0; i < res.data.length; i++) {
			 buildHTML(res.data[i]);
		}

		API.divEstate.innerHTML = html;
	},

	setUrl: {
		getAll: 'https://alfa.propertygrouppoland.pl/q/przemyslawgrochal/getAll',
		getId:  'https://alfa.propertygrouppoland.pl/q/przemyslawgrochal/',
		create: 'https://alfa.propertygrouppoland.pl/q/przemyslawgrochal/create',
		update: 'https://alfa.propertygrouppoland.pl/q/przemyslawgrochal/update',
		delete: 'https://alfa.propertygrouppoland.pl/q/przemyslawgrochal/delete'
	},

	ajax: function(url, method, eventID) {
		var xhttp = new XMLHttpRequest();
		xhttp.open(method, url, true);

		//xhttp.setRequestHeader('Content-Type', 'application/json')
		xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {

		        let res = JSON.parse(this.response);

		        if(eventID === 0) {
		        	API.showResult(res);
		        }

		        if(eventID === 1) {
		        	API.completeSelect(res);
		        }
		    }
		};

		xhttp.send();
	},

	checkAction: function(e) {
		if(e) {
			e.preventDefault();

			if(e.target.id === "btn-search-full") {
				API.ajax(API.setUrl.getAll, 'GET', 0);
			}

			// if(e.target.id === "select-synch") {
			// 	API.ajax(API.setUrl.getAll, 'GET', 1);
			// }
		}
		
		(function(){
			API.ajax(API.setUrl.getAll, 'GET', 1);	
		})();
	},

	initEvents: function() {
		this.checkAction();
		this.btnSearchFull.addEventListener("click", this.checkAction, false);
		this.selectSynch.addEventListener("change", this.checkAction, false);		
	}
}

document.addEventListener("DOMContentLoaded", function() {
   API.initEvents();
});