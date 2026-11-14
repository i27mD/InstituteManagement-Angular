import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService, Student } from '../services/student.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './students.html',
  styleUrls: ['./students.css']
})
export class Students implements OnInit {
  studentsList: Student[] = [];
  searchKeyword: string = '';
  
  currentStudent: any = {
    studentId: 0,
    fullName: '',
    email: '',
    phone: ''
  };

  constructor(private studentService: StudentService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe((data) => {
      this.studentsList = data;
      this.cdr.detectChanges();
    });
  }

  search() {
    if (this.searchKeyword.trim() === '') {
      this.loadStudents();
    } else {
      this.studentService.searchStudents(this.searchKeyword).subscribe((data) => {
        this.studentsList = data;
        this.cdr.detectChanges();
      });
    }
  }

  // تم تحديث هذه الدالة لتشمل التعديل والإضافة
  saveStudent() {
    if (this.currentStudent.studentId === 0) {
      // عملية إضافة
      this.studentService.addStudent(this.currentStudent).subscribe(() => {
        alert('Student added successfully!');
        this.loadStudents();
        this.resetForm();
      });
    } else {
      // عملية تعديل
      this.studentService.updateStudent(this.currentStudent.studentId, this.currentStudent).subscribe(() => {
        alert('Student updated successfully!');
        this.loadStudents();
        this.resetForm();
      });
    }
  }

  // دالة جديدة: نقل بيانات الطالب إلى النموذج (Form) لتعديلها
  edit(student: Student) {
    // استخدمنا {...student} لنسخ البيانات وليس ربطها مباشرة لتجنب تغيير الجدول قبل الحفظ
    this.currentStudent = { 
      studentId: student.studentId,
      fullName: student.fullName,
      email: student.email,
      phone: student.phone
    };
  }

  // دالة جديدة: جلب تفاصيل الطالب من API وعرضها
  view(id: number) {
    this.studentService.getStudentById(id).subscribe((data) => {
      alert(`--- Student Details ---\n\nID: ${data.studentId}\nName: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone}\nJoin Date: ${data.joinDate}`);
    });
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe(() => {
        this.loadStudents();
      });
    }
  }

  resetForm() {
    this.currentStudent = { studentId: 0, fullName: '', email: '', phone: '' };
  }
}