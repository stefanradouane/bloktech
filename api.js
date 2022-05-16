fetch("https://www.jiosaavn.com/api.php?__call=autocomplete.get&_format=json&_marker=0&cc=in&includeMetaTags=1&query=all")
  .then(response => response.json())
  .then(data => console.log(data));
