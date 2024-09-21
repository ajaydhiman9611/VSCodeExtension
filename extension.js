const { performTheMagic } = require('./helper');

const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// First time we run it:
	console.log('Congratulations, your extension "helpmecod" is now active!');

	//First time and thereafter:
	const disposable = vscode.commands.registerCommand('helpmecod.helloWorld', async function () {
		await performTheMagic(context)
		// vscode.window.showInformationMessage('Hello World from HelpMeCod!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
