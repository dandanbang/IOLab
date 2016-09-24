function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

$(".clickable").click(function(){
                    console.log(this.id)
                    counterID = '#c'.concat(this.id.slice(-1))
                    currentVal = parseInt($(counterID).text());
                    newVal = currentVal + 1;
                    $(counterID).text(newVal);
                    $(counterID).css('font-size', newVal+15);
                    $(counterID).css('color', getRandomColor());
});

