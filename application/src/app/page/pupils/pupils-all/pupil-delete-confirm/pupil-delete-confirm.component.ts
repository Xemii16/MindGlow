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

@Component({
  selector: 'app-request-delete-confirm',
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
  templateUrl: './pupil-delete-confirm.component.html',
  styleUrl: './pupil-delete-confirm.component.scss'
})
export class PupilDeleteConfirmComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<PupilDeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RequestDeleteConfirmData,
  ) {
  }

  ngOnInit(): void {
    /*this.userService.getUserById(this.data.user.id).then(response => {
      if (response === null) return;
      this.user = response;
    });*/
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteUser() {
    /*this.userService.deleteUser(this.data.user).then(() => {
      this.dialogRef.close();
    });*/
  }
}

export interface RequestDeleteConfirmData {
/*  user: UserResponse;*/
}
