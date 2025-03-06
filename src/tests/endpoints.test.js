import request from 'supertest';
import app from '../index';
import { userSchema } from '../schemas/user.schema';

describe("GET /greet", () => {
    it("should greet the world when no name is provided", async () => {
        const res = await request(app)
            .get("/greet")
            .expect("Content-Type", /json/)
            .expect(200);

        expect(res.body.message).toBe("Hello, World!");
    });

    it("should greet the user when a name is provided", async () => {
        const res = await request(app)
            .get("/greet?name=John")
            .expect("Content-Type", /json/)
            .expect(200);

        expect(res.body.message).toBe("Hello, John!");
    });

    it('should return a greet', async () => {
        const res = await request(app)
            .get("/hi")
            .expect("Content-Type", /json/)
            .expect(200);

        expect(res.body.message).toBe("Hi from server!");
    });

});

describe('GET /users', () => {
    it("should return a list of users matching the schema", async () => {
        const res = await request(app)
            .get("/users")
            .expect("Content-Type", /json/)
            .expect(200);

        expect(res.body).toHaveProperty("success", true);
        expect(res.body).toHaveProperty("data");
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data.length).toBeGreaterThan(0);

        const user = res.body.data[0];

        const schemaKeys = [...Object.keys(userSchema.obj), "_id", "__v"];
        const userKeys = Object.keys(user);

        expect(userKeys.sort()).toEqual(schemaKeys.sort());
    });

    it("should return a single user by ID with the correct schema", async () => {
        const usersRes = await request(app).get("/users").expect(200);
        const userId = usersRes.body.data[0]._id;

        const res = await request(app)
            .get(`/users/${userId}`)
            .expect("Content-Type", /json/)
            .expect(200);

        expect(res.body).toHaveProperty("success", true);
        expect(res.body).toHaveProperty("data");

        const schemaKeys = [...Object.keys(userSchema.obj), "_id", "__v"];
        const userKeys = Object.keys(res.body.data);

        expect(userKeys.sort()).toEqual(schemaKeys.sort());
    });

    it("should return 500 if user ID does not exist", async () => {
        const fakeId = "67c8598990c9d5894065asc";

        expect(await request(app).get(`/users/${fakeId}`).expect(500));
    });

});

describe("POST /users", () => {
    it("should create a new user", async () => {
        const newUser = {
            name: "Test User",
            email: `testuser${Date.now()}@example.com`,
            password: "securepassword",
            role: "ADMIN",
            active: true,
        };

        const res = await request(app)
            .post("/users")
            .send(newUser)
            .expect("Content-Type", /json/)
            .expect(201);

        expect(res.body).toHaveProperty("success", true);
        expect(res.body).toHaveProperty("data");

        const user = res.body.data;

        const schemaKeys = [...Object.keys(userSchema.obj), "_id", "__v"];
        const userKeys = Object.keys(user);

        expect(userKeys.sort()).toEqual(schemaKeys.sort());

        expect(user.password).not.toBe(newUser.password);
    });

    it("should return 500 if missing required fields", async () => {
        const res = await request(app)
            .post("/users")
            .send({})
            .expect(500);

        expect(res.body).toHaveProperty("error", "Error saving user: data and salt arguments required");
    });
});
