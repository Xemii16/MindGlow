import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class RequestsComponent implements OnInit {

  hasNext: boolean = true;
  currentPage: number = 0;
  startWith: FormControl = new FormControl('');

  constructor() {

  }

  ngOnInit(): void {
    this.getUsers();
  }

  reloadPages() {
    this.currentPage = 0;
    this.getUsers();
  }

  loadMore() {
    if (!this.hasNext) return;
    this.getUsers();
  }

  private getUsers() {
    /*this.userService.getUsersWithPagination(false, this.startWith.value, this.currentPage, 50).then((response) => {
      this.currentPage++;
      this.hasNext = response?.hasNext ?? false;
      if (response === null) return;
      this.users.push(...response.users);
    });*/
  }
}
