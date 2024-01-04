const getgit = async (owner, repo, path) => {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`);
  const { sha } = await res.json();
  const blob = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs/${sha}`);
  const { content } = await blob.json();
  const data = await JSON.parse(atob(content));
  console.log(data);
};
getgit("Astalsi401", "ibmiWork", "test/test.json"); // output: { a: 0, b: [ 'a', 'b' ] }
