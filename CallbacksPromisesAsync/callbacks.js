function kuchDeerBaadChalne(fnc){
    setTimeout(fnc,Math.floor(Math.random()*10*1000))
}

kuchDeerBaadChalne(function(){
    console.log("hello");
    
})