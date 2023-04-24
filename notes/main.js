class Content extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <IndexPage category="Notes" />
        <IndexPage category="Forza Horizon 4" subtitle="Forza Horizon 4" />
      </div>
    );
  }
}
