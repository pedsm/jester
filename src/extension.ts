import * as vscode from 'vscode'
import {formatJoke, getJoke} from './jokeService'

export function activate(context: vscode.ExtensionContext) {
	console.debug('Congratulations, your extension "jester" is now active!');

	let disposable = vscode.commands.registerCommand('jester.jokeMe', async () => {

		const joke = await getJoke()
		const jokeString = formatJoke(joke)

		const textEditor = vscode.window.activeTextEditor
		if (textEditor == null) {
			// Can't write to window, so just display joke
			return vscode.window.showInformationMessage(jokeString)
		}
		const linesOfJoke = jokeString.split('\n').length
		await vscode.commands.executeCommand('editor.action.blockComment')
		const cursor = textEditor.selection.active
		textEditor.edit(async (editBuilder) => {
			editBuilder.insert(cursor, jokeString)
		})
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
