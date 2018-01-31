const onfleet = require('onfleet')(process.env.ONFLEET_KEY);
const { Pool } = require('pg');

const table = process.env.TABLE_NAME;
const connectionString = process.env.DATABASE_URL;
const pool = new Pool ({
  connectionString: connectionString
});

const updateTeams = async (teams, i = 0) => {
  try {
    await pool.query('update $1 set onfleet_team_id=$2 where description=$3',[table, team.id[i], team.name[i]])
    console.log(`Updated ${teams[i].name}`);
    if (i+1 < teams.length) await updateTeams(teams, i+1);
  } catch (e) {
    console.log(e);
  }
}

(async() => {
  try {
    const allTeams = await onfleet.teams.list();
    const vDayTeams = allTeams.filter(team => /.*vday.*/i.test(team.name));
    await updateTeams(vDayTeams);
    console.log('great success');
  } catch (e) {
    console.log(e);
  }
})();
