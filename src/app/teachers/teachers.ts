import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TeacherService, Teacher } from '../services/teacher.service';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './teachers.html',
  styleUrls: ['./teachers.css']
})
export class Teachers implements OnInit {
  teachersList: Teacher[] = [];
  searchKeyword: string = '';
  
  currentTeacher: any = {
    teacherId: 0,
    fullName: '',
    email: '',
    phone: '',
    specialization: ''
  };

  constructor(private teacherService: TeacherService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers() {
    this.teacherService.getTeachers().subscribe((data) => {
      this.teachersList = data;
      this.cdr.detectChanges();
    });
  }

  search() {
    if (this.searchKeyword.trim() === '') {
      this.loadTeachers();
    } else {
      this.teacherService.searchTeachers(this.searchKeyword).subscribe((data) => {
        this.teachersList = data;
        this.cdr.detectChanges();
      });
    }
  }

  // تم تحديث الدالة لتدعم الإضافة والتعديل
  saveTeacher() {
    if (this.currentTeacher.teacherId === 0) {
      // إضافة
      this.teacherService.addTeacher(this.currentTeacher).subscribe(() => {
        alert('Teacher added successfully!');
        this.loadTeachers();
        this.resetForm();
      });
    } else {
      // تعديل
      this.teacherService.updateTeacher(this.currentTeacher.teacherId, this.currentTeacher).subscribe(() => {
        alert('Teacher updated successfully!');
        this.loadTeachers();
        this.resetForm();
      });
    }
  }

  // نقل بيانات المدرس للنموذج لتعديلها
  editTeacher(teacher: Teacher) {
    // استخدمنا Spread Operator (...) لنسخ البيانات وليس ربطها مباشرة لمنع تغيير الجدول قبل الحفظ
    this.currentTeacher = { ...teacher }; 
  }

  // عرض تفاصيل المدرس
  viewTeacher(id: number) {
    this.teacherService.getTeacherById(id).subscribe(data => {
      alert(`=== Teacher Details ===\nID: ${data.teacherId}\nName: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone}\nSpecialization: ${data.specialization}`);
    });
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.teacherService.deleteTeacher(id).subscribe(() => {
        this.loadTeachers();
      });
    }
  }

  resetForm() {
    this.currentTeacher = { teacherId: 0, fullName: '', email: '', phone: '', specialization: '' };
  }
}