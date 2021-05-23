const Bands = require('../models/bands')
const Band = require('../models/band');
const bands = new Bands();
console.log(bands);

var { io } = require('../index');

bands.addBand(new Band('Cannibal Corpse'));
bands.addBand(new Band('Brocken Hope'));
bands.addBand(new Band('Napalm Death'));
bands.addBand(new Band('Yngwee'));
bands.addBand(new Band('Joe Satriani'));

console.log(bands);
//mensajes de sockets

io.on('connection', client => {
    console.log("cliente conectado");



    client.on('disconnect', () => { console.log('client disconnected') });

    client.on('mensaje', (payload) => {
        console.log('MEnsaje!!!', payload);
        io.emit('mensaje', { admin: 'Nuevo msg admin' });
    });
    client.on('nuevo_mensaje', (payload) => {
        console.log('MEnsaje!!!', payload);
        io.emit('nuevo_mensaje', { admin: 'HEY Nuevo msg admin. ', mensaje: 'HOLA MUNDO ' + payload });
    });

    client.on('nuevo_msg', (payload) => {
        console.log('MEnsaje emitido de flutter!!!', payload);
        io.emit('nuevo_msg', { admin: 'de flutter. ', mensaje: 'msg de flutter: ' + payload });
    });

    client.on('flutter-msg', (payload) => {
        console.log(payload)
        client.broadcast.emit('flutter-msg-todos', payload)
    });

    client.emit('active-bands', function() {
        console.log('active-bands a flutter: ');

        client.broadcast.emit('bandas', bands)
    });
    client.emit('activeBands', bands.getBands());

    client.on('vote-band', (payload) => {
        console.log('Vote for band: ' + payload['name']);
        bands.voteBand(payload.id);
        io.emit('activeBands', bands.getBands());
        // client.broadcast.emit('bandas', bands)
    });
    client.on('add-band', (payload) => {
        console.log('Add band to list: ' + payload['name']);
        bands.addBand(new Band(payload.name));
        io.emit('activeBands', bands.getBands());
        // client.broadcast.emit('bandas', bands)
    });
    client.on('del-band', (payload) => {
        console.log('Delete band of list: ' + payload['id']);
        bands.deleteBand(payload.id);
        io.emit('activeBands', bands.getBands());
        // client.broadcast.emit('bandas', bands)
    });

});