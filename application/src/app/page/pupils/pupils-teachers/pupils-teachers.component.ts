import {Component, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem, MatListItemTitle} from "@angular/material/list";
import {NgForOf, NgIf} from "@angular/common";
import {HttpClientUserService} from "../../../services/user/http-client-user.service";
import {SubjectService} from "../../../services/subject/subject.service";
import {User} from "../../../services/user/user";
import {Subject} from "../../../services/subject/subject";
import {Pupil} from "../../../services/subject/pupil";
import {HttpClientSubjectService} from "../../../services/subject/http-client-subject.service";

@Component({
  selector: 'app-pupils-teachers',
  standalone: true,
    imports: [
        MatButton,
        MatCheckbox,
        MatDivider,
        MatIcon,
        MatList,
        MatListItem,
        MatListItemTitle,
        NgForOf,
        NgIf
    ],
  templateUrl: './pupils-teachers.component.html',
  styleUrl: './pupils-teachers.component.scss'
})
export class PupilsTeachersComponent implements OnInit {
  teacherSubjects: TeacherSubjects[] = [];
  user ?: User;
  subjects : Subject[] =[];

  constructor(
    private userService: HttpClientUserService,
    private subjectService: HttpClientSubjectService,
  ) {
  }

  ngOnInit(): void {
    this.getStudents();
    this.userService.getCurrentUser().then(user => {
      this.user = user;
    })
  }

  private getStudents() {
    this.subjectService.getAllSubjects().then(subjects => {
      this.subjects.push(...subjects);
      this.subjects.forEach(subject => {
        this.subjectService.getPupilsBySubject(subject.id).then(subjects => {
          this.teacherSubjects.find(subjectStudent => subjectStudent.teacherId === subject.teacher_id)?.students.push(...subjects) || this.teacherSubjects.push({
            teacherId: subject.teacher_id,
            students: subjects
          });
        })
      });
    })
  }
}

interface TeacherSubjects {
  teacherId: number
  students: Pupil[];
}
