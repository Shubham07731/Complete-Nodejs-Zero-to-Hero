const fs = require("fs");

function requestHandler(req, res) {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>My Home page</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Submit</button></form></body>"
      //   form will get the input values in the form of key and values and assume that input name is the keys and whatever user enter is the user value
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log("chunk", chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      console.log("parsing Body", parsedBody);
      fs.writeFileSync("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
    //allow to listen certain events
  }

  //   Buffers and Strems---> read data in chunks and store using parse thea daata
  //   Buffer will hold the chunk and process it before they send
  // halt event loop and program will shut down
  //   process.exit();

  //tell the  browser its html code by setting their type
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first APP</title></head>");
  res.write("<body><h1>hello from Node js server!</h1<></body>");
  res.write("</html>");
  res.end();
}

module.exports = requestHandler;
module.exports = "Some hard coded texr";
// module.exports = {
//   handler: requestHandler,
//   someText: "Some hard coded text",
// };
