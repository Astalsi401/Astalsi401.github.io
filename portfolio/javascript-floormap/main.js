const { useCallback, useState, useEffect, useLayoutEffect, useRef, useMemo, memo, StrictMode } = React;
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
const meta = document.createElement("meta");
meta.setAttribute("name", "viewport");
meta.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no");
document.head.appendChild(meta);

const Header = ({ elementStatus, setElementStatus, searchCondition, setSearchCondition, defaultViewbox }) => {
  const tags = [elementStatus.mapText.event, ...elementStatus.mapText.headerTags];
  const download = async () => {
    defaultViewbox(false);
    const svgElement = document.querySelector("#floormap");
    const svgString = new XMLSerializer().serializeToString(svgElement);
    let blob;
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
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Floor ${searchCondition.floor}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="fp-tags px-2 py-1 shadow">
      <div className="d-flex">
        <div className="flex-grow-1">
          <a href={`https://expo.taiwan-healthcare.org/${elementStatus.mapText.link}/`} className="logo d-block">
            <img className="d-block mx-auto" src="https://expo.taiwan-healthcare.org//data/tmp/20231127/20231127ata8n2.png" alt="Healthcare Expo Taiwan Logo" />
          </a>
        </div>
        <div
          className="fp-download flex-shrink-0"
          title={elementStatus.mapText.download}
          onClick={() => {
            defaultViewbox(false);
            setTimeout(download, 50);
          }}
        >
          <svg width={30} height={30} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.625 15C5.625 14.5858 5.28921 14.25 4.875 14.25C4.46079 14.25 4.125 14.5858 4.125 15H5.625ZM4.875 16H4.125H4.875ZM19.275 15C19.275 14.5858 18.9392 14.25 18.525 14.25C18.1108 14.25 17.775 14.5858 17.775 15H19.275ZM11.1086 15.5387C10.8539 15.8653 10.9121 16.3366 11.2387 16.5914C11.5653 16.8461 12.0366 16.7879 12.2914 16.4613L11.1086 15.5387ZM16.1914 11.4613C16.4461 11.1347 16.3879 10.6634 16.0613 10.4086C15.7347 10.1539 15.2634 10.2121 15.0086 10.5387L16.1914 11.4613ZM11.1086 16.4613C11.3634 16.7879 11.8347 16.8461 12.1613 16.5914C12.4879 16.3366 12.5461 15.8653 12.2914 15.5387L11.1086 16.4613ZM8.39138 10.5387C8.13662 10.2121 7.66533 10.1539 7.33873 10.4086C7.01212 10.6634 6.95387 11.1347 7.20862 11.4613L8.39138 10.5387ZM10.95 16C10.95 16.4142 11.2858 16.75 11.7 16.75C12.1142 16.75 12.45 16.4142 12.45 16H10.95ZM12.45 5C12.45 4.58579 12.1142 4.25 11.7 4.25C11.2858 4.25 10.95 4.58579 10.95 5H12.45ZM4.125 15V16H5.625V15H4.125ZM4.125 16C4.125 18.0531 5.75257 19.75 7.8 19.75V18.25C6.61657 18.25 5.625 17.2607 5.625 16H4.125ZM7.8 19.75H15.6V18.25H7.8V19.75ZM15.6 19.75C17.6474 19.75 19.275 18.0531 19.275 16H17.775C17.775 17.2607 16.7834 18.25 15.6 18.25V19.75ZM19.275 16V15H17.775V16H19.275ZM12.2914 16.4613L16.1914 11.4613L15.0086 10.5387L11.1086 15.5387L12.2914 16.4613ZM12.2914 15.5387L8.39138 10.5387L7.20862 11.4613L11.1086 16.4613L12.2914 15.5387ZM12.45 16V5H10.95V16H12.45Z" fill="#000000" />
          </svg>
        </div>
      </div>
      <div className="gap-1 d-flex flex-wrap align-items-center">
        <div>{elementStatus.mapText.header}：</div>
        {tags.map((d) => (
          <div
            className="fp-input-tag shadow text-small"
            style={{ "--cat": elementStatus.colors(d) }}
            onClick={() => {
              setSearchCondition((prev) => ({ ...prev, tag: d }));
              setElementStatus((prev) => ({ ...prev, boothInfo: false }));
            }}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
};

const Wall = ({ d, drawPath }) => {
  return <path stroke="black" fill={d.fill} strokeWidth={d.strokeWidth} d={`M${d.x} ${d.y}${drawPath(d.p)}`} />;
};
const Pillar = ({ d }) => <rect x={d.x} y={d.y} width={d.w} height={d.h} fill="rgba(0, 0, 0, 0.2)" />;
const Text = ({ d }) => (
  <text textAnchor="middle" fontWeight="bold" fill={d.color} fontSize={400 * d.size} x={d.x} y={d.y}>
    {d.mapText}
  </text>
);
const Room = ({ d, i, size, elementStatus, handleBoothClick }) => {
  const fontSize = size * d.size;
  const lineHeight = fontSize * 1.2;
  const icon_l = 500;
  const opacity = d.type === "room" && elementStatus.boothInfo && elementStatus.boothInfoData.id == d.id ? 1 : d.opacity;
  return (
    <g className={`${d.type} ${opacity === 1 ? "active" : ""}`} transform={`translate(${d.x},${d.y})`} onClick={d.type === "room" ? () => handleBoothClick(d) : null}>
      <rect stroke="black" strokeWidth={d.bd ? 10 : 0} fill={d.text.length === 0 || d.type === "icon" ? "none" : "#f1f1f1"} fillOpacity={d.opacity} width={d.w} height={d.h} />
      <g transform={`translate(${d.w / 2},${d.h / 2 - ((d.text.length - 1) * lineHeight) / 2})`} fontSize={fontSize}>
        {d.text.map((t, j) => (
          <text key={`text-${i}-${j}`} textAnchor="middle" fontWeight="bold" fill="black" fillOpacity={d.opacity} y={j * lineHeight}>
            {t}
          </text>
        ))}
      </g>
      <clipPath id={`${d.type}-${d.floor}-${i}`}>
        <rect className="icon" width={icon_l} height={icon_l} x={(d.w - icon_l) / 2} y={(d.h - icon_l) / 2} />
      </clipPath>
      <image width={icon_l} height={icon_l} x={(d.w - icon_l) / 2} y={(d.h - icon_l) / 2} visibility={d.icon ? "visible" : "hidden"} clipPath={`url(#icon-${d.floor}-${i})`} xlinkHref={["escalator_up", "escalator_down", "escalator_up_down_black", "escalator_up_down_red", "elevator", "toilet", "arrow_up", "first_aid"].includes(d.icon) ? icon_base64[d.icon] : d.icon ? d.icon : ""} opacity={d.opacity} />
    </g>
  );
};
const BoothText = ({ t, j, lineHeight, opacity, boothWidth }) => {
  const textRef = useRef();
  const [text, setText] = useState(t);
  const getTextWidth = useCallback(() => {
    let self = textRef.current,
      textLength = self.getComputedTextLength(),
      txt = self.textContent;
    while (textLength > boothWidth && txt.length > 0) {
      txt = txt.slice(0, -1);
      self.textContent = txt + "\u2026";
      textLength = self.getComputedTextLength();
    }
    return txt;
  });
  useEffect(() => {
    setText(t);
  }, [t]);
  useEffect(() => {
    getTextWidth();
  }, [text]);
  return (
    <text key={`key-${j}`} ref={textRef} textAnchor="middle" fontWeight="bold" fill="black" fillOpacity={opacity} y={j * lineHeight}>
      {text}
    </text>
  );
};

const Booth = ({ d, size, elementStatus, handleBoothClick, drawPath }) => {
  const fontSize = size * d.size;
  const lineHeight = fontSize * 1.2;
  const opacity = elementStatus.boothInfo && elementStatus.boothInfoData.id == d.id ? 1 : d.opacity;
  return (
    <g key={d.id} id={d.id} className={`booth ${opacity === 1 ? "active" : ""}`} transform={`translate(${d.x},${d.y})`} onClick={() => handleBoothClick(d)}>
      <path stroke={"black"} fill={elementStatus.colors(d.cat)} strokeWidth={1} fillOpacity={opacity} d={`M0 0${drawPath(d.p)}`} />;
      <g transform={`translate(${d.w / 2},${d.h / 2 - ((d.text.length - 1) * lineHeight) / 2})`} fontSize={fontSize}>
        {d.text.map((t, j) => (
          <BoothText t={t} j={j} lineHeight={lineHeight} opacity={opacity} boothWidth={d.w} />
        ))}
      </g>
      <text className="booth-id" fill="black" fillOpacity={opacity} fontSize={size * 0.3} x={20} y={d.h - 20}>
        {d.id}
      </text>
    </g>
  );
};

const Elements = ({ type, data, size, elementStatus, handleBoothClick }) => {
  const drawPath = (path) => path.map((p) => (p.node === "L" ? `${p.node}${p.x} ${p.y}` : `${p.node}${p.x1} ${p.y1} ${p.x2} ${p.y2} ${p.x} ${p.y}`)).join("") + "Z";
  const elementActions = {
    wall: (d, i) => <Wall d={d} drawPath={drawPath} />,
    pillar: (d, i) => <Pillar d={d} />,
    text: (d, i) => <Text d={d} />,
    room: (d, i) => <Room d={d} i={i} size={size} elementStatus={elementStatus} handleBoothClick={handleBoothClick} />,
    icon: (d, i) => <Room d={d} i={i} size={size} />,
    booth: (d, i) => <Booth d={d} size={size} elementStatus={elementStatus} handleBoothClick={handleBoothClick} drawPath={drawPath} />,
  };
  return <g className={`${type}-g`}>{data.filter((d) => d.type == type).map((d, i) => elementActions[type](d, i))}</g>;
};
const Floormap = ({ data, elementStatus, setElementStatus, handleBoothInfo, searchCondition, setSearchCondition, handleSearchChange, graphRef, svgRef, zoomCalculator, dragCalculator, defaultViewbox, animation }) => {
  const [viewBox, setViewBox] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const handleStart = (e) => {
    let distance = (distance = e.touches ? e.touches[0].clientX + e.touches[0].clientY : e.clientX + e.clientY);
    setElementStatus((prev) => ({ ...prev, test: true, dragStatus: { ...prev.dragStatus, moving: true }, distance: distance }));
  };
  const handleEnd = (e) => {
    let distance = (distance = e.changedTouches ? e.changedTouches[0].clientX + e.changedTouches[0].clientY : e.clientX + e.clientY);
    return setElementStatus((prev) => ({ ...prev, test: false, dragStatus: { ...prev.dragStatus, moving: false, previousTouch: null, previousTouchLength: null }, distance: distance - prev.distance }));
  };
  const handleTouchDragZoom = (e) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setElementStatus((prev) => {
        if (prev.dragStatus.previousTouch) dragCalculator(touch.clientX - prev.dragStatus.previousTouch.clientX, touch.clientY - prev.dragStatus.previousTouch.clientY);
        return { ...prev, dragStatus: { ...prev.dragStatus, previousTouch: touch, previousTouchLength: e.touches.length } };
      });
    } else {
      if (elementStatus.dragStatus.previousTouchLength && elementStatus.dragStatus.previousTouchLength !== e.touches.length) {
        handleEnd(e);
        return;
      }
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const x = (touch1.clientX + touch2.clientX) / 2;
      const y = (touch1.clientY + touch2.clientY) / 2;
      const d = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
      setElementStatus((prev) => ({ ...prev, dragStatus: { ...prev.dragStatus, previousTouch: d } }));
      if (elementStatus.dragStatus.previousTouch) zoomCalculator(x, y, d / elementStatus.dragStatus.previousTouch);
    }
  };
  const handleMouseDrag = ({ movementX, movementY }) => dragCalculator(movementX, movementY);
  const handleWheelZoom = ({ clientX, clientY, deltaY }) => {
    let r = deltaY > 0 ? 0.95 : deltaY < 0 ? 1.05 : 1;
    zoomCalculator(clientX, clientY, r);
  };
  const handleBoothClick = (d) => {
    if (elementStatus.distance !== 0) return;
    if (elementStatus.boothInfo && elementStatus.boothInfoData.id == d.id) {
      setElementStatus((prev) => ({ ...prev, boothInfo: false }));
    } else {
      handleBoothInfo(d);
    }
  };
  useEffect(() => setViewBox({ x1: 0, y1: 0, x2: elementStatus.realSize.w, y2: elementStatus.realSize.h }), [elementStatus.realSize]);
  return (
    <div className="fp-floormap d-flex align-items-center" style={{ height: elementStatus.height + elementStatus.tagsHeight }}>
      <Selector searchCondition={searchCondition} setSearchCondition={setSearchCondition} handleSearchChange={handleSearchChange} graphRef={graphRef} zoomCalculator={zoomCalculator} defaultViewbox={defaultViewbox} animation={animation} />
      <div className={`fp-viewBox ${elementStatus.dragStatus.moving ? "moving" : ""}`} ref={graphRef} onWheel={handleWheelZoom} onMouseDown={handleStart} onMouseUp={handleEnd} onMouseLeave={handleEnd} onMouseMove={handleMouseDrag} onTouchStart={handleStart} onTouchEnd={handleEnd} onTouchCancel={handleEnd} onTouchMove={handleTouchDragZoom}>
        <svg id="floormap" className={elementStatus.boothInfo ? "active" : ""} ref={svgRef} style={{ translate: `${elementStatus.zoom.x + elementStatus.dragStatus.x}px ${elementStatus.zoom.y + elementStatus.dragStatus.y}px`, scale: `${elementStatus.zoom.scale}`, backgroundColor: "#f1f1f1" }} width={elementStatus.width} height={elementStatus.height} viewBox={`${viewBox.x1} ${viewBox.y1} ${viewBox.x2} ${viewBox.y2}`} xmlns="http://www.w3.org/2000/svg">
          <Elements type="wall" data={data} />
          <Elements type="text" data={data} />
          <Elements type="room" data={data} size={200} elementStatus={elementStatus} handleBoothClick={handleBoothClick} />
          <Elements type="icon" data={data} size={200} />
          <Elements type="booth" data={data} size={250} elementStatus={elementStatus} handleBoothClick={handleBoothClick} />
        </svg>
      </div>
    </div>
  );
};

const FilterIcon = () => {
  return (
    <>
      <span />
      <svg width="100%" height="100%" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs>
          <path id="filter-bar" d="M0 0H350A20 20 90 1 1 350 40H0A20 20 90 1 1 0 0" />
        </defs>
        <use xlinkHref="#filter-bar" x={75} y={100} />
        <use xlinkHref="#filter-bar" x={75} y={230} />
        <use xlinkHref="#filter-bar" x={75} y={360} />
      </svg>
    </>
  );
};

const Search = ({ searchCondition, setSearchCondition, elementStatus, setElementStatus, handleSearchChange }) => {
  const searched = searchCondition.string.length === 0 && searchCondition.tag.length === 0;
  return (
    <div className="fp-search d-flex align-items-center justify-content-center">
      <div className={`fp-filter px-1 ${elementStatus.advanced ? "active" : ""}`} onClick={() => setElementStatus((prev) => ({ ...prev, advanced: !prev.advanced }))}>
        <FilterIcon />
      </div>
      <div className="fp-input d-flex flex-wrap align-items-center px-1">
        {searchCondition.tag.length !== 0 && (
          <div className="fp-input-tag shadow text-small" title={elementStatus.mapText.remove} onClick={() => setSearchCondition((prev) => ({ ...prev, tag: "" }))} style={{ "--cat": elementStatus.colors(searchCondition.tag) }}>
            {searchCondition.tag}
          </div>
        )}
        <input className="fp-input-text d-block text-large" name="search" type="text" value={searchCondition.string} onChange={handleSearchChange} placeholder={elementStatus.mapText.searchPlaceholder} />
      </div>
      <div
        className={`fp-toggle d-flex align-items-center justify-content-center ${searched ? "" : "active"}`}
        title={searched ? "" : elementStatus.mapText.clear}
        onClick={() => {
          if (elementStatus.sidebar) setSearchCondition((prev) => ({ ...prev, string: "", tag: "" }));
        }}
      >
        <span />
      </div>
    </div>
  );
};

const Category = ({ title, data, col, setSearchCondition, setElementStatus }) => {
  const sum = data.reduce((acc, d) => {
    const key = d[col];
    acc[key] ? acc[key]++ : (acc[key] = 1);
    return acc;
  }, {});
  return (
    <div className="py-3 my-3">
      <div className="text-x-large text-bold px-2">{title}</div>
      {Object.keys(sum)
        .filter((d) => !["false", ""].includes(d))
        .map((d) => (
          <div
            key={`${title}-${d}`}
            className="fp-category px-4 py-1"
            onClick={() => {
              setSearchCondition((prev) => ({ ...prev, tag: d }));
              setElementStatus((prev) => ({ ...prev, advanced: false }));
            }}
          >
            {d} ({sum[d]})
          </div>
        ))}
    </div>
  );
};

const Advanced = ({ data, setElementStatus, setSearchCondition, elementStatus }) => {
  return (
    <div className={`fp-advanced py-5 ${elementStatus.advanced ? "active" : ""}`}>
      {[
        { title: "展區", col: "cat" },
        { title: "主題", col: "topic" },
      ].map((d) => (
        <Category key={d.title} title={d.title} data={data} col={d.col} setSearchCondition={setSearchCondition} setElementStatus={setElementStatus} />
      ))}
    </div>
  );
};

const Result = ({ d, elementStatus, handleBoothInfo, svgRef, graphRef, zoomCalculator, animation, dragCalculator }) => {
  const isBooth = d.type === "booth";
  const id = isBooth ? `${d.id}-${d.org}` : `${d.text.join("")}-${d.floor}`;
  const bg = isBooth ? elementStatus.colors(d.cat) : "#acacac";
  const name = isBooth ? d.org : d.note;
  const loc = isBooth ? `${d.id} / ${d.floor}F` : `${d.floor}F`;
  const handleResultClick = () => {
    if (!elementStatus.sidebar) return;
    handleBoothInfo(d);
    animation();
    // 定位選取攤位中心點至地圖中心點
    const svgPoint = svgRef.current.createSVGPoint();
    svgPoint.x = d.x + d.w / 2;
    svgPoint.y = d.y + d.h / 2;
    const CTM = svgRef.current.getScreenCTM();
    const transformedPoint = svgPoint.matrixTransform(CTM);
    const { offsetLeft: x, offsetTop: y, offsetWidth: w, offsetHeight: h } = graphRef.current;
    const center = { x: w / 2 + x, y: elementStatus.smallScreen ? (elementStatus.sidebarWidth + elementStatus.tagsHeight) / 2 : h / 2 + y };
    zoomCalculator(transformedPoint.x, transformedPoint.y, 1.5, 1.5);
    dragCalculator(center.x - transformedPoint.x, center.y - transformedPoint.y, true);
  };
  return (
    <div id={id} className="fp-result-item d-flex align-items-center px-2 py-1" style={{ "--cat": bg }} onClick={handleResultClick}>
      <div className="fp-result-item-name text-large">{name}</div>
      <div className="fp-result-item-loc text-small">{loc}</div>
    </div>
  );
};

const ResultList = ({ data, elementStatus, handleBoothInfo, svgRef, graphRef, zoomCalculator, animation, defaultViewbox, dragCalculator }) => {
  return (
    <div className="fp-result pb-5">
      {data
        .filter((d) => d.opacity > 0.1 && d.text.length !== 0)
        .map((d) => (
          <Result d={d} elementStatus={elementStatus} handleBoothInfo={handleBoothInfo} svgRef={svgRef} graphRef={graphRef} zoomCalculator={zoomCalculator} dragCalculator={dragCalculator} animation={animation} defaultViewbox={defaultViewbox} />
        ))}
    </div>
  );
};

const Event = ({ timeList, title, topic, active }) => {
  const [showEventInfo, setShowEventInfo] = useState(false);
  const format = (datetime) => (Array(2).join("0") + datetime).slice(-2);
  return (
    <div className={`fp-event my-1 p-1 ${active ? "active" : ""}`} onClick={() => setShowEventInfo(!showEventInfo)}>
      <span style={{ "--i": 0 }}></span>
      <span style={{ "--i": 2 }}></span>
      <div className="text-small">{topic}</div>
      <div>{title}</div>
      <div className={`${timeList.length > 1 ? "time-list" : ""} ${showEventInfo ? "active" : ""}`}>
        {timeList.map((time) => {
          const startDate = `${format(time.start.getMonth() + 1)}/${format(time.start.getDate())}`;
          const startTime = `${format(time.start.getHours())}:${format(time.start.getMinutes())}`;
          const endDate = `${format(time.end.getMonth() + 1)}/${format(time.end.getDate())}`;
          const endTime = `${format(time.end.getHours())}:${format(time.end.getMinutes())}`;
          const timeString = startDate == endDate ? `${startDate} ${startTime}-${endTime}` : `${startDate}-${endDate} ${startTime}-${endTime}`;
          return <div className="text-small">{timeString}</div>;
        })}
      </div>
    </div>
  );
};

const BoothInfoDetail = ({ data, setSearchCondition, elementStatus, setElementStatus }) => {
  const {
    boothInfoData: { type, text, org, id, floor, cat, topic, tag, info, event, note, corpId },
  } = elementStatus;
  const isBooth = type === "booth";
  const loc = isBooth ? [cat, topic] : [note];
  const tags = Object.keys(elementStatus.boothInfoData).length === 0 ? [] : [...loc, ...tag].filter((d) => d !== "");
  const booth = data.find((d) => d.id == id);
  const corps = booth && booth.corps ? booth.corps : [];
  const events = event.filter((d) => d.title !== "");
  const handleTagClick = (value) => {
    setSearchCondition((prev) => ({ ...prev, tag: value, string: "" }));
    setElementStatus((prev) => ({ ...prev, boothInfo: false }));
  };
  const handleCorpClick = (corpId) => setElementStatus((prev) => ({ ...prev, boothInfoData: data.find((d) => d.corpId == corpId) }));
  return (
    <div className="fp-info pb-5">
      <div className="fp-info-item d-flex align-items-center px-2 py-1">
        <div className="fp-result-item-name text-x-large text-bold">{text.join("")}</div>
        <div className="fp-result-item-loc text-small">{isBooth ? `${id} / ${floor}F` : `${floor}F`}</div>
      </div>
      <div className="p-2 text-large">{org}</div>
      <div className="fp-booth-tags d-flex flex-wrap p-2">
        {tags.map((tag) => (
          <div className="fp-input-tag shadow text-small" style={{ "--cat": elementStatus.colors(tag) }} onClick={() => handleTagClick(tag)}>
            {tag}
          </div>
        ))}
      </div>
      {corps.length > 1 && (
        <div className="p-2">
          <div className="my-1 text-large">{elementStatus.mapText.exhibitor}</div>
          <div className="my-1 fp-booth-tags d-flex flex-wrap">
            {corps.map((d) => (
              <div className="fp-input-tag shadow text-small" style={{ "--cat": d.corpId == corpId ? "rgb(0, 0, 128, 0.3)" : elementStatus.colors("") }} onClick={() => handleCorpClick(d.corpId)}>
                {d.org}
              </div>
            ))}
          </div>
        </div>
      )}
      {info && (
        <div className="p-2 text-small">
          {info.split("\n").map((d) => (
            <div>{d}</div>
          ))}
        </div>
      )}
      {events.length > 0 && (
        <div className="p-2">
          <div className="my-1 text-large">{elementStatus.mapText.activity}</div>
          <div className="my-1">
            {events.map((d) => (
              <Event {...d} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const BoothInfo = ({ data, setSearchCondition, elementStatus, setElementStatus }) => {
  return (
    <div className={`fp-booth-info ${elementStatus.boothInfo ? "active" : ""}`}>
      <div className="fp-back-btn" onClick={() => setElementStatus((prev) => ({ ...prev, boothInfo: false }))}>
        <div className="fp-back d-flex align-items-center justify-content-center mx-auto active">
          <span />
        </div>
      </div>
      {elementStatus.boothInfo && elementStatus.boothInfoData && <BoothInfoDetail data={data} setSearchCondition={setSearchCondition} elementStatus={elementStatus} setElementStatus={setElementStatus} />}
    </div>
  );
};

const Sidebar = ({ data, elementStatus, setElementStatus, searchCondition, setSearchCondition, handleSearchChange, handleBoothInfo, svgRef, graphRef, zoomCalculator, dragCalculator, defaultViewbox, animation }) => {
  const handleSidear = () => {
    if (elementStatus.sidebar) return;
    setElementStatus((prev) => ({ ...prev, sidebar: !prev.sidebar }));
  };
  return (
    <div className={`fp-sidebar shadow ${elementStatus.sidebar ? "active" : ""}`} onClick={handleSidear}>
      <Search searchCondition={searchCondition} setSearchCondition={setSearchCondition} elementStatus={elementStatus} setElementStatus={setElementStatus} handleSearchChange={handleSearchChange} />
      {elementStatus.sidebar || elementStatus.smallScreen ? (
        <>
          <Advanced data={data} setSearchCondition={setSearchCondition} elementStatus={elementStatus} setElementStatus={setElementStatus} />
          <ResultList data={data.filter((d) => d.sidebar && d.text.length > 0)} elementStatus={elementStatus} handleBoothInfo={handleBoothInfo} svgRef={svgRef} graphRef={graphRef} zoomCalculator={zoomCalculator} dragCalculator={dragCalculator} animation={animation} defaultViewbox={defaultViewbox} />
          <BoothInfo data={data} setSearchCondition={setSearchCondition} elementStatus={elementStatus} setElementStatus={setElementStatus} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

const Selector = ({ searchCondition, setSearchCondition, handleSearchChange, graphRef, zoomCalculator, defaultViewbox, animation }) => {
  const handleClickZoom = (r) => {
    animation();
    const { offsetLeft: x, offsetTop: y, offsetWidth: w, offsetHeight: h } = graphRef.current;
    zoomCalculator(w / 2 + x, h / 2 + y, r);
  };
  const handleLangChange = () => {
    setSearchCondition((prev) => ({ ...prev, lang: prev.lang === "tc" ? "en" : "tc", string: "", tag: "" }));
  };
  return (
    <>
      <div className="fp-select-floor shadow" onChange={handleSearchChange}>
        {[4, 1].map((d) => (
          <label key={`floor-${d}`}>
            <input type="radio" name="floor" value={d} checked={searchCondition.floor == d} onChange={handleSearchChange} />
            <span className="d-flex justify-content-center align-items-center text-small">{d}F</span>
          </label>
        ))}
      </div>
      <div className="fp-select-lang shadow">
        <label>
          <input type="checkbox" name="lang" value={searchCondition.lang === "tc" ? "en" : "tc"} checked={searchCondition.lang === "tc"} onChange={handleLangChange} />
          <span className="d-flex justify-content-center align-items-center text-small">{searchCondition.lang === "tc" ? "EN" : "中"}</span>
        </label>
      </div>
      <div className="fp-zoom">
        <span className="d-flex justify-content-center align-items-center text-xx-large shadow" onClick={() => handleClickZoom(1.3)}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6V18M6 12H18" stroke="black" strokeWidth="2" />
          </svg>
        </span>
        <span className="d-flex justify-content-center align-items-center text-xx-large shadow" onClick={defaultViewbox}>
          <svg width="26" height="26" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0,512) scale(0.1,-0.1)" fill="#000000" stroke="none">
              <path d="M555 4673 c-44 -23 -84 -63 -106 -105 -18 -35 -19 -64 -19 -513 0 -407 2 -481 15 -513 64 -152 273 -172 370 -34 l30 44 3 206 3 206 577 -576 c317 -317 591 -583 608 -592 87 -43 175 -28 245 43 71 70 86 158 43 245 -9 17 -275 291 -592 608 l-576 577 206 3 206 3 44 30 c138 97 118 306 -34 370 -56 23 -978 22 -1023 -2z" />
              <path d="M3540 4674 c-167 -72 -165 -318 2 -389 29 -12 79 -15 230 -15 l193 0 -577 -577 c-317 -318 -583 -592 -592 -609 -43 -87 -28 -175 43 -245 70 -71 158 -86 245 -43 17 9 291 275 609 592 l577 577 0 -193 c0 -151 3 -201 15 -230 64 -152 273 -172 370 -34 l30 44 3 489 c2 437 1 492 -14 521 -23 46 -63 87 -106 109 -35 18 -64 19 -515 19 -404 -1 -483 -3 -513 -16z" />
              <path d="M2065 2335 c-22 -8 -42 -15 -45 -15 -2 0 -267 -262 -587 -582 l-583 -583 0 193 c0 151 -3 201 -15 230 -71 169 -319 169 -390 0 -13 -32 -15 -106 -15 -513 0 -418 2 -480 16 -508 23 -45 63 -86 107 -108 36 -19 59 -19 526 -17 l489 3 44 30 c138 97 118 306 -34 370 -29 12 -79 15 -230 15 l-193 0 577 578 c317 317 583 591 591 607 42 84 25 184 -40 246 -21 20 -47 41 -59 47 -38 20 -117 23 -159 7z" />
              <path d="M2915 2336 c-54 -20 -121 -92 -135 -147 -13 -48 -7 -106 16 -153 9 -17 275 -291 592 -608 l577 -578 -193 0 c-151 0 -201 -3 -230 -15 -169 -71 -169 -319 0 -390 32 -13 106 -15 513 -15 449 0 478 1 513 19 43 22 83 63 106 108 14 28 16 90 16 508 0 407 -2 481 -15 513 -71 169 -319 169 -390 0 -12 -29 -15 -79 -15 -230 l0 -193 -577 577 c-318 317 -593 584 -611 593 -47 23 -120 28 -167 11z" />
            </g>
          </svg>
        </span>
        <span className="d-flex justify-content-center align-items-center text-xx-large shadow" onClick={() => handleClickZoom(0.7)}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12H18" stroke="black" strokeWidth="2" />
          </svg>
        </span>
      </div>
    </>
  );
};

const Loading = () => (
  <div className="fp-loading">
    <div className="loading">
      <span>
        <span style={{ "--i": 0 }}>L</span>
        <span style={{ "--i": 1 }}>o</span>
        <span style={{ "--i": 2 }}>a</span>
        <span style={{ "--i": 3 }}>d</span>
        <span style={{ "--i": 4 }}>i</span>
        <span style={{ "--i": 5 }}>n</span>
        <span style={{ "--i": 6 }}>g</span>
      </span>
    </div>
  </div>
);

const MainArea = () => {
  const mapText = {
    categories: {
      tc: ["全齡健康展區", "年度主題館", "醫療機構展區", "智慧醫療展區", "精準醫療展區", "活動進行中"],
      en: ["Consumer Health Products", "Featured Pavilions", "Medical Institutes & Hospitals", "Medical Devices & Equipment", "Diagnostics, Laboratory Equipment & Services", "Event in progress"],
    },
    link: { tc: "zh", en: "en" },
    title: { tc: "展場平面圖", en: "Floor Plan" },
    event: { tc: "活動進行中", en: "Event in progress" },
    header: { tc: "重點必看", en: "Highlights" },
    headerTags: { tc: ["重要活動", "健康大檢測", "醫師力大挑戰"], en: ["Key Events"] },
    download: { tc: "下載", en: "Download" },
    searchPlaceholder: { tc: "關鍵字搜索", en: "Search" },
    remove: { tc: "清除標籤", en: "Clear all" },
    clear: { tc: "清除搜索條件", en: "Clear search" },
    exhibitor: { tc: "聯展單位", en: "Co-exhibitors" },
    activity: { tc: "相關活動", en: "Events" },
  };
  const types = ["booth", "room"];
  const graphRef = useRef(null);
  const svgRef = useRef(null);
  const [floorData, setFloorData] = useState({ loaded: false, data: [] });
  const [searchCondition, setSearchCondition] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      string: params.get("string") || "",
      regex: params.get("regex") || new RegExp("", "i"),
      tag: params.get("tag") || "",
      floor: parseInt(params.get("floor")) || 1,
      lang: params.get("lang") || (/^zh/i.test(navigator.language) ? "tc" : "en"),
    };
  });
  const [elementStatus, setElementStatus] = useState(() => {
    const isMobile = /windows phone|android|iPad|iPhone|iPod/i.test(navigator.userAgent || window.opera);
    const tagsHeight = 80;
    const sidebarWidth = 40;
    return {
      test: null,
      inputTimer: null,
      load: false,
      isMobile: isMobile,
      width: window.innerHeight - sidebarWidth,
      height: window.innerHeight - tagsHeight,
      colors: d3.scaleOrdinal().domain(mapText.categories[searchCondition.lang]).range(["rgba(237,125,49,0.6)", "rgba(153,204,255,1)", "rgba(255,255,0,0.6)", "rgba(0,112,192,0.6)", "rgba(112,48,160,0.6)", "rgb(128, 0, 75, 0.2)"]).unknown("rgba(255,255,255)"),
      boothInfoData: {},
      smallScreen: false,
      sidebar: true,
      advanced: false,
      boothInfo: false,
      realSize: { w: 19830, h: 16950 },
      tagsHeight: tagsHeight,
      sidebarWidth: sidebarWidth,
      dragStatus: { moving: false, previousTouch: null, previousTouchLength: null, x: 0, y: 0 },
      distance: 0,
      zoom: { scale: 0.9, x: 0, y: 0 },
      mapText: {
        link: mapText.link[searchCondition.lang],
        title: mapText.title[searchCondition.lang],
        event: mapText.event[searchCondition.lang],
        header: mapText.header[searchCondition.lang],
        headerTags: mapText.headerTags[searchCondition.lang],
        download: mapText.download[searchCondition.lang],
        searchPlaceholder: mapText.searchPlaceholder[searchCondition.lang],
        remove: mapText.remove[searchCondition.lang],
        clear: mapText.clear[searchCondition.lang],
        exhibitor: mapText.exhibitor[searchCondition.lang],
        activity: mapText.activity[searchCondition.lang],
      },
    };
  });
  const memoFloorData = useMemo(
    () =>
      floorData.data.map((d, i) => {
        let tags = d.tag ? d.tag[searchCondition.lang] : [],
          eventTime = [];
        if (d.event) {
          const now = new Date();
          eventTime = d.event.map((e) => ({
            timeList: e.timeList.map((time) => ({ start: new Date(time.start), end: new Date(time.end) })),
            title: e.title[searchCondition.lang],
            topic: e.topic[searchCondition.lang],
            active: e.timeList.some((time) => {
              const start = new Date(time.start);
              const end = new Date(time.end);
              const nowDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
              const startDate = new Date(`${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`);
              const endDate = new Date(`${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`);
              const startTime = new Date(`${nowDate} ${start.getHours()}:${start.getMinutes()}:${start.getSeconds()}`);
              const endTime = new Date(`${nowDate} ${end.getHours()}:${end.getMinutes()}:${end.getSeconds()}`);
              return startDate < now && now < endDate && startTime < now && now < endTime && e.title[searchCondition.lang].length > 0;
            }),
          }));
          tags = eventTime.some((e) => e.active) ? tags.concat([mapText.event[searchCondition.lang]]) : tags;
        }
        return { ...d, id: d.id ? d.id : `${d.type}-${d.floor}-${i}`, cat: d.cat ? d.cat[searchCondition.lang] : false, topic: d.topic ? d.topic[searchCondition.lang] : false, tag: tags, mapText: d.mapText ? d.mapText[searchCondition.lang] : false, text: d.text ? d.text[searchCondition.lang] : [], size: d.size ? d.size[searchCondition.lang] : 1, note: d.note ? d.note[searchCondition.lang] : false, event: eventTime, corps: d.corps ? d.corps.map((corp, i) => ({ corpId: `${d.id}-${i}`, org: corp.org[searchCondition.lang], info: corp.info[searchCondition.lang] })) : false, draw: true };
      }),
    [searchCondition.lang, floorData.data]
  );
  const filterFloorData = useMemo(() => {
    const res = [];
    memoFloorData.forEach((d) => {
      const corps = d.corps ? d.corps.map((corp) => corp.org) : [];
      const infos = d.corps ? d.corps.map((corp) => corp.info) : [];
      const targets = [d.id, d.text.join(""), d.note, d.cat, d.topic, d.tag];
      const isType = types.includes(d.type);
      const hasTag = isType && searchCondition.tag === "" ? true : [d.id, d.cat, d.topic, d.note, ...d.tag].includes(searchCondition.tag);
      let hasText = isType && searchCondition.regex.test([...targets, ...infos, ...corps].join(" ").replace(/\r|\n/g, "").replace("臺", "台"));
      const opacity = (hasText && hasTag) || d.type === "icon" ? 0.8 : 0.1;
      if (d.corps) {
        d.corps.forEach((corp, i) => {
          hasText = searchCondition.regex.test([...targets, corp.info, corp.org].join(" ").replace(/\r|\n/g, "").replace("臺", "台"));
          res.push({ ...d, ...corp, opacity: opacity, draw: i === 0, sidebar: hasText && hasTag });
        });
      } else {
        res.push({ ...d, opacity: opacity, draw: true, sidebar: isType });
      }
    });
    return res;
  }, [searchCondition.regex, searchCondition.tag, searchCondition.floor, searchCondition.lang, memoFloorData]);

  const searchActions = (name, value) => {
    switch (name) {
      case "search":
        clearTimeout(elementStatus.inputTimer);
        const inputTimer = setTimeout(() => setElementStatus((prev) => ({ ...prev, inputTimer: null })), 500);
        setSearchCondition((prev) => ({ ...prev, string: value }));
        setElementStatus((prev) => ({ ...prev, advanced: false, inputTimer: inputTimer }));
        break;
      default:
        setSearchCondition((prev) => ({ ...prev, [name]: value }));
    }
  };
  const regexEscape = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const handleSearchChange = ({ target: { name, value } }) => searchActions(name, value);
  const handleResize = () => {
    setTimeout(() => {
      setElementStatus((prev) => {
        const smallScreen = window.innerWidth < 768;
        const sidebar = prev.load ? (smallScreen ? prev.sidebar : !smallScreen) : smallScreen ? false : true;
        const { innerWidth: width, innerHeight: height } = window;
        const sidebarWidth = smallScreen ? (sidebar ? height * 0.6 : height - 117) : sidebar ? 300 : 30;
        const tagsHeight = smallScreen ? 100 : 80;
        return { ...prev, width: smallScreen ? width : width - sidebarWidth, height: height - prev.tagsHeight, load: true, smallScreen: smallScreen, sidebar: sidebar, sidebarWidth: sidebarWidth, tagsHeight: tagsHeight };
      });
    }, 50);
  };

  const handleBoothInfo = (d) => {
    setElementStatus((prev) => ({ ...prev, boothInfo: true, boothInfoData: d }));
    setSearchCondition((prev) => ({ ...prev, floor: d.floor }));
  };
  const defaultViewbox = (animate = true) => {
    if (animate) animation();
    setElementStatus((prev) => ({ ...prev, dragStatus: { ...prev.dragStatus, x: 0, y: 0 }, zoom: { scale: 1, x: 0, y: 0 } }));
  };
  const zoomCalculator = (clientX, clientY, r, rMax = 10) => {
    const box = graphRef.current.getBoundingClientRect();
    setElementStatus((prev) => {
      let scale = prev.zoom.scale * r;
      scale = scale < 0.9 ? 0.9 : scale > rMax ? rMax : scale;
      let w = svgRef.current.clientWidth * prev.zoom.scale;
      let h = svgRef.current.clientHeight * prev.zoom.scale;
      let x = (graphRef.current.clientWidth - w) / 2 + prev.zoom.x + prev.dragStatus.x;
      let y = (graphRef.current.clientHeight - h) / 2 + prev.zoom.y + prev.dragStatus.y;
      let originX = clientX - box.x - x - w / 2;
      let originY = clientY - box.y - y - h / 2;
      let xNew = originX - (originX / prev.zoom.scale) * scale + prev.zoom.x;
      let yNew = originY - (originY / prev.zoom.scale) * scale + prev.zoom.y;
      return { ...prev, zoom: { scale: scale, x: xNew, y: yNew } };
    });
  };
  const dragCalculator = (x, y, force = false) => {
    if (elementStatus.dragStatus.moving || force) setElementStatus((prev) => ({ ...prev, dragStatus: { ...prev.dragStatus, x: prev.dragStatus.x + x, y: prev.dragStatus.y + y } }));
  };
  const animation = () => {
    svgRef.current.style.transition = "0.4s";
    setTimeout(() => (svgRef.current.style.transition = null), 400);
  };
  useEffect(() => {
    fetch("https://astalsi401.github.io/warehouse/show/floormap.json")
      .then((res) => res.json())
      .then((data) => {
        setFloorData((prev) => ({ data: data, loaded: !prev.loaded }));
      });
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => handleResize, [elementStatus.sidebar, elementStatus.smallScreen]);
  useEffect(() => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    for (const [k, v] of Object.entries(searchCondition)) {
      if (k !== "regex") v.length === 0 ? searchParams.delete(k) : searchParams.set(k, v);
    }
    url.search = searchParams.toString();
    history.pushState(null, "", url.href);
  }, [searchCondition]);
  useEffect(() => {
    setElementStatus((prev) => ({
      ...prev,
      boothInfoData: Object.keys(prev.boothInfoData).length === 0 ? {} : filterFloorData.find((d) => d.id == prev.boothInfoData.id && d.corpId == prev.boothInfoData.corpId),
      colors: prev.colors.domain(mapText.categories[searchCondition.lang]),
      mapText: {
        link: mapText.link[searchCondition.lang],
        title: mapText.title[searchCondition.lang],
        event: mapText.event[searchCondition.lang],
        header: mapText.header[searchCondition.lang],
        headerTags: mapText.headerTags[searchCondition.lang],
        download: mapText.download[searchCondition.lang],
        searchPlaceholder: mapText.searchPlaceholder[searchCondition.lang],
        remove: mapText.remove[searchCondition.lang],
        clear: mapText.clear[searchCondition.lang],
        exhibitor: mapText.exhibitor[searchCondition.lang],
        activity: mapText.activity[searchCondition.lang],
      },
    }));
    document.title = mapText.title[searchCondition.lang];
  }, [searchCondition.lang]);
  useEffect(() => {
    if (elementStatus.inputTimer) return;
    setSearchCondition((prev) => ({
      ...prev,
      regex: new RegExp(
        regexEscape(prev.string.replace("臺", "台"))
          .split(" ")
          .filter((s) => s !== "")
          .map((s) => `(?=.*${s})`)
          .join(""),
        "i"
      ),
    }));
  }, [searchCondition.string, elementStatus.inputTimer]);
  if (!floorData.loaded) return <Loading />;
  return (
    <StrictMode>
      <div className="fp-main" style={{ "--sidebar-width": `${elementStatus.sidebarWidth}px`, "--tags-height": `${elementStatus.tagsHeight}px` }}>
        <Sidebar data={filterFloorData.filter((d) => types.includes(d.type))} elementStatus={elementStatus} setElementStatus={setElementStatus} searchCondition={searchCondition} setSearchCondition={setSearchCondition} handleSearchChange={handleSearchChange} handleBoothInfo={handleBoothInfo} svgRef={svgRef} graphRef={graphRef} zoomCalculator={zoomCalculator} dragCalculator={dragCalculator} defaultViewbox={defaultViewbox} animation={animation} />
        <div
          className="fp-graph d-flex align-items-center"
          onClick={() => {
            if (elementStatus.smallScreen) setElementStatus((prev) => ({ ...prev, sidebar: false }));
          }}
        >
          <Header elementStatus={elementStatus} setElementStatus={setElementStatus} searchCondition={searchCondition} setSearchCondition={setSearchCondition} defaultViewbox={defaultViewbox} />
          <Floormap data={filterFloorData.filter((d) => d.floor == searchCondition.floor && d.draw)} elementStatus={elementStatus} setElementStatus={setElementStatus} handleBoothInfo={handleBoothInfo} searchCondition={searchCondition} setSearchCondition={setSearchCondition} handleSearchChange={handleSearchChange} graphRef={graphRef} svgRef={svgRef} zoomCalculator={zoomCalculator} dragCalculator={dragCalculator} defaultViewbox={defaultViewbox} animation={animation} />
        </div>
      </div>
    </StrictMode>
  );
};
