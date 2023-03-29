class TuneListRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.showImg = this.showImg.bind(this);
  }
  showImg(e) {
    if (e.target.tagName !== "IMG") this.setState({ active: !this.state.active });
  }
  render() {
    return (
      <tr onClick={this.showImg}>
        <td>{this.props.data.tunner}</td>
        <td>{this.props.data.tuneName}</td>
        <td>{this.props.data.score}</td>
        <td>
          {this.props.data.carType}
          <ZoomImage class={this.state.active ? "d-block" : "d-none"} src={this.props.data.pic} />
        </td>
        <td>{this.props.data.preferance.join(" ")}</td>
        <td>{this.props.data.shareCode}</td>
      </tr>
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
              <TuneListRow data={d} />
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
