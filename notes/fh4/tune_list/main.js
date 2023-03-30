class TuneListRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.showImg = this.showImg.bind(this);
  }
  showImg(e) {
    if (["IMG", "DIV"].includes(e.target.tagName)) return;
    this.setState({ active: !this.state.active });
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
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tuneList: [], search: "", res: [], asc: false, ascCol: "" };
    this.search = this.search.bind(this);
    this.sort = this.sort.bind(this);
    this.keys = [
      { key: "tunner", type: "調教者" },
      { key: "tuneName", type: "調教名稱" },
      { key: "score", type: "性能分" },
      { key: "carType", type: "車型" },
      { key: "preferance", type: "特性" },
      { key: "shareCode", type: "分享代碼" },
    ];
  }
  search(e) {
    let re = e.target.value
      .split(" ")
      .map((d) => `(?=.*${d.replace(/^\s|\s$/g, "")})`)
      .filter((d) => d !== "(?=.*)")
      .join("");
    this.setState({ search: e.target.value, res: this.state.tuneList.filter((d) => [d.tunner, d.tuneName, d.score, d.carType, d.preferance, d.shareCode.replace(/\s/g, "")].join("|").match(new RegExp(re, "gi"))) });
  }
  sort(type) {
    this.setState((state) => ({
      res: state.res.sort((a, b) => (a[type] < b[type] ? (state.asc ? 1 : -1) : a[type] > b[type] ? (state.asc ? -1 : 1) : 0)),
      asc: !state.asc,
      ascCol: type,
    }));
  }
  componentDidMount() {
    fetch("../../assets/js/json/tuneList.json")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          tuneList: data,
          res: data,
        });
      });
  }
  render() {
    return (
      <div>
        <Block
          class="py-2 bg-white tuneSearch"
          content={
            <div className="row">
              <input type="search" className="d-block col-md-6 mx-auto p-2" placeholder="請輸入關鍵字" onChange={this.search} />
            </div>
          }
        />
        <Block
          content={
            <div className="row overflow-auto py-4">
              <table className="mx-auto text-center text-small">
                <thead>
                  <tr>
                    {this.keys.map((d) => (
                      <th className="pointer" onClick={() => this.sort(d.key)} style={{ "min-width": "80px" }}>
                        {d.type}
                        <span className={`trangle ${this.state.asc && "asc"} ${this.state.ascCol === d.key && "active"}`}></span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {this.state.res.map((d) => (
                    <TuneListRow data={d} />
                  ))}
                </tbody>
              </table>
            </div>
          }
        />
      </div>
    );
  }
}
