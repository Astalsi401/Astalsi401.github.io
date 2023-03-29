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
    return <div></div>;
  }
}
