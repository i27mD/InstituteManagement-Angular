import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Teacher {
  teacherId: number;
  fullName: string;
  email: string;
  phone: string;
  specialization: string;
}

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiUrl = 'https://localhost:7186/api/Teachers'; 

  constructor(private http: HttpClient) { }

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl);
  }

  // دالة عرض مدرس واحد (View)
  getTeacherById(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/${id}`);
  }

  addTeacher(teacher: any): Observable<any> {
    return this.http.post(this.apiUrl, teacher);
  }

  // دالة التعديل (Edit)
  updateTeacher(id: number, teacher: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, teacher);
  }

  deleteTeacher(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  searchTeachers(keyword: string): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.apiUrl}/search?keyword=${keyword}`);
  }
}