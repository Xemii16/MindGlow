import {Component, Inject, OnInit, ViewChild} from '@angular/core';
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
import {Location} from "@angular/common";
import {CdkTrapFocus} from "@angular/cdk/a11y";
import {RouterLink} from "@angular/router";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {UserResponse} from "../../../../../service/user/response/user.response";
import {UserService} from "../../../../../service/user/user.service";
import {SubjectResponse} from "../../../../../service/subject/subject.response";
import {SubjectService} from "../../../../../service/subject/subject.service";

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
    MatSelectionList,
    MatListOption,
  ],
  templateUrl: './add-pupil-dialog.component.html',
  styleUrl: './add-pupil-dialog.component.scss'
})
export class AddPupilDialogComponent implements OnInit {
  pupils: UserResponse[] = [];
  subject?: SubjectResponse;
  @ViewChild(MatSelectionList) pupilsList?: MatSelectionList

  constructor(
    public dialogRef: MatDialogRef<AddPupilDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SubjectData,
    private userService: UserService,
    private subjectService: SubjectService
  ) {
  }

  ngOnInit(): void {
    this.subjectService.getSubject(this.data.id).then(response => {
      if (response == null) {
        return;
      }
      this.subject = response;
    });
    this.getPupils();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private getPupils() {
    this.userService.getPupils().then(response => {
      if (response == null) {
        return;
      }
      this.pupils = response.users;
      this.subjectService.getStudents(this.data.id).then(students => {
        if (students == null) {
          return;
        }
        this.pupils = this.pupils.filter(pupil => students.find(student => student.id === pupil.id) == null);
      });
    });
  }

  onAddClick() {
    this.pupilsList?.selectedOptions.selected.forEach(option => {
      console.log(option.value)
      this.subjectService.addStudent(this.data.id, option.value).then(() => {
      });
    });
    this.dialogRef.close();
  }
}

export interface SubjectData {
  id: string;
}
