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
    this.section = [
      {
        title: "css",
        content: (
          <>
            {this.data.css.map((d) => (
              <div className="my-2">
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
          </>
        ),
      },
    ];
  }
  render() {
    return (
      <>
        {this.section.map((section) => (
          <Block title={section.title} content={section.content} />
        ))}
      </>
    );
  }
}
