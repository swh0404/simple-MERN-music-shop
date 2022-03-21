$(document).ready(function () {
    // Populate the commodity list on initial page load
    populateCommodityList();
});

// Functions =============================================================
// Fill commodity list with actual data
function populateCommodityList() {
    // Empty content string
    var listMusic = '<table > <tr><th>MusicId</th><th>MusicName</th><th>Category</th>\
    <th>Composer</th><th>Description</th><th>Price</th><th>Published</th><th>New Arrival</th></tr>';

   // jQuery AJAX call for JSON
    $.getJSON('/musics', function (data) {
        // Put each item in received JSON collection into a <tr> element 
        $.each(data, function () {
            listMusic += '<tr><td>' + this.MusicId + '</td><td>'+
              this.MusicName +'</td><td>' +
              this.Category + '</td><td>'+
              this.Composer + '</td><td>'+
              this.Description + '</td><td>'+
              this.Price + '</td><td>'+
              this.Published + '</td><td>'+
              this['New Arrival'] + '</td></tr>';		
        });
        listMusic += '</table>'
        
	// Inject the whole commodity list string into our existing #commodityList element
        $('#musicList').html(listMusic);
    });
};