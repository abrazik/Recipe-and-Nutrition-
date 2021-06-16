// function to get recipes from the API. app_id, app_key are declared as variables
function getRecipes(dietKey) {
  var mainContainer = document.getElementById("myData");
  var app_id = "fb023251";
  var app_key = "6c3b51083603e37b5d7d3442be4a2df2";
  removePreviousRecipes();

  fetch(
    `https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}&app_key=${app_key}&diet=${dietKey}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())  // displays response in json
    .then(function (data) {
      console.log(data);
      // loop creates layout for each object called
      for (var i = 0; i < data.hits.length; i++) {  
         // creates div element
        var div = document.createElement("div");   
           // adds class to 'columns' class to element
        div.classList.add("columns");
        div.innerHTML = `
          <div class="column is-1 recipe-photo">
            <img src="${data.hits[i].recipe.image}" style="width:100%;"> 
          </div>
          <div class="column info">
            <h3>${data.hits[i].recipe.label}</h3>
            <a href="page.html" onclick="setURI('${data.hits[i]._links.self.href}')" class="button">View Recipe</a>
          </div>
        `;
        // appends new element to ID
        mainContainer.appendChild(div);
      }
    })
    .catch((error) => {
      console.error("Error:", error); // if there is an error, console log displays error
    });
}

// saving URI to local storage so it can be used to display recipe 
function setURI(uri) {
  localStorage.setItem("uri", uri);
}
// function for creating single recipe page layout
function getRecipe() {
   // same as before, gets ID
  var mainContainer = document.getElementById("myRecipe");
   // gets stored URI
  let getURI = localStorage.getItem("uri");
  console.log(getURI);
  fetch(getURI, {
    method: "GET",
  })
    .then((response) => response.json())
    .then(function (data) {
      console.log(data.recipe);
      var div = document.createElement("div");
      
      // get all needed objects within object
      // will use map method to output data within template literal
      
      var obj = data.recipe.ingredientLines;
      var nutritional = data.recipe.totalNutrients;
      var daily = data.recipe.totalDaily;
      console.log(nutritional);
      div.classList.add("columns");
      div.innerHTML = `
          <div class="column is-4 recipe-photo">
            <img src="${data.recipe.image}" style="width:100%;">  
          </div>
          <div class="column is-8">
            <h3>${data.recipe.label}</h3> 
            <strong>Yield:</strong> ${data.recipe.yield}<br />
            <strong>Prep Time:</strong> ${data.recipe.totalTime} minutes
            <hr />
            <p><strong>Ingredients:</strong></p>
            <ul>
               ${Object.keys(obj)
                 .map(function (key) {
                   return "<li>" + obj[key] + "</li>";
                 })
                 .join("")}
            </ul>
            <hr />
            <p><strong>Nutritional Data:</strong></p>
            <ul>
            ${Object.keys(daily)
              .map(function (key) {
                return (
                  "<li>" +
                  daily[key].label +
                  ": " +
                  daily[key].quantity.toFixed(2) +
                  daily[key].unit +
                  "</li>"
                );
              })
              .join("")}
              </ul>
              <hr />
              <strong>Daily Amounts:</strong>
              <ul>
                            ${Object.keys(nutritional)
                              .map(function (key) {
                                return (
                                  "<li>" +
                                  nutritional[key].label +
                                  ": " +
                                  nutritional[key].quantity.toFixed(2) +
                                  nutritional[key].unit +
                                  "</li>"
                                );
                              })
                              .join("")}
                              </ul>
          </div>
        `;
      mainContainer.appendChild(div);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


  // psuedo reset, removes all HTML contained within the ID 
function removePreviousRecipes() {
  let parent = document.getElementById("myData");
  parent.innerHTML = "";
}
