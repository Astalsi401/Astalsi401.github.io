const Content = () => {
  const sections = [
    {
      title: "Start",
      content: (
        <>
          切換至專案資料夾，建立專案
          <CodeChunk code={"npm create vite@latest"} lang="bash" />
          運行vite
          <CodeChunk code={"npm run dev"} lang="bash" />
        </>
      ),
    },
  ];
  return sections.map((s) => <Block title={s.title} content={s.content} />);
};
