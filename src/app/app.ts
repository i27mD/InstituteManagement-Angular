import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service'; // تأكد من مسار الخدمة

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule], // استدعاء أدوات التوجيه كما في المحاضرة
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App implements OnInit {
  name = "Admin";
  isLoggedIn = false; // المتغير المسؤول عن إظهار/إخفاء القائمة

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef // تحديث الشاشة عند تغيير حالة الدخول
  ) {}

  ngOnInit() {
    // الاشتراك في خدمة المصادقة لمعرفة ما إذا كان هناك توكن محفوظ أم لا
    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
      this.cdr.detectChanges(); // تحديث القائمة (Navbar) فوراً
    });
  }

  logout() {
    this.authService.logout(); // استدعاء دالة مسح التوكن
    this.router.navigate(['/login']); // طرد المستخدم لصفحة الدخول
  }
}