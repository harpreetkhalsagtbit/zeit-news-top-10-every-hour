const fetch = require("node-fetch");
const fs = require("fs");
const path = require('path');

const filePath = path.join(__dirname, 'template.html');
fetch(
  "https://newsapi.org/v2/top-headlines?" +
    "sources=bbc-news&" +
    "apiKey=2c5478795b984340a68676f365a9783d"
)
  .then(res => res.json())
  .then(body => {

    let list = body.articles.map(({ title, description, url }, index) => {
      {
        index, title, description, url;
      }
      return `
            <tr>
              <td>${index+1}</td>
              <td>${title}</td>
              <td>${description}</td>
              <td>${url}</td>
            </tr>
          `;
    });
    fs.readFile(filePath, "utf8", (err, data) => {
      console.log(err, data, "...........")
      data = data.replace("{{news}}", list.join("") + `<div>Last Updated on: ${Date()}</div>`);
      fs.writeFile("public/index.html", data, function() {
        console.log("done")
      });
    });
  });
