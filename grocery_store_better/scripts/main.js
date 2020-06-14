
// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp


function openNav(evt, tabName, color, elmnt){//, elmnt, color) {
	//var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	tablinks = document.getElementsByClassName("tablink");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
		tablinks[i].style.backgroundColor = "";

	}
	console.log(elmnt, evt)
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";
	elmnt.style.backgroundColor = color;


}


// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos

function populateListProductChoices(slct1, slct2) {
	var s1 = document.getElementById(slct1);
	var s2 = document.getElementById(slct2);

	var checkedOpts = [];
	var category = s1[s1.length-2].value;


	for (let i=0; i<s1.length;i++){
		if(s1[i].checked){
			checkedOpts.push(s1[i].value)
		}
	}



	// s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
    s2.innerHTML = "";

	// obtain a reduced list of products based on restrictions
	var optionArray = restrictListProducts(products, checkedOpts, category);

	// for each item in the array, create a checkbox element, each containing information such as:
	// <input type="checkbox" name="product" value="Bread">
	// <label for="Bread">Bread/label><br>

	for (i = 0; i < optionArray.length; i++) {

		var productName = optionArray[i];
		// create the checkbox and add in HTML DOM
		var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.name = "product";
		checkbox.value = productName;
		s2.appendChild(checkbox);

		// create a label for the checkbox, and also add in HTML DOM
		var label = document.createElement('label')
		label.htmlFor = productName;
		label.appendChild(document.createTextNode(productName));
		s2.appendChild(label);

		// create a breakline node and add in HTML DOM
		s2.appendChild(document.createElement("br"));
	}
}
	
// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph) 
// We build a paragraph to contain the list of selected items, and the total price

function selectedItems(){
	
	var ele = document.getElementsByName("product");
	var chosenProducts = [];
	var productPrices = [];

	for(let i=0; i<ele.length;i++){
		if(ele[i].checked){
			chosenProducts.push(ele[i].value)
		}
	}

	for (let i=0; i<products.length; i+=1) {
		if (chosenProducts.indexOf(products[i].name) > -1){
			let item = {
				name:products[i].name,
				price:products[i].price
			};
			productPrices.push(item);
			var itemIndex = productPrices.indexOf(item);
			if(itemIndex>=1){
				for(let j=0;j<productPrices.length-1;j++){
					if(productPrices[itemIndex].price < productPrices[j].price){
						var temp = productPrices[j];
						productPrices[j] = productPrices[itemIndex];
						productPrices[itemIndex] = temp;
					}
				}
			}
		}
	}




	var c = document.getElementById('displayCart');
	c.innerHTML = "";
	
	// build list of selected item
	var para = document.createElement("P");
	para.innerHTML = "You selected : ";
	para.appendChild(document.createElement("br"));
	var paraChild = para.childNodes;
	for (let i = 0; i <productPrices.length; i++) {


		para.appendChild(document.createTextNode(productPrices[i].name+": "+productPrices[i].price));
			para.appendChild(document.createElement("br"));
	}



	// add paragraph and total price
	c.appendChild(para);
	c.appendChild(document.createTextNode("Total Price is " + getTotalPrice(chosenProducts)));
		
}

