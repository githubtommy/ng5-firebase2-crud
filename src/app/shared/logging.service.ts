import { Injectable } from '@angular/core';

@Injectable()
export class LoggingService {

	public error(args): void {
		console.error(":::: ERROR: ", args);
	}

	public info(args): void {
		console.info(":::: INFO: ", args);
	}

	public warn(args): void {
		console.warn(":::: WARN: ", args);
	}

  constructor() { }

}
