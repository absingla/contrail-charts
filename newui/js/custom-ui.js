// JavaScript Document
$(document).ready(function($) {
  
    //-- Activate sidebar
    if ($('.nav-sidebar').length != 0)
    {
        $('.nav-sidebar').metisMenu();
    }
    
    
    //-- Open / close sidebar menu on mobile
    $('.mobilebar .navbar-toggle').on('click', function(e){
        e.preventDefault();
       
        $('body').addClass('showmenu');
        
    });
    
    $('.overlay').on('click', function(e){
        
        e.preventDefault();
        $('body').removeClass('showmenu');
        
    });

});

