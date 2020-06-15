	
// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

//vegetables, protein, grains, candy, fruit
var products = [
	{
		name: "brocoli",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		price: 1.99,
		category:'vegetables',
		image:''
	},
	{
		name: "bread",
		vegetarian: true,
		glutenFree: false,
		organic: true,
		price: 2.35,
		category:'grains',
		image:''
	},
	{
		name: "salmon",
		vegetarian: false,
		glutenFree: true,
		organic: true,
		price: 10.00,
		category:'protein',
		image:''
	},
	{
		name: "chicken",
		vegetarian: false,
		glutenFree: true,
		organic: false,
		price: 6.00,
		category:'protein',
		image:''
	},
	{
		name: "pork",
		vegetarian: false,
		glutenFree: true,
		organic: false,
		price: 7.00,
		category:'protein',
		image:''
	},
	{
		name: "eggs",
		vegetarian: false,
		glutenFree: true,
		organic: true,
		price: 3.50,
		category:'protein',
		image:''
	},
	{
		name: "lettuce",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		price: 2.00,
		category:'vegetables',
		image:''
	},
	{
		name: "Cookies",
		vegetarian: false,
		glutenFree: false,
		organic: false,
		price: 3.00,
		category:'candy',
		image:''
	},
	{
		name: "Vegan Cookies",
		vegetarian: true,
		glutenFree: false,
		organic: false,
		price: 4.00,
		category:'candy',
		image:''
	},
	{
		name: "Oranges",
		vegetarian: true,
		glutenFree: true,
		organic: false,
		price: 2.00,
		category:'fruit',
		image:''
	},

];
	


// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods, restriction, category) {
	let product_names = [];
	let result = true;
            for (let i=0; i<prods.length; i+=1) {
                result = true;
                for (let j=0, res; res = restriction[j]; j++){
                    if(prods[i][res]==false){
                        result=false;
                    }
                }
                if(result==true){
                    product_names.push(prods[i].name)
                }
		}

	for(let i=0;i<prods.length;i++){

		if(product_names.indexOf(prods[i].name)!==-1){
			if(prods[i].category !== category){
				var index = product_names.indexOf(prods[i].name)
				product_names.splice(index,1)
			}
		}
	}


	return product_names;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
	totalPrice = 0;
	for (let i=0; i<products.length; i+=1) {
		if (chosenProducts.indexOf(products[i].name) > -1){
			totalPrice += products[i].price;
		}
	}
	return totalPrice;
}
