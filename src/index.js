let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  addToyInfo()

  form.addEventListener("submit", addNewToy)
});

const form = document.querySelector(".add-toy-form")
const collection = document.querySelector("#toy-collection")
  

function addToyInfo() {
  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(data => {
      data.forEach(toy => {
        const card = document.createElement("div")
        card.classList.add("card")
    
        const h2 = document.createElement("h2")
        h2.innerText = toy.name
        card.appendChild(h2)
    
        const img = document.createElement("img")
        img.setAttribute("src", toy.image)
        img.classList.add("toy-avatar")
        card.appendChild(img)
    
        const p = document.createElement("p")
        p.innerText = toy.likes
        card.appendChild(p)
    
        const btn = document.createElement("button")
        btn.classList.add("like-btn")
        btn.id = toy.id
        btn.innerText = " Like ♥ " // ♥ ♡
        card.appendChild(btn)

        card.querySelector(".like-btn").addEventListener("click", () => {
          toy.likes++
          card.querySelector("p").innerText = toy.likes
          likeToy(toy)
        })
    
        collection.appendChild(card)
      })
    })
}

function addNewToy(event) {
  // const formData = {
  //   "name": "Jessie",
  //   "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
  //   "likes": 0
  // }

  event.preventDefault()

  const nameInput = document.querySelector("input[name='name']")
  const imageInput = document.querySelector("input[name='image']")

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      name: nameInput.value,
      image: imageInput.value,
      likes: 0,
    }),
  })
    .then(res => res.json())
    .then(toy => {
      const card = document.createElement("div")
      card.classList.add("card")
  
      const h2 = document.createElement("h2")
      h2.innerText = toy.name
      card.appendChild(h2)
  
      const img = document.createElement("img")
      img.setAttribute("src", toy.image)
      img.classList.add("toy-avatar")
      card.appendChild(img)
  
      const p = document.createElement("p")
      p.innerText = toy.likes
      card.appendChild(p)
  
      const btn = document.createElement("button")
      btn.classList.add("like-btn")
      btn.id = toy.id
      btn.innerText = " Like ♥ "
      card.appendChild(btn)

      card.querySelector(".like-btn").addEventListener("click", () => {
        toy.likes++
        card.querySelector("p").innerText = toy.likes
        likeToy(toy)
      })
  
      collection.appendChild(card)
    })

  form.reset()
}

function likeToy(toy) {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": toy.likes
    })
  })
  .then(res => res.json())
}
