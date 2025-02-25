const express = require("express");
const fs = require("fs");
const Ajv = require("ajv");

const app = express();
const port = 3000;
app.use(express.json());

const ajv = new Ajv();

const userSchema = JSON.parse(fs.readFileSync("./schemas/userSchema.json", "utf8"));
const productSchema = JSON.parse(fs.readFileSync("./schemas/productSchema.json", "utf8"));

const validateUser = ajv.compile(userSchema);
const validateProduct = ajv.compile(productSchema);

app.post("/validate-user", (req, res) => {
  if (validateUser(req.body)) {
    res.status(200).json({ message: "JSON válido" });
  } else {
    res.status(400).json({ error: "JSON inválido", details: validateUser.errors });
  }
});

app.post("/validate-product", (req, res) => {
  if (validateProduct(req.body)) {
    res.status(200).json({ message: "JSON válido" });
  } else {
    res.status(400).json({ error: "JSON inválido", details: validateProduct.errors });
  }
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});