/**
 * This model is responsible for information related
 * to a attendance.
 */
var db = require( __dirname + '/db' );

/**
 * Scehma of the attendance object.
 */
var attendanceSchema = db.Schema({
	
    id:String,
    guid:String,
	date: String,
    /*present: { 
    	scoutId :String {
      		markedAt: String,
        	status: Boolean
        }
    },*/

    userId: String,
    name:String

});

module.exports = db.model('Attendance', attendanceSchema);