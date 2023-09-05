const { useCallback, useState, useEffect, useLayoutEffect, useRef, useMemo, memo } = React;
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

const Wall = ({ d }) => {
  const drawPath = (path) => path.map((p) => (p.node === "L" ? `${p.node}${p.x} ${p.y}` : `${p.node}${p.x1} ${p.y1} ${p.x2} ${p.y2} ${p.x} ${p.y}`)).join("");
  return <path stroke="black" fill={d.fill} strokeWidth={d.strokeWidth} d={`M${d.x} ${d.y}${drawPath(d.p)}`} />;
};
const Pillar = ({ d }) => <rect x={d.x} y={d.y} width={d.w} height={d.h} fill="rgba(0, 0, 0, 0.2)" />;
const Text = ({ d }) => (
  <text textAnchor="middle" fontWeight="bold" fill={d.color} fontSize={400 * d.size} x={d.x} y={d.y}>
    {d.text}
  </text>
);
const Room = ({ d, i, size }) => {
  const fontSize = size * d.size;
  const lineHeight = fontSize * 1.2;
  const icon_l = 500;
  return (
    <g transform={`translate(${d.x},${d.y})`}>
      <rect stroke="black" strokeWidth={d.bd ? 10 : 0} fill="none" width={d.w} height={d.h} />
      <g transform={`translate(${d.w / 2},${d.h / 2 - ((d.text.length - 1) * lineHeight) / 2})`} fontSize={fontSize}>
        {d.text.map((t, j) => (
          <text key={`text-${i}-${j}`} textAnchor="middle" fontWeight="bold" fill="black" y={j * lineHeight}>
            {t}
          </text>
        ))}
      </g>
      <clipPath id={`icon-${d.floor}-${i}`}>
        <rect className="icon" width={icon_l} height={icon_l} x={(d.w - icon_l) / 2} y={(d.h - icon_l) / 2} />
      </clipPath>
      <image width={icon_l} height={icon_l} x={(d.w - icon_l) / 2} y={(d.h - icon_l) / 2} visibility={d.icon ? "visible" : "hidden"} clipPath={`url(#icon-${d.floor}-${i})`} xlinkHref={["escalator_up", "escalator_down", "escalator_up_down_black", "escalator_up_down_red", "elevator", "toilet", "arrow_up", "first_aid"].includes(d.icon) ? icon_base64[d.icon] : d.icon ? d.icon : ""} />
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

const Booth = ({ d, size, elementStatus, handleBoothInfo }) => {
  const fontSize = size * d.size;
  const lineHeight = fontSize * 1.2;
  return (
    <g key={d.id} id={d.id} className="booth" transform={`translate(${d.x},${d.y})`} onClick={() => handleBoothInfo(d)}>
      <rect stroke="black" strokeWidth={1} fill={elementStatus.colors(d.cat)} fillOpacity={d.opacity} width={d.w} height={d.h} />
      <g transform={`translate(${d.w / 2},${d.h / 2 - ((d.text.length - 1) * lineHeight) / 2})`} fontSize={fontSize}>
        {d.text.map((t, j) => (
          <BoothText t={t} j={j} lineHeight={lineHeight} opacity={d.opacity} boothWidth={d.w} />
        ))}
      </g>
      <text className="booth-id" fill="black" fillOpacity={d.opacity} fontSize={size * 0.3} x={20} y={d.h - 20}>
        {d.id}
      </text>
    </g>
  );
};

const Elements = ({ type, data, size, elementStatus, handleBoothInfo }) => {
  const elementActions = {
    wall: (d, i) => <Wall d={d} />,
    pillar: (d, i) => <Pillar d={d} />,
    text: (d, i) => <Text d={d} />,
    room: (d, i) => <Room d={d} i={i} size={size} />,
    booth: (d, i) => <Booth d={d} size={size} elementStatus={elementStatus} handleBoothInfo={handleBoothInfo} />,
  };
  return <g className={`${type}-g`}>{data.filter((d) => d.type == type).map((d, i) => elementActions[type](d, i))}</g>;
};
const Floormap = ({ data, sidebarWidth, tagsHeight, realSize, elementStatus, handleBoothInfo, searchCondition, handleSearchChange }) => {
  const [containerSize, setContainerSize] = useState({ width: realSize.w / 100, height: realSize.h / 100 });
  const [viewBox, setViewBox] = useState({ x1: 0, y1: 0, x2: realSize.w, y2: realSize.h });
  const [drugStatus, setDrugStatus] = useState({ moving: false, previousTouch: null });
  const [newSVGPoint, setNewSVGPoint] = useState(null);
  const [startSVGPoint, setStartSVGPoint] = useState(null);
  const graphRef = useRef(null);
  const svgRef = useRef(null);
  const handleStart = () => setDrugStatus((prev) => ({ ...prev, moving: true }));
  const handleEnd = () => setDrugStatus({ moving: false, previousTouch: null });
  const handleResize = () => {
    const width = graphRef.current.clientWidth - (elementStatus.isMobile ? 0 : sidebarWidth);
    const height = graphRef.current.clientHeight - tagsHeight;
    setContainerSize({ width: width, height: height });
  };
  const drugCalculator = (x1, y1, x2, y2) => {
    if (!drugStatus.moving) return;
    x1 -= sidebarWidth;
    y1 -= tagsHeight;
    let svgPoint = svgRef.current.createSVGPoint();
    svgPoint.x = x1;
    svgPoint.y = y1;
    let CTM = svgRef.current.getScreenCTM();
    setStartSVGPoint(svgPoint.matrixTransform(CTM.inverse()));
    svgPoint = svgRef.current.createSVGPoint();
    svgPoint.x = x1 + x2;
    svgPoint.y = y1 + y2;
    setNewSVGPoint(svgPoint);
  };
  const handleTouchDrugZoom = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setDrugStatus((prev) => ({ ...prev, previousTouch: touch }));
      if (!drugStatus.previousTouch) return;
      drugCalculator(touch.clientX, touch.clientY, touch.clientX - drugStatus.previousTouch.clientX, touch.clientY - drugStatus.previousTouch.clientY);
    } else {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const x = (touch1.clientX + touch2.clientX) / 2;
      const y = (touch1.clientY + touch2.clientY) / 2;
      const d = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
      setDrugStatus((prev) => ({ ...prev, previousTouch: d }));
      if (!drugStatus.previousTouch) return;
      zoomCalculator(x, y, drugStatus.previousTouch / d);
    }
  };
  const handleMouseDrug = ({ clientX, clientY, movementX, movementY }) => drugCalculator(clientX, clientY, movementX, movementY);
  const zoomCalculator = (x, y, r) => {
    let svgPoint = svgRef.current.createSVGPoint();
    svgPoint.x = x;
    svgPoint.y = y;
    setNewSVGPoint(svgPoint);
    let CTM = svgRef.current.getScreenCTM();
    setStartSVGPoint(svgPoint.matrixTransform(CTM.inverse()));
    setViewBox((prev) => ({ x1: prev.x1, y1: prev.y1, x2: prev.x2 * r, y2: prev.y2 * r }));
  };
  const handleWheelZoom = ({ clientX, clientY, deltaY }) => {
    let r = deltaY > 0 ? 0.95 : deltaY < 0 ? 1.05 : 1;
    zoomCalculator(clientX, clientY, r);
  };
  useLayoutEffect(() => {
    if (!startSVGPoint) return;
    let CTM = svgRef.current.getScreenCTM();
    let moveToSVGPoint = newSVGPoint.matrixTransform(CTM.inverse());
    let delta = { dx: startSVGPoint.x - moveToSVGPoint.x, dy: startSVGPoint.y - moveToSVGPoint.y };
    setViewBox((prev) => ({ ...prev, x1: prev.x1 + delta.dx, y1: prev.y1 + delta.dy }));
  }, [startSVGPoint]);
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [realSize, sidebarWidth]);
  return (
    <div className="fp-floormap d-flex align-items-center" ref={graphRef}>
      <Selector searchCondition={searchCondition} handleSearchChange={handleSearchChange} setViewBox={setViewBox} realSize={realSize} zoomCalculator={zoomCalculator} />
      <svg id="floormap" className={`mx-auto ${drugStatus.moving ? "moving" : ""}`} style={{ backgroundColor: "white" }} ref={svgRef} width={containerSize.width} height={containerSize.height} viewBox={`${viewBox.x1} ${viewBox.y1} ${viewBox.x2} ${viewBox.y2}`} onWheel={handleWheelZoom} onMouseDown={handleStart} onMouseUp={handleEnd} onMouseMove={handleMouseDrug} onTouchStart={handleStart} onTouchEnd={handleEnd} onTouchMove={handleTouchDrugZoom}>
        <Elements type="wall" data={data} />
        <Elements type="pillar" data={data} />
        <Elements type="text" data={data} />
        <Elements type="room" data={data} size={200} />
        <Elements type="booth" data={data} size={250} elementStatus={elementStatus} handleBoothInfo={handleBoothInfo} />
      </svg>
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
        <defs>
          <circle id="filter-dot" cx="0" cy="0" r="40" />
        </defs>
        <use xlinkHref="#filter-bar" x={75} y={100} />
        <use xlinkHref="#filter-bar" x={75} y={230} />
        <use xlinkHref="#filter-bar" x={75} y={360} />
        <use xlinkHref="#filter-dot" x={325} y={120} />
        <use xlinkHref="#filter-dot" x={165} y={250} />
        <use xlinkHref="#filter-dot" x={325} y={380} />
      </svg>
    </>
  );
};

const Search = ({ searchCondition, setSearchCondition, elementStatus, setElementStatus, handleSearchChange }) => {
  return (
    <div className="fp-search d-flex align-items-center justify-content-center">
      <div className={`fp-filter px-1 ${elementStatus.advanced ? "active" : ""}`} onClick={() => setElementStatus((prev) => ({ ...prev, advanced: !prev.advanced }))}>
        <FilterIcon />
      </div>
      <div className="fp-input d-flex flex-wrap align-items-center px-1">
        {searchCondition.catTopicTag !== "" && (
          <div className="fp-input-tag shadow text-small" onClick={() => setSearchCondition((prev) => ({ ...prev, catTopicTag: "" }))} style={{ "--cat": elementStatus.colors(searchCondition.catTopicTag) }}>
            {searchCondition.catTopicTag}
          </div>
        )}
        <input className="fp-input-text d-block text-large" name="search" type="text" value={searchCondition.string} onChange={handleSearchChange} placeholder={{ tc: "搜索攤位名稱、攤位編號", en: "Search" }[searchCondition.lang]} />
      </div>
      <div
        className={`fp-toggle d-flex align-items-center justify-content-center ${elementStatus.sidebar ? "active" : ""}`}
        onClick={() => {
          if (elementStatus.sidebar) setElementStatus((prev) => ({ ...prev, sidebar: false }));
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
  const handleClick = (d) => {
    setSearchCondition((prev) => ({ ...prev, catTopicTag: d }));
    setElementStatus((prev) => ({ ...prev, advanced: false }));
  };
  return (
    <div className="py-3 my-3">
      <div className="text-x-large text-bold px-2">{title}</div>
      {Object.keys(sum)
        .filter((d) => d !== "")
        .map((d) => (
          <div className="fp-category px-4 py-1" onClick={() => handleClick(d)}>
            {d} ({sum[d]})
          </div>
        ))}
    </div>
  );
};

const Advanced = ({ data, elementStatus, setElementStatus, searchCondition, setSearchCondition }) => {
  const download = async () => {
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
    <div className={`fp-advanced py-5 ${elementStatus.advanced ? "active" : ""}`}>
      <div className="fp-download py-3 px-2 mx-auto text-center text-bold shadow" onClick={download}>
        Download PNG
      </div>
      {[
        { title: "展區", col: "cat" },
        { title: "主題", col: "topic" },
      ].map((d) => (
        <Category title={d.title} data={data} col={d.col} setSearchCondition={setSearchCondition} setElementStatus={setElementStatus} />
      ))}
    </div>
  );
};

const Result = ({ data, elementStatus, handleBoothInfo }) => {
  return (
    <div className="fp-result">
      {data.map((d) => (
        <div id={`${d.id}-${d.org}`} className="fp-result-item d-flex align-items-center px-2 py-1" style={{ "--cat": elementStatus.colors(d.cat) }} onClick={() => handleBoothInfo(d)}>
          <div className="fp-result-item-name text-large">{d.org}</div>
          <div className="fp-result-item-loc text-small">
            {d.id} / {d.floor}F
          </div>
        </div>
      ))}
    </div>
  );
};

const BoothInfo = ({ setSearchCondition, elementStatus, setElementStatus }) => {
  const {
    boothInfoData: { text, org, id, floor, cat, topic, tag, info },
  } = elementStatus;
  const tags = Object.keys(elementStatus.boothInfoData).length === 0 ? [] : [id, cat, topic, ...tag];
  const handleTagClick = (value) => {
    setSearchCondition((prev) => ({ ...prev, catTopicTag: value, string: "" }));
    setElementStatus((prev) => ({ ...prev, boothInfo: false }));
  };
  const handleNameClick = () => {
    setSearchCondition((prev) => ({ ...prev, floor: floor, catTopicTag: "", string: id }));
    setElementStatus((prev) => ({ ...prev, boothInfo: false }));
  };
  return (
    <div className={`fp-booth-info ${elementStatus.boothInfo ? "active" : ""}`}>
      <div>
        <div className="fp-toggle d-flex align-items-center justify-content-center active" onClick={() => setElementStatus((prev) => ({ ...prev, boothInfo: false }))}>
          <span />
        </div>
      </div>
      {elementStatus.boothInfo && (
        <div className="fp-info">
          <div className="fp-info-item d-flex align-items-center px-2 py-1" onClick={handleNameClick}>
            <div className="fp-result-item-name text-x-large">{text.join("")}</div>
            <div className="fp-result-item-loc text-small">
              {id} / {floor}F
            </div>
          </div>
          <div className="p-2 text-large">{org}</div>
          <div className="fp-booth-tags d-flex flex-wrap p-2">
            {tags.map(
              (tag) =>
                tag !== "" && (
                  <div className="fp-input-tag shadow text-small" style={{ "--cat": elementStatus.colors(tag) }} onClick={() => handleTagClick(tag)}>
                    {tag}
                  </div>
                )
            )}
          </div>
          <div className="p-2">{info}</div>
          <div className="fp-booth-events p-2">相關活動</div>
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ data, elementStatus, setElementStatus, searchCondition, setSearchCondition, handleSearchChange, handleBoothInfo }) => {
  const handleSidear = ({ currentTarget }) => {
    if (elementStatus.sidebar && currentTarget.classList.contains("fp-sidebar")) return;
    setElementStatus((prev) => ({ ...prev, sidebar: !prev.sidebar }));
  };
  return (
    <div className={`fp-sidebar shadow ${elementStatus.sidebar ? "active" : ""}`} onClick={handleSidear}>
      <Search searchCondition={searchCondition} setSearchCondition={setSearchCondition} elementStatus={elementStatus} setElementStatus={setElementStatus} handleSearchChange={handleSearchChange} />
      {elementStatus.sidebar || elementStatus.isMobile ? (
        <>
          <Advanced data={data} searchCondition={searchCondition} setSearchCondition={setSearchCondition} elementStatus={elementStatus} setElementStatus={setElementStatus} />
          <Result data={data} elementStatus={elementStatus} handleBoothInfo={handleBoothInfo} />
          <BoothInfo setSearchCondition={setSearchCondition} elementStatus={elementStatus} setElementStatus={setElementStatus} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

const Selector = ({ searchCondition, handleSearchChange, setViewBox, realSize, zoomCalculator }) => {
  const defaultViewbox = () => setViewBox({ x1: 0, y1: 0, x2: realSize.w, y2: realSize.h });
  const handleClickZoom = (r) => {
    const { innerWidth: w, innerHeight: h } = window;
    zoomCalculator(w / 2, h / 2, r);
  };
  return (
    <>
      <div className="fp-select-floor shadow" onChange={handleSearchChange}>
        <label>
          <input type="radio" name="floor" value="1" checked={searchCondition.floor == 1} onChange={handleSearchChange} />
          <span className="d-flex justify-content-center align-items-center text-small">1F</span>
        </label>
        <label>
          <input type="radio" name="floor" value="4" checked={searchCondition.floor == 4} onChange={handleSearchChange} />
          <span className="d-flex justify-content-center align-items-center text-small">4F</span>
        </label>
      </div>
      <div className="fp-select-lang shadow">
        <label>
          <input type="checkbox" name="lang" value={searchCondition.lang === "tc" ? "en" : "tc"} checked={searchCondition.lang === "tc"} onChange={handleSearchChange} />
          <span className="d-flex justify-content-center align-items-center text-small">{searchCondition.lang === "tc" ? "EN" : "中"}</span>
        </label>
      </div>
      <div className="fp-zoom">
        <span className="d-flex justify-content-center align-items-center text-xx-large shadow" onClick={() => handleClickZoom(0.7)}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 6V18M6 12H18" stroke="black" strokeWidth="2" />
          </svg>
        </span>
        <span className="d-flex justify-content-center align-items-center text-xx-large shadow" onClick={defaultViewbox}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 9V5.6C4 5.03995 4 4.75992 4.10899 4.54601C4.20487 4.35785 4.35785 4.20487 4.54601 4.109C4.75992 4 5.03995 4 5.6 4L9 4M4 15V18.4C4 18.9601 4 19.2401 4.10899 19.454C4.20487 19.6422 4.35785 19.7951 4.54601 19.891C4.75992 20 5.03995 20 5.6 20L9 20M15 4H18.4C18.9601 4 19.2401 4 19.454 4.10899C19.6422 4.20487 19.7951 4.35785 19.891 4.54601C20 4.75992 20 5.03995 20 5.6V9M20 15V18.4C20 18.9601 20 19.2401 19.891 19.454C19.7951 19.6422 19.6422 19.7951 19.454 19.891C19.2401 20 18.9601 20 18.4 20H15" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="d-flex justify-content-center align-items-center text-xx-large shadow" onClick={() => handleClickZoom(1.3)}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M6 12H18" stroke="black" strokeWidth="2" />
          </svg>
        </span>
      </div>
    </>
  );
};

const MainArea = () => {
  const categories = {
    tc: ["全齡健康展區", "年度主題館", "醫療機構展區", "智慧醫療展區", "精準醫療展區"],
    en: ["Consumer health", "Reserved", "Medical Institutes", "Medtech", "Biotech"],
  };
  const [floorData, setFloorData] = useState([]);
  const [sidebarWidth, setSidebarWidth] = useState(40);
  const [searchCondition, setSearchCondition] = useState({
    string: "",
    regex: new RegExp(""),
    catTopicTag: "",
    floor: 1,
    lang: "en",
  });
  const [elementStatus, setElementStatus] = useState({
    colors: d3.scaleOrdinal().domain(categories[searchCondition.lang]).range(["rgba(237,125,49,0.6)", "rgba(153,204,255,1)", "rgba(255,255,0,0.6)", "rgba(0,112,192,0.6)", "rgba(112,48,160,0.6)"]).unknown("rgba(255,255,255)"),
    boothInfoData: {},
    isMobile: false,
    sidebar: true,
    advanced: false,
    boothInfo: false,
  });
  const memoFloorData = useMemo(() => floorData.map((d) => ({ ...d, cat: d.cat ? d.cat[searchCondition.lang] : false, topic: d.topic ? d.topic[searchCondition.lang] : false, tag: d.tag ? d.tag[searchCondition.lang] : false, text: d.text ? d.text[searchCondition.lang] : [], size: d.size ? d.size[searchCondition.lang] : 1, note: d.note ? d.note[searchCondition.lang] : false, org: d.org ? d.org[searchCondition.lang] : false, info: d.info ? d.info[searchCondition.lang] : false, draw: d.draw == 1 })), [searchCondition.lang, floorData]);
  const filterFloorData = useMemo(() => memoFloorData.map((d) => ({ ...d, opacity: ["booth"].includes(d.type) && searchCondition.regex.test([d.id, d.text.join(""), d.org, d.cat, d.topic, d.tag].join(" ")) && (searchCondition.catTopicTag === "" ? true : [d.id, d.cat, d.topic, ...d.tag].includes(searchCondition.catTopicTag)) ? 0.8 : 0.1 })), [searchCondition, memoFloorData]);
  const realSize = { 1: { w: 19730, h: 14610 }, 4: { w: 19830, h: 16950 } };
  const tagsHeight = 80;
  const searchActions = (name, value) => {
    switch (name) {
      case "search":
        setSearchCondition((prev) => ({ ...prev, string: value }));
        setElementStatus((prev) => ({ ...prev, advanced: false }));
        break;
      default:
        setSearchCondition((prev) => ({ ...prev, [name]: value }));
    }
  };
  const regexEscape = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const handleSearchChange = ({ target: { name, value } }) => searchActions(name, value);
  const handleResize = () => setElementStatus((prev) => ({ ...prev, isMobile: window.innerWidth < 768 }));
  const handleBoothInfo = (d) => {
    setElementStatus((prev) => ({ ...prev, sidebar: true, boothInfo: true, boothInfoData: d }));
    setSearchCondition((prev) => ({ ...prev, floor: d.floor }));
  };
  useEffect(() => setSidebarWidth(elementStatus.isMobile ? (elementStatus.sidebar ? 117 : window.innerHeight - 117) : elementStatus.sidebar ? 300 : 30), [elementStatus.sidebar, elementStatus.isMobile]);
  useEffect(() => setElementStatus((prev) => ({ ...prev, colors: prev.colors.domain(categories[searchCondition.lang]) })), [searchCondition.lang]);
  useEffect(() => {
    setSearchCondition((prev) => ({
      ...prev,
      regex: new RegExp(
        regexEscape(prev.string.replace("台", "臺"))
          .split(" ")
          .filter((s) => s !== "")
          .map((s) => `(?=.*${s})`)
          .join(""),
        "i"
      ),
    }));
  }, [searchCondition.string]);
  useEffect(() => {
    fetch("../../../../../warehouse/show/平面圖.json")
      .then((res) => res.json())
      .then((data) => {
        setFloorData(data);
      });
    if (/^zh/i.test(navigator.language)) setSearchCondition((prev) => ({ ...prev, lang: "tc" }));
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="fp-main" style={{ "--sidebar-width": `${sidebarWidth}px`, "--tags-height": `${tagsHeight}px` }}>
      <Sidebar data={filterFloorData.filter((d) => ["booth"].includes(d.type) && d.opacity > 0.1)} elementStatus={elementStatus} setElementStatus={setElementStatus} searchCondition={searchCondition} setSearchCondition={setSearchCondition} handleSearchChange={handleSearchChange} handleBoothInfo={handleBoothInfo} />
      <div className="fp-graph d-flex align-items-center">
        <div className="fp-tags p-2 shadow">{{ tc: "年度重點必看：", en: "年度重點必看：" }[searchCondition.lang]}</div>
        <Floormap data={filterFloorData.filter((d) => d.floor == searchCondition.floor && d.draw)} sidebarWidth={sidebarWidth} realSize={realSize[searchCondition.floor]} tagsHeight={tagsHeight} elementStatus={elementStatus} handleBoothInfo={handleBoothInfo} searchCondition={searchCondition} handleSearchChange={handleSearchChange} />
      </div>
    </div>
  );
};
