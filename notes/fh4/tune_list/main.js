class CarTypeImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.showImg = this.showImg.bind(this);
  }
  showImg() {
    this.setState({ active: !this.state.active });
  }
  render() {
    console.log(this.props.src);
    return (
      <td>
        {this.props.content}
        <ZoomImage src={this.props.src} />
      </td>
    );
  }
}
class SortTable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <table className="mx-auto text-center">
          <thead>
            <tr>
              <th>
                調教者<span></span>
              </th>
              <th>
                調教名稱<span></span>
              </th>
              <th>
                性能分<span></span>
              </th>
              <th>
                車型<span></span>
              </th>
              <th>
                特性<span></span>
              </th>
              <th>
                分享代碼<span></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((d) => (
              <tr>
                <td>{d.tunner}</td>
                <td>{d.tuneName}</td>
                <td>{d.score}</td>
                <CarTypeImg content={d.carType} src={d.pic} />
                <td>{d.preferance.join(" ")}</td>
                <td>{d.shareCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tuneList: [], search: "" };
    this.search = this.search.bind(this);
  }
  search(e) {
    this.setState({ search: e.target.value });
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
    let re = new RegExp(this.state.search, "gi");
    let res = this.state.tuneList.filter((d) => [d.tunner, d.tuneName, d.score].join("|").match(re));
    return (
      <div>
        <Block
          content={
            <div>
              <input type="search" className="d-block mx-auto p-2" placeholder="請輸入關鍵字" onChange={this.search} />
            </div>
          }
        />
        <Block content={<SortTable data={res} />} />
      </div>
    );
  }
}
