import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class Users implements OnInit {
  usersList: User[] = [];
  searchKeyword: string = '';
  
  // أضفنا password لكي نستخدمه عند الإضافة فقط
  currentUser: any = {
    userId: 0,
    username: '',
    email: '',
    password: '',
    role: 'User' // قيمة افتراضية
  };

  constructor(private userService: UserService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.usersList = data;
      this.cdr.detectChanges();
    });
  }

  search() {
    if (this.searchKeyword.trim() === '') {
      this.loadUsers();
    } else {
      this.userService.searchUsers(this.searchKeyword).subscribe((data) => {
        this.usersList = data;
        this.cdr.detectChanges();
      });
    }
  }

  saveUser() {
    if (this.currentUser.userId === 0) {
      // التحقق من إدخال كلمة المرور عند الإضافة
      if (!this.currentUser.password || this.currentUser.password.trim() === '') {
        alert('Password is required for new users!');
        return;
      }
      this.userService.addUser(this.currentUser).subscribe(() => {
        alert('User added successfully!');
        this.loadUsers();
        this.resetForm();
      });
    } else {
      // عند التعديل، لا نرسل كلمة المرور
      this.userService.updateUser(this.currentUser.userId, this.currentUser).subscribe(() => {
        alert('User updated successfully!');
        this.loadUsers();
        this.resetForm();
      });
    }
  }

  // نقل البيانات للتعديل (Edit)
  editUser(user: User) {
    this.currentUser = {
      userId: user.userId,
      username: user.username,
      email: user.email,
      role: user.role,
      password: '' // نترك كلمة المرور فارغة لأننا لن نعدلها
    };
  }

  // عرض تفاصيل المستخدم (View)
  viewUser(id: number) {
    this.userService.getUserById(id).subscribe(data => {
      alert(`=== User Details ===\nID: ${data.userId}\nUsername: ${data.username}\nEmail: ${data.email}\nRole: ${data.role}`);
    });
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  resetForm() {
    this.currentUser = { userId: 0, username: '', email: '', password: '', role: 'User' };
  }
}