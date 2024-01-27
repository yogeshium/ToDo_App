$('textarea').each(function() {
        $(this).height($(this).prop('scrollHeight'));
});

$('.newTask').focus();

/* [Event Delegation - jquery] */
/* When clicking editIcon */
$(document.body).on("click",".editIcon",function(){
    $(this).next().hide(); // hide binIcon
    $(this).attr("src","../icons/tick_icon.png"); //replace editIcon to tickIcon
    $(this).removeClass("editIcon"); //remove class editIcon to image 
    $(this).addClass("tickIcon"); //add class tickIcon to image 
    $(this).prev().focus().select().removeAttr("readonly");//focusing and selecting that text area

    // Baki saare elements block karna hai jb hum ek ko edit kr rhe hai
    $(this).parent().addClass("editing");
    $(".task").each(function(){
        if(!$(this).hasClass("editing"))
        {
            $(this).children().prop("disabled",true);
        }
    });
});

/* when clicking checkbox */
$(document.body).on("click",".checkIcon",function(){
    // if($(this).next().hasClass("taskText"))
    if($(this).is(":checked"))
    {
        $(this).next().next().removeClass("taskText");
        $(this).next().next().addClass("taskCompleted");
        $(this).next().next().next().css("display","none"); // hidding editIcon
    }
    else
    {
        $(this).next().next().removeClass("taskCompleted");
        $(this).next().next().addClass("taskText");
        $(this).next().next().next().css("display","block"); // showing editIcon
    }
});

/* [Event Delegation - jquery] */
//When click on tickIcon - submit button should trigger
$(document.body).on("click",".tickIcon",function(){
    $(this).next().next().click();
});
//When click on removeIcon - submit input should trigger
$(document.body).on("click",".removeIcon",function(){
    $(this).next().next().click();
});