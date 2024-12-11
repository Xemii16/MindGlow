import {Component, Input} from '@angular/core';
import {IconComponent, IconSize, IconWeight} from "../icon/icon.component";
import {FormsModule} from "@angular/forms";
import {RouterOutlet} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";

@Component({
    selector: 'app-checkbox',
    standalone: true,
    imports: [
        IconComponent,
        FormsModule,
        RouterOutlet,
        NgClass,
        NgIf
    ],
    templateUrl: './checkbox.component.html',
    styleUrl: './checkbox.component.css'
})
export class CheckboxComponent {
    isChecked = false;
    /**
     * Якщо true то відображається повний чекбокс, якщо false то чекбокс з квадратом всередині
     */
    @Input() isFull: boolean = true;
    /**
     * Текст який відображається поруч з чекбоксом
     */
    @Input() text: string = "Value";
    /**
     * Чи відображати текст поруч з чекбоксом
     */
    @Input() showText: boolean = true;

    protected readonly IconWeight = IconWeight;
    protected readonly IconSize = IconSize;

    protected setChecked(event: any) {
        this.isChecked = event.target.checked;
    }

    protected setFull() {
        this.isFull = true;
    }

    protected getIconColor(): string {
        if (!this.isFull) {
            return "accent";
        }
        return this.isChecked ? "accent-99" : "transparent";
    }
}
