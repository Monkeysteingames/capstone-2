-- both test users have the password 'password'

INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'zach@zachaugustine.com',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'busty@busterjovi.com',
        TRUE);

INSERT INTO liked_movies (user_id, movie_id, title, overview, user_rating, poster_path)
VALUES (
		1,
		361743,
		'Top Gun: Maverick',
		'After more than thirty years of service as one of the Navy’s top aviators, and dodging the advancement in rank that would ground him, Pete “Maverick” Mitchell finds himself training a detachment of TOP GUN graduates for a specialized mission the likes of which no living pilot has ever seen.',
		0,
		'/9n5e1vToDVnqz3hW10Jdlvmzpo0.jpg'
		);