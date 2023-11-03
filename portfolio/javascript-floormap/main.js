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
const meta = document.createElement("meta");
meta.setAttribute("name", "viewport");
meta.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no");
document.head.appendChild(meta);

const Header = ({ searchCondition, setSearchCondition }) => {
  const tags = ["活動進行中"];
  return (
    <div className="fp-tags p-2 d-flex flex-wrap align-items-center shadow">
      <div>{{ tc: "年度重點必看：", en: "年度重點必看：" }[searchCondition.lang]}</div>
      {tags.map((d) => (
        <div className="fp-input-tag shadow" onClick={() => setSearchCondition((prev) => ({ ...prev, tag: d }))}>
          {d}
        </div>
      ))}
    </div>
  );
};

const Wall = ({ d, drawPath }) => {
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

const Booth = ({ d, size, elementStatus, setElementStatus, handleBoothInfo, drawPath }) => {
  const fontSize = size * d.size;
  const lineHeight = fontSize * 1.2;
  const opacity = elementStatus.boothInfo && elementStatus.boothInfoData.id == d.id ? 1 : d.opacity;
  const handleBoothClick = (d) => {
    if (elementStatus.boothInfo && elementStatus.boothInfoData.id == d.id) {
      setElementStatus((prev) => ({ ...prev, boothInfo: false }));
    } else {
      handleBoothInfo(d);
    }
  };
  return (
    <g key={d.id} id={d.id} className="booth" transform={`translate(${d.x},${d.y})`} onClick={() => handleBoothClick(d)}>
      <path stroke="black" fill={elementStatus.colors(d.cat)} strokeWidth={1} fillOpacity={opacity} d={`M0 0${drawPath(d.p)}`} />;
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

const Elements = ({ type, data, size, elementStatus, setElementStatus, handleBoothInfo }) => {
  const drawPath = (path) => path.map((p) => (p.node === "L" ? `${p.node}${p.x} ${p.y}` : `${p.node}${p.x1} ${p.y1} ${p.x2} ${p.y2} ${p.x} ${p.y}`)).join("") + "Z";
  const elementActions = {
    wall: (d, i) => <Wall d={d} drawPath={drawPath} />,
    pillar: (d, i) => <Pillar d={d} />,
    text: (d, i) => <Text d={d} />,
    room: (d, i) => <Room d={d} i={i} size={size} />,
    icon: (d, i) => <Room d={d} i={i} size={size} />,
    booth: (d, i) => <Booth d={d} size={size} elementStatus={elementStatus} setElementStatus={setElementStatus} handleBoothInfo={handleBoothInfo} drawPath={drawPath} />,
  };
  return <g className={`${type}-g`}>{data.filter((d) => d.type == type).map((d, i) => elementActions[type](d, i))}</g>;
};
const Floormap = ({ data, realSize, elementStatus, setElementStatus, dragStatus, setDragStatus, zoom, setZoom, handleBoothInfo, searchCondition, handleSearchChange, graphRef, svgRef, zoomCalculator, dragCalculator, animation }) => {
  const [containerSize, setContainerSize] = useState({ width: realSize.w / 100, height: realSize.h / 100, pageHeight: realSize.h / 100 });
  const [viewBox, setViewBox] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const handleStart = () => {
    if (elementStatus.smallScreen) setElementStatus((prev) => ({ ...prev, sidebar: false }));
    setDragStatus((prev) => ({ ...prev, moving: true }));
  };
  const handleEnd = () => setDragStatus((prev) => ({ ...prev, moving: false, previousTouch: null, previousTouchLength: null }));
  const handleResize = () => {
    const { clientWidth, clientHeight } = graphRef.current;
    setContainerSize({ width: clientWidth, height: clientHeight });
  };
  const handleTouchDragZoom = (e) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setDragStatus((prev) => ({ ...prev, previousTouch: touch, previousTouchLength: e.touches.length }));
      if (dragStatus.previousTouch) dragCalculator(touch.clientX - dragStatus.previousTouch.clientX, touch.clientY - dragStatus.previousTouch.clientY);
    } else {
      if (dragStatus.previousTouchLength && dragStatus.previousTouchLength != length) {
        handleEnd();
        return;
      }
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const x = (touch1.clientX + touch2.clientX) / 2;
      const y = (touch1.clientY + touch2.clientY) / 2;
      const d = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
      setDragStatus((prev) => ({ ...prev, previousTouch: d }));
      if (dragStatus.previousTouch) zoomCalculator(x, y, d / dragStatus.previousTouch);
    }
  };
  const handleMouseDrag = ({ movementX, movementY }) => dragCalculator(movementX, movementY);
  const handleWheelZoom = ({ clientX, clientY, deltaY }) => {
    let r = deltaY > 0 ? 0.95 : deltaY < 0 ? 1.05 : 1;
    zoomCalculator(clientX, clientY, r);
  };
  useEffect(() => {
    setViewBox({ x1: 0, y1: 0, x2: realSize.w, y2: realSize.h });
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [realSize]);
  return (
    <div className="fp-floormap d-flex align-items-center" style={{ minHeight: elementStatus.minHeight }}>
      <Selector searchCondition={searchCondition} handleSearchChange={handleSearchChange} setDragStatus={setDragStatus} setZoom={setZoom} graphRef={graphRef} svgRef={svgRef} zoomCalculator={zoomCalculator} animation={animation} />
      <div class={`fp-viewBox ${dragStatus.moving ? "moving" : ""}`} ref={graphRef} onWheel={handleWheelZoom} onMouseDown={handleStart} onMouseUp={handleEnd} onMouseLeave={handleEnd} onMouseMove={handleMouseDrag} onTouchStart={handleStart} onTouchEnd={handleEnd} onTouchMove={handleTouchDragZoom}>
        <svg id="floormap" ref={svgRef} style={{ translate: `${zoom.x + dragStatus.x}px ${zoom.y + dragStatus.y}px`, scale: `${zoom.scale}`, backgroundColor: "#f1f1f1" }} width={containerSize.width} height={containerSize.height} viewBox={`${viewBox.x1} ${viewBox.y1} ${viewBox.x2} ${viewBox.y2}`}>
          <Elements type="wall" data={data} />
          <Elements type="pillar" data={data} />
          <Elements type="text" data={data} />
          <Elements type="room" data={data} size={200} />
          <Elements type="icon" data={data} size={200} />
          <Elements type="booth" data={data} size={250} elementStatus={elementStatus} setElementStatus={setElementStatus} handleBoothInfo={handleBoothInfo} />
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
        {searchCondition.tag !== "" && (
          <div className="fp-input-tag shadow text-small" onClick={() => setSearchCondition((prev) => ({ ...prev, tag: "" }))} style={{ "--cat": elementStatus.colors(searchCondition.tag) }}>
            {searchCondition.tag}
          </div>
        )}
        <input className="fp-input-text d-block text-large" name="search" type="text" value={searchCondition.string} onChange={handleSearchChange} placeholder={{ tc: "搜索攤位名稱、攤位編號", en: "Search" }[searchCondition.lang]} />
      </div>
      <div
        className={`fp-toggle d-flex align-items-center justify-content-center ${searchCondition.string.length === 0 ? "" : "active"}`}
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
  const handleClick = (d) => {
    setSearchCondition((prev) => ({ ...prev, tag: d }));
    setElementStatus((prev) => ({ ...prev, advanced: false }));
  };
  return (
    <div className="py-3 my-3">
      <div className="text-x-large text-bold px-2">{title}</div>
      {Object.keys(sum)
        .filter((d) => !["false", ""].includes(d))
        .map((d) => (
          <div className="fp-category px-4 py-1" onClick={() => handleClick(d)}>
            {d} ({sum[d]})
          </div>
        ))}
    </div>
  );
};

const Advanced = ({ data, elementStatus, setElementStatus, searchCondition, setSearchCondition, defaultViewbox }) => {
  const download = async () => {
    defaultViewbox();
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

const Result = ({ d, elementStatus, handleBoothInfo, svgRef, graphRef, zoomCalculator, animation, dragCalculator }) => {
  const isBooth = d.type === "booth";
  const id = isBooth ? `${d.id}-${d.org}` : `${d.text.join("")}-${d.floor}`;
  const bg = isBooth ? elementStatus.colors(d.cat) : "#acacac";
  const name = isBooth ? d.org : d.note;
  const loc = isBooth ? `${d.id} / ${d.floor}F` : `${d.floor}F`;
  const handleResultClick = () => {
    animation();
    handleBoothInfo(d);
    // 定位至選取攤位(開發中)
    const svgPoint = svgRef.current.createSVGPoint();
    // 攤位中心點
    svgPoint.x = d.x + d.w / 2;
    svgPoint.y = d.y + d.h / 2;
    // 獲取SVG元素的CTM矩陣
    const CTM = svgRef.current.getScreenCTM();
    // 將座標點應用到CTM矩陣
    const transformedPoint = svgPoint.matrixTransform(CTM);
    // 獲取轉換後的clientX和clientY值
    zoomCalculator(transformedPoint.x, transformedPoint.y, 10);
    // 獲取攤位中心與地圖中心的距離
    const { offsetLeft: x, offsetTop: y, offsetWidth: w, offsetHeight: h } = graphRef.current;
    const center = { x: w / 2 + x, y: h / 2 + y };
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
    <div className="fp-result">
      {data
        .filter((d) => d.opacity > 0.1 && d.text.length !== 0)
        .map((d) => (
          <Result d={d} elementStatus={elementStatus} handleBoothInfo={handleBoothInfo} svgRef={svgRef} graphRef={graphRef} zoomCalculator={zoomCalculator} dragCalculator={dragCalculator} animation={animation} defaultViewbox={defaultViewbox} />
        ))}
    </div>
  );
};

const Event = ({ start, end, title, active }) => {
  const format = (datetime) => (Array(2).join("0") + datetime).slice(-2);
  return (
    <div className={`fp-event my-1 p-1 ${active ? "active" : ""}`}>
      <div className="text-small">{`${format(start.getMonth() + 1)}/${format(start.getDate())} ${format(start.getHours())}:${format(start.getMinutes())}-${format(end.getHours())}:${format(end.getMinutes())}`}</div>
      <div>{title}</div>
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
  const corps = data.find((d) => d.id == id).corps.filter((d) => d.corpId != corpId);
  const handleTagClick = (value) => {
    setSearchCondition((prev) => ({ ...prev, tag: value, string: "" }));
    setElementStatus((prev) => ({ ...prev, boothInfo: false }));
  };
  const handleNameClick = () => setSearchCondition((prev) => ({ ...prev, floor: floor, tag: "", string: `${id ? id : note} ${org}` }));
  const handleCorpClick = (d) => setElementStatus((prev) => ({ ...prev, boothInfoData: d }));
  return (
    <div className="fp-info">
      <div className="fp-info-item d-flex align-items-center px-2 py-1" onClick={handleNameClick}>
        <div className="fp-result-item-name text-x-large">{text.join("")}</div>
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
      {corps.length > 0 && (
        <div className="p-2">
          <div className="my-1 text-large">聯展單位</div>
          <div className="my-1 fp-booth-tags d-flex flex-wrap">
            {corps.map((d) => (
              <div className="fp-input-tag shadow text-small" style={{ "--cat": elementStatus.colors("") }} onClick={() => handleCorpClick(d)}>
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
      {event.length > 0 && (
        <div className="p-2">
          <div className="my-1 text-large">相關活動</div>
          <div className="my-1">
            {event.map((d) => (
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
      <div>
        <div className="fp-toggle d-flex align-items-center justify-content-center active" onClick={() => setElementStatus((prev) => ({ ...prev, boothInfo: false }))}>
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
          <Advanced data={data} searchCondition={searchCondition} setSearchCondition={setSearchCondition} elementStatus={elementStatus} setElementStatus={setElementStatus} defaultViewbox={defaultViewbox} />
          <ResultList data={data.filter((d) => d.sidebar)} elementStatus={elementStatus} handleBoothInfo={handleBoothInfo} svgRef={svgRef} graphRef={graphRef} zoomCalculator={zoomCalculator} dragCalculator={dragCalculator} animation={animation} defaultViewbox={defaultViewbox} />
          <BoothInfo data={data.filter((d) => d.sidebar)} setSearchCondition={setSearchCondition} elementStatus={elementStatus} setElementStatus={setElementStatus} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

const Selector = ({ searchCondition, handleSearchChange, setDragStatus, setZoom, graphRef, svgRef, zoomCalculator }) => {
  const animation = () => {
    svgRef.current.style.transition = "0.4s";
    setTimeout(() => (svgRef.current.style.transition = null), 400);
  };
  const defaultViewbox = () => {
    animation();
    setDragStatus((prev) => ({ ...prev, x: 0, y: 0 }));
    setZoom({ scale: 1, x: 0, y: 0 });
  };
  const handleClickZoom = (r) => {
    animation();
    const { offsetLeft: x, offsetTop: y, offsetWidth: w, offsetHeight: h } = graphRef.current;
    zoomCalculator(w / 2 + x, h / 2 + y, r);
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
        <span className="d-flex justify-content-center align-items-center text-xx-large shadow" onClick={() => handleClickZoom(1.3)}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 6V18M6 12H18" stroke="black" strokeWidth="2" />
          </svg>
        </span>
        <span className="d-flex justify-content-center align-items-center text-xx-large shadow" onClick={defaultViewbox}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 9V5.6C4 5.03995 4 4.75992 4.10899 4.54601C4.20487 4.35785 4.35785 4.20487 4.54601 4.109C4.75992 4 5.03995 4 5.6 4L9 4M4 15V18.4C4 18.9601 4 19.2401 4.10899 19.454C4.20487 19.6422 4.35785 19.7951 4.54601 19.891C4.75992 20 5.03995 20 5.6 20L9 20M15 4H18.4C18.9601 4 19.2401 4 19.454 4.10899C19.6422 4.20487 19.7951 4.35785 19.891 4.54601C20 4.75992 20 5.03995 20 5.6V9M20 15V18.4C20 18.9601 20 19.2401 19.891 19.454C19.7951 19.6422 19.6422 19.7951 19.454 19.891C19.2401 20 18.9601 20 18.4 20H15" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="d-flex justify-content-center align-items-center text-xx-large shadow" onClick={() => handleClickZoom(0.7)}>
          <svg viewBox="0 0 24 24" fill="none">
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
  const categories = {
    tc: ["全齡健康展區", "年度主題館", "醫療機構展區", "智慧醫療展區", "精準醫療展區"],
    en: ["Consumer health", "Reserved", "Medical Institutes", "Medtech", "Biotech"],
  };
  const realSize = { w: 19830, h: 16950 };
  const title = { tc: "展場平面圖", en: "Floor Plan" };
  const tagsHeight = 80;
  const types = ["booth", "room"];
  const graphRef = useRef(null);
  const svgRef = useRef(null);
  const [dragStatus, setDragStatus] = useState({ moving: false, previousTouch: null, previousTouchLength: null, x: 0, y: 0 });
  const [zoom, setZoom] = useState({ scale: 1, x: 0, y: 0 });
  const [floorData, setFloorData] = useState({ loaded: false, data: [] });
  const [sidebarWidth, setSidebarWidth] = useState(40);
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
    return {
      isMobile: isMobile,
      minHeight: isMobile ? window.innerHeight : 0,
      colors: d3.scaleOrdinal().domain(categories[searchCondition.lang]).range(["rgba(237,125,49,0.6)", "rgba(153,204,255,1)", "rgba(255,255,0,0.6)", "rgba(0,112,192,0.6)", "rgba(112,48,160,0.6)"]).unknown("rgba(255,255,255)"),
      boothInfoData: {},
      smallScreen: false,
      sidebar: true,
      advanced: false,
      boothInfo: false,
    };
  });
  const memoFloorData = useMemo(
    () =>
      floorData.data.map((d) => {
        let tags = d.tag ? d.tag[searchCondition.lang] : [],
          eventTime = [];
        if (d.event) {
          const now = new Date();
          eventTime = d.event.map((e) => ({ start: new Date(e.start), end: new Date(e.end), title: e.title[searchCondition.lang], active: new Date(e.start) < now && new Date(e.end) > now }));
          tags = eventTime.some((e) => e.active) ? tags.concat(["活動進行中"]) : tags;
        }
        return { ...d, cat: d.cat ? d.cat[searchCondition.lang] : false, topic: d.topic ? d.topic[searchCondition.lang] : false, tag: tags, text: d.text ? d.text[searchCondition.lang] : [], size: d.size ? d.size[searchCondition.lang] : 1, note: d.note ? d.note[searchCondition.lang] : false, event: eventTime, corps: d.corps ? d.corps.map((corp, i) => ({ corpId: `${d.id}-${i}`, org: corp.org[searchCondition.lang], info: corp.info[searchCondition.lang] })) : false, draw: true };
      }),
    [searchCondition.lang, floorData.data]
  );
  const filterFloorData = useMemo(() => {
    const res = [];
    memoFloorData.forEach((d) => {
      const corps = d.corps ? d.corps.map((corp) => corp.org) : [];
      const infos = d.corps ? d.corps.map((corp) => corp.info) : [];
      const isType = types.includes(d.type);
      const hasTag = isType && searchCondition.tag === "" ? true : [d.id, d.cat, d.topic, d.note, ...d.tag].includes(searchCondition.tag);
      let hasText = isType && searchCondition.regex.test([d.id, d.text.join(""), d.note, d.cat, d.topic, d.tag, ...infos, ...corps].join(" "));
      const opacity = (hasText && hasTag) || d.type === "icon" ? 0.8 : 0.1;
      if (d.corps) {
        d.corps.forEach((corp, i) => {
          hasText = searchCondition.regex.test([d.id, d.text.join(""), d.note, d.cat, d.topic, d.tag, corp.info, corp.org].join(" "));
          res.push({ ...d, ...corp, opacity: opacity, draw: i === 0, sidebar: hasText && hasTag });
        });
      } else {
        res.push({ ...d, opacity: opacity, draw: true, sidebar: isType });
      }
    });
    return res;
  }, [searchCondition, memoFloorData]);

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
  const handleSearchChange = ({ target: { name, value } }) => {
    searchActions(name, value);
  };
  const handleResize = () =>
    setElementStatus((prev) => {
      const smallScreen = window.innerWidth < 768;
      return { ...prev, smallScreen: smallScreen, sidebar: prev.smallScreen ? prev.sidebar : !smallScreen };
    });
  const handleBoothInfo = (d) => {
    setElementStatus((prev) => ({ ...prev, boothInfo: true, boothInfoData: d }));
    setSearchCondition((prev) => ({ ...prev, floor: d.floor }));
  };
  const defaultViewbox = () => {
    setDragStatus((prev) => ({ ...prev, x: 0, y: 0 }));
    setZoom({ scale: 1, x: 0, y: 0 });
  };
  const zoomCalculator = (clientX, clientY, r) => {
    const box = graphRef.current.getBoundingClientRect();
    setZoom((prev) => {
      let scale = prev.scale * r;
      scale = scale < 1 ? 1 : scale > 10 ? 10 : scale;
      let w = svgRef.current.clientWidth * prev.scale;
      let h = svgRef.current.clientHeight * prev.scale;
      let x = (graphRef.current.clientWidth - w) / 2 + prev.x + dragStatus.x;
      let y = (graphRef.current.clientHeight - h) / 2 + prev.y + dragStatus.y;
      let originX = clientX - box.x - x - w / 2;
      let originY = clientY - box.y - y - h / 2;
      let xNew = originX - (originX / prev.scale) * scale + prev.x;
      let yNew = originY - (originY / prev.scale) * scale + prev.y;
      return { scale: scale, x: xNew, y: yNew };
    });
  };
  const dragCalculator = (x, y, force = false) => {
    if (dragStatus.moving || force) setDragStatus((prev) => ({ ...prev, x: prev.x + x, y: prev.y + y }));
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
  useEffect(() => {
    const height = elementStatus.isMobile ? elementStatus.minHeight : window.innerHeight;
    setSidebarWidth(elementStatus.smallScreen ? (elementStatus.sidebar ? height * 0.3 : height - 117) : elementStatus.sidebar ? 300 : 30);
  }, [elementStatus.sidebar, elementStatus.smallScreen]);
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
    setElementStatus((prev) => {
      return { ...prev, boothInfoData: filterFloorData.find((d) => d.id == prev.boothInfoData.id && d.corpId == prev.boothInfoData.corpId), colors: prev.colors.domain(categories[searchCondition.lang]) };
    });
    document.title = title[searchCondition.lang];
  }, [searchCondition.lang]);
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
  if (!floorData.loaded) return <Loading />;
  return (
    <div className="fp-main" style={{ "--sidebar-width": `${sidebarWidth}px`, "--tags-height": `${tagsHeight}px` }}>
      <Sidebar data={filterFloorData.filter((d) => types.includes(d.type))} elementStatus={elementStatus} setElementStatus={setElementStatus} searchCondition={searchCondition} setSearchCondition={setSearchCondition} handleSearchChange={handleSearchChange} handleBoothInfo={handleBoothInfo} svgRef={svgRef} graphRef={graphRef} zoomCalculator={zoomCalculator} dragCalculator={dragCalculator} defaultViewbox={defaultViewbox} animation={animation} />
      <div className="fp-graph d-flex align-items-center">
        <Header searchCondition={searchCondition} setSearchCondition={setSearchCondition} />
        <Floormap data={filterFloorData.filter((d) => d.floor == searchCondition.floor && d.draw)} realSize={realSize} elementStatus={elementStatus} setElementStatus={setElementStatus} dragStatus={dragStatus} setDragStatus={setDragStatus} zoom={zoom} setZoom={setZoom} handleBoothInfo={handleBoothInfo} searchCondition={searchCondition} handleSearchChange={handleSearchChange} graphRef={graphRef} svgRef={svgRef} zoomCalculator={zoomCalculator} dragCalculator={dragCalculator} animation={animation} />
      </div>
    </div>
  );
};
