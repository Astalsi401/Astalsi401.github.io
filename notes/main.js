class Content extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <IndexPage category="Notes" />
        <IndexPage category="Games" />
      </div>
    );
  }
}
