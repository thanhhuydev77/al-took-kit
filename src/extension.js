const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let disposable = vscode.commands.registerCommand('altoolkit.redownloadsymbol', async () => {
        
        // 1. Check if a workspace folder is open
        if (!vscode.workspace.workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder is currently open.');
            return;
        }

        // 2. Fetch the target folder configuration
        const config = vscode.workspace.getConfiguration('');
        let packageCachePath = config.get('al.packageCachePath');

        // Normalize setting to an array of folders
        let targetFolders = [];
        if (Array.isArray(packageCachePath)) {
            targetFolders = packageCachePath.filter(p => typeof p === 'string' && p.trim() !== '');
        } else if (typeof packageCachePath === 'string' && packageCachePath.trim() !== '') {
            targetFolders = [packageCachePath.trim()];
        }

        // 3. Build the search patterns dynamically and 4. Find all matching files
        let files = [];
        if (targetFolders.length === 0) {
            files = await vscode.workspace.findFiles('**/*.app');
        } else {
            for (let folder of targetFolders) {
                folder = folder.trim();
                if (folder.startsWith('./')) {
                    folder = folder.substring(2);
                }
                folder = folder.replace(/^\/+|\/+$/g, '');
                
                const filePattern = folder !== '' ? `${folder}/**/*.app` : '**/*.app';
                const matchedFiles = await vscode.workspace.findFiles(filePattern);
                
                // Add files and avoid duplicates if patterns overlap
                for (const match of matchedFiles) {
                    if (!files.some(f => f.fsPath === match.fsPath)) {
                        files.push(match);
                    }
                }
            }
        }

        if (files.length === 0) {
        } else {

        // 5. Confirmation dialog
        const folderNotice = targetFolders.length > 0 ? ` inside "${targetFolders.join(', ')}"` : '';
        const confirm = await vscode.window.showWarningMessage(
            `Are you sure you want to delete all ${files.length} .app file(s)${folderNotice}?`,
            { modal: true },
            'Delete'
        );

        if (confirm !== 'Delete') {
            return; 
        }

        // 6. Delete the files
        let deletedCount = 0;
        for (const file of files) {
            try {
                await vscode.workspace.fs.delete(file, { recursive: false, useTrash: false });
                deletedCount++;
            } catch (error) {
                vscode.window.showErrorMessage(`Failed to delete file: ${file.fsPath}`);
            }
        }

        // 7. Show success feedback for deletion
        vscode.window.showInformationMessage(`Successfully deleted ${deletedCount} .app file(s).`);
    }
        // 8. Trigger "AL: Download Symbols"
        // Wrap it in a try-catch in case the AL Language extension isn't installed or active
        try {
            vscode.window.showInformationMessage('Triggering AL: Download Symbols...');
            
            // 'al.downloadSymbols' is the internal command ID used by the AL Language Extension
            await vscode.commands.executeCommand('al.downloadSymbols');
            
        } catch (error) {
            vscode.window.showErrorMessage(
                'Failed to run "AL: Download Symbols". Make sure the AL Language extension is installed and active.'
            );
            console.error(error);
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};