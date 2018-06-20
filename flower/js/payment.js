$(function(){
    $(".delete").click(function(){
        $(this).parent("td").parent("tr").remove();
    })
})