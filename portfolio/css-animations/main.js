const Content = () => {
  const sections = [];
  return sections.map((section, i) => <Block key={i} title={section.title} content={section.content} />);
};
