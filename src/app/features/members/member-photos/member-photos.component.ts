import { Component, inject, OnInit, signal } from '@angular/core';
import { MemberService } from '../../../core/services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../../../shared/models/membet';
import { ImageUploadComponent } from "../../../shared/image-upload/image-upload.component";

@Component({
  selector: 'app-member-photos',
  imports: [ImageUploadComponent],
  templateUrl: './member-photos.component.html',
  styleUrl: './member-photos.component.css'
})
export class MemberPhotosComponent implements OnInit {
  protected memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  protected photos = signal<Photo[]>([]);
  protected loading = signal(false);  


  ngOnInit(): void {
    const memberId = this.route.parent?.snapshot.paramMap.get('id')!;

    if (memberId)
      this.memberService.getMemberPhotos(memberId).subscribe({
        next: photos => this.photos.set(photos)
      });
  }

  onUploadImage(file: File) {
    this.loading.set(true);
    this.memberService.uploadPhoto(file).subscribe({
      next: photo => {
        this.memberService.editMode.set(false);
        this.loading.set(false);
        this.photos.update(photos => [...photos, photo]);
      },
      error: err => {
        console.log(err);
        this.loading.set(false);
      }
    });
  }
}