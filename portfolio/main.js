const Content = () => {
  const logo = {
    python: `${domain}/assets/images/python-logo.svg`,
    css: `${domain}/assets/images/CSS3-logo.svg`,
    js: `${domain}/assets/images/js-logo.svg`,
  };
  const { index, indexLoaded } = useIndexData("Portfolio");
  if (indexLoaded) {
    return (
      <div className="row">
        {index.pages.map((page) => (
          <div className="col-sm-6 col-md-4 col-lg-3 p-2" key={page.page}>
            <a className="d-block bg-white shadow-sm w-100 h-100 text-center text-decoration-none portfolio" href={page.href} target="_blank">
              <div className={`portfolio-thumb w-100 ratio-16by9 position-relative overflow-hidden ${logo[page.thumbnail] ? "page-logo" : "page-view"}`} style={{ backgroundImage: `url(${logo[page.thumbnail] ? logo[page.thumbnail] : page.thumbnail})` }}>
                <div className="tags position-absolute d-flex align-items-end">
                  {page.tags.map((tag, i) => (
                    <div key={tag} className="tag text-small px-1 m-1 rounded-1 shadow-sm" style={{ "--i": i }}>
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
              <div className="py-2">{page.page}</div>
            </a>
          </div>
        ))}
      </div>
    );
  }
};
