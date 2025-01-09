import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {HttpClientUserService} from "../../../../services/user/http-client-user.service";
import {User} from "../../../../services/user/user";

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

  ],
  templateUrl: './teacher-delete-confirm.component.html',
  styleUrl: './teacher-confirm.component.scss'
})
export class TeacherDeleteConfirmComponent implements OnInit {
  user ?: User;

  constructor(
    public dialogRef: MatDialogRef<TeacherDeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RequestDeleteConfirmData,
    private userService: HttpClientUserService,
  ) {
  }

  ngOnInit(): void {
    this.userService.getUserById(this.data.user.id).then(user => {
      this.user = user;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteUser() {
    this.userService.deleteUserById(this.data.user.id).then(Answer => {
      if (Answer) {
        this.dialogRef.close();
      }
    })
  }
}

export interface RequestDeleteConfirmData {
  user: User;
}
