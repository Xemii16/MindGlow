import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent {
    @Input() size: AvatarSize = AvatarSize.MIDDLE;
    @Input() avatarUrl: string = "/assets/avatars/avatar.svg";

    getStyle(): string {
        return this.size;
    }
}

export enum AvatarSize {
  SMALL = "small",
  MIDDLE = "middle",
  LARGE = "large"
}