import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recolor } from 'recolor-plugin';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ColorPickerModule } from 'primeng/colorpicker';


@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, ColorPickerModule],
  standalone: true,
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {
  
  color: string | undefined;
  photoData: SafeUrl | null = null;
  rawBase64: string | null = null;    
  detectedColor: string | null = null;
  constructor(private sanitizer: DomSanitizer) {}
  
  async takePhotoAndDetectColor() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });

    if (!image.base64String) return;

    // sanitize so Angular allows it in <img>
    this.photoData = this.sanitizer.bypassSecurityTrustUrl(
      `data:image/jpeg;base64,${image.base64String}`
    );
    this.rawBase64 = image.base64String;

    const result = await Recolor.detectColor({
      imageBase64: image.base64String
    });

    this.detectedColor = result.detectedColor;
    console.log('Detected color:', this.detectedColor);
  }

  async detectAndChangeColor() {
    if (!this.rawBase64) return;

    const result = await Recolor.detectColor({ imageBase64: this.rawBase64 });
    this.detectedColor = result.detectedColor;
    console.log('Detected color:', this.detectedColor);
  }

  savePhoto() {
    console.log('Save — coming soon!');
  }
}
