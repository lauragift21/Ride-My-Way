export default {
  validUserInfo: {
    firstname: 'Gift',
    lastname: 'Egwuenu',
    email: 'laura@gmail.com',
    location: 'Lagos, Nigeria',
    password: '123456',
  },
  validUserDetails: {
    firstname: 'Gift   ',
    lastname: 'Egwuenu',
    email: 'laura@gmail.com',
    location: 'Lagos, Nigeria',
    password: '123456',
  },
  emptyUserInfo: {
    firstname: '',
    lastname: '',
    email: '',
    location: '',
    password: '',
  },
  invalidUserInfoEmail: {
    firstname: 'Gift',
    lastname: 'Egwuenu',
    email: 'laura@.com',
    location: 'Lagos, Nigeria',
    password: '123456',
  },
  validUserInfoPassword: {
    firstname: 'Gift',
    lastname: 'Egwuenu',
    email: 'laura@gmail.com',
    location: 'Lagos, Nigeria',
    password: '   123456',
  },
  invalidUserInfoPassword: {
    firstname: 'Gift',
    lastname: 'Egwuenu',
    email: 'laura@gmail.com',
    location: 'Lagos, Nigeria',
    password: '<html/>',
  },
  validLoginInfo: {
    email: 'laura@gmail.com',
    password: '123456',
  },
  emptyLoginInfo: {
    email: '',
    password: '',
  },
  validLoginPassword: {
    email: '  laur@gmail.com',
    password: '123456',
  },
  invalidLoginEmail: {
    email: '  laurgmail',
    password: '<script></sript>',
  },
};
