function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

function fillId(){
	var id = getURLParameter('id');
	if(id != null)
		document.forms["connect"].id.value = id;
}
fillId();