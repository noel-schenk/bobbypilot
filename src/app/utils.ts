export default class Utils {
	static setVariablesAfterTime(variable, timeout, ...values) {
		let i = 0;
		let interval: any;
		interval = setInterval(() => {
			let value = values.shift();
			if (value === undefined) {
				clearInterval(interval);
			} else {
				variable.get = value;
			}
		}, timeout);
	}

	// https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
	static downloadObjectAsJson(exportObj, exportName) {
		var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
		var downloadAnchorNode = document.createElement('a');
		downloadAnchorNode.setAttribute("href", dataStr);
		downloadAnchorNode.setAttribute("download", exportName + ".json");
		document.body.appendChild(downloadAnchorNode); // required for firefox
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	}

	static getTimestamp() {
		let pad2 = (n) => {
			return (n < 10 ? '0' : '') + n;
		}
		const date = new Date();
		return date.getFullYear() +
			pad2(date.getMonth() + 1) +
			pad2(date.getDate()) +
			pad2(date.getHours()) +
			pad2(date.getMinutes()) +
			pad2(date.getSeconds());
	}

	static getArrayOfEnumValues(enumObject: any) {
		return Object.keys(enumObject).filter((type) => isNaN(<any>type) && type !== 'values').map(x => x.valueOf());
	}

}

export class byRef<T>{
	constructor(public get: T) { }
}