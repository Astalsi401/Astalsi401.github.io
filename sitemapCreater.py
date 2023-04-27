import os
import re

os.chdir(os.path.dirname(os.path.abspath(__file__)))
folders = ['notes', 'R', 'stata']


def getFiles(path):
    return ['https://astalsi401.github.io/' + re.sub(r'\\', '/', os.path.join(root, f)) for root, dirs, files in os.walk(path) for f in files if re.findall(r'\.html$', f)]


def url(file):
    return f'''    
    <url>
        <loc>{file}</loc>
    </url>'''


def sitemap():
    pathes = {folder: getFiles(folder) for folder in folders}
    res = f'''<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://astalsi401.github.io/index.html</loc>
    </url>{''.join([url(path) for folder in folders for path in pathes[folder]])}
</urlset>'''
    open('sitemap.xml', mode='w').write(res)


sitemap()
