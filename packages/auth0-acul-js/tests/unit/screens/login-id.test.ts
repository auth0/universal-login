import LoginId from "../../../src/screens/login-id";
import { baseContextData } from "../../data/test-data";
import { FormHandler } from "../../../src/utils/form-handler";
import { getPasskeyCredentials } from "../../../src/utils/passkeys";
import { LoginOptions, SocialLoginOptions } from "interfaces/screens/login-id";
import { CustomOptions } from "interfaces/common";

jest.mock("../../../src/utils/form-handler");
jest.mock("../../../src/utils/passkeys");

describe("LoginId", () => {
  let loginId: LoginId;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = baseContextData;

    loginId = new LoginId();

    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe("Login method", () => {
    it("should handle login correctly", async () => {
      const payload: LoginOptions = {
        username: "testUser",
        password: "testPassword",
      };
      await loginId.login(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it("should handle login with passkey correctly", async () => {
      const mockPasskeyCredentials = {
        id: "testId",
        rawId: "testRawId",
        response: {},
        type: "public-key",
      };
      (getPasskeyCredentials as jest.Mock).mockResolvedValueOnce(
        mockPasskeyCredentials
      );
      const payload: CustomOptions = {
        username: "testUser",
        password: "testPassword",
      };
      await loginId.passkeyLogin(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          passkey: JSON.stringify(mockPasskeyCredentials),
        })
      );
    });

    it("should throw error when promise is rejected", async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error("Mocked reject"));
      const payload: LoginOptions = {
        username: "testUser",
        password: "testPassword",
      };
      await expect(loginId.login(payload)).rejects.toThrow("Mocked reject");
    });

    it("should throw error when username is empty", async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error("Invalid username")
      );
      const payload = { username: "", password: "testPassword" };

      await expect(loginId.login(payload)).rejects.toThrow("Invalid username");
    });

    it("should throw error when password is empty", async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error("Invalid password")
      );
      const payload: LoginOptions = {
        username: "testUser",
        password: "",
      };

      await expect(loginId.login(payload)).rejects.toThrow("Invalid password");
    });
  });

  describe("Social Login method", () => {
    it("should handle social login correctly", async () => {
      const payload: SocialLoginOptions = {
        connection: "testConnection",
      };
      await loginId.socialLogin(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it("should throw error when promise is rejected", async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error("Mocked reject"));
      const payload: SocialLoginOptions = {
        connection: "testConnection",
      };
      await expect(loginId.socialLogin(payload)).rejects.toThrow(
        "Mocked reject"
      );
    });
  });
});
