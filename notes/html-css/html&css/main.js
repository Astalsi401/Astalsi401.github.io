class Content extends React.Component {
  constructor(props) {
    super(props);
    this.data = {
      css: [
        {
          prop: "object-fit",
          values: [
            { val: "fill", des: "預設，圖片變形" },
            { val: "contain", des: "保持比例完整呈現於容器中" },
            { val: "cover", des: "裁減圖片填滿容器" },
            { val: "none", des: "不調整圖片比例" },
            { val: "scale-down", des: "等比縮小" },
          ],
        },
        {
          prop: "object-position",
          values: [
            { val: "left、right、top、bottom、center...", des: "" },
            { val: "50% 50%", des: "" },
          ],
        },
      ],
    };
  }
  render() {
    return (
      <div>
        <section className="my-4">
          <h3 className="my-3">css</h3>
          {this.data.css.map((d) => (
            <div>
              <code>{d.prop}</code>
              <ul>
                {d.values.map((v) => (
                  <li>
                    <code>{v.val}</code>
                    {v.des === "" ? "" : `：${v.des}`}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>
    );
  }
}
