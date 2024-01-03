const { useState } = React;

const Counter = () => {
  const [count, setCount] = useState(0);
  const counterStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "40px",
  };
  const btnStyle = {
    width: "min(100%, 120px)",
    height: "60px",
    fontSize: "40px",
    margin: "10px",
  };
  return (
    <div style={counterStyle}>
      <div>{count}</div>
      <button style={btnStyle} onClick={() => setCount((prev) => prev + 1)}>
        +
      </button>
      <button style={btnStyle} onClick={() => setCount((prev) => prev - 1)}>
        -
      </button>
    </div>
  );
};
