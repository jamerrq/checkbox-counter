// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

let myStatusBarItem: vscode.StatusBarItem;
let percentage = false;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is
  // activated

  // Create and show a new status bar item
  myStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );

  // if the item is clicked, toggle the percentage
  const changeFormatId = "checkbox-counter.changeFormat";
  context.subscriptions.push(
    vscode.commands.registerCommand(changeFormatId, () => {
      percentage = !percentage;
      updateStatusBarItem();
    })
  );
  myStatusBarItem.command = changeFormatId;
  myStatusBarItem.color = "orange";

  context.subscriptions.push(myStatusBarItem);

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "checkbox-counter.toggleCounter",
    () => {
      // The code you place here will be executed every time your command is
      // executed

      // Get the active text editor
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage("No active text editor found");
        return; // No open text editor
      }

      // If was already visible, hide it
      if (context.workspaceState.get("checkbox-counter:visible")) {
        myStatusBarItem.hide();
        context.workspaceState.update("checkbox-counter:visible", false);
        return;
      } else {
        updateStatusBarItem();
        context.workspaceState.update("checkbox-counter:visible", true);
      }
    }
  );

  updateStatusBarItem();
  context.subscriptions.push(disposable);
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem)
  );
  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument(updateStatusBarItem)
  );
}

function updateStatusBarItem(): void {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    myStatusBarItem.hide();
    return;
  }
  myStatusBarItem.text = `$(checklist) ${getRatioOfBoxes(editor)}`;
  myStatusBarItem.show();
}

function getRatioOfBoxes(editor: vscode.TextEditor | undefined): string {
  if (!editor) {
    return percentage ? "0%" : "0/0";
  }
  const doc = editor.document;
  let total = 0;
  let checked = 0;
  for (let i = 0; i < doc.lineCount; i++) {
    const line = doc.lineAt(i);
    if (line.text.startsWith("- [ ]")) {
      total++;
    } else if (line.text.startsWith("- [x]") || line.text.startsWith("- [X]")) {
      checked++;
      total++;
    }
  }
  //   return `${checked}/${total}`;
  // if the format is set to percentage then return the percentage
  if (percentage) {
    return `${Math.round((checked / total) * 100)}%`;
  }
  return `${checked}/${total}`;
}

// This method is called when your extension is deactivated
export function deactivate() {
  myStatusBarItem.dispose();
}
