const Band = require('../models/band');
class Bands {

    constructor() {
        this.bands = [];
    }

    addBand(band = new Band()) {
        this.bands.push(band);
    }

    getBands() {
        return this.bands;
    }

    deleteBand(id = '') {
        this.bands = this.bands.filter(band => band.id != id);
        console.log(`After deleting ${id}: `);
        console.table(this.bands);
        return this.bands;
    }

    ///method for increments votes of bands, by the band ID
    voteBand(id) {
        this.bands = this.bands.map(band => {
            if (band.id == id) {
                band.votes++;
                return band;
            } else {
                return band;
            }
        });

    }
}

module.exports = Bands;