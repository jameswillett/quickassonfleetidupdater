const onfleet = require('onfleet')(process.env.ONFLEET_KEY);
const { Pool } = require('pg');

const table = process.env.TABLE_NAME;
const connectionString = process.env.DATABASE_URL;
const pool = new Pool ({
  connectionString: connectionString
});

const updateTeams = async (teams, i = 0) => {
  await pool.query('update $1 set onfleet_team_id=$2 where description=$3',[table, team.id[i], team.name[i]])
  setTimeout(() => {
    updateTeams(teams, i+1);
  }, 1000); // :troll:

}

(async() => {
  const allTeams = await onfleet.teams.list();
  const vDayTeams = allTeams.filter(team => /.*vday.*/i.test(team.name));
  await updateTeams(vDayTeams, table);
})();
