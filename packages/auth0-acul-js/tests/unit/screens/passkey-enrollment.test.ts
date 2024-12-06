import PasskeyEnrollment from "../../../src/screens/passkey-enrollment";
import { baseContextData } from "../../data/test-data";
import { FormHandler } from "../../../src/utils/form-handler";
import { createPasskeyCredentials } from "../../../src/utils/passkeys";
import { CustomOptions } from "interfaces/common";

jest.mock("../../../src/utils/form-handler");
jest.mock("../../../src/utils/passkeys");

describe("PasskeyEnrollment", () => {
  let passkeyEnrollment: PasskeyEnrollment;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = baseContextData;

    passkeyEnrollment = new PasskeyEnrollment();

    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe("continuePasskeyEnrollment method", () => {
    it("should handle continuePasskeyEnrollment with valid payload correctly", async () => {
      const mockPublicKey = { key: "publicKey" };
      const mockEncoded = { id: "encodedId" };
      passkeyEnrollment.screen.getPublicKey = jest
        .fn()
        .mockReturnValue(mockPublicKey);
      (createPasskeyCredentials as jest.Mock).mockReturnValue(mockEncoded);

      const payload: CustomOptions = {
        email: "test@example.com",
      };
      await passkeyEnrollment.continuePasskeyEnrollment(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          passkey: JSON.stringify(mockEncoded),
        })
      );
    });

    it("should handle continuePasskeyEnrollment without payload correctly", async () => {
      const mockPublicKey = { key: "publicKey" };
      const mockEncoded = { id: "encodedId" };
      passkeyEnrollment.screen.getPublicKey = jest
        .fn()
        .mockReturnValue(mockPublicKey);
      (createPasskeyCredentials as jest.Mock).mockReturnValue(mockEncoded);

      await passkeyEnrollment.continuePasskeyEnrollment();

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          passkey: JSON.stringify(mockEncoded),
        })
      );
    });

    it("should throw error when promise is rejected", async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error("Mocked reject"));
      const payload: CustomOptions = {
        email: "test@example.com",
      };
      await expect(
        passkeyEnrollment.continuePasskeyEnrollment(payload)
      ).rejects.toThrow("Mocked reject");
    });

    it("should handle continuePasskeyEnrollment when publicKey is null", async () => {
      passkeyEnrollment.screen.getPublicKey = jest.fn().mockReturnValue(null);

      const payload: CustomOptions = {
        email: "test@example.com",
      };
      await passkeyEnrollment.continuePasskeyEnrollment(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          passkey: JSON.stringify(null),
        })
      );
    });
  });

  describe("abortPasskeyEnrollment method", () => {
    it("should handle abortPasskeyEnrollment with valid payload correctly", async () => {
      const payload: CustomOptions = {
        email: "test@example.com",
      };
      await passkeyEnrollment.abortPasskeyEnrollment(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: "abort-passkey-enrollment",
        })
      );
    });

    it("should handle abortPasskeyEnrollment without payload correctly", async () => {
      await passkeyEnrollment.abortPasskeyEnrollment();

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "abort-passkey-enrollment",
        })
      );
    });

    it("should throw error when promise is rejected", async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error("Mocked reject"));
      const payload: CustomOptions = {
        email: "test@example.com",
      };
      await expect(
        passkeyEnrollment.abortPasskeyEnrollment(payload)
      ).rejects.toThrow("Mocked reject");
    });
  });
});
