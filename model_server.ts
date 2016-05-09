/// <reference path="type_definitions/nodemailer.d.ts" />
/// <reference path="type_definitions/mysql.d.ts" />

var mysql = require('mysql');

module ModelServer {

export class MailSender {
	host: string;
	port: number;
	use_ssl: boolean;
	user: string;
	password: string;

	constructor(host: string,
				port: number,
				use_ssl: boolean,
				user: string,
				password: string) {
		this.host = host;
		this.port = port;
		this.use_ssl = use_ssl;
		this.user = user;
		this.password = password;
	}

	send(to: string, subject: string, body: string, attachments: any, callback: any) : void {
		var smtpConfig = {
		  host: this.host,
			 port: this.port,
			 secure: this.use_ssl,
			 auth: {
			     user: this.user,
			     pass: this.password
		  }
		};
		var mailAttachments = [];
		for (var i = 0; i < attachments.length; i++) {
			var attachment = attachments[i];
			mailAttachments[i] = { 'filename': attachment.name, 'content': attachment.data };
		}
		var mailOptions = {
			from: this.user, // sender address
			to: to, // list of receivers
			subject: subject, // Subject line
			text: body, // plaintext body
			html: body, // html body
			attachments: mailAttachments
		};

		// send mail with defined transport object
		var nodemailer = require('nodemailer');
		var transporter = nodemailer.createTransport(smtpConfig);
		transporter.sendMail(mailOptions, function(error, info) {
			console.log(JSON.stringify(error));
			console.log(JSON.stringify(info));
			if (error) {
				callback(false, error);
			} else {
				callback(true, "");
			}
		});
	}
}

export class Workout {
	public id : number;
	public title : string;
	public value : string;
	public tags : string;
	public duration_sec : number;
	public tss : number;
	public sport_type : number;
	
	static load(id: number) : Workout {
		var ret = new Workout();
		return ret;
	}
}

function stringFormat(format : string, ...args: any[]) {
    return format.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
}

export class WorkoutDB {
	private connection = null;
	
	constructor(connection_string: string) {
		this.connection = mysql.createConnection(connection_string);
	}
	
	add(workout: Workout) : void {
		var sql = "INSERT INTO workouts (title, value, tags, duration_sec, tss, sport_type) VALUES ({0}, {1}, {2}, {3}, {4}, {5})"
		
		sql = stringFormat(sql,
			this.connection.escape(workout.title),
			this.connection.escape(workout.value),
			this.connection.escape(workout.tags),
			this.connection.escape(workout.duration_sec),
			this.connection.escape(workout.tss),
			this.connection.escape(workout.sport_type));

		console.log(stringFormat("executing {0}", sql));

		this.connection.query(sql);
	}
	
	get(id: number, callback : (err: string, w: Workout) => void) : void {
		var sql = "SELECT id, title, value, tags, duration_sec, tss, sport_type FROM workouts where id={0}";
		sql = stringFormat(
			this.connection.escape(id)
		);
		this.connection.query(sql, function (err, rows, fields) {
			if (!err) {
				if (rows.length == 0) {
					callback("", null);
				} else {
					var workout = new Workout();
					workout.id = rows[0].id;
					workout.title = rows[0].title;
					workout.value = rows[0].value;
					workout.tags = rows[0].tags;
					workout.duration_sec = rows[0].duration_sec;
					workout.tss = rows[0].tss;
					workout.sport_type = rows[0].sport_type;
					callback("", workout);
				}				
			} else {
				console.log(err);
				callback("Error while reading from db", null);
			}
		});	
	}
	
	connect() : void {
		this.connection.connect();
	}
	
	close() : void {
		this.connection.end();
	}
}

}

export = ModelServer;