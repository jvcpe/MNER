const db = require('_helpers/db');
const Player = db.Player;
const fs = require('mz/fs');
const csv = require('fast-csv');
const clubToLeague = require('../assets/clubToLeague.json');

module.exports = {
    importPlayer,
};

async function importPlayer() {
    console.log("Start Importing players ... ");

    const leaguesValues = Object.values(clubToLeague);
    const leaguesKeys = Object.keys(clubToLeague);

    const log = data => console.log(JSON.stringify(data, undefined, 2));

    (async function() {

        try {
            let headers = Object.keys(Player.schema.paths)
                .filter(k => ['_id','__v'].indexOf(k) === -1);

            await new Promise((resolve,reject) => {

                let buffer = [],
                    counter = 0;

                let stream = fs.createReadStream('assets/data_player_c_replacement.csv', {encoding: 'binary'})
                    .pipe(csv({ headers, delimiter:';' }))
                    .on("error", reject)
                    .on("data", async doc => {
                        stream.pause();
                        loop : for(let i = 0; i < leaguesValues.length; i++) {
                            let league = leaguesValues[i];
                            for(let j = 0; j < league.length; j++) {
                                if( doc.club === league[j] ) {
                                    doc.league = leaguesKeys[i];
                                    break loop;
                                }
                            }
                        }
                        doc.position = doc.position.split(" ");
                        buffer.push(doc);
                        console.log(doc.name);
                        counter++;
                        try {
                            if ( counter > 1000 ) {
                                await Player.insertMany(buffer);
                                buffer = [];
                                counter = 0;
                                console.log(`Writing to the database. Counter is set to : ${counter}`);
                            }
                        } catch(e) {
                            stream.destroy(e);
                        }

                        stream.resume();

                    })
                    .on("end", async () => {
                        console.log("END");
                        try {
                            if ( counter > 0 ) {
                                await Player.insertMany(buffer);
                                buffer = [];
                                counter = 0;
                                console.log("Resolve !");
                                resolve();
                            }
                        } catch(e) {
                            stream.destroy(e);
                        }
                    });

            });


        } catch(e) {
            console.error(e)
        }
    })()
}

async function importFormation() {
    console.log("import formation");
}
