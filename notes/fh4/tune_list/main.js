class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tuneList: [] };
  }
  componentDidMount() {
    fetch("../../assets/js/json/tuneList.json")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          tuneList: data,
        });
      });
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-6">
            <ZoomImage url="tune_list/desktop2.png" />
          </div>
          <div className="col-6">{/* <ZoomImage url="tune_list/desktop2.png" /> */}</div>
          <div className="col-6 mx-auto">
            <ZoomImage url="tune_list/02.png" />
          </div>
        </div>
      </div>
    );
  }
}
