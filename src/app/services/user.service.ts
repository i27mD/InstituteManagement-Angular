import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// واجهة المستخدم (تطابق UserResponseDto ولا تحتوي على PasswordHash)
export interface User {
  userId: number;
  username: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7186/api/Users'; 

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // دالة العرض (View)
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // دالة الإضافة (تستقبل بيانات تشمل Password لتطابق UserCreateDto)
  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  // دالة التعديل (تستقبل بيانات لا تشمل Password لتطابق UserUpdateDto)
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  searchUsers(keyword: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/search?keyword=${keyword}`);
  }
}