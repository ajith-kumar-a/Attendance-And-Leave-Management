INSERT INTO roles_role (id, role_name)
VALUES
(1, 'Student'),
(2, 'Teacher'),
(3, 'Staff'),
(4, 'Admin');


INSERT INTO leaverequest_leavestatus (id, status)
VALUES
(1, 'Pending'),
(2, 'Approved'),
(3, 'Rejected');


INSERT INTO attendance_attendancestatus (id, status)
VALUES
(1, 'Pending'),
(2, 'Present'),
(3, 'Absent');



INSERT INTO attendance_attendance (id, date, remarks, login_time, logout_time, status_id_id, user_id_id)
VALUES
(1, '2024-09-01', 'Attended morning session', '09:00:00', '12:00:00', 1, 1),
(2, '2024-09-02', 'Late arrival', '09:30:00', '12:00:00', 1, 1),
(3, '2024-09-03', 'Full day attendance', '09:00:00', '17:00:00', 1, 1),
(4, '2024-09-04', 'Left early for medical reasons', '09:00:00', '14:00:00', 1, 1),
(5, '2024-09-05', 'Attended all sessions', '09:00:00', '17:00:00', 1, 1),
(6, '2024-09-06', 'Attended morning only', '09:00:00', '12:00:00', 1, 1),
(7, '2024-09-07', 'Absent in afternoon', '09:00:00', '12:00:00', 1, 1),
(8, '2024-09-08', 'Full day attendance', '09:00:00', '17:00:00', 1, 1),
(9, '2024-09-09', 'Late login', '09:30:00', '17:00:00', 1, 1),
(10, '2024-09-10', 'Full day attendance', '09:00:00', '17:00:00', 1, 1);


UPDATE attendance_attendance
SET login_time = '2024-09-01 09:00:00',
    logout_time = '2024-09-01 12:00:00'
WHERE id = 1;

UPDATE attendance_attendance
SET login_time = '2024-09-02 09:30:00',
    logout_time = '2024-09-02 12:00:00'
WHERE id = 2;

UPDATE attendance_attendance
SET login_time = '2024-09-03 09:00:00',
    logout_time = '2024-09-03 17:00:00'
WHERE id = 3;

UPDATE attendance_attendance
SET login_time = '2024-09-04 09:00:00',
    logout_time = '2024-09-04 14:00:00'
WHERE id = 4;

UPDATE attendance_attendance
SET login_time = '2024-09-05 09:00:00',
    logout_time = '2024-09-05 17:00:00'
WHERE id = 5;

UPDATE attendance_attendance
SET login_time = '2024-09-06 09:00:00',
    logout_time = '2024-09-06 12:00:00'
WHERE id = 6;

UPDATE attendance_attendance
SET login_time = '2024-09-07 09:00:00',
    logout_time = '2024-09-07 12:00:00'
WHERE id = 7;

UPDATE attendance_attendance
SET login_time = '2024-09-08 09:00:00',
    logout_time = '2024-09-08 17:00:00'
WHERE id = 8;

UPDATE attendance_attendance
SET login_time = '2024-09-09 09:30:00',
    logout_time = '2024-09-09 17:00:00'
WHERE id = 9;

UPDATE attendance_attendance
SET login_time = '2024-09-10 09:00:00',
    logout_time = '2024-09-10 17:00:00'
WHERE id = 10;


INSERT INTO attendance_attendance (id, date, remarks, login_time, logout_time, status_id_id, user_id_id)
VALUES
(11, '2024-09-01', 'Attended morning session', '09:00:00', '12:00:00', 1, 2),
(12, '2024-09-02', 'Late arrival', '09:30:00', '12:00:00', 1, 2),
(13, '2024-09-03', 'Full day attendance', '09:00:00', '17:00:00', 1, 2),
(14, '2024-09-04', 'Left early for personal reasons', '09:00:00', '14:00:00', 1, 2),
(15, '2024-09-05', 'Attended all sessions', '09:00:00', '17:00:00', 1, 2),
(16, '2024-09-06', 'Partial attendance', '09:00:00', '12:00:00', 1, 2),
(17, '2024-09-07', 'Absent in afternoon', '09:00:00', '12:00:00', 1, 2),
(18, '2024-09-08', 'Full day attendance', '09:00:00', '17:00:00', 1, 2),
(19, '2024-09-09', 'Late login', '09:30:00', '17:00:00', 1, 2),
(20, '2024-09-10', 'Full day attendance', '09:00:00', '17:00:00', 1, 2);


UPDATE attendance_attendance
SET login_time = '2024-09-01 09:00:00',
    logout_time = '2024-09-01 12:00:00'
WHERE id = 11;

UPDATE attendance_attendance
SET login_time = '2024-09-02 09:30:00',
    logout_time = '2024-09-02 12:00:00'
WHERE id = 12;

UPDATE attendance_attendance
SET login_time = '2024-09-03 09:00:00',
    logout_time = '2024-09-03 17:00:00'
WHERE id = 13;

UPDATE attendance_attendance
SET login_time = '2024-09-04 09:00:00',
    logout_time = '2024-09-04 14:00:00'
WHERE id = 14;

UPDATE attendance_attendance
SET login_time = '2024-09-05 09:00:00',
    logout_time = '2024-09-05 17:00:00'
WHERE id = 15;

UPDATE attendance_attendance
SET login_time = '2024-09-06 09:00:00',
    logout_time = '2024-09-06 12:00:00'
WHERE id = 16;

UPDATE attendance_attendance
SET login_time = '2024-09-07 09:00:00',
    logout_time = '2024-09-07 12:00:00'
WHERE id = 17;

UPDATE attendance_attendance
SET login_time = '2024-09-08 09:00:00',
    logout_time = '2024-09-08 17:00:00'
WHERE id = 18;

UPDATE attendance_attendance
SET login_time = '2024-09-09 09:30:00',
    logout_time = '2024-09-09 17:00:00'
WHERE id = 19;

UPDATE attendance_attendance
SET login_time = '2024-09-10 09:00:00',
    logout_time = '2024-09-10 17:00:00'
WHERE id = 20;


