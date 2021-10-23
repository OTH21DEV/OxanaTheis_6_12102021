

//const linkToJson = "http://localhost:3000/js/fisheyedata.json";
fetch("./js/fisheyedata.json")
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })

  .then(function (value) {
    console.log(value);
  })

  .catch(function (err) {
    console.log(err);
  });
