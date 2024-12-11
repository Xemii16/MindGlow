import {Component, Input} from '@angular/core';
import {style} from "@angular/animations";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() buttonText!: string;
  @Input() type: string="";
  @Input() size: string="";


  getStyle() {
    return this.type+" "+this.size;
}


}
export enum CssButton {
    Filled = "ButtonFilled",
    OutLine = "ButtonOutLine",
    Text = "ButtonText",
    Big = "BigButton",
    Large = "LargeButton",
    Small = "SmallButton"
}
