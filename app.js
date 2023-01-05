const {
    createBot,
    createProvider,
    createFlow,
    addKeyword,
} = require('@bot-whatsapp/bot')
require('./server.http')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const JsonFileAdapter = require('@bot-whatsapp/database/json')

/**
 * Aqui declaramos los flujos hijos, los flujos se declaran de atras para adelante, es decir que si tienes un flujo de este tipo:
 *
 *          Menu Principal
 *           - SubMenu 1
 *             - Submenu 1.1
 *           - Submenu 2
 *             - Submenu 2.1
 *
 * Primero declaras los submenus 1.1 y 2.1, luego el 1 y 2 y al final el principal.
 */
const flow_anal_3 = addKeyword(['zapatos2', '2'])
    .addAnswer('🤯 paso numero 3.')

const flowBolsos2 = addKeyword(['bolsos2', '2'])
    .addAnswer('🤯 *MUCHOS* bolsos ...')
    .addAnswer('y mas bolsos... bla bla')

const flow_anal_2 = addKeyword(['zapatos2', '2'])
    .addAnswer('🤯 repito que tengo *MUCHOS* zapatos.')
    .addAnswer('y algunas otras cosas.')

const flow_anal_1 = addKeyword(['1', 'zapatos', 'ZAPATOS'])
    .addAnswer('🤯 Veo que elegiste zapatos')
    .addAnswer('Tengo muchos zapatos...bla bla')
    .addAnswer(
        ['Manda:', '*(2) Zapatos2*','*(2) Zapatos2*', 'para mas información'],
        { capture: true },
        (ctx) => {
            console.log('Aqui puedes ver más info del usuario...')
            console.log('Puedes enviar un mail, hook, etc..')
            console.log(ctx)
        },
        [flow_anal_2,flow_anal_3]
    )

const flowBolsos = addKeyword(['2', 'bolsos', 'BOLSOS'])
    .addAnswer('🙌 Veo que elegiste bolsos')
    .addAnswer('Tengo muchos bolsos...bla bla')
    .addAnswer(
        ['Manda:', '*(2) Bolsos2*', 'para mas información.'],
        { capture: true },
        (ctx) => {
            console.log('Aqui puedes ver más info del usuario...')
            console.log('Puedes enviar un mail, hook, etc..')
            console.log(ctx)
        },
        [flowBolsos2]
    )

/**
 * Declarando flujo principal
 */

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer(['🛠⚒ Hola, bienvenido al servicio tecnico de tecknicam🛠⚒ ', '¿Como puedo ayudarte?'])
    .addAnswer(['Reparaciones', 'sexo', 'garantias', 'molestar','Anal'])
    .addAnswer(
        ['Para continuar escribe:', '*(1) Anal*', '*(2) Bolsos*'],
        { capture: true },
        (ctx) => {
            console.log('Aqui puedes ver más info del usuario...')
            console.log('Puedes enviar un mail, hook, etc..')
            console.log(ctx)
        },
        [flowBolsos, flow_anal_1]
    )

const main = async () => {
    const adapterDB = new JsonFileAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    adapterProvider.on('ready', () => console.log('Ready!'))
}

main()
