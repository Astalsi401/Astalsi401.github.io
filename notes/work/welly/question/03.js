function formatName(firstName = "", lastName = "") {
  // 檢查參數是否為字串
  if (typeof firstName !== "string" || typeof lastName !== "string") {
    // 如果不是字串就拋出錯誤
    throw new TypeError("firstName and lastName must be strings");
  }
  // 用空格將名字合併，並回傳
  // 過濾空白參數，使用join避免只輸入firstName或lastName之一情況出現不必要的空格
  return [firstName, lastName].filter((n) => n.length > 0).join(" ");
}
