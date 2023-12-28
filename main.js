const Content = () => {
  const { index, indexLoaded } = useIndexData("Home");
  if (indexLoaded) {
    return (
      <div className="container-sm py-5">
        <h1 className="my-5 py-5 text-center text-xxx-large">Home</h1>
        <div className="my-5 py-5 px-sm-5 d-flex flex-wrap justify-content-center">
          {index.pages.map((d) => (
            <a key={d.page} href={d.href} className="homePageIcon m-2 p-1 text-decoration-none">
              <img src={d.icon} alt={`icon-${d.page}`} className="d-block w-100 mx-auto" />
              <span className="d-block text-center">{d.page}</span>
            </a>
          ))}
        </div>
      </div>
    );
  }
};
