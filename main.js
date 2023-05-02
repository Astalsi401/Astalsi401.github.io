class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: [], indexLoaded: false };
  }
  componentDidMount() {
    fetch("https://astalsi401.github.io/assets/js/json/index.json")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          index: data.index.find((d) => d.category === this.props.category),
          indexLoaded: true,
        });
      });
  }
  render() {
    return (
      <div class="container-sm py-5">
        <h1 class="my-5 py-5 text-center text-xxx-large">Home</h1>
        <div class="my-5 py-5 px-sm-5 d-flex flex-wrap justify-content-center">
          {this.state.index.pages.map((d) => (
            <div class="m-2 p-1 homePageIcon">
              <a href={d.href} class="text-decoration-none">
                <img src={d.icon} alt="" class="d-block w-100 mx-auto" />
                <span class="d-block text-center">{d.page}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
