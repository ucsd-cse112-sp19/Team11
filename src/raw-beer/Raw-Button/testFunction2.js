
export function pullNav(){
    console.log("hello");
    
    var $body = document.querySelector("body");
    
    var button1 = document.createElement("beer-button");
    var button2 = document.createElement("beer-button");
    var button3 = document.createElement("beer-button");
    button1.setAttribute("navBarID", "navNav");
    button2.setAttribute("navBarID", "navNav");
    button3.setAttribute("navBarID", "navNav");
    $body.appendChild(button1);
    $body.appendChild(button2);
    $body.appendChild(button3);
    setTimeout(function(){
        var currNav = document.createElement("beer-navbar");
        console.log("hello3");
        $body.appendChild(currNav);
        currNav.setAttribute("navBarID", "navNa");
        currNav.setAttribute("navBarID", "navNav");
    }, 1000);
    console.log("hello2");
}