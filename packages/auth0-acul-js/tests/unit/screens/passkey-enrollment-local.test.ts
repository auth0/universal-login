import PasskeyEnrollmentLocal from "../../../src/screens/passkey-enrollment-local";
import { baseContextData } from "../../data/test-data";
import { FormHandler } from "../../../src/utils/form-handler";
import { createPasskeyCredentials } from "../../../src/utils/passkeys";
import { CustomOptions } from "interfaces/common";
import { AbortEnrollmentOptions } from "interfaces/screens/passkey-enrollment-local";

jest.mock("../../../src/utils/form-handler");
jest.mock("../../../src/utils/passkeys");

describe("PasskeyEnrollmentLocal", () => {
  let passkeyEnrollmentLocal: PasskeyEnrollmentLocal;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = baseContextData;

    passkeyEnrollmentLocal = new PasskeyEnrollmentLocal();

    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe("continuePasskeyEnrollment method", () => {
    it("should handle continuePasskeyEnrollment with valid payload correctly", async () => {
      const mockPublicKey = { key: "publicKey" };
      const mockEncoded = { id: "encodedId" };
      Object.defineProperty(passkeyEnrollmentLocal.screen, 'publicKey', {
        value: mockPublicKey,
      });
        
      (createPasskeyCredentials as jest.Mock).mockReturnValue(mockEncoded);

      const payload: CustomOptions = {
        email: "test@example.com",
      };
      await passkeyEnrollmentLocal.continuePasskeyEnrollment(payload);

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
      Object.defineProperty(passkeyEnrollmentLocal.screen, 'publicKey', {
        value: mockPublicKey,
      });
        
      (createPasskeyCredentials as jest.Mock).mockReturnValue(mockEncoded);

      await passkeyEnrollmentLocal.continuePasskeyEnrollment();

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
        passkeyEnrollmentLocal.continuePasskeyEnrollment(payload)
      ).rejects.toThrow("Mocked reject");
    });

    it("should handle continuePasskeyEnrollment when publicKey is null", async () => {
      Object.defineProperty(passkeyEnrollmentLocal.screen, 'publicKey', {
        value: null,
      });

      const payload: CustomOptions = {
        email: "test@example.com",
      };
      await passkeyEnrollmentLocal.continuePasskeyEnrollment(payload);

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
      const payload: AbortEnrollmentOptions = {
        reason: "User cancelled",
      };
      await passkeyEnrollmentLocal.abortPasskeyEnrollment(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: "abort-passkey-enrollment",
        })
      );
    });

    it("should handle abortPasskeyEnrollment with doNotShowAgain set to true", async () => {
      const payload: AbortEnrollmentOptions = {
        reason: "User cancelled",
        doNotShowAgain: true,
      };
      await passkeyEnrollmentLocal.abortPasskeyEnrollment(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: "abort-passkey-enrollment",
          dontShowAgain: "on",
        })
      );
    });

    it("should handle abortPasskeyEnrollment without payload correctly", async () => {
      await passkeyEnrollmentLocal.abortPasskeyEnrollment({});

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "abort-passkey-enrollment",
        })
      );
    });

    it("should throw error when promise is rejected", async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error("Mocked reject"));
      const payload: AbortEnrollmentOptions = {
        reason: "User cancelled",
      };
      await expect(
        passkeyEnrollmentLocal.abortPasskeyEnrollment(payload)
      ).rejects.toThrow("Mocked reject");
    });
  });
});
