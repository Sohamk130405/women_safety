create database women_safety;
use women_safety;

create table device(
   id int auto_increment primary key,
   name varchar(50),
   phone varchar(10) not null
);

create table location(
	session_id int not null,
    device_id int not null,
    latitude DECIMAL(10, 8),
	longitude DECIMAL(11, 8),
	FOREIGN KEY (device_id) REFERENCES device(id),
    FOREIGN KEY (session_id) REFERENCES session(id)
);

create table session(
	id int auto_increment primary key,
    device_id int not null,
    is_enable bool default true,
    is_sos_triggered bool default false,
    latitude DECIMAL(10, 8),
	longitude DECIMAL(11, 8),
    FOREIGN KEY (device_id) REFERENCES device(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


select * from device;
select * from location;
select * from session;
set foreign_key_checks = 0;

insert into device values(1,"Demo User","9876543210");

insert into session (device_id) values (1);
insert into location (session_id,device_id,latitude,longitude) values (1,1,18.48630804574498, 73.85828546757355),(1,1,18.487631641386105, 73.85728859956428);
update session set is_sos_triggered = true,  latitude = 18.487631641386105 , longitude = 73.85728859956428 where id = 1;

update session set id = 2 where id = 16;





# instructions

create database and .env.local file

MYSQL_HOST="localhost"
MYSQL_DATABASE="women_safety"
MYSQL_USER="root"
MYSQL_PASSWORD="your password"


npm install
npm run dev
