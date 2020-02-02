import createUsersTable from './user';
import { seedUsers, seedTeams, seedFixtures } from '../seeders';
import createTeamsTable from './team';
import createFixturesTable from './fixture';

(async () => {
  try {
    await createUsersTable();
    await seedUsers();
    await createTeamsTable();
    await seedTeams();
    await createFixturesTable();
    await seedFixtures();
  } catch (error) {
    console.log(error);
  }
})();