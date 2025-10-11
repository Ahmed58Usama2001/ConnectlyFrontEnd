import { Component, ElementRef, inject, OnInit, signal, ViewChild, viewChild } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-user-management',
  imports: [],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  @ViewChild('rolesModal') rolesModal!: ElementRef<HTMLDialogElement>;
  private adminService = inject(AdminService);
  protected users = signal<User[]>([]);
  protected availableRoles = ['Admin', 'Moderator', 'Member'];
  protected selectedUser: User | null = null;

   ngOnInit(): void {
    this.getUsersWithRoles();
    
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe({
      next: users => this.users.set(users)
    })
  }

  openRolesModal(user: User) {
    this.selectedUser = user;
    this.rolesModal.nativeElement.showModal();
  }
}
