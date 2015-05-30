/**
 *
 * Developer: Muhammad Zeeshan
 *
 */
/**
 * This module is responsible for handling scout api requests
 */
// Reference to the module to be exported
scout = module.exports = {};

/**
 * Setup takes an express application server and configures
 * it to handle errors.
 *
 */
scout.setup = function(app) {

    // Our logger for logging to file and console
    var logger = require(__dirname + '/../logger');

    // config
    var config = require(__dirname + '/../config');

    var Scout = require(__dirname + '/../models/Scout');

    /* 
     *  Developer: Muhammad Zeeshan
     *
     *  api to add scout
     *
     *  url: /api/scout/add
     *
     *  method: POST
     *
     *  @params:
     *
     *  1- firstName: String
     *  2- lastName: String
     */
    app.post('/api/scout/add', function(req, res) {

        logger.info('Inside /api/scout/add POST');

        var responseJSON = {};
        var data = req.body;

        if (data.firstName && data.lastName) {

            var scout = new Scout();

            scout.firstName = data.firstName;
            scout.lastName = data.lastName;

            scout.save(function(err, s) {

                if (err) {
                    // set on logger
                    logger.error(JSON.stringify(err));

                    responseJSON.status = 'FAIL';
                    responseJSON.message = JSON.stringify(err);
                    // Response to client.
                    res.jsonp(200, responseJSON);
                }

                /// set on logger
                logger.info('Scout with firstName: ' + s.firstName + ' and lastName: ' + s.lastName + ' added successfully.');

                responseJSON.status = 'OK';
                // Response to request.
                res.jsonp(200, responseJSON);



            }); // save scout end

        } else {

            responseJSON.status = 'FAIL';
            responseJSON.message = 'Invalid request';
            // Response to client.
            res.jsonp(200, responseJSON);

        }

    });

    /**
     * get scouts greater than given date
     *
     * @params:
     *
     * 1- date: String
     *
     **/
    app.get('/api/scouts/list/:date', function(req, res) {

        logger.info('Inside /api/scouts/list/:date GET');
        logger.info('date: ' + req.params.date);

        // Construct response JSON
        var responseJSON = {};

        var date = req.params.date;
        date = date.replace('+', ' ');
        logger.info('$gt date ' + new Date(date).toISOString());
        
        var condition = {
            lastUpdatedDate: {
                '$gt': new Date(date).toISOString()
            }
        };

        // get list of scouts
        // mongo query will work on iso date
        Scout.find(condition, 'firstName lastName lastUpdatedDate', function(err, scouts) {

            if (err) {
                logger.error(JSON.stringify(err));
                responseJSON.status = 'FAIL';
                responseJSON.message = JSON.stringify(err);
                // Response to client.
                res.jsonp(200, responseJSON);
                return;
            }

            // scouts found
            if (scouts != null && scouts.length) {

                logger.info('scouts found.');

                responseJSON.status = 'OK';
                responseJSON.data = scouts;
                // Response to client.
                res.jsonp(200, responseJSON);

            } else {

                logger.info('no scouts found.');

                responseJSON.status = 'OK';
                responseJSON.data = [];
                // Response to client.
                res.jsonp(200, responseJSON);
            }
        });

    });


}