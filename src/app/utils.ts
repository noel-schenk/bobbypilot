export default class Utils {
    static setVariablesAfterTime(variable, timeout, ...values) {
		let i = 0;
		let interval: any;
		interval = setInterval(() => {
			let value = values.shift();
			if(value === undefined) {
				clearInterval(interval);
			} else {
				variable.get = value;
			}
		}, timeout);
	}
}

export class byRef<T>{
	constructor(public get: T) {}
}