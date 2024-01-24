const Content = ({ category }) => {
  const { index, indexLoaded } = useIndexData(category);
  if (indexLoaded) {
    return (
      <div className="container-sm py-5">
        <h1 className="my-5 py-5 text-center text-xxx-large">{category}</h1>
        <div className="my-5 py-5 px-sm-5 d-flex flex-wrap justify-content-center">
          {index.pages.map((d) => (
            <a key={d.page} href={d.href} className="home-page-icon m-2 p-1 d-block text-decoration-none">
              <img src={d.icon} alt={`icon-${d.page}`} className="d-block w-100 mx-auto" />
              <span className="d-block text-center">{d.page}</span>
            </a>
          ))}
        </div>
      </div>
    );
  }
};
