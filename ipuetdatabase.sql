CREATE TABLE Users (
    id INT PRIMARY KEY IDENTITY(1,1),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name NVARCHAR(100)
);

DROP TABLE Users;

SELECT * FROM Users

INSERT INTO Users (email, password, name) 
VALUES ('example@example.com', 'password123', N'John Doe');
