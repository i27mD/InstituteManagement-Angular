import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // <-- 1. استدعاء الأداة
import { CommonModule } from '@angular/common';
import { StudentService } from '../services/student.service';
import { TeacherService } from '../services/teacher.service';
import { CourseService } from '../services/course.service';
import { UserService } from '../services/user.service';
import { EnrollmentService } from '../services/enrollment.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  studentsCount: number = 0;
  teachersCount: number = 0;
  coursesCount: number = 0;
  usersCount: number = 0;
  enrollmentsCount: number = 0;

  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
    private courseService: CourseService,
    private userService: UserService,
    private enrollmentService: EnrollmentService,
    private cdr: ChangeDetectorRef // <-- 2. حقن الأداة هنا
  ) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics() {
    this.studentService.getStudents().subscribe(data => {
      this.studentsCount = data.length;
      this.cdr.detectChanges(); // <-- 3. إخبار الشاشة بالتحديث
    });
    
    this.teacherService.getTeachers().subscribe(data => {
      this.teachersCount = data.length;
      this.cdr.detectChanges();
    });
    
    this.courseService.getCourses().subscribe(data => {
      this.coursesCount = data.length;
      this.cdr.detectChanges();
    });
    
    this.userService.getUsers().subscribe(data => {
      this.usersCount = data.length;
      this.cdr.detectChanges();
    });
    
    this.enrollmentService.getEnrollments().subscribe(data => {
      this.enrollmentsCount = data.length;
      this.cdr.detectChanges();
    });
  }
}