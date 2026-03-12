// //this ki value global scope mn

// console.log(this);

// //this ki value function ke ander

// function xyz() {
//   console.log(this);
// }
// xyz();

// //this ki value method ke ander

// let object = {
//   name: "alok",
//   age: 22,
//   sayName: function () {
//     console.log(this);
//     console.log(this.name);
//     console.log(this.age);
//   },
// };
// object.sayName();

// //this ki value method ke ander jo ki arrow fnc hI USPE WINDOWS KI JGHA OBJECT CHAIYE TOH NICHE WALA KAAM KRNA HAI9

// let obj = {
//   name: "alok",
//   age: 22,
//   sayName: function () {
//     let defg = ()=>{
//         console.log(this);
//     }
//     defg()
//   },
// };
// obj.sayName();

// //this ki value eventListener ke ander whi element h jispe eventlistener laga hai;

// document.querySelector("h1").addEventListener("click", function () {
//   console.log(this);
//   console.log(this.style.color = "red");
// });

// //this ki value class ke ander blank object hoti hai;

// class Abcd{
//     constructor(){
//         console.log("hihihi");
//         this.a = 12        
//     }
// }

// let val = new Abcd()

//call 

let objCall = {
    name:"alok",
    age:22,
}

function efgh(){
    console.log(this)//jb ise normal call kiya toh windows mila
}  

efgh()//normally fnc call and windows mila console pe
efgh.call(objCall) //console pe ab object milega and this is called call method of this