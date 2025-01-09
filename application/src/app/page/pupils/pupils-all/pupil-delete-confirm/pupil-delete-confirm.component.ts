import {Component, Inject} from '@angular/core';
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
import {User} from "../../../../services/user/user";
import {HttpClientUserService} from "../../../../services/user/http-client-user.service";

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
export class PupilDeleteConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<PupilDeleteConfirmComponent>,
    private userService: HttpClientUserService,
    @Inject(MAT_DIALOG_DATA) public data: RequestDeleteConfirmData,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteUser() {
    this.userService.deleteUserById(this.data.user.id).then(() => {
      this.dialogRef.close();
    });
  }
}

export interface RequestDeleteConfirmData {
  user: User;
}
