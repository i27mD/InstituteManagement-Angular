import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Enrollment {
  enrollmentId: number;
  studentId: number;
  courseId: number;
  enrollmentDate: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = 'https://localhost:7186/api/Enrollments'; 

  constructor(private http: HttpClient) { }

  getEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.apiUrl);
  }

  // دالة العرض (View)
  getEnrollmentById(id: number): Observable<Enrollment> {
    return this.http.get<Enrollment>(`${this.apiUrl}/${id}`);
  }

  addEnrollment(enrollment: any): Observable<any> {
    return this.http.post(this.apiUrl, enrollment);
  }

  // دالة التعديل (Edit)
  updateEnrollment(id: number, enrollment: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, enrollment);
  }

  deleteEnrollment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  searchEnrollments(keyword: string): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}/search?keyword=${keyword}`);
  }

  // الدالة المخصصة لتحديث الحالة فقط (Custom Update Status)
  updateEnrollmentStatus(id: number, status: string): Observable<any> {
    // نرسل الـ Status على شكل Object ليتوافق مع UpdateEnrollmentStatusDto
    return this.http.put(`${this.apiUrl}/${id}/status`, { status: status });
  }
}