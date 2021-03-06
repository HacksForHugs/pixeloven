import { env, Environment } from "@pixeloven/env";

let envValue: Environment;
const cliMock = (key: string, environment: Environment) => {
    envValue = environment;
};

const caller = () => {
    require("./development");
};

describe("@pixeloven/webpack-dev-server", () => {
    describe("bootstrap", () => {
        describe("development", () => {
            afterAll(() => {
                jest.clearAllMocks();
            });
            afterEach(() => {
                jest.restoreAllMocks();
            });
            it('should set env to "development"', () => {
                const envLoadSpy = jest.spyOn(env, "load").mockImplementation();
                const envDefineSpy = jest
                    .spyOn(env, "define")
                    .mockImplementation(cliMock);
                caller();
                expect(envLoadSpy).toHaveBeenCalledTimes(1);
                expect(envDefineSpy).toHaveBeenCalledTimes(2);
                expect(envValue).toEqual("development");
            });
        });
    });
});
