const Test = ({ elementStatus }) => {
  return (
    <div style={{ position: "absolute", right: 0, top: 0, background: "white", zIndex: 99 }}>
      width:{elementStatus.width}
      <br />
      height:{elementStatus.height}
      <br />
      finalHeight: {elementStatus.finalHeight}
      <br />
      {elementStatus.test}
    </div>
  );
};
