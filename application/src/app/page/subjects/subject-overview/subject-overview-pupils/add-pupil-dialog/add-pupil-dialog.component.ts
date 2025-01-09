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
import {SubjectService} from "../../../../../services/subject/subject.service";
import {HttpClientUserService} from "../../../../../services/user/http-client-user.service";
import {Pupil} from "../../../../../services/subject/pupil";
import {Subject} from "../../../../../services/subject/subject";
import {User} from "../../../../../services/user/user";

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
    MatSelectionList,
    MatListOption,
  ],
  templateUrl: './add-pupil-dialog.component.html',
  styleUrl: './add-pupil-dialog.component.scss'
})
export class AddPupilDialogComponent implements OnInit {
  @ViewChild(MatSelectionList) pupilsList?: MatSelectionList
  pupils: User[] = [];
  subjects ?: Subject;

  constructor(
    public dialogRef: MatDialogRef<AddPupilDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SubjectData,
    private subjectService: SubjectService,
    private userService: HttpClientUserService,
  ) {
  }

  ngOnInit(): void {
    this.subjectService.getAllSubjects().then(subjects => {
      this.subjects = subjects.find(subject => subject.id == this.data.id)
    })
    this.getPupils();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private getPupils() {
    this.userService.getAllUsers("pupils").then(users => {
      this.pupils = users;
      this.subjectService.getAllSubjects().then(subjects => {
        this.pupils = this.pupils.filter(pupil => pupil.id == pupil.id);
      })
    })
    /*this.userService.getPupils().then(response => {
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
    });*/
  }

  onAddClick() {
    this.pupilsList?.selectedOptions.selected.forEach(option => {
      console.log(option.value)
      /*this.subjectService.addStudent(this.data.id, option.value).then(() => {
      });*/
    });
    this.dialogRef.close();
  }
}

export interface SubjectData {
  id: number;
}
