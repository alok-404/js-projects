let pr = new Promise(function(resolve,reject){
    setTimeout(()=>{
        let rn = Math.floor(Math.random()*10)
        if(rn > 5) resolve( "resolve with " + rn)
        else reject("rejected with " + rn)
    },1000)
})

//then catch
// pr.then(function(val){
//     console.log( val);
// }).catch(function(val){
//     console.log(val);
// })

//async await

async function abcd() {
    try {
        let val = await pr;
        console.log(val);
        
    } catch (error) {
        console.log(error);
        
    }
}

abcd()