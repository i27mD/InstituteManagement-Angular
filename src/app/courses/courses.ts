import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseService, Course } from '../services/course.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './courses.html',
  styleUrls: ['./courses.css']
})
export class Courses implements OnInit {
  coursesList: Course[] = [];
  searchKeyword: string = '';
  
  currentCourse: any = {
    courseId: 0,
    courseName: '',
    description: '',
    startDate: '',
    endDate: '',
    teacherId: null 
  };

  constructor(private courseService: CourseService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe((data) => {
      this.coursesList = data;
      this.cdr.detectChanges();
    });
  }

  search() {
    if (this.searchKeyword.trim() === '') {
      this.loadCourses();
    } else {
      this.courseService.searchCourses(this.searchKeyword).subscribe((data) => {
        this.coursesList = data;
        this.cdr.detectChanges();
      });
    }
  }

  saveCourse() {
    if (this.currentCourse.courseId === 0) {
      this.courseService.addCourse(this.currentCourse).subscribe(() => {
        alert('Course added successfully!');
        this.loadCourses();
        this.resetForm();
      });
    } else {
      this.courseService.updateCourse(this.currentCourse.courseId, this.currentCourse).subscribe(() => {
        alert('Course updated successfully!');
        this.loadCourses();
        this.resetForm();
      });
    }
  }

  editCourse(course: Course) {
    // تنسيق التاريخ ليظهر في حقل <input type="date"> بشكل صحيح (YYYY-MM-DD)
    const formattedCourse = { ...course };
    formattedCourse.startDate = new Date(course.startDate).toISOString().split('T')[0];
    formattedCourse.endDate = new Date(course.endDate).toISOString().split('T')[0];
    
    this.currentCourse = formattedCourse;
  }

  viewCourse(id: number) {
    this.courseService.getCourseById(id).subscribe(data => {
      alert(`=== Course Details ===\nName: ${data.courseName}\nDesc: ${data.description}\nStart: ${new Date(data.startDate).toLocaleDateString()}\nEnd: ${new Date(data.endDate).toLocaleDateString()}\nTeacher ID: ${data.teacherId}`);
    });
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(id).subscribe(() => {
        this.loadCourses();
      });
    }
  }

  resetForm() {
    this.currentCourse = { courseId: 0, courseName: '', description: '', startDate: '', endDate: '', teacherId: null };
  }
}