import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

files = ['icon', 'colorPicker', 'header', 'map', 'sidebar', 'tools', 'area']
# files = ['icon', 'test', 'header', 'map', 'sidebar', 'tools', 'area']

js = '\n'.join([open(f'floormap/{file}.js').read() for file in files])
open('main.js', 'w').write(js)
open('main.js', 'w').write(js.replace('../../warehouse/show/floormap.json', 'https://astalsi401.github.io/warehouse/show/floormap.json'))
