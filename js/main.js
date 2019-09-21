var xhttp = new XMLHttpRequest();
xhttp.open("GET", "https://alfa.propertygrouppoland.pl/q/przemyslawgrochal/getAll", true);
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let translate = JSON.parse(this.response);
        console.log(translate);
    }
};
xhttp.send();