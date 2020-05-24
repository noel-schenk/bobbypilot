import { Component, OnInit } from '@angular/core';
import { MlService } from '../ml.service';

@Component({
	selector: 'app-file-download',
	templateUrl: './file-download.component.html',
	styleUrls: ['./file-download.component.scss']
})
export class FileDownloadComponent implements OnInit {

	constructor(private mlService: MlService) { }

	ngOnInit() {
	}

	download() {
		this.mlService.save();
  }

}
