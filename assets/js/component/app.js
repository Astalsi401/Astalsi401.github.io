function App({ category, className, title }) {
  useEffect(() => {
    document.title = title;
  }, []);
  return (
    <>
      <Header category={category} />
      <main id="main-content" className={className}>
        <h1 className="my-5 text-center">{title}</h1>
        <Content />
      </main>
    </>
  );
}
