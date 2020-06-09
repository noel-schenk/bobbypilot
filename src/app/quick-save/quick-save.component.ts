import { Component, OnInit } from '@angular/core';
import { MlService } from '../ml.service';

@Component({
	selector: 'app-quick-save',
	templateUrl: './quick-save.component.html',
	styleUrls: ['./quick-save.component.scss']
})
export class QuickSaveComponent {

	constructor(private mlService: MlService) { }

	save() {
		this.mlService.localSave();
	}

	load() {
		this.mlService.localLoad();
	}

}
