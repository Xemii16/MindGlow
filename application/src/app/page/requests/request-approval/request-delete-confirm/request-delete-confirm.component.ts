import {Component, Inject} from '@angular/core';
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
    MatDialogClose,
    CdkTrapFocus,
    RouterLink,
  ],
  templateUrl: './request-delete-confirm.component.html',
  styleUrl: './request-delete-confirm.component.scss'
})
export class RequestDeleteConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<RequestDeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RequestDeleteConfirmData,
    private userService: UserService,
    private location: Location
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteUser() {
    this.userService.deleteUser(this.data.user).then(() => {
      this.dialogRef.close();
      this.location.back();
    });
  }
}

export interface RequestDeleteConfirmData {
  user: UserResponse;
}
