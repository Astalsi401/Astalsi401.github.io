class Content extends React.Component {
  constructor(props) {
    super(props);
    this.data = {
      videos: [
        {
          creator: "HokiHoshi",
          channel: "https://www.youtube.com/c/HokiHoshi",
          links: [
            {
              title: "Forza Horizon 4 Tuning Guide",
              href: "https://youtu.be/WM7_3NGGUoQ",
            },
            {
              title: "Gear Tuning",
              href: "https://youtu.be/D6qthLir2iI",
            },
            {
              title: "Drift Guide",
              href: "https://youtu.be/BfZHOWwR5Gw",
            },
            {
              title: "Drift Gearing",
              href: "https://youtu.be/rAuvIlPi2KE",
            },
          ],
        },
        {
          creator: "Johnson Racing",
          channel: "https://www.youtube.com/channel/UCGK33hhvffYv5hUNqB0wVnQ",
          links: [
            {
              title: "https://youtu.be/W4s1VP1nUoM",
              href: "HOW TO TUNE in Forza Horizon 4 | OP Car Tutorial (Upgrades & Tuning)",
            },
          ],
        },
      ],
    };
  }
  render() {
    return (
      <div>
        <section className="my-4">
          <p>
            本頁面為Youtube上FH4車輛調教影片的簡易中文摘要。
            <br />
            影片清單：
            <ul></ul>
            <ul>
              <li>
                <a href="https://www.youtube.com/c/HokiHoshi">HokiHoshi</a>
              </li>
              <ul>
                <li>
                  <a href="https://youtu.be/WM7_3NGGUoQ">Forza Horizon 4 Tuning Guide</a>
                </li>
                <li>
                  <a href="https://youtu.be/D6qthLir2iI">Gear Tuning</a>
                </li>
                <li>
                  <a href="https://youtu.be/BfZHOWwR5Gw">Drift Guide</a>
                </li>
                <li>
                  <a href="https://youtu.be/rAuvIlPi2KE">Drift Gearing</a>
                </li>
              </ul>
              <li>
                <a href="https://www.youtube.com/channel/UCGK33hhvffYv5hUNqB0wVnQ">Johnson Racing</a>
              </li>
              <ul>
                <li>
                  <a href="https://youtu.be/W4s1VP1nUoM">HOW TO TUNE in Forza Horizon 4 | OP Car Tutorial (Upgrades & Tuning)</a>
                </li>
              </ul>
            </ul>
          </p>
        </section>
      </div>
    );
  }
}
