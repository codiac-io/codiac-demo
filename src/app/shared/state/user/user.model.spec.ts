import { createUser, User } from '.';

const DEFAULT_USER_PROPERTIES: any = {
  id: '123',
  tenantName: 'codiac',
  tenantCode: 'cod',
  firstName: 'first',
  lastName: 'last',
  email: 'a@b.net',
  userName: 'flast',
  roles: 'baker',
  login: 'a@b.net',
  password: 'password123!',
  profiles: [],
  newUser: false
};

describe('User', () => {
  let user: User;

  beforeEach(() => {
    const userProperties: User = DEFAULT_USER_PROPERTIES;
    user = createUser(userProperties);
  });

  it('creates User', () => {
    expect(typeof user).toEqual('object');
  });

  it('sets User model properties to match those of provided properties', () => {
    expect(user.email).toEqual(DEFAULT_USER_PROPERTIES.email);
    expect(user.login).toEqual(DEFAULT_USER_PROPERTIES.login);
  });
});
