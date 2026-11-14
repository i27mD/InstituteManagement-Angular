import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// يجب أن يتوافق هذا مع StudentResponseDto الذي أرسلناه من Web API
export interface Student {
  studentId: number;
  fullName: string;
  email: string;
  phone: string;
  joinDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'https://localhost:7186/api/Students'; 

  constructor(private http: HttpClient) { }

  // جلب جميع الطلاب
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  // إضافة طالب جديد (يتوافق مع StudentCreateDto)
  addStudent(student: any): Observable<any> {
    return this.http.post(this.apiUrl, student);
  }

  // حذف طالب
  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // البحث عن طلاب (كما أنشأناها في الـ Backend)
  searchStudents(keyword: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/search?keyword=${keyword}`);
  }

  // جلب طالب واحد بالـ ID (لعملية View)
  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  // تعديل بيانات طالب (لعملية Update)
  updateStudent(id: number, student: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, student);
  }
}