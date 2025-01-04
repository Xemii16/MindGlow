import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {CdkCopyToClipboard} from "@angular/cdk/clipboard";
import {MatTooltip} from "@angular/material/tooltip";
import {NgIf} from "@angular/common";

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
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    /*this.subjectService.getSubject(this.getSubjectId()).then(subject => {
      if (subject == null) {
        this.router.navigate(['dashboard', 'subjects']);
        return;
      }
      this.subject = subject;
    });*/
  }

  getSubjectId(): string {
    return this.activatedRoute.snapshot.params['id'];
  }
}
