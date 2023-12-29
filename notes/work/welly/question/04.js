function ConditionalRendering({ isLoggedIn }) {
  // 實作你的條件渲染
  return isLoggedIn ? <p>welcome back!</p> : <p>log in or sign up.</p>;
}
