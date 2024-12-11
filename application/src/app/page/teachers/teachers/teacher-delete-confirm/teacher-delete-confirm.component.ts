import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {UserService} from "../../../../service/user/user.service";
import {Location} from "@angular/common";
import {CdkTrapFocus} from "@angular/cdk/a11y";
import {RouterLink} from "@angular/router";
import {UserResponse} from "../../../../service/user/response/user.response";

@Component({
  selector: 'teacher-delete-confirmation',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CdkTrapFocus,
    RouterLink,
  ],
  templateUrl: './teacher-delete-confirm.component.html',
  styleUrl: './teacher-confirm.component.scss'
})
export class TeacherDeleteConfirmComponent implements OnInit{
  user?: UserResponse
  constructor(
    public dialogRef: MatDialogRef<TeacherDeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RequestDeleteConfirmData,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
        this.userService.getUserById(this.data.user.id).then(response => {
          if (response === null) return;
          this.user = response;
        });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteUser() {
    this.userService.deleteUser(this.data.user).then(() => {
      this.dialogRef.close();
    });
  }
}

export interface RequestDeleteConfirmData {
  user: UserResponse;
}
