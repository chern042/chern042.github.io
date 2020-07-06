var slider = document.getElementById("myRange");
var output = document.getElementById("rangeOutput");
var sliderAmount = slider.value*10
output.innerHTML = sliderAmount; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value*10;
}