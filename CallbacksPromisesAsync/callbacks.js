function kuchDeerBaadChalne(fnc) {
  setTimeout(fnc, Math.floor(Math.random() * 10 * 1000));
}

kuchDeerBaadChalne(function () {
  //   console.log("hello");
}); //this is called callBack function

//--------Now this is Callback Hell..-------

function profileLekarAoo(username, cb) {
  console.log("fetching profile data...");

  setTimeout(() => {
    cb({ _id: 1234324, username, age: 22, email: "huihui@mail.com" });
  }, 2000);
} //it it kind of library wala function

function saarePostLekarAao(id, cb) {
  console.log("fetching all posts...");

  setTimeout(() => {
    cb({ _id: id, posts: ["hey", "hello", "kemcho", "mazaMa"] });
  }, 3000);
}

function savedPostLekarAao(id, cb) {
  console.log("fetching all saved...");
  setTimeout(() => {
    cb({ _id: id, saved: 10 });
  },5000);
}

profileLekarAoo("alok", function (data) {
  console.log(data);
  saarePostLekarAao(data._id, function (posts) {
    console.log(posts);
      savedPostLekarAao(data._id, function (saved) {
    console.log(saved);
  });
  });

});
