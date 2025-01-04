import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem, MatListItemTitle} from "@angular/material/list";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-pupils-teachers',
  standalone: true,
    imports: [
        MatButton,
        MatCheckbox,
        MatDivider,
        MatIcon,
        MatIconButton,
        MatList,
        MatListItem,
        MatListItemTitle,
        NgForOf,
        NgIf
    ],
  templateUrl: './pupils-teachers.component.html',
  styleUrl: './pupils-teachers.component.scss'
})
export class PupilsTeachersComponent {
  teacherSubjects: TeacherSubjects[] = [];

  constructor(
  ) {
  }

  ngOnInit(): void {
    this.getStudents();
    /*this.userService.getUserByToken().then(user => {
      if (user == null) return;
      this.user = user;
    });*/
  }

  private getStudents() {
    /*this.subjectService.getSubjects().then(subjects => {
      if (subjects == null) {
        return;
      }
      this.subjects.push(...subjects);
      this.subjects.forEach(subject => {
        this.subjectService.getStudents(subject.id).then(students => {
          if (students == null) {
            return;
          }
          this.teacherSubjects.find(subjectStudents => subjectStudents.teacherId === subject.teacher_id)?.students.push(...students) || this.teacherSubjects.push({
            teacherId: subject.teacher_id,
            students: students
          });
        });
      });
    });*/
  }
}

interface TeacherSubjects {
  teacherId: string
  // students: UserResponse[];
}
