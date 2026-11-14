import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EnrollmentService, Enrollment } from '../services/enrollment.service';

@Component({
  selector: 'app-enrollments',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './enrollments.html',
  styleUrls: ['./enrollments.css']
})
export class Enrollments implements OnInit {
  enrollmentsList: Enrollment[] = [];
  searchKeyword: string = '';
  
  // لا نحتاج لإرسال Status أو Date في نموذج الإضافة والتعديل لأن الباك اند يتولى ذلك
  currentEnrollment: any = {
    enrollmentId: 0,
    studentId: null,
    courseId: null
  };

  constructor(private enrollmentService: EnrollmentService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadEnrollments();
  }

  loadEnrollments() {
    this.enrollmentService.getEnrollments().subscribe((data) => {
      this.enrollmentsList = data;
      this.cdr.detectChanges();
    });
  }

  search() {
    if (this.searchKeyword.trim() === '') {
      this.loadEnrollments();
    } else {
      this.enrollmentService.searchEnrollments(this.searchKeyword).subscribe((data) => {
        this.enrollmentsList = data;
        this.cdr.detectChanges();
      });
    }
  }

  saveEnrollment() {
    if (this.currentEnrollment.enrollmentId === 0) {
      this.enrollmentService.addEnrollment(this.currentEnrollment).subscribe(() => {
        alert('Enrollment added successfully!');
        this.loadEnrollments();
        this.resetForm();
      });
    } else {
      this.enrollmentService.updateEnrollment(this.currentEnrollment.enrollmentId, this.currentEnrollment).subscribe(() => {
        alert('Enrollment updated successfully!');
        this.loadEnrollments();
        this.resetForm();
      });
    }
  }

  // دالة العرض (View)
  viewEnrollment(id: number) {
    this.enrollmentService.getEnrollmentById(id).subscribe(data => {
      alert(`=== Enrollment Details ===\nEnrollment ID: ${data.enrollmentId}\nStudent ID: ${data.studentId}\nCourse ID: ${data.courseId}\nDate: ${new Date(data.enrollmentDate).toLocaleDateString()}\nStatus: ${data.status}`);
    });
  }

  // دالة نقل البيانات للنموذج للتعديل (Edit)
  editEnrollment(enrollment: Enrollment) {
    this.currentEnrollment = {
      enrollmentId: enrollment.enrollmentId,
      studentId: enrollment.studentId,
      courseId: enrollment.courseId
    };
  }

  // دالة تغيير الحالة فقط عن طريق نافذة منبثقة (Prompt)
  changeStatus(id: number) {
    const newStatus = prompt("Enter new status (e.g., Completed, Dropped, Active):");
    if (newStatus && newStatus.trim() !== "") {
      this.enrollmentService.updateEnrollmentStatus(id, newStatus).subscribe(() => {
        alert('Status updated successfully!');
        this.loadEnrollments();
      });
    }
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this enrollment?')) {
      this.enrollmentService.deleteEnrollment(id).subscribe(() => {
        this.loadEnrollments();
      });
    }
  }

  resetForm() {
    this.currentEnrollment = { enrollmentId: 0, studentId: null, courseId: null };
  }
}