class CreatePencil {
  constructor(name,price, color, company) {
    this.name = name;
    this.price = price;
    this.color = color;
    this.company = company;
  }

  erase(){
    document.querySelectorAll("h1").forEach((elem)=>{
        if(elem.style.color === this.color){
            elem.remove()
        }
    })
  }
  write(text) {
    let h1 = document.createElement("h1");
    h1.textContent = text; //this.text nhi hua kyoki text hume yahi accept krna hai
    h1.style.color = this.color;
    document.body.append(h1);
  }
}



let p1 = new CreatePencil("Natraj",8,"black","natraj")
let p2 = new CreatePencil("Doms",10,"red","doms")
let p3 = new CreatePencil("apsara",10,"gray","natraj")