// Jest tests for a simple PasswordComponent example
describe('Component Tests', () => {
  describe('PasswordComponent', () => {
    let comp;
    let service;

    // minimal "component" to exercise
    class PasswordComponent {
      constructor(service) {
        this.service = service;
        this.password = '';
        this.confirmPassword = '';
        this.error = null;
        this.success = null;
      }
      doNoMatch() {
        return this.password !== this.confirmPassword;
      }
      changePassword() {
        if (this.doNoMatch()) {
          this.error = 'ERROR';
          this.success = null;
          return;
        }
        try {
          this.service.save(this.password);
          this.error = null;
          this.success = 'OK';
        } catch (e) {
          this.error = 'ERROR';
          this.success = null;
        }
      }
    }

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
      // GIVEN
      comp.password = comp.confirmPassword = 'myPassword';

      // WHEN
      comp.changePassword();

      // THEN
      expect(service.save).toHaveBeenCalledWith('myPassword');
    });

    test('should set success to OK upon success', () => {
      // GIVEN
      comp.password = comp.confirmPassword = 'myPassword';

      // WHEN
      comp.changePassword();

      // THEN
      expect(comp.doNoMatch()).toBe(false);
      expect(comp.error).toBeNull();
      expect(comp.success).toBe('OK');
    });

    test('should notify of error if change password fails', () => {
      // GIVEN — simulate service failure
      service.save.mockImplementation(() => { throw new Error('boom'); });
      comp.password = comp.confirmPassword = 'myPassword';

      // WHEN
      comp.changePassword();

      // THEN
      expect(comp.doNoMatch()).toBe(false);
      expect(comp.success).toBeNull();
      expect(comp.error).toBe('ERROR');
    });
  });
});

