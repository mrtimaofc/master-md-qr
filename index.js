require('wa_set_pkg/server')

require('@adiwajshing/keyed-db')

const {

    default: sockConnect,

    useMultiFileAuthState,

    fetchLatestBaileysVersion,

    jidNormalizedUser

} = require('@adiwajshing/baileys')

const {

    upload

} = require('./mega')

var fs = require('fs')

const pino = require('pino')

var auth_path = './auth_info_baileys/'

async function start() {

    var {

        version

    } = await fetchLatestBaileysVersion()



    try {

const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')

  const sock = sockConnect({

    printQRInTerminal: true,

    version: [2,2323,4],

    browser: ['MASTER-MD', 'Web', 'v1'],

    auth: state,

    version

  });

        sock.ev.on('creds.update', saveCreds)



        sock.ev.on('connection.update', async (update) => {

            const {

                connection

            } = update

            if (connection === 'close') {

                start()

            }

            if (update.qr) {

                qr_code = update.qr

            }



            if (connection === 'open') {

                qr_code = ''

                const user_jid = jidNormalizedUser(sock.user.id);

                const mega_url = await upload(fs.createReadStream(auth_path + 'creds.json'), `${user_jid}.json`);

                const string_session = 'MASTER-MD:' + mega_url.replace('https://mega.nz/file/', '')

                await sock.sendMessage(user_jid, {

                    text: string_session

                });

                

                fs.rmSync(auth_path, {

                    recursive: true,

                    force: true

                })

                start()

            }

        })

    } catch {

        start()

    }

}



start()

