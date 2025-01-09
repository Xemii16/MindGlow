import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {CdkCopyToClipboard} from "@angular/cdk/clipboard";
import {MatTooltip} from "@angular/material/tooltip";
import {NgIf} from "@angular/common";
import {SubjectService} from "../../../../services/subject/subject.service";
import {Subject} from "../../../../services/subject/subject";

@Component({
  selector: 'app-subjects-overview-main',
  standalone: true,
  imports: [
    MatButton,
    MatIconButton,
    MatIcon,
    CdkCopyToClipboard,
    MatTooltip,
    NgIf
  ],
  templateUrl: './subject-overview-main.component.html',
  styleUrl: './subject-overview-main.component.scss'
})
export class SubjectOverviewMainComponent implements OnInit {
  subject?: Subject;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private subjectService: SubjectService,
  ) {
  }

  ngOnInit(): void {
    this.subjectService.getAllSubjects().then(subjects => {
      this.subject = subjects.find(result => {
        return result.id === this.getSubjectId();
      });
    })
  }

  getSubjectId(): number {
    return Number(this.activatedRoute.snapshot.params['id']);
  }
}
