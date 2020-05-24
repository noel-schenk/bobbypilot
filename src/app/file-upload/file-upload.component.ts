import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as Dropzone from 'dropzone';
import { JsonPipe } from '@angular/common';
import { Subject } from 'rxjs';
import { FileUploadService } from '../file-upload.service';

@Component({
	selector: 'app-file-upload',
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements AfterViewInit {

	@ViewChild('drpzone')
	dropzone: ElementRef<HTMLElement>;

	

	constructor(private fileUploadService: FileUploadService) { }


	ngAfterViewInit(): void {
		console.log(this.dropzone);
		const dropzone = new Dropzone(this.dropzone.nativeElement, { url: "#", autoQueue: false, createImageThumbnails: false, acceptedFiles: 'application/json', previewsContainer: false});

		dropzone.on("addedfile", file => this.loadFile(file));
	}

	loadFile(file: Dropzone.DropzoneFile) {
		const reader = new FileReader();

		reader.addEventListener('load', event => {
			let result = event.target.result as string;
			this.fileUploadService.fileLoaded.next(result);
		});
		reader.readAsText(file);
	}

}
