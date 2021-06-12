// fetch('https://api.edamam.com/api/recipes/v2?type=public&app_id=fb023251&app_key=6c3b51083603e37b5d7d3442be4a2df')
//   .then(response => response.json())
//   .then(data => console.log(data));
// //Recipe Search API
// // var app_key ="6c3b51083603e37b5d7d3442be4a2df2";
// // var app_id ="fb023251"; 

//   fetch('https://api.edamam.com/api/recipes/v2?type=public&app_id=fb023251&app_key=6c3b51083603e37b5d7d3442be4a2df2&imageSize=SMALL')
//   .then(response => response.json())
//   .then(data => console.log(data));

var diets = [
  "balanced",
  "high-fiber",
  "high-protein",
  "low-carb",
  "low-fat",
  "low-sodium",
];

function getRecipes(dietKey) {
  var mainContainer = document.getElementById("myData");

  fetch(
    `https://api.edamam.com/api/recipes/v2?type=public&app_id=fb023251&app_key=6c3b51083603e37b5d7d3442be4a2df2&diet=${dietKey}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then(function (data) {
      for (var i = 0; i < data.hits.length; i++) {
        console.log(data.hits[i]);
        var div = document.createElement("div");
        div.innerHTML = "Name:" + data.hits[i].recipe.label;
        mainContainer.appendChild(div);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  console.log("got here");
}
