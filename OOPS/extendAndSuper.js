class Users {
  constructor(name, address, username, email) {
    this.name = name;
    this.address = address;
    this.username = username;
    this.email = email;
    this.role = "user";
  }

  checkRole(){
    console.log("you are " + this.role);
    
  }

  write(text) {
    let h1 = document.createElement("h1");
    h1.textContent = `${this.name} : ${text}`;
    document.body.append(h1);
  }
}

class Admin extends Users {
  constructor(name, address, username, email){
    super(name, address, username, email);
    this.role = "admin"
  }

  remove(){
    document.querySelectorAll("h1").forEach((elem)=>{
      elem.remove();
    })
  }
}



let u1 = new Users("Alok","Rishikesh","alok123","aluu123@gmail.com",)
let u2 = new Users("Saloni","Dehradun","saloni123","saluu123@gmail.com",)
let a1 = new Admin("Admin","america","admin123","admin123@gmail.com",)