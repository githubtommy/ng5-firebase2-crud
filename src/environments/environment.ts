// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// TODO: Developer, provide your own firebase credentials here or app will not work

console.log("IMPORTANT: Developer, provide your own firebase credentials here or app will not work")
export const environment = {
	production: false,
	firebaseConfig : {
    apiKey: "XXX",
    authDomain: "XXX",
    databaseURL: "XXX",
    projectId: "XXX",
    storageBucket: "",
    messagingSenderId: "XXX"
	}
};