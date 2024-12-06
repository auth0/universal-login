import SignupId from "../../../src/screens/signup-id";
import { baseContextData } from "../../data/test-data";
import { FormHandler } from "../../../src/utils/form-handler";
import {
  SignupOptions,
  SocialSignupOptions,
} from "interfaces/screens/signup-id";

jest.mock("../../../src/utils/form-handler");

describe("SignupId", () => {
  let signupId: SignupId;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = baseContextData;

    signupId = new SignupId();

    jest.clearAllMocks();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe("Signup method", () => {
    it("should handle signup with valid credentials correctly", async () => {
      const payload: SignupOptions = {
        username: "testUser",
        password: "testPassword",
      };
      await signupId.signup(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it("should throw error when promise is rejected", async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error("Mocked reject"));
      const payload: SignupOptions = {
        username: "testUser",
        password: "testPassword",
      };
      await expect(signupId.signup(payload)).rejects.toThrow("Mocked reject");
    });
    it.each([
      {
        name: "missing username and phone",
        payload: { email: "test@example.com" },
        requiredIdentifiers: ["username", "phone", "email"],
        expectedError: "Missing parameter(s): username, phone",
      },
      {
        name: "missing only username",
        payload: { email: "test@example.com", phone: "+1234567890" },
        requiredIdentifiers: ["username", "phone", "email"],
        expectedError: "Missing parameter(s): username",
      },
    ])(
      "should handle missing identifiers: $name",
      async ({ payload, requiredIdentifiers, expectedError }) => {
        jest
          .spyOn(signupId.transaction, "getRequiredIdentifiers")
          .mockReturnValue(
            requiredIdentifiers as ("username" | "phone" | "email")[]
          );

        await expect(signupId.signup(payload)).rejects.toThrow(expectedError);
      }
    );
    it("should transform phone to phone_number", async () => {
      const payload: SignupOptions = {
        username: "testUser",
        password: "testPassword",
        phone: "+1234567890",
      };

      await signupId.signup(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          username: "testUser",
          password: "testPassword",
          phone_number: "+1234567890",
        })
      );
      expect(mockFormHandler.submitData).not.toHaveBeenCalledWith(
        expect.objectContaining({ phone: "+1234567890" })
      );
    });
  });

  describe("Social Signup method", () => {
    it("should handle social signup with valid credentials correctly", async () => {
      const payload: SocialSignupOptions = {
        connection: "testConnection",
      };
      await signupId.socialSignup(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it("should throw error when promise is rejected", async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error("Mocked reject"));

      const payload: SocialSignupOptions = {
        connection: "testConnection",
      };
      await expect(signupId.socialSignup(payload)).rejects.toThrow(
        "Mocked reject"
      );
    });
  });
});
