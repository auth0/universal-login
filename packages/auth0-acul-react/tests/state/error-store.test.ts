import { errorStore, ERROR_KINDS } from '../../src/state/error-store';
import type { ErrorItem } from '../../src/state/error-store';

describe('error-store', () => {
  beforeEach(() => {
    // Clear all errors before each test
    errorStore.clear();
  });

  describe('ERROR_KINDS constant', () => {
    it('should contain all error kinds', () => {
      expect(ERROR_KINDS).toEqual(['auth0', 'validation', 'configuration']);
    });
  });

  describe('errorStore subscription', () => {
    it('should subscribe and unsubscribe listeners', () => {
      const listener = jest.fn();
      const unsubscribe = errorStore.subscribe(listener);

      // Add an error to trigger notification
      errorStore.push('validation', { code: 'test', message: 'test', field: 'test' });

      expect(listener).toHaveBeenCalledTimes(1);

      // Unsubscribe and verify listener is not called again
      unsubscribe();
      errorStore.push('validation', { code: 'test2', message: 'test2', field: 'test2' });

      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should notify multiple listeners', () => {
      const listener1 = jest.fn();
      const listener2 = jest.fn();

      errorStore.subscribe(listener1);
      errorStore.subscribe(listener2);

      errorStore.push('auth0', { code: 'auth0_error', message: 'auth0 error', field: undefined });

      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(1);
    });
  });

  describe('snapshot', () => {
    it('should return current bucket state', () => {
      const snapshot = errorStore.snapshot();

      expect(snapshot).toHaveProperty('auth0');
      expect(snapshot).toHaveProperty('validation');
      expect(snapshot).toHaveProperty('configuration');
      expect(Array.isArray(snapshot.auth0)).toBe(true);
      expect(Array.isArray(snapshot.validation)).toBe(true);
      expect(Array.isArray(snapshot.configuration)).toBe(true);
    });

    it('should return readonly snapshot', () => {
      const snapshot = errorStore.snapshot();

      // Should be frozen
      expect(Object.isFrozen(snapshot)).toBe(true);
      expect(Object.isFrozen(snapshot.auth0)).toBe(true);
      expect(Object.isFrozen(snapshot.validation)).toBe(true);
      expect(Object.isFrozen(snapshot.configuration)).toBe(true);
    });
  });

  describe('replace method', () => {
    it('should replace entire kind with new list', () => {
      const listener = jest.fn();
      errorStore.subscribe(listener);

      const errors = [
        { code: 'error1', message: 'Error 1', field: 'field1' },
        { code: 'error2', message: 'Error 2', field: 'field2' }
      ];

      errorStore.replace('validation', errors);

      const snapshot = errorStore.snapshot();
      expect(snapshot.validation).toHaveLength(2);
      expect(snapshot.validation[0].code).toBe('error1');
      expect(snapshot.validation[1].code).toBe('error2');
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should generate ids for errors without id', () => {
      const errors = [
        { code: 'no_id', message: 'No ID', field: undefined }
      ];

      errorStore.replace('auth0', errors);

      const snapshot = errorStore.snapshot();
      expect(snapshot.auth0[0]).toHaveProperty('id');
      expect(typeof snapshot.auth0[0].id).toBe('string');
    });

    it('should preserve existing ids', () => {
      const errors = [
        { id: 'existing_id', code: 'with_id', message: 'With ID', field: undefined }
      ];

      errorStore.replace('configuration', errors);

      const snapshot = errorStore.snapshot();
      expect(snapshot.configuration[0].id).toBe('existing_id');
    });

    it('should not notify if lists are equal', () => {
      const listener = jest.fn();
      const errors = [{ id: 'same-id', code: 'same', message: 'Same', field: undefined }];

      // First replace to set initial state
      errorStore.replace('validation', errors);

      // Subscribe after initial state is set
      errorStore.subscribe(listener);

      // Replace with same errors (should not notify because they're equal)
      errorStore.replace('validation', errors);

      expect(listener).not.toHaveBeenCalled();
    });

    it('should freeze the error items', () => {
      const errors = [{ code: 'freeze_test', message: 'Freeze test', field: undefined }];

      errorStore.replace('validation', errors);

      const snapshot = errorStore.snapshot();
      expect(Object.isFrozen(snapshot.validation[0])).toBe(true);
    });
  });

  describe('replacePartial method', () => {
    it('should replace errors for specific field only', () => {
      // Add initial errors
      errorStore.replace('validation', [
        { code: 'field1_error', message: 'Field 1 error', field: 'field1' },
        { code: 'field2_error', message: 'Field 2 error', field: 'field2' }
      ]);

      // Replace only field1 errors
      const newField1Errors = [
        { code: 'new_field1_error', message: 'New field 1 error', field: 'field1' }
      ];

      errorStore.replacePartial('validation', newField1Errors, 'field1');

      const snapshot = errorStore.snapshot();
      expect(snapshot.validation).toHaveLength(2);

      const field1Errors = snapshot.validation.filter(e => e.field === 'field1');
      const field2Errors = snapshot.validation.filter(e => e.field === 'field2');

      expect(field1Errors).toHaveLength(1);
      expect(field1Errors[0].code).toBe('new_field1_error');
      expect(field2Errors).toHaveLength(1);
      expect(field2Errors[0].code).toBe('field2_error');
    });

    it('should add new field errors when field does not exist', () => {
      errorStore.replace('auth0', [
        { code: 'existing', message: 'Existing', field: 'existing_field' }
      ]);

      errorStore.replacePartial('auth0', [
        { code: 'new_field', message: 'New field', field: 'new_field' }
      ], 'new_field');

      const snapshot = errorStore.snapshot();
      expect(snapshot.auth0).toHaveLength(2);
    });

    it('should not notify if resulting list is equal', () => {
      const listener = jest.fn();

      const initialErrors = [
        { id: 'initial-id', code: 'initial', message: 'Initial', field: 'test_field' }
      ];

      // Set initial state
      errorStore.replace('validation', initialErrors);

      // Subscribe after setting initial state
      errorStore.subscribe(listener);

      // Replace with same errors for same field (should result in same list)
      errorStore.replacePartial('validation', initialErrors, 'test_field');

      expect(listener).not.toHaveBeenCalled();
    });

    it('should freeze the result', () => {
      errorStore.replacePartial('configuration', [
        { code: 'partial_test', message: 'Partial test', field: 'test_field' }
      ], 'test_field');

      const snapshot = errorStore.snapshot();
      expect(Object.isFrozen(snapshot.configuration)).toBe(true);
      expect(Object.isFrozen(snapshot.configuration[0])).toBe(true);
    });
  });

  describe('push method', () => {
    it('should append single error to kind', () => {
      const error = { code: 'push_test', message: 'Push test', field: undefined };

      errorStore.push('validation', error);

      const snapshot = errorStore.snapshot();
      expect(snapshot.validation).toHaveLength(1);
      expect(snapshot.validation[0].code).toBe('push_test');
    });

    it('should append multiple errors to kind', () => {
      const errors = [
        { code: 'push1', message: 'Push 1', field: undefined },
        { code: 'push2', message: 'Push 2', field: undefined }
      ];

      errorStore.push('auth0', errors);

      const snapshot = errorStore.snapshot();
      expect(snapshot.auth0).toHaveLength(2);
      expect(snapshot.auth0[0].code).toBe('push1');
      expect(snapshot.auth0[1].code).toBe('push2');
    });

    it('should append to existing errors', () => {
      errorStore.replace('configuration', [
        { code: 'existing', message: 'Existing', field: undefined }
      ]);

      errorStore.push('configuration', { code: 'appended', message: 'Appended', field: undefined });

      const snapshot = errorStore.snapshot();
      expect(snapshot.configuration).toHaveLength(2);
      expect(snapshot.configuration[0].code).toBe('existing');
      expect(snapshot.configuration[1].code).toBe('appended');
    });

    it('should handle empty array', () => {
      const listener = jest.fn();
      errorStore.subscribe(listener);

      errorStore.push('validation', []);

      expect(listener).not.toHaveBeenCalled();
    });

    it('should generate ids and freeze items', () => {
      errorStore.push('auth0', { code: 'id_test', message: 'ID test', field: undefined });

      const snapshot = errorStore.snapshot();
      expect(snapshot.auth0[0]).toHaveProperty('id');
      expect(typeof snapshot.auth0[0].id).toBe('string');
      expect(Object.isFrozen(snapshot.auth0[0])).toBe(true);
    });

    it('should notify listeners', () => {
      const listener = jest.fn();
      errorStore.subscribe(listener);

      errorStore.push('validation', { code: 'notify_test', message: 'Notify test', field: undefined });

      expect(listener).toHaveBeenCalledTimes(1);
    });
  });

  describe('clear method', () => {
    it('should clear all kinds by default', () => {
      // Add errors to all kinds
      errorStore.push('validation', { code: 'validation_error', message: 'validation', field: undefined });
      errorStore.push('auth0', { code: 'auth0_error', message: 'auth0', field: undefined });
      errorStore.push('configuration', { code: 'dev_error', message: 'configuration', field: undefined });

      errorStore.clear();

      const snapshot = errorStore.snapshot();
      expect(snapshot.validation).toHaveLength(0);
      expect(snapshot.auth0).toHaveLength(0);
      expect(snapshot.configuration).toHaveLength(0);
    });

    it('should clear specific kinds only', () => {
      // Add errors to all kinds
      errorStore.push('validation', { code: 'validation_error', message: 'validation', field: undefined });
      errorStore.push('auth0', { code: 'auth0_error', message: 'auth0', field: undefined });
      errorStore.push('configuration', { code: 'dev_error', message: 'configuration', field: undefined });

      errorStore.clear(['validation', 'auth0']);

      const snapshot = errorStore.snapshot();
      expect(snapshot.validation).toHaveLength(0);
      expect(snapshot.auth0).toHaveLength(0);
      expect(snapshot.configuration).toHaveLength(1);
    });

    it('should not notify if no changes', () => {
      const listener = jest.fn();
      errorStore.subscribe(listener);

      // Clear already empty store
      errorStore.clear();

      expect(listener).not.toHaveBeenCalled();
    });

    it('should notify if changes made', () => {
      const listener = jest.fn();

      errorStore.push('validation', { code: 'will_clear', message: 'Will clear', field: undefined });
      errorStore.subscribe(listener);

      errorStore.clear(['validation']);

      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should freeze cleared arrays', () => {
      errorStore.push('auth0', { code: 'clear_test', message: 'Clear test', field: undefined });
      errorStore.clear(['auth0']);

      const snapshot = errorStore.snapshot();
      expect(Object.isFrozen(snapshot.auth0)).toBe(true);
    });
  });

  describe('remove method', () => {
    beforeEach(() => {
      // Set up test data
      errorStore.replace('validation', [
        { id: 'remove1', code: 'error1', message: 'Error 1', field: 'field1' },
        { id: 'remove2', code: 'error2', message: 'Error 2', field: 'field2' },
        { id: 'keep1', code: 'error3', message: 'Error 3', field: 'field1' }
      ]);
      errorStore.replace('auth0', [
        { id: 'auth01', code: 'auth0_error', message: 'auth0 error', field: undefined }
      ]);
    });

    it('should remove error by id string', () => {
      errorStore.remove(['validation'], 'remove1');

      const snapshot = errorStore.snapshot();
      expect(snapshot.validation).toHaveLength(2);
      expect(snapshot.validation.find(e => e.id === 'remove1')).toBeUndefined();
      expect(snapshot.validation.find(e => e.id === 'remove2')).toBeDefined();
      expect(snapshot.validation.find(e => e.id === 'keep1')).toBeDefined();
    });

    it('should remove errors by predicate function', () => {
      errorStore.remove(['validation'], (e: ErrorItem) => e.field === 'field1');

      const snapshot = errorStore.snapshot();
      expect(snapshot.validation).toHaveLength(1);
      expect(snapshot.validation[0].field).toBe('field2');
    });

    it('should remove from all kinds by default', () => {
      errorStore.remove(undefined, 'auth01');

      const snapshot = errorStore.snapshot();
      expect(snapshot.auth0).toHaveLength(0);
      expect(snapshot.validation).toHaveLength(3); // unchanged
    });

    it('should remove from multiple kinds', () => {
      // Add an error with same id to multiple kinds
      errorStore.push('auth0', { id: 'duplicate', code: 'dup', message: 'Duplicate', field: undefined });
      errorStore.push('configuration', { id: 'duplicate', code: 'dup', message: 'Duplicate', field: undefined });

      errorStore.remove(['auth0', 'configuration'], 'duplicate');

      const snapshot = errorStore.snapshot();
      expect(snapshot.auth0.find(e => e.id === 'duplicate')).toBeUndefined();
      expect(snapshot.configuration.find(e => e.id === 'duplicate')).toBeUndefined();
    });

    it('should not notify if no changes', () => {
      const listener = jest.fn();
      errorStore.subscribe(listener);

      errorStore.remove(['validation'], 'nonexistent_id');

      expect(listener).not.toHaveBeenCalled();
    });

    it('should notify if changes made', () => {
      const listener = jest.fn();
      errorStore.subscribe(listener);

      errorStore.remove(['validation'], 'remove1');

      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should freeze result arrays', () => {
      errorStore.remove(['validation'], 'remove1');

      const snapshot = errorStore.snapshot();
      expect(Object.isFrozen(snapshot.validation)).toBe(true);
    });

    it('should handle complex predicate functions', () => {
      errorStore.remove(['validation'], (e: ErrorItem) => e.code.startsWith('error') && e.field === 'field1');

      const snapshot = errorStore.snapshot();
      expect(snapshot.validation).toHaveLength(1);
      expect(snapshot.validation[0].code).toBe('error2');
    });
  });

  describe('id generation', () => {
    it('should generate unique ids', () => {
      const errors = [
        { code: 'id1', message: 'ID 1', field: undefined },
        { code: 'id2', message: 'ID 2', field: undefined },
        { code: 'id3', message: 'ID 3', field: undefined }
      ];

      errorStore.replace('validation', errors);

      const snapshot = errorStore.snapshot();
      const ids = snapshot.validation.map(e => e.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should generate ids that include timestamp', () => {
      const error = { code: 'timestamp_test', message: 'Timestamp test', field: undefined };

      errorStore.push('auth0', error);

      const snapshot = errorStore.snapshot();
      const id = snapshot.auth0[0].id;

      expect(id).toMatch(/^\d+-\d+$/); // timestamp-counter format
    });
  });

  describe('listsEqual utility function', () => {
    it('should hit reference equality optimization branch via internal manipulation', () => {
  
      errorStore.clear();
      
      const currentSnapshot = errorStore.snapshot();
      const currentvalidationArray = currentSnapshot.validation;
      
      // Spy on the private normalize method through the errorStore instance
      const normalizeSpy = jest.spyOn(errorStore as any, 'normalize');
      
      // Make normalize return the exact same array reference from the bucket
      normalizeSpy.mockReturnValueOnce(currentvalidationArray);
      
      const listener = jest.fn();
      errorStore.subscribe(listener);
      
      errorStore.replace('validation', []);
      
      expect(listener).not.toHaveBeenCalled();
      
      // Restore the spy
      normalizeSpy.mockRestore();
    });

    it('should detect equal lists', () => {
      const list1 = [
        { id: '1', code: 'error1', message: 'Error 1', field: undefined },
        { id: '2', code: 'error2', message: 'Error 2', field: undefined }
      ];

      errorStore.replace('validation', list1);

      // Replace with same list (should not trigger notification)
      const listener = jest.fn();
      errorStore.subscribe(listener);
      errorStore.replace('validation', list1);

      expect(listener).not.toHaveBeenCalled();
    });

    it('should detect different lists by length', () => {
      const list1 = [{ code: 'error1', message: 'Error 1', field: undefined }];
      const list2 = [
        { code: 'error1', message: 'Error 1', field: undefined },
        { code: 'error2', message: 'Error 2', field: undefined }
      ];

      errorStore.replace('validation', list1);

      const listener = jest.fn();
      errorStore.subscribe(listener);
      errorStore.replace('validation', list2);

      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should detect different lists by id', () => {
      const list1 = [{ id: 'id1', code: 'error1', message: 'Error 1', field: undefined }];
      const list2 = [{ id: 'id2', code: 'error1', message: 'Error 1', field: undefined }];

      errorStore.replace('validation', list1);

      const listener = jest.fn();
      errorStore.subscribe(listener);
      errorStore.replace('validation', list2);

      expect(listener).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    it('should handle mixed id and no-id errors', () => {
      const errors = [
        { id: 'existing', code: 'with_id', message: 'With ID', field: undefined },
        { code: 'no_id', message: 'No ID', field: undefined }
      ];

      errorStore.replace('configuration', errors);

      const snapshot = errorStore.snapshot();
      expect(snapshot.configuration).toHaveLength(2);
      expect(snapshot.configuration[0].id).toBe('existing');
      expect(snapshot.configuration[1]).toHaveProperty('id');
      expect(snapshot.configuration[1].id).not.toBe('existing');
    });

    it('should handle empty field values', () => {
      const errors = [
        { code: 'empty_field', message: 'Empty field', field: '' },
        { code: 'undefined_field', message: 'Undefined field', field: undefined }
      ];

      errorStore.replace('validation', errors);

      const snapshot = errorStore.snapshot();
      expect(snapshot.validation).toHaveLength(2);
    });

    it('should handle large error lists', () => {
      const largeList = Array.from({ length: 1000 }, (_, i) => ({
        code: `error_${i}`,
        message: `Error ${i}`,
        field: `field_${i % 10}`
      }));

      errorStore.replace('auth0', largeList);

      const snapshot = errorStore.snapshot();
      expect(snapshot.auth0).toHaveLength(1000);
      expect(snapshot.auth0.every(e => e.id)).toBe(true);
    });
  });

  describe('immutability', () => {
    it('should not mutate original error objects', () => {
      const originalError = { code: 'immutable_test', message: 'Immutable test', field: 'test' };
      const originalErrorCopy = { ...originalError };

      errorStore.push('validation', originalError);

      expect(originalError).toEqual(originalErrorCopy);
    });

    it('should return immutable snapshots', () => {
      errorStore.push('auth0', { code: 'immutable', message: 'Immutable', field: undefined });

      const snapshot1 = errorStore.snapshot();
      const snapshot2 = errorStore.snapshot();

      expect(snapshot1).toBe(snapshot2); // Same reference for same state
    });
  });
});