const vscode = require('vscode')

exports.performTheMagic = async function () {
    try {
        // Get the Git extension
        const gitExtension = vscode.extensions.getExtension('vscode.git');

        // Check if the Git extension is available
        if (!gitExtension) {
            vscode.window.showErrorMessage('Git extension not found.');
            return;
        }

        // Activate the Git extension if it's not already activated
        await gitExtension.activate();
        vscode.window.showInformationMessage('Git extension activated');

        // Get the Git API (version 1)
        const git = gitExtension.exports.getAPI(1);

        // Check if there are any repositories available
        if (git.repositories.length === 0) {
            vscode.window.showErrorMessage('No Git repositories found.');
            console.log('No Git repositories found.');
            return;
        }

        // Listen for any new repositories opened
        git.onDidOpenRepository(repository => {
            console.log(`Repository opened: ${repository.rootUri.fsPath}`);
            // vscode.window.showInformationMessage(`Repository opened: ${repository.rootUri.fsPath}`);

            // Listen for state changes within this repository
            repository.state.onDidChange(() => {
                console.log('Repository state changed');
                // vscode.window.showInformationMessage('Repository state changed');
                console.log("repository.state : ", repository.state)
                // Fetch the staged changes (files added via `git add`)
                const stagedChanges = repository.state.indexChanges;
                if (stagedChanges.length > 0) {
                    console.log('Staged changes:', stagedChanges);
                    // vscode.window.showInformationMessage('Files staged for commit.');
                }

                // Fetch the working tree changes (modified files before commit)
                const workingChanges = repository.state.workingTreeChanges;
                if (workingChanges.length > 0) {
                    console.log('Working tree changes:', workingChanges);
                    // vscode.window.showInformationMessage('Files modified in working tree.');
                }
            });
        });

        // Log repositories that are already available
        git.repositories.forEach(repository => {
            console.log("Repository found: ", repository.rootUri.fsPath);
            // vscode.window.showInformationMessage('Repository found: ' + repository.rootUri.fsPath);

            // Listen for changes in this repository as well
            repository.state.onDidChange((e) => {
                console.log('Repository state changed', e);
                // vscode.window.showInformationMessage('Repository state changed');
                console.log("repository.state : ", repository.state)
                
                // Fetch the staged changes (files added via `git add`)
                const stagedChanges = repository.state.indexChanges;
                if (stagedChanges.length > 0) {
                    console.log('Staged changes:', stagedChanges);
                    console.log("Keys in stagedChanges :: ", Object.keys(stagedChanges), stagedChanges[0])
                    let myIndexedChanges = stagedChanges
                    for(let i=0; i<Object.keys(myIndexedChanges).length; i++){
                        let myData = myIndexedChanges[i]
                        console.log("\n\n", {myData}, myData.uri?.path, "\n\n")
                        // sendApiToMyBackend()
                    }
                    // vscode.window.showInformationMessage('Files staged for commit.');
                }

                // Fetch the working tree changes (modified files before commit)
                const workingChanges = repository.state.workingTreeChanges;
                if (workingChanges.length > 0) {
                    console.log('Working tree changes:', workingChanges);
                    // vscode.window.showInformationMessage('Files modified in working tree.');
                }
            });
        });

        vscode.window.showInformationMessage('Listening for Git repository state changes...');
    } catch (err) {
        console.error("Something went wrong: ", err);
        vscode.window.showErrorMessage('Error listening to Git operations: ' + err.message);
    }
};