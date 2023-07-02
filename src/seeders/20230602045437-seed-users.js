module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [
    {
      username: 'Hellonston',
      password: 'daniel123',
      email: 'dtoribio1@uc.cl',
      rol: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'MartoSW',
      password: 'marto123',
      email: 'martosw@uc.cl',
      rol: 'User',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Haliax',
      password: 'haliax123',
      email: 'haliax@uc.cl',
      rol: 'User',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Carowo',
      password: 'carowo123',
      email: 'carowo@uc.cl',
      rol: 'User',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkInsert('Users', null, {}),
};
