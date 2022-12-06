import  { UserService } from "./userService";
import chance from "chance";
import { Encrypter } from "../../utils/bcryptjs";

let userService: UserService;

beforeAll(() => {
    userService = new UserService();
})

test("Create new user successfully", async () => {
    const user = await userService.create({
        name: chance().name(),
        email: chance().email(),
        phone: chance().phone(),
        username: `${chance().name()}${chance().integer({min: 3, max: 5})}`,
        password: chance().integer({min: 8, max: 12}).toString()
    })

    expect(user.status).toEqual(201);
    expect(user.data).not.toBeNull;
});

test("Login with valid username and password", async () => {
    const username = `${chance().name()}${chance().integer({min: 3, max: 5})}`;
    const passEncrypted = await new Encrypter().hash("test", 8);

    await userService.create({
        name: chance().name(),
        email: chance().email(),
        phone: chance().phone(),
        username: username,
        password: passEncrypted
    });

    const login = await userService.login(username, "test");

    expect(login.status).toEqual(200);
    expect(login.token).not.toBeNull;
})

test("Login with invalid username and password", async () => {
    const invalidLogin = await userService.login("invalid", "invalid");

    expect(invalidLogin.status).toEqual(401);
    expect(invalidLogin.message).not.toBeNull;
})

test("Find user by ID", async () => {
    const create = await userService.create({
        name: chance().name(),
        email: chance().email(),
        phone: chance().phone(),
        username: `${chance().name()}${chance().integer({min: 3, max: 5})}`,
        password: chance().integer({min: 8, max: 12}).toString()
    })

    const user = await userService.findById(create.data.id)

    expect(user.status).toEqual(200);
    expect(user.data).not.toBeNull;
    expect(user.data).not.toContain("password");
})

test("Find user with invalid ID", async () => {
    const invalidUser = await userService.findById("invalid");

    expect(invalidUser.data).toBeNull;
})

test("Find all users", async () => {
    const users = await userService.findAll();

    expect(users.data.length).toBeGreaterThan(0);
})

test("Find user by email", async () => {
    const email = await chance().email();

    await userService.create({
        name: chance().name(),
        email: email,
        phone: chance().phone(),
        username: `${chance().name()}${chance().integer({min: 3, max: 5})}`,
        password: chance().integer({min: 8, max: 12}).toString()
    });

    const findUserByEmail = await userService.existsUserByMailOrUsername(email);

    expect(findUserByEmail.data).not.toBeNull;
    expect(findUserByEmail.data.email).toEqual(email);
})

test("Find user by username", async () => {
    const username = await `${chance().name()}${chance().integer({min: 3, max: 5})}`

    await userService.create({
        name: chance().name(),
        email: chance().email(),
        phone: chance().phone(),
        username: username,
        password: chance().integer({min: 8, max: 12}).toString()
    });

    const findUserByUsername = await userService.existsUserByMailOrUsername(username);

    expect(findUserByUsername.data).not.toBeNull;
    expect(findUserByUsername.data.username).toEqual(username);

})

test("Not find user by non-existent email or username", async () => {
    const invalidFindUserByEmail = await userService.existsUserByMailOrUsername("invalidEmail@email.com");

    expect(invalidFindUserByEmail.data).toBeNull;
})

test("Update user name and email", async () => {
    const user = await userService.create({
        name: chance().name(),
        email: chance().email(),
        phone: chance().phone(),
        username: `${chance().name()}${chance().integer({min: 3, max: 5})}`,
        password: chance().integer({min: 8, max: 12}).toString()
    })

    const userUpdated = await userService.update({
        name: "Updated Name",
        email: "Updated Email",
        phone: user.data.phone,
        username: user.data.username
    }, user.data.id);

    expect(userUpdated.data.name).toEqual("Updated Name");
    expect(userUpdated.data.email).toEqual("Updated Email");
})

test("Delete user with user ID", async () => {
    const user = await userService.create({
        name: chance().name(),
        email: chance().email(),
        phone: chance().phone(),
        username: `${chance().name()}${chance().integer({min: 3, max: 5})}`,
        password: chance().integer({min: 8, max: 12}).toString()
    })

    const deletedUser = await userService.delete(user.data.id);

    expect(deletedUser.status).toEqual(200);
    expect(deletedUser.message).toEqual("Usuário deletado com sucesso.");
})

afterAll(async () => {
    const users = await userService.findAll();

    for (let user of users.data) {
        await userService.delete(user.id);
    }
})