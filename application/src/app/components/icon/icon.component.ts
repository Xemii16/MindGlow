import {Component, Input, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'app-icon',
    standalone: true,
    imports: [
        NgOptimizedImage
    ],
    templateUrl: './icon.component.html',
    styleUrl: './icon.component.css'
})
export class IconComponent implements OnInit{

    /**
     * Назва іконки, після Type= в назві файлу і до коми (наприклад 3D)
     */
    @Input() iconName: string = "3D";
    /**
     * Розмір іконки LARGE(24px) або SMALL(16px)
     */
    @Input() size: IconSize = IconSize.LARGE;
    /**
     * Товщина іконки LIGHT або REGULAR (різняться товщиною ліній
     */
    @Input() weight: IconWeight = IconWeight.REGULAR;
    /**
     * Колір іконки, може бути назвою кольору (змінною в styles.scss) або transparent
     */
    @Input() color: string = "accent";
    private svg: SafeHtml = "";
    private sanitizer: DomSanitizer;
    private http: HttpClient;

    constructor(sanitizer: DomSanitizer, http: HttpClient) {
        this.http = http;
        this.sanitizer = sanitizer;
    }

    getSource(): SafeHtml {
        // TODO треба буде його забрати
        /*let path = `src/assets/icons/${"Type=" + this.iconName + ", Weight=" + this.weight}.svg`;
        let svgContent = fs.readFileSync(path, 'utf8');
        this.svg = this.sanitizer.bypassSecurityTrustHtml(svgContent) as string;*/
        return this.svg;
    }

    getSize(): number {
        // TODO - Потрібно буде переробити при збільшенні к-сті розмірів
        return this.size === IconSize.LARGE ? 24 : 16;
    }

    getColor(): string {
        if (this.color === "transparent"){
            return "transparent";
        }
        return "var(--" + this.color + ")";
    }

    ngOnInit(): void {
        let path = `assets/icons/${"Type=" + this.iconName + ", Weight=" + this.weight}.svg`;
        this.http.get(path, {responseType: 'text'}).subscribe(data => {
            this.svg = this.sanitizer.bypassSecurityTrustHtml(data) as string;
        });
    }
}

export enum IconSize {
    SMALL = "Small",
    LARGE = "Large"
}

export enum IconWeight {
    LIGHT = "Light",
    REGULAR = "Regular"
}
