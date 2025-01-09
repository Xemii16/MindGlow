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
import {Location} from "@angular/common";
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
  templateUrl: './request-delete-confirm.component.html',
  styleUrl: './request-delete-confirm.component.scss'
})
export class RequestDeleteConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<RequestDeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RequestDeleteConfirmData,
    private location: Location,
    private userService: HttpClientUserService
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteUser() {
    this.userService.deleteUserById(this.data.user.id).then(() => {
      this.dialogRef.close();
      this.location.back();
    });
  }
}

export interface RequestDeleteConfirmData {
  user: User;
}
