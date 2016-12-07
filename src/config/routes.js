'use strict';

//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//

/**
 * <p>
 *     Routing
 *
 * @author martijn <martijn@spent-time.com>
 */

var publication = require('../controllers/publication');
var subscription = require('../controllers/subscription');

module.exports = function (app) {

    /**
     * Search for match on domain name
     */
    app.get('/_api/search/domain/:domain', publication.domain);

    /**
     * List all publications
     */
    app.get('/_api/publication', publication.list);

    /**
     * Get publication by id
     */
    app.get('/_api/publication/:id', publication.get);

    /**
     * Create publication
     */
    app.post('/_api/publication', publication.create);

    /**
     * Update publication
     */
    app.put('/_api/publication/:id', publication.update);

    /**
     * Delete publication
     */
    app.delete('/_api/publication/:id', publication.remove);

    /**
     * Insert subscription
     */
    app.post('/_api/subscription', subscription.insert);

    /**
     * Error handling
     */
    app.use(function (err, req, res, next) {

        console.error(err);

        // treat as 404
        if (err.message
            && (~err.message.indexOf('not found')
            || (~err.message.indexOf('Cast to ObjectId failed')))) {

            return next();
        }

        if (err.stack.includes('ValidationError')) {

            res.status(422);
            res.send({error: err.stack});
            return;
        }

        // error page
        res.status(500);
        res.status({error: err.stack});
    });

};
