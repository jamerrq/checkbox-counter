// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// Colors for the status bar item
const COLORS = ["pink", "orange", "yellow", "green"];

let myStatusBarItem: vscode.StatusBarItem;
const config = vscode.workspace.getConfiguration("md-checkbox-enhancement");

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

  const bindedUpdateStatusBarItem = updateStatusBarItem.bind(null, context);

  // Change format command
  // Toggle between percentage, counter and both
  const changeFormatId = "md-checkbox-enhancement.changeFormat";
  context.subscriptions.push(
    vscode.commands.registerCommand(changeFormatId, () => {
      // toggle the format
      const format = context.globalState.get("format");
      if (format === "percentage") {
        context.globalState.update("format", "counter");
        config.update("format", "counter");
      } else if (format === "counter") {
        context.globalState.update("format", "both");
        config.update("format", "both");
      } else {
        context.globalState.update("format", "percentage");
        config.update("format", "percentage");
      }
      bindedUpdateStatusBarItem();
    })
  );

  // Toggle visibility command
  const toggleVisibilityId = "md-checkbox-enhancement.toggleVisibility";
  context.subscriptions.push(
    vscode.commands.registerCommand(toggleVisibilityId, () => {
      const visible = context.globalState.get("visible");
      context.globalState.update("visible", !visible);
      bindedUpdateStatusBarItem();
    })
  );

  bindedUpdateStatusBarItem();
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(bindedUpdateStatusBarItem)
  );
  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument(bindedUpdateStatusBarItem)
  );
  myStatusBarItem.command = changeFormatId;
  context.subscriptions.push(myStatusBarItem);
}

function updateStatusBarItem(context: vscode.ExtensionContext): void {
  const editor = vscode.window.activeTextEditor;
  // if (!editor) {
  //   myStatusBarItem.hide();
  //   return;
  // }
  const format = context.globalState.get("format");
  myStatusBarItem.text = `$(checklist) ${getRatioOfBoxes(editor, context)}`;
  myStatusBarItem.tooltip = "Click to toggle the format";
  // set the color of the status bar item according to the percentage
  const bindedGetRatioOfBoxes = getRatioOfBoxes.bind(null, editor, context);
  const ratio = bindedGetRatioOfBoxes();
  let percentage;
  if (format === "percentage") {
    percentage = parseInt(ratio.split("%")[0]);
  } else {
    const [checked, total] = ratio.split("/");
    percentage = Math.round((parseInt(checked) / parseInt(total)) * 100);
  }
  if (percentage < 25) {
    myStatusBarItem.color = COLORS[0];
  } else if (percentage < 50) {
    myStatusBarItem.color = COLORS[1];
  } else if (percentage < 75) {
    myStatusBarItem.color = COLORS[2];
  } else {
    myStatusBarItem.color = COLORS[3];
  }
  const visible = context.globalState.get("visible");
  if (visible) {
    myStatusBarItem.show();
  } else {
    myStatusBarItem.hide();
  }
}

function getRatioOfBoxes(editor: vscode.TextEditor | undefined, context: vscode.ExtensionContext): string {
  const format = context.globalState.get("format");
  if (!editor) {
    switch (format) {
      case "percentage":
        return "0%";
      case "counter":
        return "0/0";
      default:
        return "0/0 (0%)";
    }
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
  const percentageFormat = total === 0 ? "0%" : `${Math.round((checked / total) * 100)}%`;
  const countFormat = `${checked}/${total}`;
  if (format === "percentage") {
    return percentageFormat;
  } else if (format === "counter") {
    return countFormat;
  } else {
    return `${countFormat} (${percentageFormat})`;
  }
}

// This method is called when your extension is deactivated
export function deactivate() {
  myStatusBarItem.dispose();
}
