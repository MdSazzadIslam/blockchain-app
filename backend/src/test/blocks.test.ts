import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
import { describe } from "mocha";
let should = chai.should();
chai.use(chaiHttp);

describe("GET /random-url", () => {
  it("it should return 404", (done) => {
    chai
      .request(app)
      .get("/api/v1/nuri/reset")
      .end((err, res) => {
        res.should.have.status(404);

        done();
      });
  });
});

/**
 *  GET ALL BLOCKS
 */

describe("BLOCK CHAIN", () => {
  it("it should GET all the blocks", (done) => {
    chai
      .request(app)
      .get("/api/v1/nuri/blocks")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

/**
 *  GET DETAILS OF A SPECIFIC BLOCK
 */

describe("BLOCK CHAIN", () => {
  const id: string =
    "0000000000000000000904878f010a9b8654eb17f1d2db2e658dae476562ccb";
  it("it should GET details of a specific block", (done) => {
    chai
      .request(app)
      .get(`/api/v1/nuri/blocks/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});
