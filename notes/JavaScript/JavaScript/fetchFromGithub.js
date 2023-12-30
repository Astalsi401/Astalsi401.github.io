function getgit(owner, repo, path) {
  fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`)
    .then((d) => d.json())
    .then((d) => fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs/${d.sha}`))
    .then((d) => d.json())
    .then((d) => JSON.parse(atob(d.content)))
    .then((json) => {
      console.log(json);
    });
}
getgit("Astalsi401", "ibmiWork", "test/test.json");
