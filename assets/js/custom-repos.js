function addCustomRepo(url) {
	const customRepos = JSON.parse(localStorage.getItem("customRepos")) || [];
	if (!customRepos.includes(url)) {
		customRepos.push(url);
		localStorage.setItem("customRepos", JSON.stringify(customRepos));
		console.log(`Added custom repo: ${url}`);
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

	
	if (!page.customReposInitialized) {
		fetchAndDisplayCustomRepos(); 
		page.customReposInitialized = true; 
	}

	
	const addRepoButton = document.getElementById("add-repo-btn");
	if (addRepoButton && !addRepoButton.listenerAdded) {
		addRepoButton.addEventListener("click", async () => {
			const repoUrl = document.getElementById("repo-url-input").value.trim();
			if (repoUrl) {
				addCustomRepo(repoUrl);
				
				fetchAndDisplayCustomRepos(); 
			}
		});
		addRepoButton.listenerAdded = true; 
	}
});

async function fetchAndDisplayCustomRepos() {
	const repoList = document.getElementById("repo-list");
	const customRepos = JSON.parse(localStorage.getItem("customRepos")) || [];
	repoList.innerHTML = "";

	for (let i = 0; i < customRepos.length; i++) {
		const repoUrl = customRepos[i];

		
		let repoName = repoUrl;
		try {
			const response = await fetch(repoUrl);
			if (response.ok) {
				const repoData = await response.json();
				repoName = repoData.name || repoUrl; 
			}
		} catch (error) {
			console.error(`Error fetching repo metadata: ${error}`);
		}

		
		const repoItem = document.createElement("ons-list-item");
		repoItem.innerHTML = `
            <span>${repoName}</span>
            <div class="right">
              <ons-button modifier="quiet" onclick="removeCustomRepo('${repoUrl}')">Remove</ons-button>
            </div>
        `;
		repoItem.setAttribute("title", repoUrl); 
		repoList.appendChild(repoItem);
	}
}

function addCustomRepoFromInput() {
	const repoInput = document.getElementById("repo-input");
	const repoUrl = repoInput.value.trim();
	if (repoUrl) {
		addCustomRepo(repoUrl);
		repoInput.value = "";
		fetchAndDisplayCustomRepos();
	}
}
