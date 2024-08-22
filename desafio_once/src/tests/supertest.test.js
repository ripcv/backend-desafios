import { expect } from "chai";
import supertest from "supertest";
import inquirer from "inquirer";
import Mocha from "mocha";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
dotenv.config();

if (process.env.TEST_ENV !== "true") {
  console.log("No se puede ejecutar el test en ambiente de produccion");
  console.log("favor cambiar variable TEST_ENV a true para ejecutarlos");
  process.exit(0);
}

const requester = supertest("http://localhost:8080");

const testProductos = async () => {
  describe("Test Producto", () => {
    let cookie;

    before(async () => {
      const loginResponse = await requester
        .post("/api/sessions/login")
        .send({ email: "adminCoder@coder.com", password: "adminCod3r123" });
      cookie = loginResponse.headers["set-cookie"][0];
      cookie = cookie.split(";")[0];
    });

    describe("Test crear Producto", () => {
      it("El endpoit POST /products debe crear un producto correctamente", async () => {
        const productMock = {
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          code: faker.string.octal({ length: 6, prefix: "CE" }),
          price: faker.commerce.price(),
          stock: faker.number.int({ min: 15000, max: 35000 }),
          category: faker.commerce.productAdjective(),
          thumbnail: faker.image.url(),
          owner: "66c695afec80fc107f5b752a",
        };
        const response = await requester
          .post("/products")
          .set("Cookie", cookie)
          .send(productMock);

        console.log(response.statusCode);
        console.log(response.ok);
        console.log(response._body);

        expect(response._body.payload).to.have.property("_id");
      });
    });
  });
};

const testRegitroUsuarios = async () => {
  describe("Test Registro de Usuarios", () => {
    it("El endpoit POST /register debe crear un usuario correctamente", async () => {
      const userMock = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        age: faker.number.int(90),
        password: "123456",
        role: "admin",
      };
      const response = await requester
        .post("/api/sessions/register")
        .send(userMock);
      console.log(response);
      console.log(response.statusCode);
      console.log(response.ok);
      console.log(response._body);

      expect(response._body.payload).to.have.property("_id");
    });
  });
};

const testCarrito = async () => {
  describe("Test Carrito", () => {});
};

const runTest = async () => {
while (true) {
  console.clear();
  const mocha = new Mocha();

  const questions = [
    {
      type: "list",
      name: "opcion",
      message: "Selecciones un test",
      choices: [
        { name: "Registro de Usuarios", value: "1" },
        { name: "Productos", value: "2" },
        { name: "Carrito", value: "3" },
        { name: "Salir", value: "4" },
      ],
    },
  ];

  const answers = await inquirer.prompt(questions);

  switch (answers.opcion) {
    case "1":
      mocha.suite.emit("pre-require", global, null, mocha);
      await testRegitroUsuarios();
      break;
    case "2":
      mocha.suite.emit("pre-require", global, null, mocha);
      await testProductos();
      break;
    case "3":
      mocha.suite.emit("pre-require", global, null, mocha);
      await testCarrito();
      break;
    case "4":
      process.exit(0);
      break;
    default:
      console.log("Opcion No valida.");
  }

  mocha.run((failures) => {
    process.exitCode = failures ? 1 : 0;
  });
}
};

runTest();
