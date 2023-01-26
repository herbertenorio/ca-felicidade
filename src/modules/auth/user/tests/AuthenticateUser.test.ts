import { AuthenthicateUser } from "../services/AuthenticateUser";

describe("Authentication user", () => {

    it("Should return user token", async () => {

        const email = ""
        const password = ""

        const authenticateUser = new AuthenthicateUser()
        const token = await authenticateUser.execute({ email, password })

        expect(token).toHaveReturned
    });

});