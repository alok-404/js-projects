const form = document.querySelector("#profileForm");
const username = document.querySelector("#name");
const role = document.querySelector("#role");
const bio = document.querySelector("#bio");
const image= document.querySelector("#image");
const profileGrid = document.querySelector("#profileGrid");



const userManager = {
  users: [],
  init: function () {
    form.addEventListener("submit",this.submitForm.bind(userManager));//we can also write this.submitForm.bind(this)
  },
  submitForm: function (e) {
    e.preventDefault();
    // console.log(this);
    this.addUser()
  },
  addUser: function () {
    this.users.push({
        username : username.value,
        role : role.value,
        bio:bio.value,
       imageUrl:image.value
    })
    form.reset();
    this.renderUi()
  },
  renderUi:function(){
    //for avoiding duplicates
    profileGrid.innerHTML = ""

    this.users.forEach((user,index)=>{
        // 1. Create the main card container
    const card = document.createElement('div');
    card.classList.add('profile-card');

    // 2. Create and set the Image
    const img = document.createElement('img');
    img.src = user.imageUrl || 'https://via.placeholder.com/150'; // Fallback image
    img.alt = `${name}'s profile picture`;
    img.classList.add('profile-img');

    // 3. Create the info container
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('profile-info');

    // 4. Create Name (h3)
    const nameHeading = document.createElement('h3');
    nameHeading.textContent = user.username;

    // 5. Create Role (p)
    const roleTag = document.createElement('p');
    roleTag.classList.add('role-tag');
    roleTag.textContent = user.role;

    // 6. Create Bio (p)
    const bioText = document.createElement('p');
    bioText.classList.add('bio-text');
    bioText.textContent = user.bio;

    // 7. Assemble the pieces
    infoDiv.appendChild(nameHeading);
    infoDiv.appendChild(roleTag);
    infoDiv.appendChild(bioText);

    card.appendChild(img);
    card.appendChild(infoDiv);

    profileGrid.appendChild(card)

    card.addEventListener("click",()=>{
        this.removeUser(index);
        
    })
    })
    
  },
  removeUser: function (index) {
   this.users = this.users.filter((_, i) => i !== index);
    this.renderUi()
  },
};

userManager.init();
