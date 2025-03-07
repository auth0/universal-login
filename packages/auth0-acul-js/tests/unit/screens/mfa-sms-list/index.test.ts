import MfaSmsList from '../../../../src/screens/mfa-sms-list';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { ScreenIds } from '../../../../src/utils/enums';

jest.mock('../../../../src/utils/form-handler');

describe('MfaSmsList', () => {
  let mfaSmsList: MfaSmsList;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.MFA_SMS_LIST;
    window.universal_login_context = {
      ...baseContextData,
      user: {
        ...baseContextData.user,
        enrolled_phone_numbers: ['+1234567890', '+1987654321']
      }
    };
    mfaSmsList = new MfaSmsList();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('constructor', () => {
    it('should parse the user context and set the enrolled phone numbers', () => {
      expect(mfaSmsList.user.enrolledPhoneNumbers).toEqual(['+1234567890', '+1987654321']);
    });
  });

  describe('selectPhoneNumber method', () => {
    it('should submit the selected phone number index', async () => {
      await mfaSmsList.selectPhoneNumber({index:0});

      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'selection-action::0',
        })
      );
    });

    it('should throw an error if the index is out of bounds', async () => {
      await expect(mfaSmsList.selectPhoneNumber({index:2})).rejects.toThrow('Index out of bounds.');
    });
  });

  describe('backAction method', () => {
    it('should submit the back action', async () => {
      await mfaSmsList.backAction();

      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'back-action',
        })
      );
    });
  });
});
