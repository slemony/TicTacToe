import sqlite3
db = sqlite3.connect('db.sqlite')

db.execute('DROP TABLE IF EXISTS players')

db.execute('''CREATE TABLE players(
	id integer PRIMARY KEY,
	name text NOT NULL,
	winRecord integer NOT NULL
)''')

cursor = db.cursor()

cursor.execute('''
	INSERT INTO players(name, winRecord)
	VALUES('Jackson','0')
''')

cursor.execute('''
	INSERT INTO players(name, winRecord)
	VALUES('Edward','0')
''')

db.commit()
db.close()
