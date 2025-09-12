// src/password-component.js (CommonJS)
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

module.exports = { PasswordComponent };

