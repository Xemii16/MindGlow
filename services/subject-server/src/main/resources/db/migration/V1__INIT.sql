CREATE TABLE subjects (
                          id SERIAL PRIMARY KEY,
                          name VARCHAR(255) NOT NULL,
                          description TEXT NOT NULL,
                          code VARCHAR(255) UNIQUE,
                          teacher_id INTEGER
);

CREATE TABLE subject_students (
                                  id SERIAL PRIMARY KEY,
                                  subject_id INTEGER NOT NULL,
                                  student_id INTEGER NOT NULL
);