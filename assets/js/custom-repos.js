function addCustomRepo(url) {
	const customRepos = JSON.parse(localStorage.getItem("customRepos")) || [];
	if (!customRepos.includes(url)) {
		customRepos.push(url);
		localStorage.setItem("customRepos", JSON.stringify(customRepos));
		console.log(`Added custom repo: ${url}`);
		fetchAndDisplayCustomRepos();
		reloadApps();
	}
}

function removeCustomRepo(url) {
	let customRepos = JSON.parse(localStorage.getItem("customRepos")) || [];
	if (customRepos.includes(url)) {
		customRepos = customRepos.filter((repo) => repo !== url);
		localStorage.setItem("customRepos", JSON.stringify(customRepos));
		console.log(`Removed custom repo: ${url}`);
		fetchAndDisplayCustomRepos();
		reloadApps();
	}
}

function reloadApps() {
	if (document.querySelector("#tabbar-page")) {
		document.querySelector("#appTabbar").setActiveTab(0);
		fetchApps();
	}
}

document.addEventListener("init", async (event) => {
	const page = event.target;

	
	// Fetch and display custom repos on page load
	fetchAndDisplayCustomRepos();

	// Add event listener for the add repo button
	document
		.getElementById("add-repo-btn")
		.addEventListener("click", async () => {
			const repoUrl = document.getElementById("repo-url-input").value.trim();
			if (repoUrl) {
				addCustomRepo(repoUrl);
				fetchAndDisplayCustomRepos(); // Refresh the repo list after adding
			}
		});
});


let fetchAndDisplayInProgress = false;
async function fetchAndDisplayCustomRepos() {
	if (fetchAndDisplayInProgress) return;
    fetchAndDisplayInProgress = true;

	
	console.log('Function called'); // Add this line
	try{
    const repoList = document.getElementById("repo-list");
    const customRepos = JSON.parse(localStorage.getItem("customRepos")) || [];
    repoList.innerHTML = "";

    for (const repo of customRepos) {
        let repoName = repo;
        try {
            const response = await fetch(repo);
            if (response.ok) {
                const repoData = await response.json();
                repoName = repoData.name || repo;
            }
        } catch (error) {
            console.error(`Error fetching repo metadata: ${error}`);
        }

        const repoItem = document.createElement("ons-list-item");
        repoItem.innerHTML = `
            <span>${repoName}</span>
            <div class="right">
                <ons-button modifier="quiet" onclick="removeCustomRepo('${repo}')">Remove</ons-button>
            </div>
        `;
        repoList.appendChild(repoItem);
    }
} finally{
	fetchAndDisplayInProgress = false;
}
}



function addCustomRepoFromInput() {
	const repoInput = document.getElementById("repo-input");
	const repoUrl = repoInput.value.trim();
	if (repoUrl) {
		addCustomRepo(repoUrl);
		repoInput.value = "";
		displayCustomRepos();
	}
}