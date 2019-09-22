const API = {

	btnSearchFull: document.getElementById("btn-search-full"),
	btnSearchId: document.getElementById("btn-search-id"),
	btnCreate: document.getElementById("btn-create"),
	btnRemoveAll: document.getElementById("btn-remove-all"),
	selectSynch:document.getElementById("select-synch"),
	divEstate: document.getElementById("estate"),
	divEstateId: document.getElementById("estate-id"),

	removeAllItems: function() {
		let items = document.querySelectorAll('[data-remove="remove"]');

		for(let i = 0; i < items.length; i++) {
			items[i].remove();
		}
	},

	checkItemToRemove: function(item) {
		let parent = item.parentElement.parentElement;
		parent.remove();

		let itemId = item.parentElement.parentElement.dataset.id;
		return itemId;
	},

	getBtnRemove: function() {
		let btnRemove = document.querySelectorAll('[data-x]');

		for(let i = 0; i < btnRemove.length; i++) {
			btnRemove[i].addEventListener("click", API.checkAction, false);
		}	
	},

	getValueToCreate: function() {
		let newElementEstate = document.querySelectorAll('[data-value]');
		let sendData = {};

		for (let i = 0; i < newElementEstate.length; i++) {
			if(newElementEstate[i].id === "city"){
				sendData.city = newElementEstate[i].value;
			}

			if(newElementEstate[i].id === "street"){
				sendData.street = newElementEstate[i].value;
			}

			if(newElementEstate[i].id === "property"){
				sendData.property = newElementEstate[i].value;
			}

			if(newElementEstate[i].id === "apartment"){
				sendData.apartment = newElementEstate[i].value;
			}

			if(newElementEstate[i].id === "price"){
				sendData.price = newElementEstate[i].value;
			}

			if(newElementEstate[i].id === "type"){
				sendData.type = newElementEstate[i].value;
			}

			if(newElementEstate[i].id === "description"){
				sendData.description = newElementEstate[i].value;
			}
		}

		return JSON.stringify(sendData);
	},

	showItem: function(res) {
		let html = 
			'<div class="estate-wrapper" data-remove="remove" data-id="'+ res.data.id +'">' +
				'<div>' +
					'<div>' + res.data.city + '</div>' +
					'<div>' + res.data.apartment + '</div>' +
					'<div>' + res.data.price + '</div>' +
					'<div>' + res.data.street + '</div>' +
				'</div>' +	
				'<div>' +
					'<button data-x="x" class="estate-x">x</button>' +
					'<button data-x="x" class="estate-x">Aktualizuj</button>' +
				'</div>' +
			'</div>'
		;

		API.divEstateId.innerHTML = html;
	},

	completeSelect: function(res) {
		let id = 0;

		for (let i = 0; i < res.data.length; i++) {

			let option = document.createElement("option");
			++id;
			option.id = id;
			option.text = res.data[i].city;
			option.dataset.id = res.data[i].id;

			if(!document.getElementById(id)) {
				API.selectSynch.add(option);	
			}
		}
	},

	showLotItems: function(res) {	
		this.btnRemoveAll.style.display = "block";

		let html = '';
		function buildHTML(data) {
			html += 
				'<div class="estate-wrapper" data-remove="remove" data-id="'+ data.id +'">' +
					'<div>' +
						'<div>' + data.city + '</div>' +
						'<div>' + data.apartment + '</div>' +
						'<div>' + data.price + '</div>' +
						'<div>' + data.street + '</div>' +
					'</div>' +	
					'<div>' +
						'<button data-x="x" class="estate-x">x</button>' +
						'<button>Aktualizuj</button>' +
					'</div>' +
				'</div>'
			;

			return html;
		}

		for (let i = 0; i < res.data.length; i++) {
			 buildHTML(res.data[i]);
		}

		API.divEstate.innerHTML = html;
	},

	setUrl: {
		getAll: 'https://alfa.propertygrouppoland.pl/q/przemyslawgrochal/getAll',
		getId:  'https://alfa.propertygrouppoland.pl/q/przemyslawgrochal/get/',
		create: 'https://alfa.propertygrouppoland.pl/q/przemyslawgrochal/create',
		update: 'https://alfa.propertygrouppoland.pl/q/przemyslawgrochal/update',
		delete: 'https://alfa.propertygrouppoland.pl/q/przemyslawgrochal/delete/',
		deleteAll: 'https://alfa.propertygrouppoland.pl/q/przemyslawgrochal/deleteAll'
	},

	ajax: function(url, method, eventID, json) {
		var xhttp = new XMLHttpRequest();
		xhttp.open(method, url, true);

		// if(json !== 'undefined') {
		// 	xhttp.setRequestHeader('Content-Type', 'application/json');
		// } else {
		// 	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		// }

		xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {

		        let res = JSON.parse(this.response);

		        if(eventID === 0) {
		        	API.completeSelect(res);
		        }

		        if(eventID === 1) {
		        	API.showLotItems(res);
		        	API.getBtnRemove();
		        }

		        if(eventID === 2) {
		        	API.showItem(res);
		        	API.getBtnRemove();
		        }

		        if(eventID === 3) {
		        	if(res.status === "success") {
		        		alert("Dane wysłane prawidłowo");
		        		API.getBtnRemove();
		        	}
		        }

		        if(eventID === 4) {
		        	API.getBtnRemove();
		        }

		        if(eventID === 5) {
		        	API.getBtnRemove();
		        	API.btnRemoveAll.style.display = "none";
		        }
		    }
		};

		xhttp.send(json);
	},

	checkAction: function(e) {
		if(e) {
			e.preventDefault();

			if(e.target.id === "btn-search-full") {
				API.ajax(API.setUrl.getAll, 'GET', 1);
			}

			if(e.target.id === "select-synch") {
				let id = e.target.selectedOptions[0].dataset.id;
				API.ajax(API.setUrl.getId + id, 'GET', 2);
			}

			if(e.target.id === "btn-create") {
				API.ajax(API.setUrl.create, 'POST', 3, API.getValueToCreate());
			}

			if(e.target.dataset.x === "x") {
				API.ajax(API.setUrl.delete + API.checkItemToRemove(e.target), 'POST', 4);
			}

			if(e.target.id === "btn-remove-all") {
				API.removeAllItems();
				API.ajax(API.setUrl.deleteAll, 'POST', 5);
			}
		}
		
		(function(){
			API.ajax(API.setUrl.getAll, 'GET', 0);	
		})();
	},

	initEvents: function() {
		this.checkAction();
		this.btnSearchFull.addEventListener("click", this.checkAction, false);
		this.selectSynch.addEventListener("click", this.checkAction, true);	
		this.btnCreate.addEventListener("click", this.checkAction, true);
		this.btnRemoveAll.addEventListener("click", this.checkAction, false);
	}
}

document.addEventListener("DOMContentLoaded", function() {
   API.initEvents();
});