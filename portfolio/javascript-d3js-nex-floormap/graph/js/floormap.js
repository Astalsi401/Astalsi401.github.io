const colors = {
  tc: d3.scaleOrdinal().domain(["全齡健康展區", "年度主題館", "醫療機構展區", "農業生技食安健康主題展", "智慧醫療展區", "精準醫療展區"]).range(["rgba(237,125,49,0.6)", "rgba(153,204,255,1)", "rgba(255,255,0,0.6)", "rgba(153,204,0,1)", "rgba(0,112,192,0.6)", "rgba(112,48,160,0.6"]),
  en: d3.scaleOrdinal().domain(["Health Tech", "Reserved", "Medical Institutes", "Consumer health technologies", "Medtech", "Biotech"]).range(["rgba(237,125,49,0.6)", "rgba(153,204,255,1)", "rgba(255,255,0,0.6)", "rgba(153,204,0,1)", "rgba(0,112,192,0.6)", "rgba(112,48,160,0.6"]),
};
const icon_base64 = {
  escalator_up:
    "data:image/svg+xml;base64,PHN2ZyBpZD0i5ZyW5bGkXzEiIGRhdGEtbmFtZT0i5ZyW5bGkIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDQ4IDQzIj48cGF0aCBkPSJNNDIuMzksNDIuMTVINS4yQTQuNjIsNC42MiwwLDAsMSwuNTksMzcuNTRWNS43NkE0LjYxLDQuNjEsMCwwLDEsNS4yLDEuMTZINDIuMzlBNC42LDQuNiwwLDAsMSw0Nyw1Ljc2VjM3LjU0YTQuNjEsNC42MSwwLDAsMS00LjYxLDQuNjEiIHN0eWxlPSJmaWxsOiNlNTAwMTI7ZmlsbC1ydWxlOmV2ZW5vZGQiLz48cGF0aCBkPSJNMjMuNTgsMTQuODhjMS45LTEuOSwzLjgzLTMuNzYsNS42Ny01LjdBNi43Miw2LjcyLDAsMCwxLDM0LjM3LDdjMi4xMywwLDQuMjcsMCw2LjM5LDBhNS43NCw1Ljc0LDAsMCwxLDUuNTQsNC43OGMuMzgsMy4wNi0xLjQxLDYuMDUtNC4yMiw2LjYzYTE4LjYyLDE4LjYyLDAsMCwxLTQuNDIuMTNBMy4zMiwzLjMyLDAsMCwwLDM1LDE5LjY3Yy01LjU0LDUuNTktMTEuMTQsMTEuMTMtMTYuNzEsMTYuN2E3LDcsMCwwLDEtNS4zNywyLjIzYy0yLS4wNi0zLjg5LDAtNS44NCwwYTUuOTQsNS45NCwwLDAsMS01LjctNS44MUE1Ljc3LDUuNzcsMCwwLDEsNi44OSwyN2MxLjIsMCwyLjQxLjA1LDMuNjEsMEEyLjU2LDIuNTYsMCwwLDAsMTIsMjYuMzNjMS42OC0xLjU5LDMuMzEtMy4yNCw0LjkxLTQuOTFhMi4wNywyLjA3LDAsMCwwLC41My0xLjI3Yy4wNS0yLjIyLDAtNC40NSwwLTYuNjhzMS43MS0zLjY3LDMuNzQtMy4xN0EyLjcxLDIuNzEsMCwwLDEsMjMuMzcsMTNjMCwuNTcsMCwxLjE2LDAsMS43NGwuMi4xMk0xMC4yOSwzNS42M2MuNzcsMCwxLjU1LS4wNiwyLjMyLDBBNC44Miw0LjgyLDAsMCwwLDE2LjU2LDM0YzUuNTYtNS42NSwxMS4yMi0xMS4yMiwxNi44LTE2Ljg2YTQuNjgsNC42OCwwLDAsMSwzLjc3LTEuNTljMS4xMS4wNiwyLjIyLDAsMy4zNCwwYTIuNzUsMi43NSwwLDAsMCwyLjg4LTIuOTFBMi44NCwyLjg0LDAsMCwwLDQwLjQ1LDEwYy0yLDAtNCwwLTYsMGE0LjA4LDQuMDgsMCwwLDAtMy4xMiwxLjNDMjUuNSwxNy4xLDE5LjY1LDIyLjkxLDEzLjgzLDI4Ljc2YTMuOTIsMy45MiwwLDAsMS0zLDEuMjRjLTEuMiwwLTIuNDEsMC0zLjYxLDAtMS44MiwwLTIuODksMS0yLjg5LDIuNjRhMi44NSwyLjg1LDAsMCwwLDIuODcsM2MxLDAsMiwwLDMuMDYsMCIgc3R5bGU9ImZpbGw6I2ZmZjtmaWxsLXJ1bGU6ZXZlbm9kZCIvPjxwYXRoIGQ9Ik0yMC40OCwzLjczYTMuMDgsMy4wOCwwLDAsMSwzLDMuMDcsMywzLDAsMCwxLTMuMTEsMywzLDMsMCwwLDEtMi45MS0zLjA4LDMuMTIsMy4xMiwwLDAsMSwzLjA2LTMiIHN0eWxlPSJmaWxsOiNmZmY7ZmlsbC1ydWxlOmV2ZW5vZGQiLz48cGF0aCBkPSJNMzMuNDYsMjkuNzZjLTIsMS43Mi0zLjc4LDMuMjMtNS41NCw0Ljc1LS4yNi4yMi0uNTMuNDMtLjc4LjY3YTEuNDYsMS40NiwwLDAsMC0uMjQsMi4xMiwxLjQyLDEuNDIsMCwwLDAsMi4wNywwYzEuNzktMS41MSwzLjU2LTMsNS4zMy00LjU4QTYuMjMsNi4yMywwLDAsMCwzNSwzMmwuMzEuMTZjLS4wNy44OS0uMTYsMS43OS0uMiwyLjY4cy4zNCwxLjQ2LDEuMTgsMS41NGExLjIyLDEuMjIsMCwwLDAsMS40OC0xLjE2cS4zLTMuMTQuNDgtNi4yN2ExLjQsMS40LDAsMCwwLTEuNDItMS42MWMtMi4wNi0uMjEtNC4xMS0uMzYtNi4xNy0uNDhhMS4yMywxLjIzLDAsMCwwLTEuNDIsMS4yNCwxLjI5LDEuMjksMCwwLDAsMS4yOSwxLjQ4Yy44OC4xLDEuNzcuMTQsMi45NS4yMyIgc3R5bGU9ImZpbGw6I2ZmZjtmaWxsLXJ1bGU6ZXZlbm9kZCIvPjwvc3ZnPg==",
  escalator_down:
    "data:image/svg+xml;base64,PHN2ZyBpZD0i5ZyW5bGkXzEiIGRhdGEtbmFtZT0i5ZyW5bGkIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDQ4IDQzIj48cGF0aCBkPSJNNDIuMzksNDJINS4yQTQuNjEsNC42MSwwLDAsMSwuNTksMzcuMzRWNS41N0E0LjYxLDQuNjEsMCwwLDEsNS4yLDFINDIuMzlBNC42LDQuNiwwLDAsMSw0Nyw1LjU3VjM3LjM0QTQuNiw0LjYsMCwwLDEsNDIuMzksNDIiIHN0eWxlPSJmaWxsOiNlNTAwMTI7ZmlsbC1ydWxlOmV2ZW5vZGQiLz48cGF0aCBkPSJNMjMuNTgsMTQuNjljMS45LTEuOTEsMy44My0zLjc3LDUuNjctNS43MWE2Ljc5LDYuNzksMCwwLDEsNS4xMi0yLjE3YzIuMTMsMCw0LjI3LDAsNi4zOSwwYTUuNzYsNS43NiwwLDAsMSw1LjU0LDQuNzhjLjM4LDMuMDctMS40MSw2LjA2LTQuMjIsNi42NGExOC42MiwxOC42MiwwLDAsMS00LjQyLjEyQTMuMzIsMy4zMiwwLDAsMCwzNSwxOS40N0MyOS40MywyNS4wNiwyMy44MywzMC42LDE4LjI2LDM2LjE4YTcsNywwLDAsMS01LjM3LDIuMjJjLTIsMC0zLjg5LDAtNS44NCwwYTUuOTQsNS45NCwwLDAsMS01LjctNS44Miw1Ljc3LDUuNzcsMCwwLDEsNS41NC01LjgxYzEuMiwwLDIuNDEuMDUsMy42MSwwQTIuNDksMi40OSwwLDAsMCwxMiwyNi4xM2MxLjY4LTEuNTksMy4zMS0zLjIzLDQuOTEtNC45MUEyLDIsMCwwLDAsMTcuMzksMjBjLjA1LTIuMjIsMC00LjQ1LDAtNi42N3MxLjcxLTMuNjgsMy43NC0zLjE4YTIuNzMsMi43MywwLDAsMSwyLjIsMi43M2MwLC41NywwLDEuMTUsMCwxLjczbC4yLjEzTTEwLjI5LDM1LjQzYy43NywwLDEuNTUsMCwyLjMyLDBhNC43OSw0Ljc5LDAsMCwwLDMuOTUtMS42MUMyMi4xMiwyOC4xOSwyNy43OCwyMi42MSwzMy4zNiwxN2E0LjY3LDQuNjcsMCwwLDEsMy43Ny0xLjU4YzEuMTEuMDYsMi4yMiwwLDMuMzQsMGEyLjc2LDIuNzYsMCwwLDAsMi44OC0yLjkyLDIuODQsMi44NCwwLDAsMC0yLjktMi43MmMtMiwwLTQsMC02LDBhNCw0LDAsMCwwLTMuMTIsMS4zMWMtNS44LDUuODYtMTEuNjUsMTEuNjctMTcuNDcsMTcuNTFhMy45MiwzLjkyLDAsMCwxLTMsMS4yNGMtMS4yLDAtMi40MSwwLTMuNjEsMC0xLjgyLDAtMi44OSwxLTIuODksMi42NWEyLjg2LDIuODYsMCwwLDAsMi44NywzYzEsMCwyLDAsMy4wNiwwIiBzdHlsZT0iZmlsbDojZmZmO2ZpbGwtcnVsZTpldmVub2RkIi8+PHBhdGggZD0iTTIwLjQ4LDMuNTNhMy4wOSwzLjA5LDAsMCwxLDMsMy4wOCwzLDMsMCwwLDEtMy4xMSwzLDMsMywwLDAsMS0yLjkxLTMuMDksMy4xMiwzLjEyLDAsMCwxLDMuMDYtMyIgc3R5bGU9ImZpbGw6I2ZmZjtmaWxsLXJ1bGU6ZXZlbm9kZCIvPjxwYXRoIGQ9Ik0zMS41OCwzNS4xM2MxLjg2LTEuODYsMy41Mi0zLjUxLDUuMTYtNS4xNi4yNC0uMjQuNDktLjQ3LjcyLS43M2ExLjQ1LDEuNDUsMCwwLDAsLjA4LTIuMTMsMS40MSwxLjQxLDAsMCwwLTIuMDYuMTdjLTEuNjcsMS42NC0zLjMyLDMuMzEtNSw1YTguNjMsOC42MywwLDAsMC0uNjIuODFsLS4zMi0uMTNjMC0uOSwwLTEuOCwwLTIuNjlzLS40NS0xLjQzLTEuMjktMS40NWExLjIyLDEuMjIsMCwwLDAtMS4zOSwxLjI3YzAsMi4xLS4wNSw0LjIsMCw2LjI5YTEuNCwxLjQsMCwwLDAsMS41NCwxLjVjMi4wNiwwLDQuMTMsMCw2LjE5LDBhMS4yNCwxLjI0LDAsMCwwLDEuMzItMS4zNSwxLjI5LDEuMjksMCwwLDAtMS40LTEuMzhjLS44OSwwLTEuNzgsMC0zLDAiIHN0eWxlPSJmaWxsOiNmZmY7ZmlsbC1ydWxlOmV2ZW5vZGQiLz48L3N2Zz4=",
  escalator_up_down_black:
    "data:image/svg+xml;base64,PHN2ZyBpZD0i5ZyW5bGkXzEiIGRhdGEtbmFtZT0i5ZyW5bGkIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDQ4IDQzIj48cGF0aCBkPSJNMjQuNDksMTRjMC0uNTMsMC0xLjA2LDAtMS41OGEyLjQ3LDIuNDcsMCwwLDEsMi0yLjQ3YzEuODQtLjQ1LDMuMzYuODEsMy40LDIuODhzMCw0LDAsNi4wNWExLjg0LDEuODQsMCwwLDAsLjQ5LDEuMTZjMS40NSwxLjUyLDIuOTMsMyw0LjQ2LDQuNDZhMi4yLDIuMiwwLDAsMCwxLjMxLjU0YzEuMDkuMDgsMi4xOSwwLDMuMjgsMGE1LjI1LDUuMjUsMCwwLDEsNSw1LjI4LDUuMzgsNS4zOCwwLDAsMS01LjE3LDUuMjdjLTEuNzcsMC0zLjUzLDAtNS4yOSwwYTYuMzksNi4zOSwwLDAsMS00Ljg5LTJDMjQuMDcsMjguNTYsMTksMjMuNTMsMTQsMTguNDZhMywzLDAsMCwwLTIuNDQtMSwxNi4yNSwxNi4yNSwwLDAsMS00LS4xMWMtMi41NS0uNTMtNC4xNy0zLjIzLTMuODMtNkE1LjIxLDUuMjEsMCwwLDEsOC43MSw3YzEuOTMsMCwzLjg3LDAsNS44LDBhNi4xMSw2LjExLDAsMCwxLDQuNjUsMmMxLjY3LDEuNzcsMy40MiwzLjQ1LDUuMTQsNS4xOGwuMTktLjExTTM5LjEzLDMyLjkzYTIuNTgsMi41OCwwLDAsMCwyLjYtMi43YzAtMS41LTEtMi4zOC0yLjYxLTIuNEgzNS44NGEzLjUxLDMuNTEsMCwwLDEtMi42OS0xLjEyYy01LjI4LTUuMy0xMC41OS0xMC41OC0xNS44NS0xNS44OWEzLjYyLDMuNjIsMCwwLDAtMi44My0xLjE4Yy0xLjgzLDAtMy42NSwwLTUuNDcsMGEyLjU2LDIuNTYsMCwwLDAtMi42MywyLjQ3QTIuNSwyLjUsMCwwLDAsOSwxNC43NmMxLDAsMiwuMDUsMywwYTQuMjcsNC4yNywwLDAsMSwzLjQyLDEuNDRjNS4wNyw1LjEyLDEwLjE5LDEwLjE4LDE1LjI0LDE1LjNBNC4zNSw0LjM1LDAsMCwwLDM0LjI2LDMzYy42OS0uMDYsMS40LDAsMi4xLDAsLjkyLDAsMS44NSwwLDIuNzcsMCIgc3R5bGU9ImZpbGw6IzNmM2IzYTtmaWxsLXJ1bGU6ZXZlbm9kZCIvPjxwYXRoIGQ9Ik0xOC44OSwzMS41MmMtMS42OS0xLjY5LTMuMTgtMy4xOS00LjY4LTQuNjgtLjIyLS4yMi0uNDMtLjQ1LS42Ni0uNjVhMS4zMiwxLjMyLDAsMCwwLTEuOTQtLjA4QTEuMjgsMS4yOCwwLDAsMCwxMS43NywyOGMxLjQ5LDEuNTIsMywzLDQuNTEsNC41MWE4LjQ0LDguNDQsMCwwLDAsLjc0LjU2LDIuNTIsMi41MiwwLDAsMC0uMTIuMjljLS44MiwwLTEuNjMsMC0yLjQ0LDBzLTEuMy40MS0xLjMyLDEuMThhMS4xMiwxLjEyLDAsMCwwLDEuMTYsMS4yNnEyLjg1LDAsNS43LDBhMS4yOCwxLjI4LDAsMCwwLDEuMzYtMS40YzAtMS44OCwwLTMuNzUsMC01LjYyYTEuMTEsMS4xMSwwLDAsMC0xLjIzLTEuMTksMS4xNSwxLjE1LDAsMCwwLTEuMjQsMS4yN2MwLC44LDAsMS42MSwwLDIuNjgiIHN0eWxlPSJmaWxsOiMzZjNiM2E7ZmlsbC1ydWxlOmV2ZW5vZGQiLz48cGF0aCBkPSJNNy43NiwzNC42NGw0LjU4LDQuNzhjLjIyLjIyLjQyLjQ1LjY1LjY2YTEuMzIsMS4zMiwwLDAsMCwxLjk0LjExLDEuMjksMS4yOSwwLDAsMC0uMTItMS44N2MtMS40Ny0xLjU0LTIuOTQtMy4wNy00LjQzLTQuNTlhNyw3LDAsMCwwLS43Mi0uNThjMC0uMDkuMDktLjE5LjEyLS4yOC44MiwwLDEuNjMuMDUsMi40NCwwczEuMzEtLjM5LDEuMzQtMS4xNWExLjExLDEuMTEsMCwwLDAtMS4xMy0xLjI4Yy0xLjktLjA3LTMuOC0uMTEtNS43LS4xMWExLjI4LDEuMjgsMCwwLDAtMS4zOSwxLjM3Yy0uMDgsMS44Ny0uMTEsMy43NC0uMTEsNS42MmExLjExLDEuMTEsMCwwLDAsMS4yLDEuMjFBMS4xNiwxLjE2LDAsMCwwLDcuNywzNy4zM2MwLS44MSwwLTEuNjEuMDYtMi42OSIgc3R5bGU9ImZpbGw6IzNmM2IzYTtmaWxsLXJ1bGU6ZXZlbm9kZCIvPjxwYXRoIGQ9Ik0yNy4xMSw0YTIuOCwyLjgsMCwwLDAtMi42OCwyLjc5LDIuNzMsMi43MywwLDEsMCw1LjQ2LS4xQTIuODMsMi44MywwLDAsMCwyNy4xMSw0IiBzdHlsZT0iZmlsbDojM2YzYjNhO2ZpbGwtcnVsZTpldmVub2RkIi8+PC9zdmc+",
  escalator_up_down_red:
    "data:image/svg+xml;base64,PHN2ZyBpZD0i5ZyW5bGkXzEiIGRhdGEtbmFtZT0i5ZyW5bGkIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDQ4IDQzIj48cGF0aCBkPSJNNDMuNjcsNDEuNzJINC4yNkEzLjMzLDMuMzMsMCwwLDEsLjkzLDM4LjM5di0zNEEzLjMzLDMuMzMsMCwwLDEsNC4yNiwxSDQzLjY3QTMuMzMsMy4zMywwLDAsMSw0Nyw0LjM2djM0YTMuMzMsMy4zMywwLDAsMS0zLjMzLDMuMzMiIHN0eWxlPSJmaWxsOiNlNTAwMTI7ZmlsbC1ydWxlOmV2ZW5vZGQiLz48cGF0aCBkPSJNMjQuNDIsMTMuNTFjMC0uNTYsMC0xLjEzLDAtMS42OWEyLjY1LDIuNjUsMCwwLDEsMi4xNC0yLjY0YzItLjQ4LDMuNTkuODcsMy42NCwzLjA4czAsNC4zMywwLDYuNDlBMiwyLDAsMCwwLDMwLjc1LDIwYzEuNTYsMS42MiwzLjE0LDMuMjIsNC43OCw0Ljc3YTIuMzUsMi4zNSwwLDAsMCwxLjQuNThjMS4xNy4wOSwyLjM0LDAsMy41MSwwQTUuNjEsNS42MSwwLDAsMSw0NS44MiwzMWE1Ljc2LDUuNzYsMCwwLDEtNS41Myw1LjY1Yy0xLjg5LDAtMy43OSwwLTUuNjcsMGE2LjgyLDYuODIsMCwwLDEtNS4yMy0yLjE2QzI0LDI5LjEsMTguNTQsMjMuNzEsMTMuMTUsMTguMjhhMy4yNiwzLjI2LDAsMCwwLTIuNjEtMS4wOSwxOC4wNiwxOC4wNiwwLDAsMS00LjI5LS4xMWMtMi43My0uNTgtNC40Ny0zLjQ3LTQuMS02LjQ1QTUuNiw1LjYsMCwwLDEsNy41Myw2YzIuMDcsMCw0LjE0LDAsNi4yMSwwYTYuNjIsNi42MiwwLDAsMSw1LDIuMTFjMS43OSwxLjg5LDMuNjYsMy43LDUuNSw1LjU0bC4yLS4xMk00MC4xMSwzMy43OGEyLjc1LDIuNzUsMCwwLDAsMi43OC0yLjg5YzAtMS42MS0xLTIuNTYtMi44LTIuNTctMS4xNiwwLTIuMzQsMC0zLjUxLDBhMy44MiwzLjgyLDAsMCwxLTIuODgtMS4yYy01LjY1LTUuNjgtMTEuMzQtMTEuMzMtMTctMTdhMy45NCwzLjk0LDAsMCwwLTMtMS4yN2MtMS45NSwwLTMuOSwwLTUuODUsMEEyLjc4LDIuNzgsMCwwLDAsNSwxMS40OWEyLjY4LDIuNjgsMCwwLDAsMi44MSwyLjgzYzEuMDgsMCwyLjE2LDAsMy4yNCwwYTQuNTgsNC41OCwwLDAsMSwzLjY3LDEuNTRjNS40Miw1LjQ4LDEwLjkxLDEwLjksMTYuMzIsMTYuMzlhNC42NSw0LjY1LDAsMCwwLDMuODQsMS41NmMuNzQtLjA2LDEuNDksMCwyLjI0LDAsMSwwLDIsMCwzLDAiIHN0eWxlPSJmaWxsOiNmZmY7ZmlsbC1ydWxlOmV2ZW5vZGQiLz48cGF0aCBkPSJNMTguNDMsMzEuMjdsLTUtNWMtLjIzLS4yMy0uNDYtLjQ4LS43MS0uN2ExLjQxLDEuNDEsMCwwLDAtMi4wNy0uMDcsMS4zNiwxLjM2LDAsMCwwLC4xNiwyYzEuNiwxLjYyLDMuMjIsMy4yMyw0Ljg0LDQuODMuMjIuMjIuNTIuMzkuNzguNiwwLC4xLS4wOS4yLS4xMy4zMS0uODcsMC0xLjc0LDAtMi42MSwwcy0xLjM5LjQ0LTEuNDEsMS4yNmExLjIsMS4yLDAsMCwwLDEuMjQsMS4zNWMyLDAsNC4wNywwLDYuMTEsMGExLjM3LDEuMzcsMCwwLDAsMS40NS0xLjVjLjA1LTIsLjA1LTQsMC02QTEuMiwxLjIsMCwwLDAsMTkuNzcsMjdhMS4yNSwxLjI1LDAsMCwwLTEuMzMsMS4zN2MwLC44NiwwLDEuNzIsMCwyLjg3IiBzdHlsZT0iZmlsbDojZmZmO2ZpbGwtcnVsZTpldmVub2RkIi8+PHBhdGggZD0iTTYuNTEsMzQuNjFjMS43NiwxLjg1LDMuMzQsMy40OSw0LjkxLDUuMTIuMjMuMjQuNDUuNDguNjkuNzFhMS40MSwxLjQxLDAsMCwwLDIuMDcuMTIsMS4zNywxLjM3LDAsMCwwLS4xMy0ycS0yLjM0LTIuNDctNC43My00LjkyQTcuNzcsNy43NywwLDAsMCw4LjU0LDMzYy4wNS0uMS4xLS4yMS4xNC0uMzEuODcsMCwxLjc0LDAsMi42MSwwczEuNC0uNDIsMS40My0xLjIzYTEuMTksMS4xOSwwLDAsMC0xLjIxLTEuMzhjLTItLjA3LTQuMDctLjEyLTYuMTEtLjExQTEuMzYsMS4zNiwwLDAsMCwzLjkyLDMxLjVjLS4wOSwyLS4xMiw0LS4xMyw2YTEuMiwxLjIsMCwwLDAsMS4yOSwxLjMsMS4yNCwxLjI0LDAsMCwwLDEuMzYtMS4zM2MwLS44NiwwLTEuNzMuMDctMi44OCIgc3R5bGU9ImZpbGw6I2ZmZjtmaWxsLXJ1bGU6ZXZlbm9kZCIvPjxwYXRoIGQ9Ik0yNy4yMywyLjhhMywzLDAsMCwwLTIuODcsMywyLjksMi45LDAsMCwwLDMsMi44OSwyLjkzLDIuOTMsMCwwLDAsMi44My0zLDMsMywwLDAsMC0zLTIuODgiIHN0eWxlPSJmaWxsOiNmZmY7ZmlsbC1ydWxlOmV2ZW5vZGQiLz48L3N2Zz4=",
  elevator: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48IS0tISBGb250IEF3ZXNvbWUgUHJvIDYuMi4xIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlIChDb21tZXJjaWFsIExpY2Vuc2UpIENvcHlyaWdodCAyMDIyIEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBkPSJNMTMyLjcgNC43bC02NCA2NGMtNC42IDQuNi01LjkgMTEuNS0zLjUgMTcuNHM4LjMgOS45IDE0LjggOS45SDIwOGM2LjUgMCAxMi4zLTMuOSAxNC44LTkuOXMxLjEtMTIuOS0zLjUtMTcuNGwtNjQtNjRjLTYuMi02LjItMTYuNC02LjItMjIuNiAwek02NCAxMjhjLTM1LjMgMC02NCAyOC43LTY0IDY0VjQ0OGMwIDM1LjMgMjguNyA2NCA2NCA2NEg0NDhjMzUuMyAwIDY0LTI4LjcgNjQtNjRWMTkyYzAtMzUuMy0yOC43LTY0LTY0LTY0SDY0em05NiAxOTJjLTI2LjUgMC00OC0yMS41LTQ4LTQ4czIxLjUtNDggNDgtNDhzNDggMjEuNSA0OCA0OHMtMjEuNSA0OC00OCA0OHpNODAgNDAwYzAtMjYuNSAyMS41LTQ4IDQ4LTQ4aDY0YzI2LjUgMCA0OCAyMS41IDQ4IDQ4djE2YzAgMTcuNy0xNC4zIDMyLTMyIDMySDExMmMtMTcuNyAwLTMyLTE0LjMtMzItMzJWNDAwem0xOTIgMGMwLTI2LjUgMjEuNS00OCA0OC00OGg2NGMyNi41IDAgNDggMjEuNSA0OCA0OHYxNmMwIDE3LjctMTQuMyAzMi0zMiAzMkgzMDRjLTE3LjcgMC0zMi0xNC4zLTMyLTMyVjQwMHpNNDAwIDI3MmMwIDI2LjUtMjEuNSA0OC00OCA0OHMtNDgtMjEuNS00OC00OHMyMS41LTQ4IDQ4LTQ4czQ4IDIxLjUgNDggNDh6TTM1Ni43IDkxLjNjNi4yIDYuMiAxNi40IDYuMiAyMi42IDBsNjQtNjRjNC42LTQuNiA1LjktMTEuNSAzLjUtMTcuNFM0MzguNSAwIDQzMiAwSDMwNGMtNi41IDAtMTIuMyAzLjktMTQuOCA5LjlzLTEuMSAxMi45IDMuNSAxNy40bDY0IDY0eiIvPjwvc3ZnPg==",
  toilet: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNTEyIj48IS0tISBGb250IEF3ZXNvbWUgUHJvIDYuMi4xIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlIChDb21tZXJjaWFsIExpY2Vuc2UpIENvcHlyaWdodCAyMDIyIEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBkPSJNMTc2IDQ4YzAgMjYuNS0yMS41IDQ4LTQ4IDQ4cy00OC0yMS41LTQ4LTQ4czIxLjUtNDggNDgtNDhzNDggMjEuNSA0OCA0OHpNMTIwIDM1MlY0ODBjMCAxNy43LTE0LjMgMzItMzIgMzJzLTMyLTE0LjMtMzItMzJWMzI1LjJjLTguMSA5LjItMjEuMSAxMy4yLTMzLjUgOS40Yy0xNi45LTUuMy0yNi4zLTIzLjItMjEtNDAuMWwzMC45LTk5LjFDNDQuOSAxNTUuMyA4MiAxMjggMTI0IDEyOGg4YzQyIDAgNzkuMSAyNy4zIDkxLjYgNjcuNGwzMC45IDk5LjFjNS4zIDE2LjktNC4xIDM0LjgtMjEgNDAuMWMtMTIuNCAzLjktMjUuNC0uMi0zMy41LTkuNFY0ODBjMCAxNy43LTE0LjMgMzItMzIgMzJzLTMyLTE0LjMtMzItMzJWMzUySDEyMHpNMzIwIDBjMTMuMyAwIDI0IDEwLjcgMjQgMjRWNDg4YzAgMTMuMy0xMC43IDI0LTI0IDI0cy0yNC0xMC43LTI0LTI0VjI0YzAtMTMuMyAxMC43LTI0IDI0LTI0ek01NjAgNDhjMCAyNi41LTIxLjUgNDgtNDggNDhzLTQ4LTIxLjUtNDgtNDhzMjEuNS00OCA0OC00OHM0OCAyMS41IDQ4IDQ4ek00NDAgNDgwVjM4NEg0MjIuMmMtMTAuOSAwLTE4LjYtMTAuNy0xNS4yLTIxLjFsOS0yNi45Yy0zLjIgMC02LjQtLjUtOS41LTEuNWMtMTYuOS01LjMtMjYuMy0yMy4yLTIxLTQwLjFsMjkuNy05NS4yQzQyOC40IDE1Ni45IDQ2Ny42IDEyOCA1MTIgMTI4czgzLjYgMjguOSA5Ni44IDcxLjJsMjkuNyA5NS4yYzUuMyAxNi45LTQuMSAzNC44LTIxIDQwLjFjLTMuMiAxLTYuNCAxLjUtOS41IDEuNWw5IDI2LjljMy41IDEwLjQtNC4zIDIxLjEtMTUuMiAyMS4xSDU4NHY5NmMwIDE3LjctMTQuMyAzMi0zMiAzMnMtMzItMTQuMy0zMi0zMlYzODRINTA0djk2YzAgMTcuNy0xNC4zIDMyLTMyIDMycy0zMi0xNC4zLTMyLTMyeiIvPjwvc3ZnPg==",
  arrow_up: "data:image/svg+xml;base64,PHN2ZyBpZD0i5ZyW5bGkXzEiIGRhdGEtbmFtZT0i5ZyW5bGkIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDkzIDk5Ij48cGF0aCBkPSJNNTUsNDMuMDh2OS43OGMwLDYuNTkuMDYsMTMuMTMsMCwxOS43M0M1NSw3OC4xNyw1MS4yNiw4Miw0Ni4xNyw4MnMtOC42MS0zLjg5LTguNjYtOS41NWMwLTkuMTksMC0xOC40NSwwLTI3LjY4YTEwLjI2LDEwLjI2LDAsMCwwLS40MS0xLjE4Yy0yLjc3LDMuMzgtNS4yOCw2LjYtOCw5LjY3YTcuODksNy44OSwwLDAsMS05LjI4LDEuOTIsNy4yOSw3LjI5LDAsMCwxLTQuMTEtNy44OCwxMC4zMiwxMC4zMiwwLDAsMSwyLjA3LTQuNHExMC42LTEzLDIxLjQ1LTI1Ljg3YzQuMjUtNS4wNSwxMC4wNi01LDE0LjMxLjIxLDcsOC40MSwxNCwxNi45LDIxLDI1LjMzLDMuMzUsNC4wOSwzLjE5LDguNjgtLjQyLDExLjYzLTMuMzYsMi44NS03LjkyLDIuMTItMTEuMjktMS42OS0xLjIxLTEuNDEtMi4zNi0yLjg5LTMuNTctNC4zUzU2Ljg1LDQ1LjMyLDU1LDQzLjA4WiIgc3R5bGU9ImZpbGw6I2U2MWYxOTtmaWxsLXJ1bGU6ZXZlbm9kZCIvPjwvc3ZnPg==",
  first_aid: "data:image/svg+xml;base64,PHN2ZyBpZD0i5ZyW5bGkXzEiIGRhdGEtbmFtZT0i5ZyW5bGkIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDkzIDk5Ij48cG9seWdvbiBwb2ludHM9IjY4Ljc2IDQxLjMgNTIuOSA0MS4zIDUyLjkgMjYuMzIgNDAuNjQgMjYuMzIgNDAuNjQgNDEuMyAyNC43OCA0MS4zIDI0Ljc4IDUzLjU0IDQwLjY0IDUzLjU0IDQwLjY0IDcwLjMgNTIuOSA3MC4zIDUyLjkgNTMuNTQgNjguNzYgNTMuNTQgNjguNzYgNDEuMyIgc3R5bGU9ImZpbGw6IzNlM2EzOSIvPjxyZWN0IHg9IjE2LjM0IiB5PSIxNS41OSIgd2lkdGg9IjYwLjUzIiBoZWlnaHQ9IjY3LjQxIiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojM2UzYTM5O3N0cm9rZS1taXRlcmxpbWl0OjEwO3N0cm9rZS13aWR0aDowLjVweCIvPjwvc3ZnPg==",
};
const icon_l = 500;

class Box {
  constructor(box, c, lang) {
    this.lang = lang;
    this.box = box
      .attr("data-x", (d) => d.x)
      .attr("data-y", (d) => d.y)
      .attr("data-w", (d) => d.w)
      .attr("data-h", (d) => d.h);
    this.item = this.box.append("rect").attr("stroke", "black");
    this.text_box = this.box.append("g");
    this.text = this.text_box
      .selectAll(`${c}-text`)
      .data((d) => (d.text ? d.text[this.lang] : []).map((t) => ({ w: d.w, text: t, size: d.size[this.lang] })))
      .enter()
      .append("text")
      .text((d) => d.text)
      .attr("text-anchor", "middle")
      .attr("font-weight", "bold")
      .attr("fill", "black");
  }

  draw = (width, xScale, yScale, size) => {
    this.text_padding = 0.001;
    this.box.attr("transform", (d) => `translate(${xScale(d.x)},${yScale(d.y)})`);
    this.item.attr("width", (d) => xScale(d.w)).attr("height", (d) => yScale(d.h));
    this.text_box.attr("transform", (d) => `translate(${xScale(d.w / 2)},${yScale(d.h / 2) - ((d.text[this.lang].length - 1) * width * (size * d.size[this.lang] + this.text_padding)) / 2})`).attr("font-size", (d) => width * size * d.size[this.lang]);
    this.text.attr("y", (d, i) => i * width * (size * d.size + this.text_padding));
  };
}

class Floor {
  constructor(title, graph, w, h, data, lang) {
    this.lang = lang;
    this.title = title[this.lang];
    this.colors = colors[this.lang];
    this.id_text = { en: "No.", tc: "編號:" }[this.lang];
    this.graph = graph;
    this.download_container = this.graph.append("div").attr("class", "download");
    this.format_select = this.download_container.append("select").attr("class", "format-select");
    this.format_select
      .selectAll("option")
      .data(["png", "svg"])
      .enter()
      .append("option")
      .text((d) => d);
    this.download_btn = this.download_container.append("button").attr("class", "download-btn").text("download");
    this.svg = this.graph.append("svg").attr("style", "background-color: white;");
    this.tooltip = this.graph.append("div").attr("class", "c-tooltip c-text-medium");
    this.w = w;
    this.h = h;
    this.data = data;
    this.xScale = d3.scaleLinear().domain([0, this.w]);
    this.yScale = d3.scaleLinear().domain([0, this.h]);
    this.legend = this.svg.append("g").attr("class", "legend");
    this.legend_title = this.legend.append("text").text(this.title).attr("font-weight", "bold");
    this.legend_box = this.legend
      .selectAll("g")
      .data(Array.from(new Set(this.data.filter((d) => d.type === "booth").map((d) => d.cat[this.lang]))))
      .enter()
      .append("g");
    this.wall = this.addObj("wall", "path")
      .attr("stroke", "black")
      .attr("fill", (d) => d.fill)
      .attr("stroke-width", (d) => d.strokeWidth);
    this.pillar_box = this.addObj("pillar", "g");
    this.pillar = this.pillar_box.append("rect").attr("fill", "rgba(0, 0, 0, 0.2)");
    this.text = this.addObj("text", "text")
      .text((d) => d.text[this.lang])
      .attr("text-anchor", "middle")
      .attr("font-weight", "bold")
      .attr("fill", (d) => d.color);
    this.booth = new Box(this.addObj("booth", "g"), "booth", this.lang);
    this.booth.box
      .attr("stroke-width", "0.3px")
      .attr("fill", (d) => this.colors(d.cat[this.lang]))
      .on("mouseover", (event, d) => {
        this.tooltip.classed("active", true).html(`${d.cat[this.lang]}${d.id ? `<br>${this.id_text} ` + d.id : ""}<br>size: ${d.w / 300} x ${d.h / 300}<br>${d.text ? d.text[this.lang].join("") : ""}`);
      });
    this.booth_id = this.booth.box
      .append("text")
      .text((d) => d.id)
      .attr("class", "booth-id")
      .attr("fill", "black")
      .attr("x", 2);
    this.room = new Box(this.addObj("room", "g"), "room", this.lang);
    this.room.box
      .attr("stroke-width", (d) => (d.bd ? d.bd : 0))
      .attr("fill", "rgba(0,0,0,0)")
      .on("mouseover", (event, d) => {
        if (d.note) this.tooltip.classed("active", true).html(d.note[this.lang]);
      });
    this.icon = this.room.box
      .append("clipPath")
      .attr("id", (d, i) => `icon-${d.floor}-${i}`)
      .append("rect")
      .attr("class", "icon");
    this.icon_img = this.room.box
      .append("image")
      .attr("xlink:href", (d) => {
        if (["escalator_up", "escalator_down", "escalator_up_down_black", "escalator_up_down_red", "elevator", "toilet", "arrow_up", "first_aid"].includes(d.icon)) {
          return icon_base64[d.icon];
        } else {
          return d.icon;
        }
      })
      .attr("visibility", (d) => (d.icon ? "visible" : "hidden"))
      .attr("clip-path", (d, i) => `url(#icon-${d.floor}-${i})`);
    this.legend_rect = this.legend_box.append("rect").attr("fill", (d) => this.colors(d));
    this.legend_text = this.legend_box
      .append("text")
      .text((d) => d)
      .attr("style", "font-weight: bold;");

    this.draw();
    this.download_btn.on("click", this.download);
    window.addEventListener("resize", this.draw);
  }

  download = async () => {
    const svgElement = this.svg.node();
    const format = this.format_select.node().value;
    const svgString = new XMLSerializer().serializeToString(svgElement);
    let blob;
    switch (format) {
      case "png":
        const canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        const resolution = 3840;
        const scale = resolution / svgElement.clientWidth;
        canvas.width = resolution;
        canvas.height = scale * svgElement.clientHeight;
        const ctx = canvas.getContext("2d");
        const image = new Image();
        blob = await new Promise((resolve) => {
          image.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(resolve, "image/png");
            document.body.removeChild(canvas);
          };
          image.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);
        });
        break;
      default:
        blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
        break;
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${this.title}.${format}`;
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
  };

  addObj = (type, tag) => {
    return this.svg
      .append("g")
      .attr("class", `${type}-g`)
      .selectAll(type)
      .data(this.data.filter((d) => d.type === type))
      .enter()
      .append(tag)
      .attr("class", type);
  };

  iconSet = (elem) => {
    elem
      .attr("width", this.xScale(icon_l))
      .attr("height", this.yScale(icon_l))
      .attr("x", (d) => this.xScale((d.w - icon_l) / 2))
      .attr("y", (d) => this.yScale((d.h - icon_l) / 2));
  };

  mouseover_fuc = (elem, width) => {
    elem
      .on("mousemove", (event, d) => {
        let x = event.layerX;
        let y = event.layerY;
        this.tooltip.attr("style", `left: ${x - 100 < 0 ? 0 : x + 100 > width ? width - 200 : x - 100}px; top: ${y + 20}px`);
      })
      .on("mouseout", () => this.tooltip.classed("active", false));
  };

  draw_path = (path) => {
    return path.map((p) => (p.node === "L" ? `${p.node}${this.xScale(p.x)} ${this.yScale(p.y)}` : `${p.node}${this.xScale(p.x1)} ${this.yScale(p.y1)} ${this.xScale(p.x2)} ${this.yScale(p.y2)} ${this.xScale(p.x)} ${this.yScale(p.y)}`)).join("");
  };

  wrap = (text) => {
    const xScale = this.xScale;
    text.each(function (d) {
      let self = d3.select(this),
        textLength = self.node().getComputedTextLength(),
        text = self.text();
      while (textLength > xScale(d.w) && text.length > 0) {
        text = text.slice(0, -1);
        self.text(text + "\u2026");
        textLength = self.node().getComputedTextLength();
      }
    });
  };

  draw = () => {
    this.width = parseInt(this.graph.style("width"), 10);
    this.height = (this.width / this.w) * this.h;
    this.svg.attr("width", this.width).attr("height", this.height);
    this.xScale.range([0, this.width]);
    this.yScale.range([0, this.height]);
    this.wall.attr("d", (d) => `M${this.xScale(d.x)} ${this.yScale(d.y)}${this.draw_path(d.p)}`);
    this.pillar_box.attr("transform", (d) => `translate(${this.xScale(d.x)},${this.yScale(d.y)})`);
    this.pillar.attr("width", (d) => this.xScale(d.w)).attr("height", (d) => this.yScale(d.h));
    this.room.draw(this.width, this.xScale, this.yScale, 0.011);
    this.booth.draw(this.width, this.xScale, this.yScale, 0.014);
    this.booth_id.attr("y", (d) => this.yScale(d.h) - 1).attr("font-size", this.width * 0.004);
    this.wrap(this.booth.text);
    this.mouseover_fuc(this.room.box, this.width);
    this.mouseover_fuc(this.booth.box, this.width);
    this.text
      .attr("font-size", (d) => `${this.width * 0.022 * d.size[this.lang]}`)
      .attr("x", (d) => this.xScale(d.x))
      .attr("y", (d) => this.yScale(d.y));
    this.iconSet(this.icon);
    this.iconSet(this.icon_img);
    const legend_block = 500;
    this.legend.attr("transform", `translate(${this.xScale(legend_block)},${this.yScale(this.h - 4000)})`);
    this.legend_title.attr("font-size", this.yScale(legend_block + 100));
    this.legend_box.attr("transform", (d, i) => `translate(0,${this.yScale(300 + i * (legend_block + 300))})`);
    this.legend_rect.attr("width", this.xScale(legend_block)).attr("height", this.yScale(legend_block));
    this.legend_text
      .attr("x", this.xScale(legend_block + 100))
      .attr("y", this.yScale(legend_block - 100))
      .attr("font-size", this.yScale(legend_block - 100));
  };
}
