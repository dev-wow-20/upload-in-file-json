const http = require("http");
const fs = require("fs");

http
  .createServer(function (req, res) {
    let file;

    try {
      file = fs.readFileSync("./index.html");
    } catch (e) {
      res.writeHead(404, { "content-type": "text/plain" });
      res.write("404 File Not Found!");
      res.end();
      return;
    }

    if (file) {
      res.writeHead(200, { "content-type": "text/html" });
      res.write(file);
      res.end();
    }

    req.on("data", (data) => {
      var arr = decodeURIComponent(data)
        .replace(/\+/g, " ")
        .replace("Nombre=", "")
        .replace("Nota=", "")
        .split("&");

      var newArr = {
        registro: [],
      };

      newArr.registro.push({ nombre: arr[0], nota: arr[1] });

      console.log(newArr);

      const jsonString = JSON.stringify(newArr, null, 2);

      fs.writeFile("./data.json", jsonString, (err) => {
        if (err) {
          console.log("Error writing file", err);
        } else {
          console.log("Successfully wrote file");
        }
      });

    });
  })
  .listen(3000, () => {
    console.log("Server running on 3000");
  });
