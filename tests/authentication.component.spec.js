// tests/authentication.component.spec.js
const { PasswordComponent } = require('../src/password-component');

describe('Component Tests', () => {
  describe('PasswordComponent', () => {
    let comp;
    let service;

    beforeEach(() => {
      service = { save: jest.fn() };
      comp = new PasswordComponent(service);
    });

    test('should show error if passwords do not match', () => {
      // GIVEN
      comp.password = 'password1';
      comp.confirmPassword = 'password2';

      // WHEN
      comp.changePassword();

      // THEN
      expect(comp.doNoMatch()).toBe(true);
      expect(comp.error).toBe('ERROR');
      expect(comp.success).toBeNull();
    });

    test('should call Auth.changePassword when passwords match', () => {
      comp.password = comp.confirmPassword = 'myPassword';
      comp.changePassword();
      expect(service.save).toHaveBeenCalledWith('myPassword');
    });

    test('should set success to OK upon success', () => {
      comp.password = comp.confirmPassword = 'myPassword';
      comp.changePassword();
      expect(comp.doNoMatch()).toBe(false);
      expect(comp.error).toBeNull();
      expect(comp.success).toBe('OK');
    });

    test('should notify of error if change password fails', () => {
      comp.password = comp.confirmPassword = 'myPassword';
      service.save.mockImplementation(() => { throw new Error('boom'); });
      comp.changePassword();
      expect(comp.doNoMatch()).toBe(false);
      expect(comp.success).toBeNull();
      expect(comp.error).toBe('ERROR');
    });
  });
});

