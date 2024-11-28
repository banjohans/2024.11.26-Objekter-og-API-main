//1. create an array of 5 person objects, the objects should contain first name last name, age and job properties, jobb should be a boolean.

const persons = [
  {
    firstName: "Hans Martin",
    lastName: "Austestad",
    age: 41,
    job: true,
  },
  {
    firstName: "Petter",
    lastName: "Elverheim",
    age: 40,
    job: false,
  },
  {
    firstName: "Stine",
    lastName: "Onarheim",
    age: 27,
    job: true,
  },
  {
    firstName: "Aria",
    lastName: "Hole",
    age: 63,
    job: false,
  },
  {
    firstName: "Magnhild",
    lastName: "Frøysvaag",
    age: 12,
    job: true,
  },
  {
    firstName: "Ove",
    lastName: "Tonstad",
    age: 15,
    job: false,
  },
  {
    firstName: "Sander",
    lastName: "Paulsen",
    age: 9,
    job: true,
  },
];
console.log(persons);

//------------------------------------------------------------------------------------------------------------------------------------------------

//2. print First and last name of the first person in the array. using dot notation on firstname and bracket notation last name
//------------------------------------------------------------------------------------------------------------------------------------------------

console.log(persons[0].firstName + " " + persons[0]["lastName"]); // logs the first persons name, adds person 1's variable 1 + gap + person 1's variable 2.

//3. That was tiresome.. just so much typing. Lets write a method to that we never need to that again..
//create a method in every person object that returns first and last name, call it fullName. This can be done manually for each one or with a loop.
//Print fullName of the second person in the array by calling the method.
//------------------------------------------------------------------------------------------------------------------------------------------------

persons.forEach((person) => {
  person.fullName = function () {
    return this.firstName + " " + this.lastName;
  };
});

console.log(persons[1].fullName());

//4. Its the third person's birthday! And their job status changed. Update their age and job status using dot notation.
//------------------------------------------------------------------------------------------------------------------------------------------------

persons[2].age += 1; // Increment age by 1
persons[2].job = !persons[2].job; // Toggle boolean to change jobstatus

//5. Person three is throwing a giant party! create a function called fotballPubben(). The function should check if the person is over 18, print "party time" if they are and "too young" if they are not. It should also print the name of the person.
// use a loop to call the function for every person in the array.
//------------------------------------------------------------------------------------------------------------------------------------------------

function fotballPubben(person) {
  if (person.age > 18) {
    console.log(person.fullName() + ": Party time!");
  } else {
    console.log(person.fullName() + ": too young :(");
  }
}
persons.forEach(fotballPubben);

//6. It's time for school! Create a function called university. It should take in a person object as well as type of degree (bachelors or masters) as arguments.
// The function should update age and add two properties called "degree" and "student loan". The value of age, degree and student loan should change depending on what degree
//was passed into the function. Send one person to uni and print the result.
//------------------------------------------------------------------------------------------------------------------------------------------------

const loan = 151690; // yearly loan estimate from lånekassen.no

function university(person, degree) {
  if (degree === "bachelors") {
    person.age += 3; // Three year bachelordegree
    person.degree = "Bachelors";
    person.studentLoan = loan * 3; // loan for 3 year bachelor
  } else if (degree === "masters") {
    person.age += 5; // three year bachelor plus two year masterdegree
    person.degree = "Masters";
    person.studentLoan = loan * 5; // loan for 5 year masters
  }
  console.log(person); // Print updated person object
}

// Example usage: Send the second person in array to the university
university(persons[1], "bachelors");
university(persons[2], "masters");

console.log(persons); // print persons array and see that the graduates are correctly registered

// 7. API TIME!
// Read the documentation of this dog API: https://dog.ceo/dog-api/documentation/
// Fetch 4 dogs of the same breed or sub-breed and display them in the DOM
//feel free to change the ID of the images and/or add css.
//------------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const revealButton = document.getElementById("revealButton");
  const breedElement = document.getElementById("breed");

  // Initially hide the breed element
  breedElement.style.display = "none";

  revealButton.addEventListener("click", () => {
    if (breedElement.style.display === "none") {
      breedElement.style.display = "block";
      revealButton.textContent = "Hide Breed";
    } else {
      breedElement.style.display = "none";
      revealButton.textContent = "Reveal Breed";
    }
  });
});

// Function grabs the string from the first letter, and Capitalizes it. Slices from the next letter, doing nothing to the rest.
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Fetch all breeds
fetch(`https://dog.ceo/api/breeds/list/all`)
  .then((response) => response.json())
  .then((data) => {
    const breeds = Object.keys(data.message);

    // Function to filter breeds with at least 4 images
    function filterValidBreeds() {
      const validBreeds = [];
      const breedCount = breeds.map((breed) => {
        return fetch(`https://dog.ceo/api/breed/${breed}/images`)
          .then((response) => response.json())
          .then((imageData) => {
            if (imageData.message.length >= 4) {
              validBreeds.push(breed);
            }
          });
      });

      return Promise.all(breedCount).then(() => validBreeds);
    }

    // Filter valid breeds and select a random breed
    filterValidBreeds()
      .then((validBreeds) => {
        if (validBreeds.length === 0) {
          throw new Error("No breeds with at least 4 images found.");
        }

        const randomBreed =
          validBreeds[Math.floor(Math.random() * validBreeds.length)];
        console.log(`Selected breed: ${randomBreed}`);

        // Update the breed element's text with the random breed
        document.getElementById("breed").innerText =
          "This dog breed is called: " + capitalizeFirstLetter(randomBreed);

        // Fetch 4 random images for the selected breed
        fetch(`https://dog.ceo/api/breed/${randomBreed}/images`)
          .then((response) => response.json())
          .then((data) => {
            const dogPictures = data.message;
            document.getElementById("dog1").src = dogPictures[0];
            document.getElementById("dog2").src = dogPictures[1];
            document.getElementById("dog3").src = dogPictures[2];
            document.getElementById("dog4").src = dogPictures[3];

            console.log(
              `Fetched images for breed: ${randomBreed}, ${dogPictures}`
            );
          });
      })
      .catch((error) => console.error("Error fetching images:", error));
  })
  .catch((error) => console.error("Error fetching breeds", error));

//BONUS!!
//create a way for you to change the breed of the dogs displayed on your page
//------------------------------------------------------------------------------------------------------------------------------------------------
