import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  // المتغيرات التي ستحمل اسم المستخدم وكلمة المرور من الواجهة
  credentials = { username: '', password: '' };
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef // ضروري جداً لنظام Zoneless
  ) {}

  onSubmit() {
    // التحقق من أن الحقول ليست فارغة
    if (!this.credentials.username || !this.credentials.password) {
      this.errorMessage = 'Please enter both username and password.';
      this.cdr.detectChanges(); // تحديث الشاشة لإظهار الخطأ
      return;
    }

    // إرسال الطلب للباك اند
    this.authService.login(this.credentials).subscribe({
      next: () => {
        // عند النجاح، التوجيه مباشرة للوحة القيادة
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        // عند الفشل (مثلاً كلمة المرور خاطئة)
        this.errorMessage = 'Invalid username or password!';
        this.cdr.detectChanges(); // تحديث الشاشة لإظهار الخطأ فوراً
      }
    });
  }
}